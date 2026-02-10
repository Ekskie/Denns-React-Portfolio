import React from 'react';
import { Database, Layout, Code2, Rocket } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      id: "01",
      title: "INITIALIZATION",
      subtitle: "Discovery & Strategy",
      icon: Database,
      description: "Analyzing requirements, defining architecture, and establishing the database schema. Every pixel starts with a plan.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: "02",
      title: "PROTOCOLS",
      subtitle: "UI/UX Design",
      icon: Layout,
      description: "Wireframing interfaces and designing user journeys. Creating high-fidelity prototypes that balance aesthetics with usability.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "03",
      title: "EXECUTION",
      subtitle: "Development",
      icon: Code2,
      description: "Writing clean, scalable code. Implementing logic, integrating APIs, and ensuring performance across all devices.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "04",
      title: "DEPLOYMENT",
      subtitle: "Launch & CI/CD",
      icon: Rocket,
      description: "Rigorous testing, automated deployment, and post-launch monitoring. Ensuring 99.9% uptime and stability.",
      color: "from-purple-500 to-fuchsia-500"
    }
  ];

  return (
    <section id="process" className="py-20 relative overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-zinc-900 dark:text-white">
            SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">WORKFLOW</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="group relative">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-0 group-hover:w-full"></div>
                </div>
              )}

              <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 h-full relative overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group-hover:-translate-y-2">
                {/* Background Number */}
                <div className="absolute -right-4 -top-4 text-9xl font-black text-zinc-100 dark:text-zinc-800/20 pointer-events-none select-none">
                  {step.id}
                </div>

                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} p-3 mb-6 text-white shadow-lg relative z-10`}>
                  <step.icon size={24} />
                </div>

                <h3 className="text-xl font-bold mb-2 font-mono text-zinc-900 dark:text-white relative z-10">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4 uppercase tracking-widest relative z-10">
                  {step.subtitle}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;