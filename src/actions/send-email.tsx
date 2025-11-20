"use server";

import { z } from "zod";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY!);

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type FormState = {
  errors?: {
    email?: string[];
    message?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function sendEmail(_prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the form fields.",
      success: false,
    };
  }

  const { email, message } = validatedFields.data;
  
  // Sanitize message to prevent XSS
  const sanitizedMessage = message.replace(/[<>]/g, "");
  
  // For testing mode, we can only send to our own email
  const recipientEmail = "kabirnar10@gmail.com";

  try {
    const emailHtml = await render(<EmailTemplate senderEmail={email} message={sanitizedMessage} />);

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact Form - From: ${email}`,
      html: emailHtml,
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return { message: "Failed to send via Resend.", success: false };
    }

    return { message: "Message sent successfully!", success: true };
  } catch (error) {
    console.error("Server Error:", error);
    return { message: "An unexpected error occurred.", success: false };
  }
}
