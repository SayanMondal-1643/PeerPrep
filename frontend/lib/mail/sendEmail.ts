import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: process.env.EMAIL_USERNAME
      ? {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        }
      : undefined,
  });
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  if (!process.env.EMAIL_HOST) {
    console.warn(
      `[mail] EMAIL_HOST is not configured. Skipping send, logging content instead:\n` +
        `To: ${options.to}\nSubject: ${options.subject}\n${options.text}`,
    );
    return;
  }

  const transport = getTransport();

  await transport.sendMail({
    from: process.env.EMAIL_FROM || "noreply@peerprep.local",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}
