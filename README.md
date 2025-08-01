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

### 2. Set up Supabase
Create a project at https://supabase.com

a) Create the users table
Go to SQL Editor in the Supabase dashboard and run:

sql
Copy
Edit
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
☝️ This table links to auth.users.id (uid = user id)

b) Enable Google login
Go to Authentication → Providers → Google

Enable the provider

Set redirect URL to:

arduino
Copy
Edit
http://localhost:3000
Add your Google OAuth Client ID and Secret (from Google Cloud Console)
