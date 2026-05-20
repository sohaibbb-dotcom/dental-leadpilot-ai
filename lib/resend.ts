// Import the official Resend SDK so this file can send emails from the server.
import { Resend } from "resend";

type LeadEmailDetails = {
  patientName: string;
  phone: string;
  email: string;
  enquiry: string;
  urgency: string;
  createdTime: string;
  clinicAlertEmail: string;
  clinicTimezone: string;
};

// Read the Resend API key from the server environment variables.
const resendApiKey = process.env.RESEND_API_KEY;

// Use Resend's default test sender until a custom sending domain is configured.
const resendSenderEmail = "onboarding@resend.dev";

// Create the Resend client only when the API key exists.
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

function formatCreatedTime(createdTime: string, clinicTimezone: string) {
  // Convert the Supabase created_at timestamp into the clinic's local timezone.
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: clinicTimezone,
  }).format(new Date(createdTime));
}

export async function sendLeadEmail(details: LeadEmailDetails) {
  if (!resendClient) {
    throw new Error("Resend is not configured. Add the Resend environment variables.");
  }

  // Format the Supabase created_at time before adding it to the email.
  const formattedCreatedTime = formatCreatedTime(
    details.createdTime,
    details.clinicTimezone,
  );

  // Build the email subject requested for new dental lead alerts.
  const subject = `New Dental Lead: ${details.patientName} (${details.urgency})`;

  // Build a simple plain-text email body that is easy to read on any device.
  const body = `New Dental Lead

Patient name: ${details.patientName}
Phone: ${details.phone}
Email: ${details.email}
Enquiry: ${details.enquiry}
Urgency: ${details.urgency}
Created time: ${formattedCreatedTime}`;

  // Send the email to the clinic alert inbox.
  return resendClient.emails.send({
    from: resendSenderEmail,
    to: details.clinicAlertEmail,
    subject: subject,
    text: body,
  });
}
