# 👨‍💻 Denn's Cyberpunk Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

A high-performance, immersive personal portfolio website featuring a unique **Cyberpunk/Terminal aesthetic**. Built with React, Vite, and Supabase, this portfolio combines visual flair with a robust content management system.

---

## ✨ Key Features

* **Cyberpunk Aesthetic:** Immersive UI with custom "glitch" text effects, scanline overlays, and terminal-style command interfaces.
* **🧘 Zen Mode:** A distraction-free viewing option that toggles off scanlines and custom cursors for better readability (managed via `ThemeContext`).
* **Interactive UI:** Includes a custom cursor, scroll progress indicators, and smooth transitions.
* **Admin Dashboard:** A secured route (`/admin`) for managing portfolio projects and testimonials dynamically.
* **Real-time Backend:** Fully integrated with **Supabase** for database storage and authentication.
* **Responsive Design:** Mobile-first layout styled with **Tailwind CSS**.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 + Vite
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **Routing:** React Router DOM v7
* **Backend & Auth:** Supabase (PostgreSQL)
* **Linting:** ESLint

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/denns-react-portfolio.git](https://github.com/yourusername/denns-react-portfolio.git)
    cd denns-react-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Supabase credentials.
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open the app**
    Navigate to `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── admin/       # Dashboard, Login, and Management Forms
│   ├── layout/      # Navbar, Footer, ScanlineOverlay
│   ├── pages/       # Public views (Legal, NotFound, Privacy)
│   ├── sections/    # Homepage sections (Hero, Projects, Terminal)
│   └── ui/          # Reusable UI (GlitchText, CustomCursor, ScrollProgress)
├── context/         # ThemeContext (Zen Mode logic)
├── lib/             # Supabase client configuration
└── styles/          # Global styles
```
## 🔐 Admin Access
To access the Content Management System:

Navigate to /admin.

Log in using your Supabase authenticated credentials.

Use the dashboard to Add/Edit/Delete projects and testimonials without touching the code.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

# <p align="center"> Built with 💻 and ☕ by Denn </p>

