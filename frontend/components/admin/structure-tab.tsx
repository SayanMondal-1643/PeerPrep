"use client";

import { useEffect, useState } from "react";
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
import { type HierarchyOption } from "@/lib/mock-data";
import {
  fetchBranches,
  fetchExams,
  fetchSubjects,
  fetchTopics,
} from "@/lib/hierarchy-api";

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

  const [exams, setExams] = useState<HierarchyOption[]>([]);
  const [isLoadingExams, setIsLoadingExams] = useState(false);
  const [branchesByExamId, setBranchesByExamId] = useState<
    Record<string, HierarchyOption[]>
  >({});
  const [subjectsByBranchId, setSubjectsByBranchId] = useState<
    Record<string, HierarchyOption[]>
  >({});
  const [topicsBySubjectId, setTopicsBySubjectId] = useState<
    Record<string, HierarchyOption[]>
  >({});
  const [loadingBranchIds, setLoadingBranchIds] = useState<Set<string>>(
    new Set(),
  );
  const [loadingSubjectIds, setLoadingSubjectIds] = useState<Set<string>>(
    new Set(),
  );
  const [loadingTopicIds, setLoadingTopicIds] = useState<Set<string>>(
    new Set(),
  );
  const [expandedExams, setExpandedExams] = useState<Set<string>>(new Set());
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(
    new Set(),
  );
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(
    new Set(),
  );

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

  const loadExams = async () => {
    setIsLoadingExams(true);

    try {
      const exams = await fetchExams();
      setExams(exams);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
      toast({ title: "Error", description: "Unable to load exams right now." });
    } finally {
      setIsLoadingExams(false);
    }
  };

  useEffect(() => {
    void loadExams();
  }, []);

  const toggleExamExpand = async (examId: string) => {
    const nextExpandedExams = new Set(expandedExams);

    if (nextExpandedExams.has(examId)) {
      nextExpandedExams.delete(examId);
      setExpandedExams(nextExpandedExams);
      return;
    }

    nextExpandedExams.add(examId);
    setExpandedExams(nextExpandedExams);

    if (
      branchesByExamId[examId] === undefined &&
      !loadingBranchIds.has(examId)
    ) {
      setLoadingBranchIds((prev) => {
        const next = new Set(prev);
        next.add(examId);
        return next;
      });

      try {
        const branches = await fetchBranches(examId);

        setBranchesByExamId((prev) => ({ ...prev, [examId]: branches }));
      } catch (error) {
        console.error("Failed to fetch branches:", error);
        toast({
          title: "Error",
          description: "Unable to load branches right now.",
        });
      } finally {
        setLoadingBranchIds((prev) => {
          const next = new Set(prev);
          next.delete(examId);
          return next;
        });
      }
    }
  };

  const toggleBranchExpand = async (branchId: string) => {
    const nextExpandedBranches = new Set(expandedBranches);

    if (nextExpandedBranches.has(branchId)) {
      nextExpandedBranches.delete(branchId);
      setExpandedBranches(nextExpandedBranches);
      return;
    }

    nextExpandedBranches.add(branchId);
    setExpandedBranches(nextExpandedBranches);

    if (
      subjectsByBranchId[branchId] === undefined &&
      !loadingSubjectIds.has(branchId)
    ) {
      setLoadingSubjectIds((prev) => {
        const next = new Set(prev);
        next.add(branchId);
        return next;
      });

      try {
        const data = await fetchSubjects(branchId);

        setSubjectsByBranchId((prev) => ({ ...prev, [branchId]: data }));
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        toast({
          title: "Error",
          description: "Unable to load subjects right now.",
        });
      } finally {
        setLoadingSubjectIds((prev) => {
          const next = new Set(prev);
          next.delete(branchId);
          return next;
        });
      }
    }
  };

  const toggleSubjectExpand = async (subjectId: string) => {
    const nextExpandedSubjects = new Set(expandedSubjects);

    if (nextExpandedSubjects.has(subjectId)) {
      nextExpandedSubjects.delete(subjectId);
      setExpandedSubjects(nextExpandedSubjects);
      return;
    }

    nextExpandedSubjects.add(subjectId);
    setExpandedSubjects(nextExpandedSubjects);

    if (
      topicsBySubjectId[subjectId] === undefined &&
      !loadingTopicIds.has(subjectId)
    ) {
      setLoadingTopicIds((prev) => {
        const next = new Set(prev);
        next.add(subjectId);
        return next;
      });

      try {
        const data = await fetchTopics(subjectId);

        setTopicsBySubjectId((prev) => ({ ...prev, [subjectId]: data }));
      } catch (error) {
        console.error("Failed to fetch topics:", error);
        toast({
          title: "Error",
          description: "Unable to load topics right now.",
        });
      } finally {
        setLoadingTopicIds((prev) => {
          const next = new Set(prev);
          next.delete(subjectId);
          return next;
        });
      }
    }
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

    if (nameModal.type === "addExam") {
      try {
        // UNCOMMENT TO POST TO API
        // const response = await fetch(`${API_BASE_URL}/api/v1/exams`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name: trimmedName }),
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to add exam");

        const json = {
          status: "success",
          data: { _id: `exam-${Date.now()}`, name: trimmedName },
        };
        setExams((prev) => [...prev, json.data]);
        toast({ title: "Success", description: "Exam added successfully" });
      } catch (error) {
        console.error("Failed to add exam:", error);
        toast({
          title: "Error",
          description: "Unable to add the exam right now.",
        });
      }
    } else if (nameModal.type === "addBranch" && nameModal.examId) {
      try {
        // UNCOMMENT TO POST TO API
        // const response = await fetch(
        //   `${API_BASE_URL}/api/v1/exams/${nameModal.examId}/branches`,
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ name: trimmedName }),
        //   },
        // );
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to add branch");

        const json = {
          status: "success",
          data: { _id: `branch-${Date.now()}`, name: trimmedName },
        };
        setBranchesByExamId((prev) => ({
          ...prev,
          [nameModal.examId as string]: [
            ...(prev[nameModal.examId as string] || []),
            json.data,
          ],
        }));
        toast({ title: "Success", description: "Branch added successfully" });
      } catch (error) {
        console.error("Failed to add branch:", error);
        toast({
          title: "Error",
          description: "Unable to add the branch right now.",
        });
      }
    } else if (
      nameModal.type === "addSubject" &&
      nameModal.examId &&
      nameModal.branchId
    ) {
      try {
        // UNCOMMENT TO POST TO API
        // const response = await fetch(
        //   `${API_BASE_URL}/api/v1/branches/${nameModal.branchId}/subjects`,
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ name: trimmedName }),
        //   },
        // );
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to add subject");

        const json = {
          status: "success",
          data: { _id: `subject-${Date.now()}`, name: trimmedName },
        };
        setSubjectsByBranchId((prev) => ({
          ...prev,
          [nameModal.branchId as string]: [
            ...(prev[nameModal.branchId as string] || []),
            json.data,
          ],
        }));
        toast({ title: "Success", description: "Subject added successfully" });
      } catch (error) {
        console.error("Failed to add subject:", error);
        toast({
          title: "Error",
          description: "Unable to add the subject right now.",
        });
      }
    } else if (
      nameModal.type === "addTopic" &&
      nameModal.examId &&
      nameModal.branchId &&
      nameModal.subjectId
    ) {
      try {
        // UNCOMMENT TO POST TO API
        // const response = await fetch(
        //   `${API_BASE_URL}/api/v1/subjects/${nameModal.subjectId}/topics`,
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ name: trimmedName }),
        //   },
        // );
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to add topic");

        const json = {
          status: "success",
          data: { _id: `topic-${Date.now()}`, name: trimmedName },
        };
        setTopicsBySubjectId((prev) => ({
          ...prev,
          [nameModal.subjectId as string]: [
            ...(prev[nameModal.subjectId as string] || []),
            json.data,
          ],
        }));
        toast({ title: "Success", description: "Topic added successfully" });
      } catch (error) {
        console.error("Failed to add topic:", error);
        toast({
          title: "Error",
          description: "Unable to add the topic right now.",
        });
      }
    } else if (nameModal.type === "editExam" && nameModal.examId) {
      const previousName = nameModal.currentName || "";
      const updatedExamId = nameModal.examId;

      setExams((prev) =>
        prev.map((exam) =>
          exam._id === updatedExamId ? { ...exam, name: trimmedName } : exam,
        ),
      );

      try {
        // UNCOMMENT TO PATCH THE API
        // const response = await fetch(`${API_BASE_URL}/api/v1/exams/${updatedExamId}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name: trimmedName }),
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to update exam");

        const json = {
          status: "success",
          data: { _id: updatedExamId, name: trimmedName },
        };
        if (!json.data) {
          throw new Error("Failed to update exam");
        }
        toast({ title: "Success", description: "Exam edited successfully" });
      } catch (error) {
        console.error("Failed to update exam:", error);
        setExams((prev) =>
          prev.map((exam) =>
            exam._id === updatedExamId ? { ...exam, name: previousName } : exam,
          ),
        );
        toast({
          title: "Error",
          description: "Unable to update the exam right now.",
        });
      }
    } else if (
      nameModal.type === "editBranch" &&
      nameModal.examId &&
      nameModal.branchId
    ) {
      const previousName = nameModal.currentName || "";
      const updatedExamId = nameModal.examId;
      const updatedBranchId = nameModal.branchId;

      setBranchesByExamId((prev) => ({
        ...prev,
        [updatedExamId]: (prev[updatedExamId] || []).map((branch) =>
          branch._id === updatedBranchId
            ? { ...branch, name: trimmedName }
            : branch,
        ),
      }));

      try {
        // UNCOMMENT TO PATCH THE API
        // const response = await fetch(`${API_BASE_URL}/api/v1/branches/${updatedBranchId}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name: trimmedName }),
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to update branch");

        const json = {
          status: "success",
          data: { _id: updatedBranchId, name: trimmedName },
        };
        if (!json.data) {
          throw new Error("Failed to update branch");
        }
        toast({ title: "Success", description: "Branch edited successfully" });
      } catch (error) {
        console.error("Failed to update branch:", error);
        setBranchesByExamId((prev) => ({
          ...prev,
          [updatedExamId]: (prev[updatedExamId] || []).map((branch) =>
            branch._id === updatedBranchId
              ? { ...branch, name: previousName }
              : branch,
          ),
        }));
        toast({
          title: "Error",
          description: "Unable to update the branch right now.",
        });
      }
    } else if (
      nameModal.type === "editSubject" &&
      nameModal.examId &&
      nameModal.branchId &&
      nameModal.subjectId
    ) {
      const previousName = nameModal.currentName || "";
      const updatedBranchId = nameModal.branchId;
      const updatedSubjectId = nameModal.subjectId;

      setSubjectsByBranchId((prev) => ({
        ...prev,
        [updatedBranchId]: (prev[updatedBranchId] || []).map((subject) =>
          subject._id === updatedSubjectId
            ? { ...subject, name: trimmedName }
            : subject,
        ),
      }));

      try {
        // UNCOMMENT TO PATCH THE API
        // const response = await fetch(`${API_BASE_URL}/api/v1/subjects/${updatedSubjectId}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name: trimmedName }),
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to update subject");

        const json = {
          status: "success",
          data: { _id: updatedSubjectId, name: trimmedName },
        };
        if (!json.data) {
          throw new Error("Failed to update subject");
        }
        toast({
          title: "Success",
          description: "Subject edited successfully",
        });
      } catch (error) {
        console.error("Failed to update subject:", error);
        setSubjectsByBranchId((prev) => ({
          ...prev,
          [updatedBranchId]: (prev[updatedBranchId] || []).map((subject) =>
            subject._id === updatedSubjectId
              ? { ...subject, name: previousName }
              : subject,
          ),
        }));
        toast({
          title: "Error",
          description: "Unable to update the subject right now.",
        });
      }
    } else if (
      nameModal.type === "editTopic" &&
      nameModal.examId &&
      nameModal.branchId &&
      nameModal.subjectId &&
      nameModal.topicId
    ) {
      const previousName = nameModal.currentName || "";
      const updatedSubjectId = nameModal.subjectId;
      const updatedTopicId = nameModal.topicId;

      setTopicsBySubjectId((prev) => ({
        ...prev,
        [updatedSubjectId]: (prev[updatedSubjectId] || []).map((topic) =>
          topic._id === updatedTopicId
            ? { ...topic, name: trimmedName }
            : topic,
        ),
      }));

      try {
        // UNCOMMENT TO PATCH THE API
        // const response = await fetch(`${API_BASE_URL}/api/v1/topics/${updatedTopicId}`, {
        //   method: "PATCH",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name: trimmedName }),
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to update topic");

        const json = {
          status: "success",
          data: { _id: updatedTopicId, name: trimmedName },
        };
        if (!json.data) {
          throw new Error("Failed to update topic");
        }
        toast({ title: "Success", description: "Topic edited successfully" });
      } catch (error) {
        console.error("Failed to update topic:", error);
        setTopicsBySubjectId((prev) => ({
          ...prev,
          [updatedSubjectId]: (prev[updatedSubjectId] || []).map((topic) =>
            topic._id === updatedTopicId
              ? { ...topic, name: previousName }
              : topic,
          ),
        }));
        toast({
          title: "Error",
          description: "Unable to update the topic right now.",
        });
      }
    }

    setNameModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.type === "exam" && deleteModal.examId) {
      const previousExams = exams;
      const previousBranches = branchesByExamId[deleteModal.examId] || [];
      const previousExpandedExams = new Set(expandedExams);

      setExams((prev) =>
        prev.filter((exam) => exam._id !== deleteModal.examId),
      );
      setBranchesByExamId((prev) => {
        const next = { ...prev };
        delete next[deleteModal.examId as string];
        return next;
      });
      setExpandedExams((prev) => {
        const next = new Set(prev);
        next.delete(deleteModal.examId as string);
        return next;
      });

      try {
        // UNCOMMENT TO DELETE FROM API
        // const response = await fetch(`${API_BASE_URL}/api/v1/exams/${deleteModal.examId}`, {
        //   method: "DELETE",
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to delete exam");

        const json = { status: "success", data: null };
        if (json.status !== "success") {
          throw new Error("Failed to delete exam");
        }
        toast({ title: "Success", description: "Exam deleted successfully" });
      } catch (error) {
        console.error("Failed to delete exam:", error);
        setExams(previousExams);
        setBranchesByExamId((prev) => ({
          ...prev,
          [deleteModal.examId as string]: previousBranches,
        }));
        setExpandedExams(previousExpandedExams);
        toast({
          title: "Error",
          description: "Unable to delete the exam right now.",
        });
      }
    } else if (
      deleteModal.type === "branch" &&
      deleteModal.examId &&
      deleteModal.branchId
    ) {
      const previousBranches = branchesByExamId[deleteModal.examId] || [];
      const previousExpandedBranches = new Set(expandedBranches);
      const previousSubjects = subjectsByBranchId[deleteModal.branchId] || [];

      setBranchesByExamId((prev) => ({
        ...prev,
        [deleteModal.examId as string]: (
          prev[deleteModal.examId as string] || []
        ).filter((branch) => branch._id !== deleteModal.branchId),
      }));
      setSubjectsByBranchId((prev) => {
        const next = { ...prev };
        delete next[deleteModal.branchId as string];
        return next;
      });
      setExpandedBranches((prev) => {
        const next = new Set(prev);
        next.delete(deleteModal.branchId as string);
        return next;
      });

      try {
        // UNCOMMENT TO DELETE FROM API
        // const response = await fetch(`${API_BASE_URL}/api/v1/branches/${deleteModal.branchId}`, {
        //   method: "DELETE",
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to delete branch");

        // MOCK DATA - TO BE REMOVED
        const json = { status: "success", data: null };

        if (json.status !== "success") {
          throw new Error("Failed to delete branch");
        }
        toast({ title: "Success", description: "Branch deleted successfully" });
      } catch (error) {
        console.error("Failed to delete branch:", error);
        setBranchesByExamId((prev) => ({
          ...prev,
          [deleteModal.examId as string]: previousBranches,
        }));
        setSubjectsByBranchId((prev) => ({
          ...prev,
          [deleteModal.branchId as string]: previousSubjects,
        }));
        setExpandedBranches(previousExpandedBranches);
        toast({
          title: "Error",
          description: "Unable to delete the branch right now.",
        });
      }
    } else if (
      deleteModal.type === "subject" &&
      deleteModal.examId &&
      deleteModal.branchId &&
      deleteModal.subjectId
    ) {
      const previousSubjects = subjectsByBranchId[deleteModal.branchId] || [];
      const previousExpandedSubjects = new Set(expandedSubjects);
      const previousTopics = topicsBySubjectId[deleteModal.subjectId] || [];

      setSubjectsByBranchId((prev) => ({
        ...prev,
        [deleteModal.branchId as string]: (
          prev[deleteModal.branchId as string] || []
        ).filter((subject) => subject._id !== deleteModal.subjectId),
      }));
      setTopicsBySubjectId((prev) => {
        const next = { ...prev };
        delete next[deleteModal.subjectId as string];
        return next;
      });
      setExpandedSubjects((prev) => {
        const next = new Set(prev);
        next.delete(deleteModal.subjectId as string);
        return next;
      });

      try {
        // UNCOMMENT TO DELETE FROM API
        // const response = await fetch(`${API_BASE_URL}/api/v1/subjects/${deleteModal.subjectId}`, {
        //   method: "DELETE",
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to delete subject");

        const json = { status: "success", data: null };
        if (json.status !== "success") {
          throw new Error("Failed to delete subject");
        }
        toast({
          title: "Success",
          description: "Subject deleted successfully",
        });
      } catch (error) {
        console.error("Failed to delete subject:", error);
        setSubjectsByBranchId((prev) => ({
          ...prev,
          [deleteModal.branchId as string]: previousSubjects,
        }));
        setTopicsBySubjectId((prev) => ({
          ...prev,
          [deleteModal.subjectId as string]: previousTopics,
        }));
        setExpandedSubjects(previousExpandedSubjects);
        toast({
          title: "Error",
          description: "Unable to delete the subject right now.",
        });
      }
    } else if (
      deleteModal.type === "topic" &&
      deleteModal.examId &&
      deleteModal.branchId &&
      deleteModal.subjectId &&
      deleteModal.topicId
    ) {
      const previousTopics = topicsBySubjectId[deleteModal.subjectId] || [];

      setTopicsBySubjectId((prev) => ({
        ...prev,
        [deleteModal.subjectId as string]: (
          prev[deleteModal.subjectId as string] || []
        ).filter((topic) => topic._id !== deleteModal.topicId),
      }));

      try {
        // UNCOMMENT TO DELETE FROM API
        // const response = await fetch(`${API_BASE_URL}/api/v1/topics/${deleteModal.topicId}`, {
        //   method: "DELETE",
        // });
        // const json = await response.json();
        // if (!response.ok) throw new Error(json?.message || "Failed to delete topic");

        const json = { status: "success", data: null };
        if (json.status !== "success") {
          throw new Error("Failed to delete topic");
        }
        toast({ title: "Success", description: "Topic deleted successfully" });
      } catch (error) {
        console.error("Failed to delete topic:", error);
        setTopicsBySubjectId((prev) => ({
          ...prev,
          [deleteModal.subjectId as string]: previousTopics,
        }));
        toast({
          title: "Error",
          description: "Unable to delete the topic right now.",
        });
      }
    }

    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <Card>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">Platform Structure</h2>
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
            exams.map((exam) => (
              <div
                key={exam._id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <div
                  className="bg-background hover:bg-muted/50 transition-colors p-4 flex items-center justify-between group cursor-pointer"
                  onClick={() => toggleExamExpand(exam._id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {expandedExams.has(exam._id) ? (
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
                    className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAddBranch(exam._id, exam.name)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add Branch</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditExam(exam)}
                          >
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
                            onClick={() =>
                              handleDeleteExam(exam._id, exam.name)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Exam</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {expandedExams.has(exam._id) && (
                  <div className="border-t border-border bg-muted/30">
                    {loadingBranchIds.has(exam._id) ? (
                      <div className="border-b border-border last:border-b-0">
                        <div className="bg-background p-4 ml-6 flex items-center justify-between cursor-not-allowed opacity-70">
                          <span className="text-sm text-muted-foreground">
                            Loading...
                          </span>
                        </div>
                      </div>
                    ) : (
                      (branchesByExamId[exam._id] || []).map((branch) => (
                        <div
                          key={branch._id}
                          className="border-b border-border last:border-b-0"
                        >
                          <div
                            className="bg-background hover:bg-muted/50 transition-colors p-4 ml-6 flex items-center justify-between group cursor-pointer"
                            onClick={() => toggleBranchExpand(branch._id)}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                {expandedBranches.has(branch._id) ? (
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
                              className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        handleAddSubject(
                                          exam._id,
                                          branch._id,
                                          branch.name,
                                          exam.name,
                                        )
                                      }
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
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        handleEditBranch(branch, exam._id)
                                      }
                                    >
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
                                      onClick={() =>
                                        handleDeleteBranch(
                                          exam._id,
                                          branch._id,
                                          branch.name,
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete Branch</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>

                          {expandedBranches.has(branch._id) && (
                            <div className="bg-muted/20">
                              {loadingSubjectIds.has(branch._id) ? (
                                <div className="border-b border-border last:border-b-0">
                                  <div className="bg-background p-4 ml-12 flex items-center justify-between cursor-not-allowed opacity-70">
                                    <span className="text-sm text-muted-foreground">
                                      Loading...
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                (subjectsByBranchId[branch._id] || []).map(
                                  (subject) => (
                                    <div
                                      key={subject._id}
                                      className="border-b border-border last:border-b-0"
                                    >
                                      <div
                                        className="bg-background hover:bg-muted/50 transition-colors p-4 ml-12 flex items-center justify-between group cursor-pointer"
                                        onClick={() =>
                                          toggleSubjectExpand(subject._id)
                                        }
                                      >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                          <div className="flex-shrink-0">
                                            {expandedSubjects.has(
                                              subject._id,
                                            ) ? (
                                              <ChevronDown className="h-5 w-5" />
                                            ) : (
                                              <ChevronRight className="h-5 w-5" />
                                            )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h5 className="font-semibold">
                                              {subject.name}
                                            </h5>
                                          </div>
                                        </div>

                                        <div
                                          className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={(event) =>
                                            event.stopPropagation()
                                          }
                                        >
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  onClick={() =>
                                                    handleAddTopic(
                                                      exam._id,
                                                      branch._id,
                                                      subject._id,
                                                      exam.name,
                                                      branch.name,
                                                      subject.name,
                                                    )
                                                  }
                                                >
                                                  <Plus className="h-4 w-4" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                Add Topic
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>

                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  onClick={() =>
                                                    handleEditSubject(
                                                      subject,
                                                      exam._id,
                                                      branch._id,
                                                    )
                                                  }
                                                >
                                                  <Edit className="h-4 w-4" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                Edit Subject
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>

                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="sm"
                                                  variant="ghost"
                                                  onClick={() =>
                                                    handleDeleteSubject(
                                                      exam._id,
                                                      branch._id,
                                                      subject._id,
                                                      subject.name,
                                                    )
                                                  }
                                                >
                                                  <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                Delete Subject
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      </div>

                                      {expandedSubjects.has(subject._id) && (
                                        <div className="bg-muted/10">
                                          {loadingTopicIds.has(subject._id) ? (
                                            <div className="border-b border-border last:border-b-0">
                                              <div className="bg-background p-4 ml-18 flex items-center justify-between cursor-not-allowed opacity-70">
                                                <span className="text-sm text-muted-foreground">
                                                  Loading...
                                                </span>
                                              </div>
                                            </div>
                                          ) : (
                                            (
                                              topicsBySubjectId[subject._id] ||
                                              []
                                            ).map((topic) => (
                                              <div
                                                key={topic._id}
                                                className="border-b border-border last:border-b-0"
                                              >
                                                <div className="bg-background hover:bg-muted/50 transition-colors p-4 ml-18 flex items-center justify-between group">
                                                  <div className="flex-1 min-w-0">
                                                    <h6 className="font-medium">
                                                      {topic.name}
                                                    </h6>
                                                  </div>

                                                  <div
                                                    className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(event) =>
                                                      event.stopPropagation()
                                                    }
                                                  >
                                                    <TooltipProvider>
                                                      <Tooltip>
                                                        <TooltipTrigger asChild>
                                                          <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() =>
                                                              handleEditTopic(
                                                                topic,
                                                                exam._id,
                                                                branch._id,
                                                                subject._id,
                                                              )
                                                            }
                                                          >
                                                            <Edit className="h-4 w-4" />
                                                          </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                          Edit Topic
                                                        </TooltipContent>
                                                      </Tooltip>
                                                    </TooltipProvider>

                                                    <TooltipProvider>
                                                      <Tooltip>
                                                        <TooltipTrigger asChild>
                                                          <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() =>
                                                              handleDeleteTopic(
                                                                exam._id,
                                                                branch._id,
                                                                subject._id,
                                                                topic._id,
                                                                topic.name,
                                                              )
                                                            }
                                                          >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                          </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                          Delete Topic
                                                        </TooltipContent>
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
                                  ),
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
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
