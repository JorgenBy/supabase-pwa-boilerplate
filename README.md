# 🏕️ Supabase PWA Boilerplate

A lightweight and extendable boilerplate for building **Supabase + React** web apps with **authentication**, **profile management**, **admin approval flows**, and **offline-ready PWA support**. Perfect for hobby projects, internal tools, or production-ready SaaS foundations.

---

## ✨ Features

- 🔐 Email/password and Google OAuth login
- 🧑‍🎨 User profile editing (display name, avatar, theme color)
- ✅ Admin panel for approving/rejecting users and granting admin roles
- ⚡ Supabase Edge Functions for secure server-side logic
- 📦 Supabase Database with UUID-based `users` table
- 📱 Progressive Web App (PWA): installable, offline fallback
- ☁️ Ready for deployment on [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 🛠️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/YOUR_USERNAME/supabase-pwa-boilerplate.git
cd supabase-pwa-boilerplate
npm install
```

---

### 2. Set up Supabase

Create a project at [https://supabase.com](https://supabase.com)

#### a) Create the `users` table

Go to **SQL Editor** in the Supabase dashboard and run:

```sql
create table public.users (
  uid uuid primary key,
  email text not null,
  display_name text,
  photo_url text,
  color text,
  border_color text,
  queue_position int default 0,
  is_admin boolean default false,
  is_approved boolean default false,
  created_at timestamp default now()
);
```

> ☝️ This table links to `auth.users.id` (uid = user id)

---

#### b) Enable Google login

1. Go to **Authentication → Providers → Google**
2. Enable the provider
3. Set redirect URL to:
   ```
   http://localhost:3000
   ```
4. Add your Google OAuth Client ID and Secret (from Google Cloud Console)

---

### 3. Configure environment variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
PROJECT_URL=https://your-project.supabase.co
SERVICE_ROLE_KEY=your-service-role-key
```

✅ These values are found in your Supabase project dashboard.

🛑 Do not commit this file – it’s already in `.gitignore`.

---

### 4. Deploy Supabase Edge Functions

These are used for admin actions like approving/rejecting users.

#### a) Log in to Supabase CLI (if not already)

```bash
npx supabase login
```

#### b) Deploy the functions

```bash
npx supabase functions deploy approve-user
npx supabase functions deploy reject-user
npx supabase functions deploy create-admin
```

Make sure your `PROJECT_URL` and `SERVICE_ROLE_KEY` are set either in `.env` or `supabase/config.toml`.

---

### 5. Run the project locally

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000)

You can:

- Sign up
- Log in via Google
- View profile
- Approve users in the admin panel

---

## ☁️ Deploy to Cloudflare Pages

### Prerequisites

- A GitHub account with this repo
- Supabase project set up as above

### Steps

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Create a new site → Connect GitHub → Select this repo
3. Set:
   - **Framework**: `Vite`
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

✅ Cloudflare Pages will auto-build and deploy your app

> Edge functions must still be deployed manually via Supabase CLI

---

## 📁 Boilerplate Structure

```
supabase-pwa-boilerplate/
├── public/               # service worker, manifest
├── src/
│   ├── auth/             # login/signup/reset/profile
│   ├── admin/            # user management
│   ├── contexts/         # AuthContext, AdminContext, etc.
│   ├── lib/              # supabase.ts etc.
│   ├── pages/            # routes (e.g. Profile.tsx)
├── supabase/
│   ├── functions/        # Edge functions (Deno)
├── .env.example
├── README.md
└── ...
```

---

## 🧱 Included Modules

- `AuthContext` – Handles login/signup/logout/reset
- `AdminContext` – Admin-only: approve/reject/grant admin
- `ProfilePage` – User profile with editable data
- `SocialSignIn` – Google OAuth
- `Edge Functions` – Supabase secure logic
- `PWA` – installable + offline fallback

---

## 💡 Ideas for extension

- 🧩 Role-based route guards
- 🌓 Dark mode toggle
- 🔔 Push notifications via Supabase or Firebase
- 📅 Reusable calendar booking module

---

## 🤝 Contributing

Open to forks, experiments, and PRs.  
Let’s build cool stuff with Supabase and React.

---

## 📄 License

MIT — free to use and modify.
