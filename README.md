👨‍💻 Denn's Cyberpunk Portfolio

A high-performance, immersive personal portfolio website featuring a unique Cyberpunk/Terminal aesthetic. Built with React, Vite, and Supabase.

✨ Features

Cyberpunk Aesthetic: Custom "glitch" text effects, scanline overlays, and a terminal-style command interface.

Interactive UI: Custom cursor, smooth scrolling, and reactive animations using Framer Motion.

Admin Dashboard: A secured admin area (/admin) to manage projects and testimonials dynamically.

Real-time Backend: Integrated with Supabase for data storage and authentication.

Responsive Design: Fully responsive layout built with Tailwind CSS.

Dark/Light Mode: (If applicable based on ThemeContext) or Thematic consistency.

🛠️ Tech Stack

Frontend: React.js, Vite

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

Backend/DB: Supabase (PostgreSQL)

Routing: React Router DOM

Deployment: Vercel

🚀 Getting Started

Follow these steps to set up the project locally.

Prerequisites

Node.js (v18 or higher recommended)

npm or yarn

Installation

Clone the repository

git clone [https://github.com/yourusername/denns-react-portfolio.git](https://github.com/yourusername/denns-react-portfolio.git)
cd denns-react-portfolio


Install dependencies

npm install


Configure Environment Variables
Create a .env file in the root directory and add your Supabase credentials. You can find these in your Supabase project settings.

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


Run the development server

npm run dev


Open your browser
Navigate to http://localhost:5173 to view the application.

📂 Project Structure

src/
├── components/
│   ├── admin/       # Dashboard, Login, and Forms
│   ├── layout/      # Navbar, Footer, Overlays
│   ├── pages/       # Main page views (Legal, 404, etc.)
│   ├── sections/    # Homepage sections (Hero, Projects, etc.)
│   └── ui/          # Reusable UI components (GlitchText, Cards)
├── context/         # React Context (Theme)
├── data/            # Mock data and constants
├── hooks/           # Custom hooks (useMousePosition)
├── lib/             # Supabase client configuration
└── styles/          # Global styles


🔐 Admin Access

To access the admin dashboard, navigate to /admin.
Note: You will need to set up Authentication in your Supabase project and create an authorized user.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

<p align="center">
Built with 💻 and ☕ by Denn
</p>