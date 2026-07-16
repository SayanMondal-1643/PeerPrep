"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth-context";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { ApiClientError } from "@/lib/api-client";
import type { UserRole } from "@/lib/user-types";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, verifyOtp, resendOtp, redirectTo, setRedirectTo } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institutionName: "",
    idProofUrl: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [step, setStep] = useState<"form" | "otp">("form");
  const [pendingEmail, setPendingEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Check for redirect URL in query params
    const redirect = searchParams.get("redirect");
    if (redirect && !redirectTo) {
      setRedirectTo(redirect);
    }
  }, [searchParams, redirectTo, setRedirectTo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdProofChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!validTypes.includes(file.type)) {
      setUploadError("Only PDF and image files are allowed");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, idProofUrl: uploadedUrl }));
      setSelectedFileName(file.name);
    } catch (error) {
      console.error("Failed to upload ID proof:", error);
      setFormData((prev) => ({ ...prev, idProofUrl: "" }));
      setUploadError("Failed to upload ID proof. Please try again.");
      setSelectedFileName(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all required fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }

      if (role === "teacher" && !formData.institutionName) {
        setError("Institution name is required for teacher accounts");
        return;
      }

      if (isUploading) {
        setError("Please wait until the ID proof upload finishes");
        return;
      }

      if (role === "teacher" && !formData.idProofUrl) {
        setError("ID proof is required for teacher accounts");
        return;
      }

      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
        institutionName: formData.institutionName,
        idProofUrl: formData.idProofUrl,
      });

      setPendingEmail(result.email);
      setStep("otp");
    } catch (err) {
      setError(
        err instanceof ApiClientError
          ? err.message
          : "Signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (!otp.trim()) {
      setOtpError("Please enter the verification code");
      return;
    }

    setIsVerifying(true);

    try {
      await verifyOtp(pendingEmail, otp.trim());

      const destination =
        redirectTo || (searchParams.get("redirect") ?? "/exams");
      setRedirectTo(null);
      router.push(destination);
    } catch (err) {
      setOtpError(
        err instanceof ApiClientError
          ? err.message
          : "Verification failed. Please try again.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setResendMessage("");
    setIsResending(true);

    try {
      await resendOtp(pendingEmail);
      setResendMessage("A new code has been sent to your email.");
    } catch (err) {
      setOtpError(
        err instanceof ApiClientError
          ? err.message
          : "Unable to resend the code right now.",
      );
    } finally {
      setIsResending(false);
    }
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Verify your email
              </h1>
              <p className="text-muted-foreground text-sm">
                We sent a 6-digit code to <strong>{pendingEmail}</strong>. Enter it
                below to activate your account.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  name="otp"
                  inputMode="numeric"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-card border-border focus:ring-primary text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              {otpError && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {otpError}
                </div>
              )}

              {resendMessage && (
                <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
                  {resendMessage}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify Account"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendOtp}
                disabled={isResending}
              >
                {isResending ? "Sending..." : "Resend Code"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create an Account
            </h1>
            <p className="text-muted-foreground text-sm">
              Join PeerPrep to acess and contribute structured study materials
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-card border-border focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-card border-border focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-card border-border focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-card border-border focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label>Account Type</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="role-student" />
                  <Label
                    htmlFor="role-student"
                    className="font-normal cursor-pointer"
                  >
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="role-teacher" />
                  <Label
                    htmlFor="role-teacher"
                    className="font-normal cursor-pointer"
                  >
                    Teacher / Educator
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Conditional Teacher Fields */}
            {role === "teacher" && (
              <div className="space-y-4 p-4 rounded-md bg-card border border-border">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name *</Label>
                  <Input
                    id="institutionName"
                    name="institutionName"
                    placeholder="Your university or school"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    className="bg-background border-border focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idProof">ID Proof *</Label>
                  <input
                    id="idProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleIdProofChange}
                    disabled={isUploading}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {isUploading ? (
                    <p className="text-sm text-muted-foreground">
                      Uploading...
                    </p>
                  ) : null}
                  {selectedFileName ? (
                    <p className="text-sm text-green-600">
                      ID Proof uploaded successfully
                    </p>
                  ) : null}
                  {uploadError ? (
                    <p className="text-sm text-destructive">{uploadError}</p>
                  ) : null}
                </div>

                <p className="text-xs text-muted-foreground">
                  Teacher accounts require admin verification before receiving
                  the Verified Teacher badge.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
