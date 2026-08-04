import React from 'react';
import { 
  HiHeart, 
  HiEnvelope, 
  HiSparkles 
} from 'react-icons/hi2';
import { 
  FaGithub, 
  FaLinkedin 
} from 'react-icons/fa';

export default function Footer() {
  const email = 'cloudkatsiga@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/cloud-katsiga-590130398?utm_source=share_via&utm_content=profile&utm_medium=member_android';
  const githubUrl = 'https://github.com/wonkavite';

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Start Assessment', href: '#assessment' },
  ];

  const resourceLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Disclaimer', href: '#disclaimer' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <HiSparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="leading-none text-lg">WonkaTech</span>
                <span className="text-xs text-slate-400 font-medium">MindWell Risk Analyzer</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-normal">
              Helping students understand their mental wellbeing through responsible Artificial Intelligence.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3 font-normal">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors duration-200 block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3 font-normal">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors duration-200 block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Developer Contact & Socials */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
              Developer
            </h3>
            <p className="text-slate-300 font-medium text-sm mb-4">
              Built by Developer <span className="text-blue-400 font-semibold">Wonka</span>
            <p>Having an idea? Let's collaborate!</p>
            </p>
            <ul className="space-y-3 font-normal">
              <li>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors duration-200 group"
                >
                  <FaGithub className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  <span>GitHub (@wonkavite)</span>
                </a>
              </li>
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors duration-200 group"
                >
                  <FaLinkedin className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors duration-200 group"
                >
                  <HiEnvelope className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <span className="truncate">{email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left font-normal">
          <p>
            © 2026 Student Health Depression Risk Analyzer. All rights reserved.
          </p>
          <div className="inline-flex items-center gap-1.5 flex-wrap justify-center">
            <span>Built with</span>
            <HiHeart className="w-4 h-4 text-red-500 inline" />
            <span>using React • FastAPI. Neural Networks • PostgresSQL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}