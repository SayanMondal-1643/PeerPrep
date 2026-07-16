import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export type UserRole = "student" | "teacher" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: UserRole;
  accountStatus: "active" | "suspended";
  institutionName?: string;
  idProofUrl?: string;
  verificationStatus?: "pending" | "verified" | "rejected";
  createdAt: Date;

  isEmailVerified: boolean;
  emailVerificationOTP?: string;
  emailVerificationOTPExpires?: Date;

  correctPassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(jwtTimestamp: number): boolean;
  createPasswordResetToken(): string;
  createEmailVerificationOTP(): string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },
  passwordChangedAt: { type: Date, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true,
    default: "student",
  },
  accountStatus: {
    type: String,
    enum: ["active", "suspended"],
    default: "active",
  },
  institutionName: { type: String, trim: true },
  idProofUrl: { type: String },
  verificationStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
  },
  createdAt: { type: Date, default: Date.now },

  isEmailVerified: { type: Boolean, default: false },
  emailVerificationOTP: { type: String, select: false },
  emailVerificationOTPExpires: { type: Date, select: false },
});

userSchema.pre("save", async function () {
  if (this.isModified("role") && this.role === "teacher" && !this.verificationStatus) {
    this.verificationStatus = "pending";
  }

  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);

  if (!this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }
});

userSchema.methods.correctPassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (jwtTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

userSchema.methods.createEmailVerificationOTP = function () {
  const otp = crypto.randomInt(100000, 1000000).toString();

  this.emailVerificationOTP = crypto.createHash("sha256").update(otp).digest("hex");
  this.emailVerificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000);

  return otp;
};

userSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret.password;
    delete ret.passwordChangedAt;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.emailVerificationOTP;
    delete ret.emailVerificationOTPExpires;
    delete ret.__v;
    delete ret.createdAt;

    if (ret.role !== "teacher") {
      delete ret.institutionName;
      delete ret.idProofUrl;
      delete ret.verificationStatus;
    }

    return ret;
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
