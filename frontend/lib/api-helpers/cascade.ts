import { Types } from "mongoose";
import Branch from "@/lib/models/Branch";
import Subject from "@/lib/models/Subject";
import Topic from "@/lib/models/Topic";
import Material from "@/lib/models/Material";
import Rating from "@/lib/models/Rating";
import Comment from "@/lib/models/Comment";
import Report from "@/lib/models/Report";

export async function deleteMaterialsForTopics(topicIds: Types.ObjectId[]) {
  if (topicIds.length === 0) return;

  const materials = await Material.find({ topicId: { $in: topicIds } }).select("_id");
  const materialIds = materials.map((m) => m._id);

  if (materialIds.length > 0) {
    await Promise.all([
      Rating.deleteMany({ materialId: { $in: materialIds } }),
      Comment.deleteMany({ materialId: { $in: materialIds } }),
      Report.deleteMany({ materialId: { $in: materialIds } }),
    ]);
  }

  await Material.deleteMany({ topicId: { $in: topicIds } });
}

export async function deleteTopicCascade(topicId: string) {
  await deleteMaterialsForTopics([new Types.ObjectId(topicId)]);
  await Topic.findByIdAndDelete(topicId);
}

export async function deleteSubjectCascade(subjectId: string) {
  const topics = await Topic.find({ subjectId }).select("_id");
  const topicIds = topics.map((t) => t._id as Types.ObjectId);

  await deleteMaterialsForTopics(topicIds);
  await Topic.deleteMany({ subjectId });
  await Subject.findByIdAndDelete(subjectId);
}

export async function deleteBranchCascade(branchId: string) {
  const subjects = await Subject.find({ branchId }).select("_id");

  for (const subject of subjects) {
    const topics = await Topic.find({ subjectId: subject._id }).select("_id");
    const topicIds = topics.map((t) => t._id as Types.ObjectId);
    await deleteMaterialsForTopics(topicIds);
    await Topic.deleteMany({ subjectId: subject._id });
  }

  await Subject.deleteMany({ branchId });
  await Branch.findByIdAndDelete(branchId);
}

export async function deleteExamCascade(examId: string) {
  const branches = await Branch.find({ examId }).select("_id");

  for (const branch of branches) {
    await deleteBranchCascade(String(branch._id));
  }
}
