import React from 'react';
import { Lock, Eye, Database, ArrowLeft } from 'lucide-react';

const SitePrivacy = () => {
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
             <Lock className="text-cyan-600 dark:text-cyan-500" size={32} />
             <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter
               text-zinc-900 dark:text-white">Privacy Policy</h1>
          </div>
          <p className="font-mono text-sm text-zinc-500">Last Updated: February 2026</p>
        </header>

        <div className="space-y-12">
           <div className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-8">
              <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                 <strong>TL;DR:</strong> I respect your privacy. I do not collect personal data unless you explicitly provide it (e.g., via email). No trackers, no ads, no selling of data.
              </p>
           </div>

          <section className="prose dark:prose-invert max-w-none">
             <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <Database size={20} className="text-fuchsia-600 dark:text-fuchsia-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white uppercase tracking-wide">1. Data Collection</h3>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    This website is statically generated and hosted. It does not use cookies for tracking purposes or collect personal information automatically.
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong>Voluntary Information:</strong> If you choose to contact me via the email link provided, I will collect your email address and any other information you provide solely to respond to your inquiry.
                  </p>
                </div>
             </div>
          </section>

          <section className="prose dark:prose-invert max-w-none">
             <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <Eye size={20} className="text-fuchsia-600 dark:text-fuchsia-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white uppercase tracking-wide">2. Analytics</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                     I may use privacy-focused analytics (like Vercel Analytics) to monitor website performance (e.g., page load times, error rates). This data is anonymized and aggregate; it cannot be used to identify you personally.
                  </p>
                </div>
             </div>
          </section>

          <section className="prose dark:prose-invert max-w-none">
             <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded bg-zinc-100 dark:bg-zinc-900">
                  <Lock size={20} className="text-fuchsia-600 dark:text-fuchsia-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white uppercase tracking-wide">3. Third-Party Links</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    My portfolio contains links to other websites (e.g., GitHub, LinkedIn, Project Demos). If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me, and I strongly advise you to review the Privacy Policy of these websites.
                  </p>
                </div>
             </div>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center font-mono text-xs text-zinc-500">
           END OF PRIVACY PROTOCOL // SECURE CHANNEL
        </footer>
      </div>
    </div>
  );
};

export default SitePrivacy;