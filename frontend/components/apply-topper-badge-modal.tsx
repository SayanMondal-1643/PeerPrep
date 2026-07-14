"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchBranches, fetchExams, fetchSubjects } from "@/lib/hierarchy-api";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useCreateTopperBadgeApplication } from "@/lib/hooks/use-topper-badges";
import type { HierarchyOption } from "@/lib/hierarchy-types";

interface ApplyTopperBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TopperBadgeApplicationData) => void;
  userId: string;
}

export interface TopperBadgeApplicationData {
  exam: string;
  branch: string;
  subject: string;
  year: string;
  cgpa: string;
  markSheetUrl: string;
}

export default function ApplyTopperBadgeModal({
  isOpen,
  onClose,
  onSubmit,
  userId,
}: ApplyTopperBadgeModalProps) {
  const [formData, setFormData] = useState<TopperBadgeApplicationData>({
    exam: "",
    branch: "",
    subject: "",
    year: "",
    cgpa: "",
    markSheetUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [exams, setExams] = useState<HierarchyOption[]>([]);
  const [branches, setBranches] = useState<HierarchyOption[]>([]);
  const [subjects, setSubjects] = useState<HierarchyOption[]>([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [isLoadingExams, setIsLoadingExams] = useState(false);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [isUploadingMarksheet, setIsUploadingMarksheet] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const createApplication = useCreateTopperBadgeApplication();

  useEffect(() => {
    if (!isOpen) return;

    const loadExams = async () => {
      setIsLoadingExams(true);

      try {
        const fetchedExams = await fetchExams();
        setExams(fetchedExams);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
        setExams([]);
      } finally {
        setIsLoadingExams(false);
      }
    };

    loadExams();
  }, [isOpen]);

  const handleExamChange = async (examId: string) => {
    const examName = exams.find((exam) => exam._id === examId)?.name || "";
    setFormData((prev) => ({
      ...prev,
      exam: examName,
      branch: "",
      subject: "",
    }));
    setSelectedExamId(examId);
    setSelectedBranchId("");
    setBranches([]);
    setSubjects([]);

    setIsLoadingBranches(true);

    try {
      const fetchedBranches = await fetchBranches(examId);
      setBranches(fetchedBranches);
    } catch (error) {
      console.error("Failed to fetch branches:", error);
      setBranches([]);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  const handleBranchChange = async (branchId: string) => {
    const branchName =
      branches.find((branch) => branch._id === branchId)?.name || "";
    setFormData((prev) => ({ ...prev, branch: branchName, subject: "" }));
    setSelectedBranchId(branchId);
    setSubjects([]);

    setIsLoadingSubjects(true);

    try {
      const fetchedSubjects = await fetchSubjects(branchId);
      setSubjects(fetchedSubjects);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setSubjects([]);
    } finally {
      setIsLoadingSubjects(false);
    }
  };

  const handleSubjectChange = (subjectId: string) => {
    const subjectName =
      subjects.find((subject) => subject._id === subjectId)?.name || "";
    setFormData((prev) => ({ ...prev, subject: subjectName }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!validTypes.includes(file.type)) {
      setUploadError("Only PDF and image files are allowed");
      setErrors((prev) => ({
        ...prev,
        marksheet: "Only PDF and image files are allowed",
      }));
      return;
    }

    setIsUploadingMarksheet(true);
    setUploadError("");
    setErrors((prev) => ({ ...prev, marksheet: "" }));

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, markSheetUrl: uploadedUrl }));
    } catch (error) {
      console.error("Failed to upload marksheet:", error);
      setUploadError("Failed to upload marksheet. Please try again.");
      setFormData((prev) => ({ ...prev, markSheetUrl: "" }));
    } finally {
      setIsUploadingMarksheet(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.exam) newErrors.exam = "Exam is required";
    if (!formData.branch) newErrors.branch = "Branch is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.cgpa) newErrors.cgpa = "CGPA is required";
    if (!formData.markSheetUrl)
      newErrors.marksheet = "Marksheet upload is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createApplication.mutateAsync({
        userId,
        exam: formData.exam,
        branch: formData.branch,
        subject: formData.subject,
        year: Number(formData.year),
        cgpa: Number(formData.cgpa),
        markSheetUrl: formData.markSheetUrl,
      });
    } catch (err) {
      console.error("Failed to submit topper badge application", err);
      setErrors({ ...errors, submit: "Failed to submit application" });
      return;
    }

    onSubmit(formData);
    setFormData({
      exam: "",
      branch: "",
      subject: "",
      year: "",
      cgpa: "",
      markSheetUrl: "",
    });
    setSelectedExamId("");
    setSelectedBranchId("");
    setBranches([]);
    setSubjects([]);
    setErrors({});
    setUploadError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for Topper Badge</DialogTitle>
          <DialogDescription>
            Submit your details and marksheet to apply for a topper badge
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Exam */}
          <div className="space-y-2">
            <Label htmlFor="exam">Exam *</Label>
            <Select
              value={selectedExamId}
              onValueChange={handleExamChange}
              disabled={isLoadingExams}
            >
              <SelectTrigger id="exam">
                {isLoadingExams ? (
                  <span>Loading...</span>
                ) : (
                  <SelectValue placeholder="Select exam" />
                )}
              </SelectTrigger>
              <SelectContent>
                {exams.map((exam) => (
                  <SelectItem key={exam._id} value={exam._id}>
                    {exam.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.exam && (
              <p className="text-sm text-red-500">{errors.exam}</p>
            )}
          </div>

          {/* Branch */}
          <div className="space-y-2">
            <Label htmlFor="branch">Branch *</Label>
            <Select
              value={selectedBranchId}
              onValueChange={handleBranchChange}
              disabled={!formData.exam || isLoadingBranches}
            >
              <SelectTrigger id="branch">
                {isLoadingBranches ? (
                  <span>Loading...</span>
                ) : (
                  <SelectValue placeholder="Select branch" />
                )}
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch._id} value={branch._id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.branch && (
              <p className="text-sm text-red-500">{errors.branch}</p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Select
              value={
                subjects.find((subject) => subject.name === formData.subject)
                  ?._id || ""
              }
              onValueChange={handleSubjectChange}
              disabled={!formData.branch || isLoadingSubjects}
            >
              <SelectTrigger id="subject">
                {isLoadingSubjects ? (
                  <span>Loading...</span>
                ) : (
                  <SelectValue placeholder="Select subject" />
                )}
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject._id} value={subject._id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject}</p>
            )}
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              type="number"
              min="2000"
              max="2100"
              placeholder="Enter year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
            {errors.year && (
              <p className="text-sm text-red-500">{errors.year}</p>
            )}
          </div>

          {/* CGPA */}
          <div className="space-y-2">
            <Label htmlFor="cgpa">CGPA *</Label>
            <Input
              id="cgpa"
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="Enter CGPA (0-10)"
              value={formData.cgpa}
              onChange={(e) =>
                setFormData({ ...formData, cgpa: e.target.value })
              }
            />
            {errors.cgpa && (
              <p className="text-sm text-red-500">{errors.cgpa}</p>
            )}
          </div>

          {/* Marksheet Upload */}
          <div className="space-y-2">
            <Label htmlFor="marksheet">Marksheet Upload (PDF or Image) *</Label>
            <input
              id="marksheet"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90"
            />
            {isUploadingMarksheet && (
              <p className="text-sm text-muted-foreground">Uploading...</p>
            )}
            {formData.markSheetUrl && !isUploadingMarksheet && (
              <p className="text-sm text-green-600">
                Marksheet uploaded successfully
              </p>
            )}
            {uploadError && (
              <p className="text-sm text-red-500">{uploadError}</p>
            )}
            {errors.marksheet && (
              <p className="text-sm text-red-500">{errors.marksheet}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUploadingMarksheet}>
            Submit Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
