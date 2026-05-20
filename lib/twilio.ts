// Import the official Twilio SDK so this file can send SMS messages from the server.
import twilio from "twilio";

type LeadSmsDetails = {
  patientName: string;
  urgency: string;
  phone: string;
  enquiry: string;
  clinicAlertPhone: string;
};

// Read the Twilio Account SID from the server environment variables.
const accountSid = process.env.TWILIO_ACCOUNT_SID;

// Read the Twilio Auth Token from the server environment variables.
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Read the Twilio phone number that SMS messages will be sent from.
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Check that all required Twilio settings are present before sending SMS.
const isTwilioConfigured = Boolean(accountSid && authToken && twilioPhoneNumber);

// Create the Twilio client only when the required credentials exist.
const twilioClient = isTwilioConfigured
  ? twilio(accountSid, authToken)
  : null;

export async function sendLeadSms(details: LeadSmsDetails) {
  if (!twilioClient || !twilioPhoneNumber) {
    throw new Error("Twilio is not configured. Add the Twilio environment variables.");
  }

  // Keep the enquiry preview short so the SMS stays readable.
  const enquiryPreview = details.enquiry.slice(0, 100);

  // Build the exact SMS message the clinic should receive.
  const messageBody = `New Dental Lead
Patient: ${details.patientName}
Urgency: ${details.urgency}
Phone: ${details.phone}
Message: ${enquiryPreview}`;

  // Send the SMS from the Twilio number to the clinic alert number.
  return twilioClient.messages.create({
    body: messageBody,
    from: twilioPhoneNumber,
    to: details.clinicAlertPhone,
  });
}
