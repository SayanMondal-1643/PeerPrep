import { ITopperBadgeApplication } from "@/lib/models/TopperBadgeApplication";

interface PopulatedUser {
  _id: unknown;
  name: string;
}

export function serializeTopperBadge(app: ITopperBadgeApplication) {
  const plain = app.toJSON ? app.toJSON() : app;
  const user = plain.userId as unknown as PopulatedUser;

  return {
    _id: plain._id,
    userId: user?._id ?? plain.userId,
    userName: user?.name,
    subject: plain.subject,
    exam: plain.exam,
    branch: plain.branch,
    year: plain.year,
    cgpa: plain.cgpa,
    markSheetUrl: plain.markSheetUrl,
    status: plain.status,
  };
}
