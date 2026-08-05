import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineClock,
  HiOutlineHome,
} from "react-icons/hi2";

export default function DashboardNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Placeholder user object structured for FastAPI backend integration
  const user = {
    username: "Student",
    full_name: "",
    email: "",
    avatar_url: null,
  };

  const displayName = user.full_name || user.username;

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
    { name: "Assessment", path: "/dashboard/assessment", icon: HiOutlineClipboardDocumentCheck },
    { name: "Results", path: "/dashboard/results", icon: HiOutlineChartBar },
    { name: "History", path: "/dashboard/history", icon: HiOutlineClock },
    { name: "Profile", path: "/dashboard/profile", icon: HiOutlineUser },
    { name: "Settings", path: "/dashboard/settings", icon: HiOutlineCog6Tooth },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm shadow-slate-100/50 transition-all duration-200"
      aria-label="Main Dashboard Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: Logo & Subtitle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-2xl p-1"
              aria-label="MindWell Dashboard Home"
            >
              <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
                🧠
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  Hutano Risky Analyser
                </span>
                <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mt-0.5">
                  Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1 rounded-2xl border border-slate-200/50">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? "bg-white text-blue-600 shadow-sm shadow-slate-200/80 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* RIGHT: Actions & User Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Settings Link Button */}
            <NavLink
              to="/dashboard/settings"
              aria-label="Dashboard settings"
              className={({ isActive }) =>
                `p-2 rounded-2xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 active:scale-95 ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
                }`
              }
            >
              <HiOutlineCog6Tooth className="w-5 h-5" />
            </NavLink>

            <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

            {/* User Profile Dropdown Menu */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
                aria-label="User profile menu"
                className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-2xl hover:bg-slate-100/80 border border-transparent hover:border-slate-200/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {/* Avatar Display */}
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={displayName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shadow-blue-600/20">
                    {getInitials(displayName)}
                  </div>
                )}

                {/* User Name (Desktop) */}
                <span className="hidden sm:inline-block text-xs font-bold text-slate-800 max-w-[120px] truncate">
                  {displayName}
                </span>

                <HiOutlineChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Popup */}
              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-1.5 z-50 transition-all duration-300 ease-in-out"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {displayName}
                    </p>
                    {user.email && (
                      <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <NavLink
                    to="/dashboard/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-colors"
                    role="menuitem"
                  >
                    <HiOutlineUser className="w-4 h-4" />
                    <span>Your Profile</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/settings"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 rounded-xl transition-colors"
                    role="menuitem"
                  >
                    <HiOutlineCog6Tooth className="w-4 h-4" />
                    <span>Account Settings</span>
                  </NavLink>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                    role="menuitem"
                  >
                    <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {isMobileMenuOpen ? (
                <HiOutlineXMark className="w-6 h-6" />
              ) : (
                <HiOutlineBars3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE: Animated Slide-down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-1.5 shadow-lg transition-all duration-300 ease-in-out">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-2 mt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
            >
              <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}