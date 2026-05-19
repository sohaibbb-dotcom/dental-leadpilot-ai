"use client";

import { FormEvent, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type FormValues = {
  patientName: string;
  phone: string;
  email: string;
  enquiryMessage: string;
};

const initialFormValues: FormValues = {
  patientName: "",
  phone: "",
  email: "",
  enquiryMessage: "",
};

function classifyUrgency(enquiryMessage: string) {
  // Make the message lowercase so keyword checks are not case-sensitive.
  const message = enquiryMessage.toLowerCase();

  // These words suggest the patient may need immediate help.
  const emergencyKeywords = [
    "pain",
    "swelling",
    "broken",
    "urgent",
    "emergency",
  ];

  // These words suggest the patient wants help soon, but not necessarily today.
  const soonKeywords = ["soon", "asap", "this week", "quickly"];

  if (emergencyKeywords.some((keyword) => message.includes(keyword))) {
    return "emergency";
  }

  if (soonKeywords.some((keyword) => message.includes(keyword))) {
    return "soon";
  }

  return "routine";
}

export default function LeadCaptureForm() {
  // Store what the patient types into the form.
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  // Track whether the form is currently saving to Supabase.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store a friendly success message after Supabase saves the lead.
  const [successMessage, setSuccessMessage] = useState("");

  // Store a friendly error message if something goes wrong.
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(fieldName: keyof FormValues, value: string) {
    // Copy the existing form values, then replace only the field that changed.
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from refreshing the page when the form submits.
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!isSupabaseConfigured) {
      setErrorMessage(
        "Supabase is not configured yet. Add your Supabase URL and anon key to .env.local.",
      );
      setIsSubmitting(false);
      return;
    }

    // Classify urgency with simple keyword rules before saving the lead.
    const urgency = classifyUrgency(formValues.enquiryMessage);

    // Insert one new lead row into the Supabase "leads" table.
    const { error } = await supabase.from("leads").insert({
      patient_name: formValues.patientName,
      phone: formValues.phone,
      email: formValues.email,
      enquiry: formValues.enquiryMessage,
      clinic_name: "Demo Dental Clinic",
      status: "new",
      urgency: urgency,
    });

    if (error) {
      // Log the full Supabase error in the browser console for debugging.
      console.error("Supabase lead insert error:", error);

      // Temporarily show the real Supabase error message on the page.
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage("Thank you. Your appointment request has been received.");
    setFormValues(initialFormValues);
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/80"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Request an appointment
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          New patient enquiry
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Share your details and the clinic team will follow up.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="patientName"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Patient Name
          </label>
          <input
            id="patientName"
            name="patientName"
            type="text"
            required
            value={formValues.patientName}
            onChange={(event) => updateField("patientName", event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            placeholder="Jane Smith"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              placeholder="0400 000 000"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="enquiryMessage"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Enquiry Message
          </label>
          <textarea
            id="enquiryMessage"
            name="enquiryMessage"
            rows={4}
            value={formValues.enquiryMessage}
            onChange={(event) =>
              updateField("enquiryMessage", event.target.value)
            }
            className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            placeholder="Tell us what you need help with..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-full bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "Saving..." : "Request Appointment"}
      </button>

      {successMessage ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
