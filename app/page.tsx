"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const benefits = [
  {
    title: "Respond before patients move on",
    text: "Instant alerts help staff contact new enquiries while intent is still high.",
  },
  {
    title: "Prioritize the highest-value moments",
    text: "Urgent cases are surfaced first so your team knows where to focus.",
  },
  {
    title: "Turn ad spend into booked visits",
    text: "Recover more revenue from the leads your clinic already pays to generate.",
  },
];

const processSteps = [
  {
    title: "Capture every enquiry",
    text: "Website and campaign enquiries flow into one lead conversion system.",
  },
  {
    title: "AI ranks urgency",
    text: "Pain, swelling, broken teeth, and urgent language are identified quickly.",
  },
  {
    title: "Alert your clinic",
    text: "Email and SMS-ready notifications send the right details to your team.",
  },
  {
    title: "Book the patient",
    text: "Staff follow up, update status, and keep the lead pipeline clean.",
  },
];

const features = [
  {
    title: "AI urgency classification",
    text: "Automatically identifies pain, swelling, broken teeth, and urgent language so your team can respond to the highest-priority patients first.",
    iconPath:
      "M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4zm0 5v5l3 2",
  },
  {
    title: "Instant email alerts",
    text: "Send the right clinic inbox a clean lead summary with patient details, urgency, and enquiry context the moment a lead arrives.",
    iconPath:
      "M4 6h16v12H4V6zm0 1l8 6 8-6",
  },
  {
    title: "SMS-ready alerts",
    text: "Notify staff on mobile when speed matters, helping urgent enquiries get seen even when the front desk is busy.",
    iconPath:
      "M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zm3 15h2",
  },
  {
    title: "Secure staff login",
    text: "Protect clinic lead data with authenticated staff access so only approved team members can review and manage enquiries.",
    iconPath:
      "M7 10V8a5 5 0 0110 0v2m-9 0h8a2 2 0 012 2v7H6v-7a2 2 0 012-2zm4 4v2",
  },
  {
    title: "Clinic-specific dashboard",
    text: "Give each location a focused view of its own leads, alerts, statuses, and follow-up activity without cross-clinic clutter.",
    iconPath:
      "M4 5h16v14H4V5zm3 4h4v4H7V9zm7 0h3m-3 4h3M7 16h10",
  },
  {
    title: "Lead status tracking",
    text: "Track every enquiry from new to contacted, booked, or lost so your team always knows what happened next.",
    iconPath:
      "M5 7h14M5 12h10M5 17h6m7-2l2 2 4-5",
  },
];

const pricingFeatures = [
  "Unlimited patient enquiries",
  "AI urgency classification",
  "Instant email alerts",
  "SMS-ready notifications",
  "Secure staff login",
  "Lead status dashboard",
  "Multi-user access",
  "Priority support",
];

const comparisonRows = [
  {
    label: "Speed",
    manual: "Staff check inboxes when they can",
    apex: "Instant clinic alerts",
  },
  {
    label: "Urgency",
    manual: "Every lead appears equal",
    apex: "AI-prioritized enquiries",
  },
  {
    label: "Tracking",
    manual: "Notes, calls, and emails are scattered",
    apex: "Central lead status dashboard",
  },
  {
    label: "Multi-clinic",
    manual: "Routing depends on manual process",
    apex: "Clinic-specific visibility",
  },
];

const faqs = [
  {
    question: "Does it work with my current website?",
    answer:
      "Yes. ApexDental AI is designed to connect with existing dental websites, landing pages, and campaign enquiry flows.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A focused MVP setup can be completed quickly once your clinic details, alert contacts, and access rules are ready.",
  },
  {
    question: "Is patient data secure?",
    answer:
      "The system uses authenticated staff access and clinic-specific lead visibility so teams only see the right data.",
  },
  {
    question: "Can my staff use it easily?",
    answer:
      "Yes. The workflow is simple: see the lead, understand urgency, follow up, and update status.",
  },
];

const stars = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 29) % 100}%`,
  top: `${(index * 47) % 100}%`,
  delay: (index % 7) * 0.35,
  size: index % 5 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
}));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7 }}
      variants={fadeUp}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-5 text-lg leading-8 text-slate-400">{text}</p> : null}
    </motion.div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/25 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

function StarField() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          animate={{ opacity: [0.15, 0.8, 0.15], scale: [1, 1.8, 1] }}
          transition={{
            duration: 3.8,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full bg-white ${star.size}`}
          style={{ left: star.left, top: star.top }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth overflow-hidden bg-black text-white">
      <section className="relative min-h-screen">
        <StarField />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(147,51,234,0.45),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(37,99,235,0.28),transparent_27%),radial-gradient(circle_at_16%_72%,rgba(20,184,166,0.22),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),#000_88%)]" />

        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          aria-label="Main navigation"
          className="sticky top-4 z-50 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/45 px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl"
        >
          <a href="#" className="text-lg font-bold tracking-tight sm:text-xl">
            ApexDental AI
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="mailto:hello@apexdental-ai.com"
            className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-xl shadow-purple-500/10 transition hover:bg-cyan-100"
          >
            Book a Demo
          </a>
        </motion.nav>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            variants={fadeUp}
          >
            <p className="mb-6 inline-flex rounded-full border border-purple-300/25 bg-purple-300/10 px-4 py-2 text-sm font-bold text-purple-100 shadow-xl shadow-purple-950/30">
              AI-Powered Lead Conversion for Dental Clinics
            </p>
            <h1 className="max-w-5xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Grow Your Dental Practice With AI-Powered Lead Conversion
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              ApexDental AI captures every new patient enquiry, prioritizes
              urgent cases, alerts your team instantly, and helps turn more
              enquiries into booked appointments.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@apexdental-ai.com"
                className="rounded-full bg-gradient-to-r from-purple-300 via-cyan-300 to-teal-300 px-7 py-4 text-center text-sm font-bold text-black shadow-2xl shadow-purple-500/25 transition hover:scale-[1.02]"
              >
                Book a Demo
              </a>
              <a
                href="#process"
                className="rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 text-center text-sm font-bold text-white shadow-xl shadow-black/20 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/[0.1]"
              >
                Watch 2-Minute Demo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 38, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mx-auto w-full max-w-2xl"
          >
            <div className="absolute inset-0 rounded-[2.75rem] bg-gradient-to-br from-purple-500/24 via-cyan-400/14 to-teal-300/18 blur-2xl" />
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.075] p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#050814]/95 p-5">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm font-semibold text-cyan-200">
                      Live dashboard mockup
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">
                      Lead conversion command center
                    </h2>
                  </div>
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200">
                    +$3.6k opportunity
                  </span>
                  </div>

                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-cyan-200">
                        Email sent
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        Emergency lead routed
                      </p>
                    </motion.div>
                    <motion.div
                      animate={{ y: [4, -4, 4] }}
                      transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="rounded-2xl border border-teal-300/20 bg-teal-300/10 p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-teal-200">
                        Booked
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        Patient confirmed
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                  <div className="space-y-3">
                    {[
                      ["Amelia R.", "Severe pain and swelling", "Emergency", "Booked"],
                      ["Lucas B.", "Needs appointment this week", "Soon", "Contacted"],
                      ["Sofia K.", "New patient clean", "Routine", "New"],
                    ].map(([name, enquiry, urgency, status]) => (
                      <motion.article
                        key={name}
                        whileHover={{ x: 6 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="font-bold">{name}</h3>
                            <p className="mt-1 text-sm text-slate-400">{enquiry}</p>
                          </div>
                          <span className="text-sm font-bold text-cyan-200">
                            {status}
                          </span>
                        </div>
                        <span className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                          {urgency}
                        </span>
                      </motion.article>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-purple-300/20 bg-purple-300/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-purple-200">
                        Today
                      </p>
                      <p className="mt-3 text-4xl font-bold">18</p>
                      <p className="mt-1 text-sm text-slate-300">
                        enquiries captured
                      </p>
                    </div>
                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-cyan-200">
                        Alert speed
                      </p>
                      <p className="mt-3 text-4xl font-bold">12s</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Channels
                      </p>
                      <p className="mt-3 text-lg font-bold">Email + SMS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Benefits"
            title="Built to convert more of the demand your clinic already creates."
            text="ApexDental AI gives dental teams speed, clarity, and a consistent follow-up process."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <GlassCard key={benefit.title} className="p-7">
                <div className="mb-6 h-2 w-16 rounded-full bg-gradient-to-r from-purple-300 via-cyan-300 to-teal-300" />
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{benefit.text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Process"
            title="Four steps from enquiry to booked patient."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <GlassCard key={step.title} className="p-7">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-black">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{step.text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
            variants={fadeUp}
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">
              ROI
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Recovering just three extra patients per month can change the
              economics.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              If each recovered patient represents $1,200 in example treatment
              value, three additional bookings can create $3,600 in monthly
              opportunity.
            </p>
          </motion.div>

          <GlassCard className="p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["3", "extra patients"],
                ["$1.2k", "example value"],
                ["$3.6k", "monthly upside"],
              ].map(([metric, label], index) => (
                <div
                  key={label}
                  className={`rounded-3xl p-6 text-black ${
                    index === 2
                      ? "bg-gradient-to-br from-cyan-300 to-teal-300"
                      : "bg-white"
                  }`}
                >
                  <p className="text-4xl font-bold">{metric}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Example only. Actual revenue depends on treatment mix, patient
              intent, and clinic conversion process.
            </p>
          </GlassCard>
        </div>
      </section>

      <section id="features" className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Features"
            title="Premium automation for modern dental lead operations."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.article
                key={feature.title}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="group rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.035] p-7 shadow-2xl shadow-black/25 backdrop-blur-xl transition-colors hover:border-purple-300/40 hover:shadow-purple-950/30"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-cyan-200 transition group-hover:border-cyan-300/40 group-hover:bg-purple-300/10 group-hover:text-white">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={feature.iconPath} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {feature.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Comparison"
            title="Manual follow-up vs ApexDental AI."
          />
          <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <caption className="sr-only">
                  Manual follow-up compared with ApexDental AI
                </caption>
                <thead className="bg-white/[0.08] text-slate-200">
                  <tr>
                    <th className="px-6 py-5">Area</th>
                    <th className="px-6 py-5">Manual Follow-Up</th>
                    <th className="px-6 py-5">ApexDental AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <th className="px-6 py-5 font-bold text-white">
                        {row.label}
                      </th>
                      <td className="px-6 py-5 text-slate-400">{row.manual}</td>
                      <td className="px-6 py-5 font-semibold text-cyan-200">
                        {row.apex}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Pricing"
            title="One premium plan for clinics ready to convert more enquiries."
          />
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute inset-0 rounded-[2.75rem] bg-purple-500/25 blur-3xl" />
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-purple-300/25 bg-gradient-to-br from-purple-400/16 via-white/[0.075] to-cyan-300/12 p-8 shadow-2xl shadow-purple-950/30 backdrop-blur-xl sm:p-10"
            >
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-purple-400/20 blur-3xl" />
              <div className="relative">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <span className="inline-flex rounded-full border border-purple-200/30 bg-purple-200/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-100">
                      Most Popular
                    </span>
                    <h3 className="mt-5 text-3xl font-bold">Professional</h3>
                  </div>
                  <a
                    href="mailto:hello@apexdental-ai.com"
                    className="rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-black shadow-xl shadow-black/20 transition hover:bg-cyan-100"
                  >
                    Book a Demo
                  </a>
                </div>

                <p className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">
                  $997 Initial Setup{" "}
                  <span className="block text-2xl text-cyan-200 sm:inline sm:text-3xl">
                    + $497/month
                  </span>
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Everything your dental clinic needs to capture more enquiries
                  and convert them into booked appointments automatically.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {pricingFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-black">
                        ✓
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-4 text-sm font-semibold leading-6 text-cyan-100">
                  Recovering just 1-2 additional patients per month can easily
                  pay for the platform.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionIntro eyebrow="FAQ" title="Questions clinic owners ask first." />
          <div className="mt-14 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur-xl"
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(147,51,234,0.28),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(34,211,238,0.24),transparent_28%)]" />
          <div className="relative">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">
              ApexDental AI
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Ready to stop losing new patient enquiries?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Book a demo and see how ApexDental AI can help your clinic turn
              more enquiries into booked appointments.
            </p>
            <a
              href="mailto:hello@apexdental-ai.com"
              className="mt-9 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-xl shadow-black/20 transition hover:bg-cyan-100"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row md:items-center">
          <p>Copyright 2026 ApexDental AI. apexdental-ai.com</p>
          <div className="flex gap-6">
            <a href="#" className="font-semibold transition hover:text-white">
              Privacy Policy
            </a>
            <a
              href="mailto:hello@apexdental-ai.com"
              className="font-semibold transition hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
