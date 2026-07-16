export function passwordResetEmail(resetURL: string) {
  const text =
    `Forgot your password? Submit a request with your new password to: ${resetURL}\n\n` +
    `If you didn't forget your password, please ignore this email. This link is valid for 10 minutes.`;

  const html = `
    <p>Forgot your password?</p>
    <p>Click the link below to reset it (valid for 10 minutes):</p>
    <p><a href="${resetURL}">${resetURL}</a></p>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  return { subject: "Your password reset token (valid for 10 min)", text, html };
}

export function otpVerificationEmail(otp: string) {
  const text =
    `Your PeerPrep verification code is: ${otp}\n\n` +
    `This code is valid for 10 minutes. If you didn't create a PeerPrep account, please ignore this email.`;

  const html = `
    <p>Welcome to PeerPrep!</p>
    <p>Your verification code is:</p>
    <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
    <p>This code is valid for 10 minutes.</p>
    <p>If you didn't create a PeerPrep account, please ignore this email.</p>
  `;

  return { subject: "Verify your PeerPrep account", text, html };
}
