import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navItems = [
  { key: 'home', label: 'Home' },
  { key: 'features', label: 'Features' },
  { key: 'about', label: 'About' },
  { key: 'faq', label: 'FAQ' },
];

export default function Navbar({ onSectionChange, activeSection = 'home' }) {
  const navigate = useNavigate();

  const handleSectionClick = (key) => {
    onSectionChange?.(key);

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        if (key === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const target = document.getElementById(key);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  };

  return (
    <nav className="w-full bg-white border-b border-slate-100 py-4 px-6 flex items-center justify-between gap-4 flex-wrap">
      <button
        type="button"
        onClick={() => {
          onSectionChange?.('home');
          navigate('/');
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-2xl">🧠</span>
        <span className="font-extrabold text-slate-900 tracking-tight text-lg">
          Student Health Depression Analyzer
        </span>
      </button>

      <div className="flex items-center gap-3 flex-nowrap overflow-x-auto whitespace-nowrap max-w-full">
        {navItems.map((item) => {
          const isActive = activeSection === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSectionClick(item.key)}
              className={`shrink-0 text-sm font-semibold transition ${
                isActive
                  ? 'text-blue-600 underline decoration-2 underline-offset-4'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}

        <Link
          to="/login"
          className="shrink-0 text-slate-600 hover:text-blue-600 font-semibold text-sm transition"
        >
          Log In
        </Link>
      </div>
    </nav>
  );
}