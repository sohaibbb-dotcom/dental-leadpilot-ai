"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function LoginPage() {
  // Store the email address typed into the login form.
  const [email, setEmail] = useState("");

  // Store the password typed into the login form.
  const [password, setPassword] = useState("");

  // Track when Supabase is checking the login details.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store a helpful message if login fails.
  const [errorMessage, setErrorMessage] = useState("");

  // Next.js router lets us send the user to /admin after login.
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from refreshing the page when the form submits.
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    if (!isSupabaseConfigured) {
      setErrorMessage(
        "Supabase is not configured yet. Add your Supabase URL and anon key to .env.local.",
      );
      setIsSubmitting(false);
      return;
    }

    // Ask Supabase Auth to sign in with the entered email and password.
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Supabase login error:", error);
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    // Send the authenticated user to the private admin dashboard.
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-950 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/80"
        >
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700">
              Admin access
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Sign in to Dental LeadPilot AI
            </h1>
            <p className="mt-3 leading-7 text-slate-600">
              Use the clinic admin email and password created in Supabase Auth.
            </p>
          </div>

          <div className="space-y-4">
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
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          {errorMessage ? (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
