# Dental LeadPilot AI

Dental LeadPilot AI is a SaaS MVP foundation for helping dental clinics respond
instantly to new patient enquiries using AI-powered SMS and email follow-up.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Supabase JavaScript client

Planned later:

- OpenAI
- Twilio
- Resend
- Stripe
- Vercel deployment

## Run Locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Supabase Environment Variables

Create a file named `.env.local` in the project root.

Add your Supabase project URL and anonymous public key:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase dashboard:

1. Open your Supabase project.
2. Go to Project Settings.
3. Go to API.
4. Copy the Project URL into `NEXT_PUBLIC_SUPABASE_URL`.
5. Copy the anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

The `.env.local` file is ignored by Git, so your local keys will not be
committed to the repository.

## Supabase Leads Table

Create a table named `leads` in Supabase before testing the appointment form.

The form currently saves these fields:

- `patient_name`
- `phone`
- `email`
- `enquiry_message`
- `clinic_name`
- `status`
- `urgency`

For the MVP, `patient_name` should be required. The other fields can be optional
while you are testing.

## Helpful Commands

```bash
npm run lint
npm run build
```

Use `npm run lint` to check code quality.
Use `npm run build` to confirm the app can be prepared for production.
