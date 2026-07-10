import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailValues {
  to: string;
  subject: string;
  text: string;
}

export async function SendEmail({ to, subject, text }: SendEmailValues) {
  await resend.emails.send({
    from: "MDLawancy@lawancy.com",
    to,
    subject,
    text,
  });
}
