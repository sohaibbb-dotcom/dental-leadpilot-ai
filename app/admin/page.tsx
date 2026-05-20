"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type LeadStatus = "new" | "contacted" | "booked" | "lost";

type Lead = {
  id: string;
  clinic_id: string | null;
  patient_name: string | null;
  phone: string | null;
  email: string | null;
  enquiry: string | null;
  urgency: string | null;
  status: LeadStatus | string | null;
  created_at: string | null;
};

type ClinicUser = {
  clinic_id: string;
  clinics: {
    name: string | null;
  } | null;
};

const statusButtons: Array<{ label: string; value: LeadStatus }> = [
  { label: "Contacted", value: "contacted" },
  { label: "Booked", value: "booked" },
  { label: "Lost", value: "lost" },
];

function formatDate(dateValue: string | null) {
  // Show a fallback if Supabase does not return a created date.
  if (!dateValue) {
    return "No date";
  }

  // Convert the database date into a readable local date and time.
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

function getUrgencyStyle(urgency: string | null) {
  if (urgency === "emergency") {
    return "bg-red-50 text-red-700 ring-red-200";
  }

  if (urgency === "soon") {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

export default function AdminPage() {
  // Next.js router lets us redirect users between admin and login pages.
  const router = useRouter();

  // Store the leads that come back from Supabase.
  const [leads, setLeads] = useState<Lead[]>([]);

  // Track whether Supabase is checking if the admin user is logged in.
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Track loading while the dashboard is fetching leads.
  const [isLoading, setIsLoading] = useState(true);

  // Track which lead is being updated so only that row shows a loading state.
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  // Store a helpful message if loading or updating fails.
  const [errorMessage, setErrorMessage] = useState("");

  // Store the signed-in admin email so the dashboard can show who is logged in.
  const [adminEmail, setAdminEmail] = useState("");

  // Store the clinic assigned to the signed-in admin user.
  const [currentClinicId, setCurrentClinicId] = useState("");
  const [currentClinicName, setCurrentClinicName] = useState("");

  async function loadLeads(clinicId: string) {
    setIsLoading(true);
    setErrorMessage("");

    if (!isSupabaseConfigured) {
      setErrorMessage(
        "Supabase is not configured yet. Add your Supabase URL and anon key to .env.local.",
      );
      setIsLoading(false);
      return;
    }

    // Fetch only this clinic's leads, with the newest lead first.
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("clinic_id", clinicId)
      .order("created_at", { ascending: false });

    // Log the raw Supabase response so we can debug what the browser receives.
    console.log("Fetched Supabase leads:", data);

    if (error) {
      // Log the full Supabase error object so debugging is easier.
      console.error("Supabase lead fetch error:", error);
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    // Save the fetched leads in React state so the dashboard can display them.
    setLeads((data ?? []) as Lead[]);
    setIsLoading(false);
  }

  async function updateLeadStatus(leadId: string, status: LeadStatus) {
    setUpdatingLeadId(leadId);
    setErrorMessage("");

    if (!currentClinicId) {
      setErrorMessage("No clinic is assigned to this admin user.");
      setUpdatingLeadId(null);
      return;
    }

    // Update only the status field for the selected lead.
    const { error } = await supabase
      .from("leads")
      .update({ status: status })
      .eq("id", leadId)
      .eq("clinic_id", currentClinicId);

    if (error) {
      console.error("Supabase lead status update error:", error);
      setErrorMessage(error.message);
      setUpdatingLeadId(null);
      return;
    }

    // Update the lead in React state so the dashboard changes immediately.
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: status } : lead,
      ),
    );

    setUpdatingLeadId(null);
  }

  async function handleLogout() {
    // Ask Supabase Auth to end the current admin session.
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Supabase logout error:", error);
      setErrorMessage(error.message);
      return;
    }

    // Send the user back to the login page after logout.
    router.push("/login");
    router.refresh();
  }

  useEffect(() => {
    async function checkAuthAndLoadLeads() {
      if (!isSupabaseConfigured) {
        setErrorMessage(
          "Supabase is not configured yet. Add your Supabase URL and anon key to .env.local.",
        );
        setIsCheckingAuth(false);
        setIsLoading(false);
        return;
      }

      // Ask Supabase Auth if there is a currently signed-in admin user.
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Supabase auth session error:", error);
        setErrorMessage(error.message);
        setIsCheckingAuth(false);
        setIsLoading(false);
        return;
      }

      if (!session) {
        // If no user is logged in, send them to the login page.
        router.push("/login");
        return;
      }

      setAdminEmail(session.user.email ?? "");

      // Look up which clinic this authenticated admin user belongs to.
      const { data: clinicUser, error: clinicUserError } = await supabase
        .from("clinic_users")
        .select("clinic_id, clinics(name)")
        .eq("user_id", session.user.id)
        .single<ClinicUser>();

      if (clinicUserError) {
        console.error("Supabase clinic user lookup error:", clinicUserError);
        setErrorMessage(clinicUserError.message);
        setIsCheckingAuth(false);
        setIsLoading(false);
        return;
      }

      setCurrentClinicId(clinicUser.clinic_id);
      setCurrentClinicName(clinicUser.clinics?.name ?? "Assigned clinic");
      setIsCheckingAuth(false);

      // Load the leads only after the admin session and clinic are confirmed.
      await loadLeads(clinicUser.clinic_id);
    }

    checkAuthAndLoadLeads();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
          Checking admin access...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700">
              Private MVP admin
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Dental LeadPilot AI Leads
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Review new patient enquiries and update their booking status
              for {currentClinicName || "your clinic"}.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {adminEmail ? (
              <p className="text-sm font-semibold text-slate-500">
                Signed in as {adminEmail}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => loadLeads(currentClinicId)}
              disabled={isLoading || !currentClinicId}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-teal-400 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Refreshing..." : "Refresh leads"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        </div>

        {errorMessage ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
            Loading leads...
          </div>
        ) : null}

        {!isLoading && leads.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
            No leads found yet.
          </div>
        ) : null}

        {!isLoading && leads.length > 0 ? (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Patient</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Enquiry</th>
                    <th className="px-5 py-4">Urgency</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Created</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="align-top">
                      <td className="px-5 py-4 font-semibold text-slate-950">
                        {lead.patient_name || "No name"}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {lead.phone || "-"}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {lead.email || "-"}
                      </td>
                      <td className="max-w-xs px-5 py-4 leading-6 text-slate-600">
                        {lead.enquiry || "-"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${getUrgencyStyle(
                            lead.urgency,
                          )}`}
                        >
                          {lead.urgency || "routine"}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold capitalize text-slate-700">
                        {lead.status || "new"}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          {statusButtons.map((button) => (
                            <button
                              key={button.value}
                              type="button"
                              onClick={() =>
                                updateLeadStatus(lead.id, button.value)
                              }
                              disabled={updatingLeadId === lead.id}
                              className="rounded-full border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {updatingLeadId === lead.id
                                ? "Saving..."
                                : button.label}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {leads.map((lead) => (
                <article
                  key={lead.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold">
                        {lead.patient_name || "No name"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatDate(lead.created_at)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${getUrgencyStyle(
                        lead.urgency,
                      )}`}
                    >
                      {lead.urgency || "routine"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        Phone:
                      </span>{" "}
                      {lead.phone || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        Email:
                      </span>{" "}
                      {lead.email || "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        Status:
                      </span>{" "}
                      <span className="capitalize">{lead.status || "new"}</span>
                    </p>
                    <p className="leading-6">
                      <span className="font-semibold text-slate-800">
                        Enquiry:
                      </span>{" "}
                      {lead.enquiry || "-"}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {statusButtons.map((button) => (
                      <button
                        key={button.value}
                        type="button"
                        onClick={() => updateLeadStatus(lead.id, button.value)}
                        disabled={updatingLeadId === lead.id}
                        className="rounded-full border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updatingLeadId === lead.id ? "Saving..." : button.label}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
