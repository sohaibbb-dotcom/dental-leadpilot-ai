import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/resend";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type LeadEmailRequest = {
  patientName?: string;
  phone?: string;
  email?: string;
  enquiry?: string;
  urgency?: string;
  createdTime?: string;
  clinicId?: string;
};

type Clinic = {
  alert_email: string | null;
  timezone: string | null;
};

export async function POST(request: Request) {
  // Read the lead details sent from the browser after Supabase saves the lead.
  const leadDetails = (await request.json()) as LeadEmailRequest;

  try {
    if (!isSupabaseConfigured || !leadDetails.clinicId) {
      throw new Error("Clinic email settings are not configured.");
    }

    // Load this clinic's email alert settings from Supabase.
    const { data: clinic, error } = await supabase
      .from("clinics")
      .select("alert_email, timezone")
      .eq("id", leadDetails.clinicId)
      .single<Clinic>();

    if (error) {
      throw error;
    }

    if (!clinic.alert_email) {
      throw new Error("This clinic does not have an alert_email set.");
    }

    await sendLeadEmail({
      patientName: leadDetails.patientName ?? "Unknown patient",
      phone: leadDetails.phone ?? "No phone provided",
      email: leadDetails.email ?? "No email provided",
      enquiry: leadDetails.enquiry ?? "",
      urgency: leadDetails.urgency ?? "routine",
      createdTime: leadDetails.createdTime ?? new Date().toISOString(),
      clinicAlertEmail: clinic.alert_email,
      clinicTimezone: clinic.timezone ?? "Australia/Melbourne",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log email errors on the server, but do not make the lead submission fail.
    console.error("Resend email send error:", error);

    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
