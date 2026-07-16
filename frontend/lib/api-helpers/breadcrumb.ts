import Exam from "@/lib/models/Exam";
import Branch from "@/lib/models/Branch";
import Subject from "@/lib/models/Subject";
import Topic from "@/lib/models/Topic";

interface BreadcrumbInput {
  examId?: string;
  branchId?: string;
  subjectId?: string;
  topicId?: string;
}

interface BreadcrumbNames {
  exam?: string;
  branch?: string;
  subject?: string;
  topic?: string;
}

/**
 * Resolves the minimal parent-chain of names needed for breadcrumb display,
 * per docs/api-routes.md's nested-list convention.
 */
export async function resolveBreadcrumb(input: BreadcrumbInput): Promise<BreadcrumbNames> {
  const names: BreadcrumbNames = {};

  if (input.topicId) {
    const topic = await Topic.findById(input.topicId).select("name subjectId").lean();
    if (topic) {
      names.topic = topic.name;
      input.subjectId = input.subjectId ?? String(topic.subjectId);
    }
  }

  if (input.subjectId) {
    const subject = await Subject.findById(input.subjectId).select("name branchId").lean();
    if (subject) {
      names.subject = subject.name;
      input.branchId = input.branchId ?? String(subject.branchId);
    }
  }

  if (input.branchId) {
    const branch = await Branch.findById(input.branchId).select("name examId").lean();
    if (branch) {
      names.branch = branch.name;
      input.examId = input.examId ?? String(branch.examId);
    }
  }

  if (input.examId) {
    const exam = await Exam.findById(input.examId).select("name").lean();
    if (exam) {
      names.exam = exam.name;
    }
  }

  return names;
}
