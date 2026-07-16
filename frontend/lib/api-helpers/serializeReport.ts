import { IReport } from "@/lib/models/Report";

interface PopulatedMaterial {
  _id: unknown;
  title: string;
}

interface PopulatedReporter {
  _id: unknown;
  name: string;
  role: string;
  verificationStatus?: string;
}

export function serializeReport(report: IReport) {
  const plain = report.toJSON ? report.toJSON() : report;
  const material = plain.materialId as unknown as PopulatedMaterial;
  const reporter = plain.reporterId as unknown as PopulatedReporter;

  return {
    _id: plain._id,
    materialId: material?._id ?? plain.materialId,
    materialTitle: material?.title,
    reporterId: reporter,
    reportReason: plain.reportReason,
    comment: plain.comment,
    reportDate: new Date(plain.reportDate).toISOString().slice(0, 10),
    status: plain.status,
  };
}
