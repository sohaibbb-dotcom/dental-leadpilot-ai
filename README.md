# Dental LeadPilot AI

Dental LeadPilot AI is a SaaS MVP foundation for helping dental clinics respond
instantly to new patient enquiries using AI-powered SMS and email follow-up.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Supabase JavaScript client
- Twilio SMS notifications
- Resend email notifications

Planned later:

- OpenAI
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
NEXT_PUBLIC_DEFAULT_CLINIC_ID=your-demo-clinic-id
```

You can find these values in your Supabase dashboard:

1. Open your Supabase project.
2. Go to Project Settings.
3. Go to API.
4. Copy the Project URL into `NEXT_PUBLIC_SUPABASE_URL`.
5. Copy the anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. After creating your first clinic, copy its `id` into
   `NEXT_PUBLIC_DEFAULT_CLINIC_ID`.

The `.env.local` file is ignored by Git, so your local keys will not be
committed to the repository.

## Supabase Auth Admin User

The `/admin` dashboard is protected with Supabase Auth.

Create your first admin user in Supabase:

1. Open your Supabase project.
2. Go to Authentication.
3. Go to Users.
4. Click Add user.
5. Enter an admin email and password.
6. Save the user.

Then open the login page locally:

```text
http://localhost:3000/login
```

Use that email and password to sign in. After login, you will be redirected to:

```text
http://localhost:3000/admin
```

## Supabase Multi-Clinic Tables

Run this SQL in the Supabase SQL editor to add multi-clinic support:

```sql
create table if not exists clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  alert_email text,
  alert_phone text,
  timezone text not null default 'Australia/Melbourne',
  created_at timestamptz not null default now()
);

create table if not exists clinic_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  clinic_id uuid not null references clinics(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table leads
add column if not exists clinic_id uuid references clinics(id);
```

Create your first clinic:

```sql
insert into clinics (name, alert_email, alert_phone, timezone)
values (
  'Demo Dental Clinic',
  'clinic@example.com',
  '+61400000000',
  'Australia/Melbourne'
)
returning id;
```

Copy the returned `id` into `.env.local` as `NEXT_PUBLIC_DEFAULT_CLINIC_ID`.

Associate your Supabase Auth admin user with the clinic:

```sql
insert into clinic_users (user_id, clinic_id)
values (
  'your-auth-user-id',
  'your-clinic-id'
);
```

You can find `your-auth-user-id` in Supabase under Authentication > Users.

The public lead form saves new leads with `clinic_id`. The admin dashboard looks
up the signed-in user's clinic and only displays leads for that clinic.

## Supabase Leads Table

Create a table named `leads` in Supabase before testing the appointment form.

The form currently saves these fields:

- `patient_name`
- `phone`
- `email`
- `enquiry`
- `clinic_id`
- `clinic_name`
- `status`
- `urgency`

For the MVP, `patient_name` should be required. The other fields can be optional
while you are testing.

## Twilio SMS Environment Variables

The app can send an SMS alert to the clinic after a lead is saved.

Add these values to `.env.local`:

```bash
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

You can find `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and
`TWILIO_PHONE_NUMBER` in your Twilio dashboard.

Use international phone number format for both Twilio numbers, for example:

```text
+61400000000
```

Each clinic's SMS alert number is stored in the `clinics.alert_phone` column.
If SMS sending fails, the lead will still save in Supabase. The SMS error will
be logged on the server so it can be debugged without blocking the patient.

## Resend Email Environment Variables

The app can send an email alert to the clinic after a lead is saved.

Add these values to `.env.local`:

```bash
RESEND_API_KEY=your-resend-api-key
```

You can find `RESEND_API_KEY` in your Resend dashboard.

Each clinic's alert email and timezone are stored in the `clinics.alert_email`
and `clinics.timezone` columns.

The app currently sends from Resend's default test sender:

```text
onboarding@resend.dev
```

Use this while testing. Later, after you configure a custom sending domain in
Resend, the sender can be changed to a branded clinic or app email address.

If email sending fails, the lead will still save in Supabase. The email error
will be logged on the server so it can be debugged without blocking the patient.

## Helpful Commands

```bash
npm run lint
npm run build
```

Use `npm run lint` to check code quality.
Use `npm run build` to confirm the app can be prepared for production.
