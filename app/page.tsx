import LeadCaptureForm from "@/components/LeadCaptureForm";

const steps = [
  {
    title: "Capture every enquiry",
    text: "Connect your website forms, landing pages, and missed-call sources so new patient leads arrive in one place.",
  },
  {
    title: "Respond instantly",
    text: "Send helpful SMS and email follow-up while the patient is still interested and ready to book.",
  },
  {
    title: "Guide the booking",
    text: "Keep the conversation moving with clear next steps for appointments, offers, and clinic availability.",
  },
];

const prices = [
  {
    name: "Starter",
    price: "$199",
    detail: "For solo clinics testing faster lead response.",
  },
  {
    name: "Growth",
    price: "$399",
    detail: "For clinics ready to automate enquiry follow-up.",
  },
  {
    name: "Multi-location",
    price: "Custom",
    detail: "For groups that need reporting across clinics.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-white">
        <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 py-8 sm:px-8 lg:px-12">
          <nav className="mb-16 flex items-center justify-between">
            <a href="#" className="text-lg font-bold text-teal-700">
              Dental LeadPilot AI
            </a>
            <a
              href="#pricing"
              className="rounded-full border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-400 hover:bg-teal-50"
            >
              View pricing
            </a>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-700">
                AI follow-up for dental clinics
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Turn new patient enquiries into booked appointments faster.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Dental LeadPilot AI helps dental clinics respond instantly to
                new patient enquiries using AI-powered SMS and email follow-up.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cta"
                  className="rounded-full bg-teal-700 px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-teal-800"
                >
                  Join the early access list
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-bold text-slate-800 transition hover:border-teal-400 hover:bg-teal-50"
                >
                  See how it works
                </a>
              </div>
            </div>

            <LeadCaptureForm />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-700">
              The problem
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dental leads go cold when follow-up is slow.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              New patient enquiries often arrive after hours, during busy
              reception periods, or from campaigns that need immediate response.
              Every delay creates a chance for the patient to book elsewhere.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-700">
              The solution
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Instant, professional follow-up for every enquiry.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold">AI-assisted replies</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Respond with clinic-friendly messages that feel helpful, clear,
                and on-brand.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold">SMS and email follow-up</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Reach patients on the channels they already check throughout
                the day.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold">Booking-focused flows</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Keep conversations pointed toward the next practical booking
                step.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold">Built for clinics</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Start with simple lead response before adding Supabase, OpenAI,
                Twilio, Resend, Stripe, and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-700">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A simple workflow for a focused MVP.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-700">
                Pricing preview
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Start simple, then grow with the clinic.
              </h2>
            </div>
            <p className="max-w-md text-slate-600">
              Final pricing can change as the MVP evolves, but these tiers give
              the product a clear commercial direction.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {prices.map((plan) => (
              <div
                key={plan.name}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-5 text-4xl font-bold text-teal-700">
                  {plan.price}
                </p>
                <p className="mt-4 leading-7 text-slate-600">{plan.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-teal-800 px-6 py-14 text-white sm:px-10 lg:px-14">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-100">
              Ready for the MVP
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Build a faster first response for your next patient enquiry.
            </h2>
            <p className="mt-4 text-lg leading-8 text-teal-50">
              Dental LeadPilot AI is starting with a clean foundation today:
              a focused homepage now, then lead capture, automation, payments,
              and messaging integrations later.
            </p>
            <a
              href="mailto:hello@dentalleadpilot.ai"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-800 transition hover:bg-teal-50"
            >
              Contact Dental LeadPilot AI
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
