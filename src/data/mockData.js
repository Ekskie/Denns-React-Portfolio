import { 
  Gamepad2, Code2, Terminal, Database, Palette, Globe 
} from 'lucide-react';

const TECH_STACK = [
  { name: "Godot Engine", icon: Gamepad2, color: "text-blue-400", border: "border-blue-500/30" },
  { name: "Python / Flask", icon: Terminal, color: "text-yellow-400", border: "border-yellow-500/30" },
  { name: "Supabase / SQL", icon: Database, color: "text-green-400", border: "border-green-500/30" },
  { name: "React / JS", icon: Code2, color: "text-cyan-400", border: "border-cyan-500/30" },
  { name: "Photoshop", icon: Palette, color: "text-purple-400", border: "border-purple-500/30" },
  { name: "HTML5 / CSS3", icon: Globe, color: "text-orange-400", border: "border-orange-500/30" },
];

const PROJECTS = [
  {
    id: 1,
    title: "Veranda",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
    description: "A modern restaurant website designed for seamless reservations and menu browsing.",
    tech: ["React", "CSS", "UX"],
    link: "#",
    stats: { speed: 90, ui: 85 }
  },
  {
    id: 2,
    title: "C# Filipino Recipe",
    category: "Game/App",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1000",
    description: "Interactive Windows Form application featuring a gamified cooking experience.",
    tech: ["C#", ".NET", "WinForms"],
    link: "#",
    stats: { logic: 95, fun: 80 }
  },
  {
    id: 3,
    title: "MediHome",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    description: "Healthcare platform connecting patients with providers. Focused on accessibility.",
    tech: ["Web Design", "Frontend", "Medical API"],
    link: "https://medi-home-connect-care.vercel.app/",
    stats: { security: 100, access: 95 }
  },
  {
    id: 4,
    title: "SafeSuite",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    description: "Product design for a corporate safety suite, focusing on intuitive user flows.",
    tech: ["Figma", "Prototyping"],
    link: "#",
    stats: { ux: 92, flow: 88 }
  },
  {
    id: 5,
    title: "3D Portfolio",
    category: "Game/3D",
    image: "https://images.unsplash.com/photo-1614726365723-49cfae927846?auto=format&fit=crop&q=80&w=1000",
    description: "Immersive 3D portfolio experience showcasing 3D creations and interactive elements.",
    tech: ["Three.js", "WebGL", "Blender"],
    link: "https://dennrick-portfolio.netlify.app/",
    stats: { visual: 98, tech: 90 }
  },
  {
    id: 6,
    title: "NomenNescio",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    description: "Abstract web design project pushing the boundaries of traditional layouts.",
    tech: ["HTML5", "CSS3", "Animation"],
    link: "#",
    stats: { art: 95, code: 85 }
  }
  
];

const TESTIMONIALS = [
  {
    name: "Mark Clement Fernandez",
    role: "BSIT Student & Animator",
    text: "Dennrick’s a hardworking guy who people think is just naturally talented, but it’s really his dedication that sets him apart."
  },
  {
    name: "Lawrence Celis",
    role: "Web & Mobile Dev",
    text: "One of the most skilled people I've met in both back-end and game development. You should hire Dennrick now!"
  },
  {
    name: "Jennylyn Mae D. Arcede",
    role: "Fashion Designer",
    text: "Dennrick is a diligent person... His imagination is also vast when it comes to creativity."
  },
  {
    name: "Rashelle Dela Cruz",
    role: "FirstAsia",
    text: "Collaborating with Dennrick was a game-changer. Creative brilliance and attention to detail exceeded expectations."
  }
];

export { TECH_STACK, PROJECTS, TESTIMONIALS };