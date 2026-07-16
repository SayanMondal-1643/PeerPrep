"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchBranches,
  fetchExams,
  fetchSubjects,
  fetchTopics,
} from "@/lib/hierarchy-api";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useRequireAuth } from "@/lib/use-require-auth";
import { useCreateMaterial } from "@/lib/hooks/use-materials";

import type { HierarchyOption } from "@/lib/hierarchy-types";

export default function UploadPage() {
  const [exams, setExams] = useState<HierarchyOption[]>([]);
  const [branches, setBranches] = useState<HierarchyOption[]>([]);
  const [subjects, setSubjects] = useState<HierarchyOption[]>([]);
  const [topics, setTopics] = useState<HierarchyOption[]>([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingExams, setIsLoadingExams] = useState(false);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useRequireAuth();
  const createMaterial = useCreateMaterial();

  useEffect(() => {
    const loadExams = async () => {
      setIsLoadingExams(true);
      setErrorMessage("");

      try {
        const exams = await fetchExams();
        setExams(exams);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
        setErrorMessage("Unable to load exams right now.");
      } finally {
        setIsLoadingExams(false);
      }
    };

    loadExams();
  }, []);

  useEffect(() => {
    if (!selectedExamId) {
      setBranches([]);
      setSelectedBranchId("");
      setSelectedSubjectId("");
      setSelectedTopicId("");
      return;
    }

    let isCancelled = false;

    const loadBranches = async () => {
      setIsLoadingBranches(true);
      setErrorMessage("");

      try {
        const branches = await fetchBranches(selectedExamId);

        if (!isCancelled) {
          setBranches(branches);
        }
      } catch (error) {
        console.error("Failed to fetch branches:", error);
        if (!isCancelled) {
          setBranches([]);
          setErrorMessage("Unable to load branches right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingBranches(false);
        }
      }
    };

    loadBranches();

    return () => {
      isCancelled = true;
    };
  }, [selectedExamId]);

  useEffect(() => {
    if (!selectedBranchId) {
      setSubjects([]);
      setSelectedSubjectId("");
      setSelectedTopicId("");
      return;
    }

    let isCancelled = false;

    const loadSubjects = async () => {
      setIsLoadingSubjects(true);
      setErrorMessage("");

      try {
        const subjects = await fetchSubjects(selectedBranchId);

        if (!isCancelled) {
          setSubjects(subjects);
        }
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        if (!isCancelled) {
          setSubjects([]);
          setErrorMessage("Unable to load subjects right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingSubjects(false);
        }
      }
    };

    loadSubjects();

    return () => {
      isCancelled = true;
    };
  }, [selectedBranchId]);

  useEffect(() => {
    if (!selectedSubjectId) {
      setTopics([]);
      setSelectedTopicId("");
      return;
    }

    let isCancelled = false;

    const loadTopics = async () => {
      setIsLoadingTopics(true);
      setErrorMessage("");

      try {
        const topics = await fetchTopics(selectedSubjectId);

        if (!isCancelled) {
          setTopics(topics);
        }
      } catch (error) {
        console.error("Failed to fetch topics:", error);
        if (!isCancelled) {
          setTopics([]);
          setErrorMessage("Unable to load topics right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingTopics(false);
        }
      }
    };

    loadTopics();

    return () => {
      isCancelled = true;
    };
  }, [selectedSubjectId]);

  const handleExamChange = (examId: string) => {
    setSelectedExamId(examId);
    setSelectedBranchId("");
    setSelectedSubjectId("");
    setSelectedTopicId("");
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranchId(branchId);
    setSelectedSubjectId("");
    setSelectedTopicId("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTopicId) {
      setErrorMessage("Please select an exam, branch, subject, and topic.");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("Please choose a file to upload.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const fileUrl = await uploadToCloudinary(selectedFile);

      await createMaterial.mutateAsync({
        topicId: selectedTopicId,
        title,
        description,
        fileUrl,
      });

      alert("Material uploaded successfully!");

      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setFileName("");
      setSelectedExamId("");
      setSelectedBranchId("");
      setSelectedSubjectId("");
      setSelectedTopicId("");
    } catch (error) {
      console.error("Failed to submit material:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Study Material</h1>
          <p className="text-muted-foreground">
            Share your study materials with the community. Help fellow students
            prepare for their exams.
          </p>
        </div>

        <Card className="p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage ? (
              <p className="text-sm text-destructive">{errorMessage}</p>
            ) : null}

            {/* Exam Selection */}
            <div className="space-y-2">
              <Label htmlFor="exam">Exam *</Label>
              <Select value={selectedExamId} onValueChange={handleExamChange}>
                <SelectTrigger id="exam">
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingExams ? (
                    <SelectItem value="loading-exams" disabled>
                      Loading exams...
                    </SelectItem>
                  ) : (
                    exams.map((exam) => (
                      <SelectItem key={exam._id} value={exam._id}>
                        {exam.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Branch Selection */}
            <div className="space-y-2">
              <Label htmlFor="branch">Branch *</Label>
              <Select
                value={selectedBranchId}
                onValueChange={handleBranchChange}
                disabled={
                  !selectedExamId || isLoadingBranches || branches.length === 0
                }
              >
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingBranches ? (
                    <SelectItem value="loading-branches" disabled>
                      Loading branches...
                    </SelectItem>
                  ) : (
                    branches.map((branch) => (
                      <SelectItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select
                value={selectedSubjectId}
                onValueChange={(subjectId) => {
                  setSelectedSubjectId(subjectId);
                  setSelectedTopicId("");
                }}
                disabled={
                  !selectedBranchId ||
                  isLoadingSubjects ||
                  subjects.length === 0
                }
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingSubjects ? (
                    <SelectItem value="loading-subjects" disabled>
                      Loading subjects...
                    </SelectItem>
                  ) : (
                    subjects.map((subject) => (
                      <SelectItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Topic Selection */}
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Select
                value={selectedTopicId}
                onValueChange={setSelectedTopicId}
                disabled={
                  !selectedSubjectId || isLoadingTopics || topics.length === 0
                }
              >
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingTopics ? (
                    <SelectItem value="loading-topics" disabled>
                      Loading topics...
                    </SelectItem>
                  ) : (
                    topics.map((topic) => (
                      <SelectItem key={topic._id} value={topic._id}>
                        {topic.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t border-border pt-6" />

            {/* Material Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Material Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Complete Array Problems Guide"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Material Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what this material covers, key topics, and who it's best for..."
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">Upload File *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                {fileName ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFileName("");
                        setSelectedFile(null);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX, PPT, PPTX (Max 50MB)
                    </p>
                  </>
                )}
                <Input
                  id="file"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={handleFileChange}
                  required
                />
                {!fileName && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-transparent"
                    onClick={() => document.getElementById("file")?.click()}
                  >
                    Choose File
                  </Button>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-6" />

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Uploading..." : "Upload Material"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/exams">Cancel</Link>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
