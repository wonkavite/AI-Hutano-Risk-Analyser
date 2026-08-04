import React, { useState, useEffect } from "react";

export default function Navbar({ activeTab = "home", setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-200 ${
        isScrolled ? "shadow-md shadow-slate-900/5" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            aria-label="Student Depression Risk Analyzer Home"
            className="flex items-center gap-3 rounded-xl group text-left focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              🧠
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                Student Health Depression
              </span>

              <span className="text-xs font-semibold tracking-wide text-blue-600 mt-1">
                Risk Analyzer
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-2"
            aria-label="Desktop Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm transition font-semibold ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#login"
              className="px-5 py-2.5 rounded-2xl border border-blue-600 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
            >
              Login
            </a>

            <a
              href="#register"
              className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white text-sm font-semibold shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg transition"
            >
              Register
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMobileMenuOpen}
              className="p-2.5 rounded-2xl text-slate-700 hover:bg-slate-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100 border-b border-slate-200"
            : "max-h-0 opacity-0"
        } bg-white`}
      >
        <div className="px-4 py-5 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="#login"
              onClick={closeMobileMenu}
              className="w-full text-center py-3 rounded-2xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Login
            </a>

            <a
              href="#register"
              onClick={closeMobileMenu}
              className="w-full text-center py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}