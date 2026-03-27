# REAP Asia Ministries — Web Platform

This is the comprehensive web platform for **REAP Asia Ministries Inc.**, built with modern web technologies to ensure lightning-fast performance, extreme security, and an elegant, editorial design aesthetic. 

The platform consists of a public-facing website and an authenticated admin dashboard for managing dynamic content directly from the browser.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Vanilla CSS Modules (`.module.css`) for strict scoping
- **Icons:** `lucide-react`
- **Backend/Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Admin login access)
- **Storage:** Supabase Storage (for Blog media)
- **Rich Text Editor:** TipTap (Headless ProseMirror)

---

## 🚀 Project Plan & Status

### ✅ What is Done 
- **Core Architecture:** Setup Next.js App Router, global typography, and CSS design system structure.
- **Supabase Integration:** Full database connection, authentication routing, and Supabase client abstractions (`lib/supabase`).
- **Admin Dashboard UI:** Created secure admin routes `/admin/*` protected by middleware.
- **Blog System (CRUD):** Built the complete blog authoring experience with a rich-text TipTap editor, auto-slug generation, draft/publish modes, and database connection.
- **Thought of the Day:** Implemented an admin interface to dynamically update the scripture quote on the homepage.
- **RLS Security:** Explicitly secured Supabase policies, creating targeted SQL policies to allow authenticated admin `INSERT`/`UPDATE` operations without exposing the backend to the public.

### ✨ What We Did Today (Phase 3 UI Refinement & Fixes)
- **Hero Spotlight Redesign:** Overhauled the homepage hero section. Replaced old static blobs with the "Sacred Editorial" dark grid texture. Engineered a zero-lag, 1:1 CSS-native glowing cursor spotlight that reveals the grid underneath without dragging or trailing issues.
- **Typography & Iconography Polish:** Purged all generic emojis across the site (Navbar, Footer, Program lists) and replaced them with crisp, professional `lucide-react` SVG icons.
- **Supabase Storage Uploads:** Resolved the complex `blog-images` upload failures by precisely diagnosing and creating the required Row-Level Security (RLS) SQL policies for the storage bucket.
- **Image Bypassing Fix:** Discovered that long-running Next.js development servers refuse to acknowledge `next.config.ts` updates. Seamlessly bypassed this cache-lock by swapping `<Image />` for native `<img>` tags, allowing the Ministry Gallery, blog feeds, and admin preview panels to render Supabase images immediately without requiring terminal restarts.
- **Blog Card Layouts:** Shrunk and polished the blog card components. Enforced a rigid `3-line` text clamp on excerpts and implemented `word-break` algorithms to prevent gibberish test data from shattering the UI.

### ⏳ What is Left (Next Steps)
- **Internal Page Completion:** Finish the editorial design pass on the remaining secondary pages (`/about`, `/mission-field`, `/contact`).
- **Contact Form Integration:** Wire up the Contact page to dispatch emails to `jeffryjoshua15@gmail.com` using the Resend API (key is already in `.env.local`).
- **Responsive Audit:** Perform a final rigorous cross-device check to ensure the strict CSS grid rules and the custom cursor spotlight perform flawlessly on legacy mobile browsers.
- **Production Deployment:** Push the final `main` branch to Vercel, attach the production Supabase environment variables, and map the live domain.

---

## 💻 Getting Started (Development)

First, install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🔐 Environment Variables Required
To run this project locally, ensure you have a `.env.local` file at the root containing:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email_destination
```
