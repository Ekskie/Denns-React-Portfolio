import React from 'react';
import { Scale, Shield, FileText, ArrowLeft } from 'lucide-react';

const Legal = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 transition-colors duration-500
      bg-zinc-50 text-zinc-900
      dark:bg-black dark:text-zinc-300">
      
      <div className="max-w-4xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-mono uppercase tracking-widest
          text-zinc-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          <ArrowLeft size={16} /> Return to Base
        </a>

        <header className="mb-16 border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
             <Scale className="text-fuchsia-600 dark:text-fuchsia-500" size={32} />
             <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter
               text-zinc-900 dark:text-white">Legal Information</h1>
          </div>
          <p className="font-mono text-sm text-zinc-500">Last Updated: February 2026</p>
        </header>

        <div className="space-y-12">
          <section className="prose dark:prose-invert max-w-none">
             <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <FileText size={20} className="text-cyan-600 dark:text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white uppercase tracking-wide">1. Terms of Use</h3>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    By accessing this portfolio website, you agree to be bound by these Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    The materials contained in this website are protected by copyright and trade mark law. Permission is granted to temporarily download one copy of the materials on Dennrick Agustin's website for personal, non-commercial transitory viewing only.
                  </p>
                </div>
             </div>
          </section>

          <section className="prose dark:prose-invert max-w-none">
             <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <Shield size={20} className="text-cyan-600 dark:text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white uppercase tracking-wide">2. Intellectual Property</h3>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    All content, designs, graphics, code snippets, and projects displayed on this portfolio are the intellectual property of Dennrick Agustin, unless otherwise stated.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 marker:text-cyan-500">
                    <li>You may not reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</li>
                    <li>Open source projects linked here retain their respective licenses (MIT, Apache, etc.) as specified in their repositories.</li>
                  </ul>
                </div>
             </div>
          </section>

          <section className="prose dark:prose-invert max-w-none">
             <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <Scale size={20} className="text-cyan-600 dark:text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white uppercase tracking-wide">3. Disclaimer</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    The materials on this website are provided "as is". Dennrick Agustin makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties. Furthermore, Dennrick Agustin does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on his website or otherwise relating to such materials or on any sites linked to this site.
                  </p>
                </div>
             </div>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center font-mono text-xs text-zinc-500">
           END OF LEGAL DOCUMENT // REFERENCE ID: LGL-2026-DA
        </footer>
      </div>
    </div>
  );
};

export default Legal;