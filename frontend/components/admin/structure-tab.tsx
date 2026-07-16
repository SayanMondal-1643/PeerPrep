"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/lib/hooks/use-toast";
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal";
import { HierarchyNameModal } from "@/components/hierarchy-name-modal";
import { type HierarchyOption } from "@/lib/hierarchy-types";
import { useExams, useCreateExam, useUpdateExam, useDeleteExam } from "@/lib/hooks/use-exams";
import {
  useBranches,
  useCreateBranch,
  useUpdateBranch,
  useDeleteBranch,
} from "@/lib/hooks/use-branches";
import {
  useSubjects,
  useCreateSubject,
  useUpdateSubject,
  useDeleteSubject,
} from "@/lib/hooks/use-subjects";
import {
  useTopics,
  useCreateTopic,
  useUpdateTopic,
  useDeleteTopic,
} from "@/lib/hooks/use-topics";

type NameModalType =
  | "addExam"
  | "addBranch"
  | "addSubject"
  | "addTopic"
  | "editExam"
  | "editBranch"
  | "editSubject"
  | "editTopic"
  | null;

type DeleteModalType = "exam" | "branch" | "subject" | "topic" | null;

interface NameModalState {
  isOpen: boolean;
  type: NameModalType;
  title: string;
  description: string;
  placeholder: string;
  initialValue: string;
  examId?: string;
  branchId?: string;
  subjectId?: string;
  topicId?: string;
  currentName?: string;
}

interface DeleteModalState {
  isOpen: boolean;
  type: DeleteModalType;
  title: string;
  description: string;
  itemName: string;
  examId?: string;
  branchId?: string;
  subjectId?: string;
  topicId?: string;
}

export default function StructureTab() {
  const { toast } = useToast();

  const { data: exams, isLoading: isLoadingExams } = useExams();
  const createExam = useCreateExam();
  const updateExam = useUpdateExam();
  const deleteExam = useDeleteExam();

  const createBranch = useCreateBranch();
  const updateBranch = useUpdateBranch();
  const deleteBranch = useDeleteBranch();

  const createSubject = useCreateSubject();
  const updateSubject = useUpdateSubject();
  const deleteSubject = useDeleteSubject();

  const createTopic = useCreateTopic();
  const updateTopic = useUpdateTopic();
  const deleteTopic = useDeleteTopic();

  const [expandedExams, setExpandedExams] = useState<Set<string>>(new Set());
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());

  const [nameModal, setNameModal] = useState<NameModalState>({
    isOpen: false,
    type: null,
    title: "",
    description: "",
    placeholder: "",
    initialValue: "",
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    type: null,
    title: "",
    description: "",
    itemName: "",
  });

  const toggleExamExpand = (examId: string) => {
    setExpandedExams((prev) => {
      const next = new Set(prev);
      if (next.has(examId)) {
        next.delete(examId);
      } else {
        next.add(examId);
      }
      return next;
    });
  };

  const toggleBranchExpand = (branchId: string) => {
    setExpandedBranches((prev) => {
      const next = new Set(prev);
      if (next.has(branchId)) {
        next.delete(branchId);
      } else {
        next.add(branchId);
      }
      return next;
    });
  };

  const toggleSubjectExpand = (subjectId: string) => {
    setExpandedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(subjectId)) {
        next.delete(subjectId);
      } else {
        next.add(subjectId);
      }
      return next;
    });
  };

  const handleAddExam = () => {
    setNameModal({
      isOpen: true,
      type: "addExam",
      title: "Add Exam",
      description: "Enter the name of the new exam",
      placeholder: "Exam name (e.g., GATE, JEE, NEET)",
      initialValue: "",
    });
  };

  const handleAddBranch = (examId: string, examName: string) => {
    setNameModal({
      isOpen: true,
      type: "addBranch",
      title: "Add Branch",
      description: `Add a new branch to ${examName}`,
      placeholder: "Branch name (e.g., CSE, ECE, ME)",
      initialValue: "",
      examId,
    });
  };

  const handleAddSubject = (
    examId: string,
    branchId: string,
    branchName: string,
    examName: string,
  ) => {
    setNameModal({
      isOpen: true,
      type: "addSubject",
      title: "Add Subject",
      description: `Add a new subject to ${examName} > ${branchName}`,
      placeholder: "Subject name (e.g., Data Structures, Physics)",
      initialValue: "",
      examId,
      branchId,
    });
  };

  const handleAddTopic = (
    examId: string,
    branchId: string,
    subjectId: string,
    examName: string,
    branchName: string,
    subjectName: string,
  ) => {
    setNameModal({
      isOpen: true,
      type: "addTopic",
      title: "Add Topic",
      description: `Add a new topic to **${examName} > ${branchName} > ${subjectName}**`,
      placeholder: "Topic name (e.g., Arrays, Mechanics)",
      initialValue: "",
      examId,
      branchId,
      subjectId,
    });
  };

  const handleEditExam = (exam: HierarchyOption) => {
    setNameModal({
      isOpen: true,
      type: "editExam",
      title: "Edit Exam",
      description: "Update the exam name",
      placeholder: "Exam name",
      initialValue: exam.name,
      examId: exam._id,
      currentName: exam.name,
    });
  };

  const handleEditBranch = (branch: HierarchyOption, examId: string) => {
    setNameModal({
      isOpen: true,
      type: "editBranch",
      title: "Edit Branch",
      description: "Update the branch name",
      placeholder: "Branch name",
      initialValue: branch.name,
      examId,
      branchId: branch._id,
      currentName: branch.name,
    });
  };

  const handleEditSubject = (
    subject: HierarchyOption,
    examId: string,
    branchId: string,
  ) => {
    setNameModal({
      isOpen: true,
      type: "editSubject",
      title: "Edit Subject",
      description: "Update the subject name",
      placeholder: "Subject name",
      initialValue: subject.name,
      examId,
      branchId,
      subjectId: subject._id,
      currentName: subject.name,
    });
  };

  const handleEditTopic = (
    topic: HierarchyOption,
    examId: string,
    branchId: string,
    subjectId: string,
  ) => {
    setNameModal({
      isOpen: true,
      type: "editTopic",
      title: "Edit Topic",
      description: "Update the topic name",
      placeholder: "Topic name",
      initialValue: topic.name,
      examId,
      branchId,
      subjectId,
      topicId: topic._id,
      currentName: topic.name,
    });
  };

  const handleDeleteExam = (examId: string, examName: string) => {
    setDeleteModal({
      isOpen: true,
      type: "exam",
      title: "Delete Exam",
      description: `Are you sure you want to delete "${examName}"? This action cannot be undone. Deleting this exam will also delete all its branches, subjects, topics, and materials.`,
      itemName: "Exam",
      examId,
    });
  };

  const handleDeleteBranch = (
    examId: string,
    branchId: string,
    branchName: string,
  ) => {
    setDeleteModal({
      isOpen: true,
      type: "branch",
      title: "Delete Branch",
      description: `Are you sure you want to delete "${branchName}"? This action cannot be undone. Deleting this branch will also delete its subjects, topics, and materials.`,
      itemName: "Branch",
      examId,
      branchId,
    });
  };

  const handleDeleteSubject = (
    examId: string,
    branchId: string,
    subjectId: string,
    subjectName: string,
  ) => {
    setDeleteModal({
      isOpen: true,
      type: "subject",
      title: "Delete Subject",
      description: `Are you sure you want to delete "${subjectName}"? This action cannot be undone. Deleting this subject will also delete its topics and materials.`,
      itemName: "Subject",
      examId,
      branchId,
      subjectId,
    });
  };

  const handleDeleteTopic = (
    examId: string,
    branchId: string,
    subjectId: string,
    topicId: string,
    topicName: string,
  ) => {
    setDeleteModal({
      isOpen: true,
      type: "topic",
      title: "Delete Topic",
      description: `Are you sure you want to delete "${topicName}"? This action cannot be undone. Deleting this topic will also delete its materials.`,
      itemName: "Topic",
      examId,
      branchId,
      subjectId,
      topicId,
    });
  };

  const handleNameModalSubmit = async (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    try {
      if (nameModal.type === "addExam") {
        await createExam.mutateAsync(trimmedName);
        toast({ title: "Success", description: "Exam added successfully" });
      } else if (nameModal.type === "addBranch" && nameModal.examId) {
        await createBranch.mutateAsync({ examId: nameModal.examId, name: trimmedName });
        toast({ title: "Success", description: "Branch added successfully" });
      } else if (
        nameModal.type === "addSubject" &&
        nameModal.examId &&
        nameModal.branchId
      ) {
        await createSubject.mutateAsync({ branchId: nameModal.branchId, name: trimmedName });
        toast({ title: "Success", description: "Subject added successfully" });
      } else if (
        nameModal.type === "addTopic" &&
        nameModal.examId &&
        nameModal.branchId &&
        nameModal.subjectId
      ) {
        await createTopic.mutateAsync({ subjectId: nameModal.subjectId, name: trimmedName });
        toast({ title: "Success", description: "Topic added successfully" });
      } else if (nameModal.type === "editExam" && nameModal.examId) {
        await updateExam.mutateAsync({ examId: nameModal.examId, name: trimmedName });
        toast({ title: "Success", description: "Exam edited successfully" });
      } else if (
        nameModal.type === "editBranch" &&
        nameModal.examId &&
        nameModal.branchId
      ) {
        await updateBranch.mutateAsync({
          branchId: nameModal.branchId,
          name: trimmedName,
          examId: nameModal.examId,
        });
        toast({ title: "Success", description: "Branch edited successfully" });
      } else if (
        nameModal.type === "editSubject" &&
        nameModal.examId &&
        nameModal.branchId &&
        nameModal.subjectId
      ) {
        await updateSubject.mutateAsync({
          subjectId: nameModal.subjectId,
          name: trimmedName,
          branchId: nameModal.branchId,
        });
        toast({ title: "Success", description: "Subject edited successfully" });
      } else if (
        nameModal.type === "editTopic" &&
        nameModal.examId &&
        nameModal.branchId &&
        nameModal.subjectId &&
        nameModal.topicId
      ) {
        await updateTopic.mutateAsync({
          topicId: nameModal.topicId,
          name: trimmedName,
          subjectId: nameModal.subjectId,
        });
        toast({ title: "Success", description: "Topic edited successfully" });
      }
    } catch {
      toast({
        title: "Error",
        description: "Unable to save changes right now.",
      });
    }

    setNameModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteModal.type === "exam" && deleteModal.examId) {
        await deleteExam.mutateAsync(deleteModal.examId);
        toast({ title: "Success", description: "Exam deleted successfully" });
      } else if (
        deleteModal.type === "branch" &&
        deleteModal.examId &&
        deleteModal.branchId
      ) {
        await deleteBranch.mutateAsync({
          branchId: deleteModal.branchId,
          examId: deleteModal.examId,
        });
        toast({ title: "Success", description: "Branch deleted successfully" });
      } else if (
        deleteModal.type === "subject" &&
        deleteModal.examId &&
        deleteModal.branchId &&
        deleteModal.subjectId
      ) {
        await deleteSubject.mutateAsync({
          subjectId: deleteModal.subjectId,
          branchId: deleteModal.branchId,
        });
        toast({ title: "Success", description: "Subject deleted successfully" });
      } else if (
        deleteModal.type === "topic" &&
        deleteModal.examId &&
        deleteModal.branchId &&
        deleteModal.subjectId &&
        deleteModal.topicId
      ) {
        await deleteTopic.mutateAsync({
          topicId: deleteModal.topicId,
          subjectId: deleteModal.subjectId,
        });
        toast({ title: "Success", description: "Topic deleted successfully" });
      }
    } catch {
      toast({
        title: "Error",
        description: "Unable to delete right now.",
      });
    }

    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <Card>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">Platform Structure Management</h2>
        <Button size="sm" onClick={handleAddExam}>
          <Plus className="mr-2 h-4 w-4" />
          Add Exam
        </Button>
      </div>
      <div className="p-6">
        <div className="space-y-2">
          {isLoadingExams ? (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-background p-4 flex items-center justify-between cursor-not-allowed opacity-70">
                <span className="text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            </div>
          ) : (
            (exams ?? []).map((exam) => (
              <ExamRow
                key={exam._id}
                exam={exam}
                isExpanded={expandedExams.has(exam._id)}
                onToggle={() => toggleExamExpand(exam._id)}
                onAddBranch={handleAddBranch}
                onEditExam={handleEditExam}
                onDeleteExam={handleDeleteExam}
                expandedBranches={expandedBranches}
                onToggleBranch={toggleBranchExpand}
                onAddSubject={handleAddSubject}
                onEditBranch={handleEditBranch}
                onDeleteBranch={handleDeleteBranch}
                expandedSubjects={expandedSubjects}
                onToggleSubject={toggleSubjectExpand}
                onAddTopic={handleAddTopic}
                onEditSubject={handleEditSubject}
                onDeleteSubject={handleDeleteSubject}
                onEditTopic={handleEditTopic}
                onDeleteTopic={handleDeleteTopic}
              />
            ))
          )}
        </div>
      </div>

      <HierarchyNameModal
        isOpen={nameModal.isOpen}
        onClose={() => setNameModal((prev) => ({ ...prev, isOpen: false }))}
        onSubmit={handleNameModalSubmit}
        title={nameModal.title}
        description={nameModal.description}
        placeholder={nameModal.placeholder}
        initialValue={nameModal.initialValue}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleDeleteConfirm}
        title={deleteModal.title}
        description={deleteModal.description}
        itemName={deleteModal.itemName}
      />
    </Card>
  );
}

interface ExamRowProps {
  exam: HierarchyOption;
  isExpanded: boolean;
  onToggle: () => void;
  onAddBranch: (examId: string, examName: string) => void;
  onEditExam: (exam: HierarchyOption) => void;
  onDeleteExam: (examId: string, examName: string) => void;
  expandedBranches: Set<string>;
  onToggleBranch: (branchId: string) => void;
  onAddSubject: (
    examId: string,
    branchId: string,
    branchName: string,
    examName: string,
  ) => void;
  onEditBranch: (branch: HierarchyOption, examId: string) => void;
  onDeleteBranch: (examId: string, branchId: string, branchName: string) => void;
  expandedSubjects: Set<string>;
  onToggleSubject: (subjectId: string) => void;
  onAddTopic: (
    examId: string,
    branchId: string,
    subjectId: string,
    examName: string,
    branchName: string,
    subjectName: string,
  ) => void;
  onEditSubject: (subject: HierarchyOption, examId: string, branchId: string) => void;
  onDeleteSubject: (
    examId: string,
    branchId: string,
    subjectId: string,
    subjectName: string,
  ) => void;
  onEditTopic: (
    topic: HierarchyOption,
    examId: string,
    branchId: string,
    subjectId: string,
  ) => void;
  onDeleteTopic: (
    examId: string,
    branchId: string,
    subjectId: string,
    topicId: string,
    topicName: string,
  ) => void;
}

function ExamRow({
  exam,
  isExpanded,
  onToggle,
  onAddBranch,
  onEditExam,
  onDeleteExam,
  expandedBranches,
  onToggleBranch,
  onAddSubject,
  onEditBranch,
  onDeleteBranch,
  expandedSubjects,
  onToggleSubject,
  onAddTopic,
  onEditSubject,
  onDeleteSubject,
  onEditTopic,
  onDeleteTopic,
}: ExamRowProps) {
  const { data: branchesResponse, isLoading } = useBranches(isExpanded ? exam._id : undefined);
  const branches = branchesResponse?.data;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div
        className="bg-background hover:bg-muted/50 transition-colors p-4 flex items-center justify-between group cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg">{exam.name}</h3>
          </div>
        </div>

        <div
          className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(event) => event.stopPropagation()}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => onAddBranch(exam._id, exam.name)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Branch</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => onEditExam(exam)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Exam</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteExam(exam._id, exam.name)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Exam</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border bg-muted/30">
          {isLoading ? (
            <div className="border-b border-border last:border-b-0">
              <div className="bg-background p-4 ml-6 flex items-center justify-between cursor-not-allowed opacity-70">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            </div>
          ) : (
            (branches ?? []).map((branch) => (
              <BranchRow
                key={branch._id}
                exam={exam}
                branch={branch}
                isExpanded={expandedBranches.has(branch._id)}
                onToggle={() => onToggleBranch(branch._id)}
                onAddSubject={onAddSubject}
                onEditBranch={onEditBranch}
                onDeleteBranch={onDeleteBranch}
                expandedSubjects={expandedSubjects}
                onToggleSubject={onToggleSubject}
                onAddTopic={onAddTopic}
                onEditSubject={onEditSubject}
                onDeleteSubject={onDeleteSubject}
                onEditTopic={onEditTopic}
                onDeleteTopic={onDeleteTopic}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

interface BranchRowProps {
  exam: HierarchyOption;
  branch: HierarchyOption;
  isExpanded: boolean;
  onToggle: () => void;
  onAddSubject: (
    examId: string,
    branchId: string,
    branchName: string,
    examName: string,
  ) => void;
  onEditBranch: (branch: HierarchyOption, examId: string) => void;
  onDeleteBranch: (examId: string, branchId: string, branchName: string) => void;
  expandedSubjects: Set<string>;
  onToggleSubject: (subjectId: string) => void;
  onAddTopic: (
    examId: string,
    branchId: string,
    subjectId: string,
    examName: string,
    branchName: string,
    subjectName: string,
  ) => void;
  onEditSubject: (subject: HierarchyOption, examId: string, branchId: string) => void;
  onDeleteSubject: (
    examId: string,
    branchId: string,
    subjectId: string,
    subjectName: string,
  ) => void;
  onEditTopic: (
    topic: HierarchyOption,
    examId: string,
    branchId: string,
    subjectId: string,
  ) => void;
  onDeleteTopic: (
    examId: string,
    branchId: string,
    subjectId: string,
    topicId: string,
    topicName: string,
  ) => void;
}

function BranchRow({
  exam,
  branch,
  isExpanded,
  onToggle,
  onAddSubject,
  onEditBranch,
  onDeleteBranch,
  expandedSubjects,
  onToggleSubject,
  onAddTopic,
  onEditSubject,
  onDeleteSubject,
  onEditTopic,
  onDeleteTopic,
}: BranchRowProps) {
  const { data: subjectsResponse, isLoading } = useSubjects(isExpanded ? branch._id : undefined);
  const subjects = subjectsResponse?.data;

  return (
    <div className="border-b border-border last:border-b-0">
      <div
        className="bg-background hover:bg-muted/50 transition-colors p-4 ml-6 flex items-center justify-between group cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold">{branch.name}</h4>
          </div>
        </div>

        <div
          className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(event) => event.stopPropagation()}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onAddSubject(exam._id, branch._id, branch.name, exam.name)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Subject</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => onEditBranch(branch, exam._id)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Branch</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteBranch(exam._id, branch._id, branch.name)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Branch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-muted/20">
          {isLoading ? (
            <div className="border-b border-border last:border-b-0">
              <div className="bg-background p-4 ml-12 flex items-center justify-between cursor-not-allowed opacity-70">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            </div>
          ) : (
            (subjects ?? []).map((subject) => (
              <SubjectRow
                key={subject._id}
                exam={exam}
                branch={branch}
                subject={subject}
                isExpanded={expandedSubjects.has(subject._id)}
                onToggle={() => onToggleSubject(subject._id)}
                onAddTopic={onAddTopic}
                onEditSubject={onEditSubject}
                onDeleteSubject={onDeleteSubject}
                onEditTopic={onEditTopic}
                onDeleteTopic={onDeleteTopic}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

interface SubjectRowProps {
  exam: HierarchyOption;
  branch: HierarchyOption;
  subject: HierarchyOption;
  isExpanded: boolean;
  onToggle: () => void;
  onAddTopic: (
    examId: string,
    branchId: string,
    subjectId: string,
    examName: string,
    branchName: string,
    subjectName: string,
  ) => void;
  onEditSubject: (subject: HierarchyOption, examId: string, branchId: string) => void;
  onDeleteSubject: (
    examId: string,
    branchId: string,
    subjectId: string,
    subjectName: string,
  ) => void;
  onEditTopic: (
    topic: HierarchyOption,
    examId: string,
    branchId: string,
    subjectId: string,
  ) => void;
  onDeleteTopic: (
    examId: string,
    branchId: string,
    subjectId: string,
    topicId: string,
    topicName: string,
  ) => void;
}

function SubjectRow({
  exam,
  branch,
  subject,
  isExpanded,
  onToggle,
  onAddTopic,
  onEditSubject,
  onDeleteSubject,
  onEditTopic,
  onDeleteTopic,
}: SubjectRowProps) {
  const { data: topicsResponse, isLoading } = useTopics(isExpanded ? subject._id : undefined);
  const topics = topicsResponse?.data;

  return (
    <div className="border-b border-border last:border-b-0">
      <div
        className="bg-background hover:bg-muted/50 transition-colors p-4 ml-12 flex items-center justify-between group cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold">{subject.name}</h5>
          </div>
        </div>

        <div
          className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(event) => event.stopPropagation()}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    onAddTopic(exam._id, branch._id, subject._id, exam.name, branch.name, subject.name)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Topic</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEditSubject(subject, exam._id, branch._id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Subject</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteSubject(exam._id, branch._id, subject._id, subject.name)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Subject</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-muted/10">
          {isLoading ? (
            <div className="border-b border-border last:border-b-0">
              <div className="bg-background p-4 ml-18 flex items-center justify-between cursor-not-allowed opacity-70">
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            </div>
          ) : (
            (topics ?? []).map((topic) => (
              <div key={topic._id} className="border-b border-border last:border-b-0">
                <div className="bg-background hover:bg-muted/50 transition-colors p-4 ml-18 flex items-center justify-between group">
                  <div className="flex-1 min-w-0">
                    <h6 className="font-medium">{topic.name}</h6>
                  </div>

                  <div
                    className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEditTopic(topic, exam._id, branch._id, subject._id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Topic</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              onDeleteTopic(exam._id, branch._id, subject._id, topic._id, topic.name)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Topic</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
