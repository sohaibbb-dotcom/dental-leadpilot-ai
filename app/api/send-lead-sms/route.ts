import { NextResponse } from "next/server";
import { sendLeadSms } from "@/lib/twilio";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type LeadSmsRequest = {
  patientName?: string;
  urgency?: string;
  phone?: string;
  enquiry?: string;
  clinicId?: string;
};

type Clinic = {
  alert_phone: string | null;
};

export async function POST(request: Request) {
  // Read the lead details sent from the browser after Supabase saves the lead.
  const leadDetails = (await request.json()) as LeadSmsRequest;

  try {
    if (!isSupabaseConfigured || !leadDetails.clinicId) {
      throw new Error("Clinic SMS settings are not configured.");
    }

    // Load this clinic's SMS alert phone number from Supabase.
    const { data: clinic, error } = await supabase
      .from("clinics")
      .select("alert_phone")
      .eq("id", leadDetails.clinicId)
      .single<Clinic>();

    if (error) {
      throw error;
    }

    if (!clinic.alert_phone) {
      throw new Error("This clinic does not have an alert_phone set.");
    }

    await sendLeadSms({
      patientName: leadDetails.patientName ?? "Unknown patient",
      urgency: leadDetails.urgency ?? "routine",
      phone: leadDetails.phone ?? "No phone provided",
      enquiry: leadDetails.enquiry ?? "",
      clinicAlertPhone: clinic.alert_phone,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log SMS errors on the server, but do not make the lead submission fail.
    console.error("Twilio SMS send error:", error);

    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
