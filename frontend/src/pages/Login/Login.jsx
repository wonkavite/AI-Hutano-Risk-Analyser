import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  HiEye,
  HiEyeSlash,
  HiLockClosed,
  HiEnvelope,
  HiShieldCheck,
  HiSparkles,
  HiChartBar,
  HiArrowRight,
  HiCheckCircle,
  HiInformationCircle,
} from "react-icons/hi2";

const initialLoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const errorTimeoutRef = useRef(null);

  const [formData, setFormData] = useState(initialLoginFormData);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showError = (message) => {
    setErrorMessage(message);
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = setTimeout(() => {
      setErrorMessage("");
      errorTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMessage) {
      setErrorMessage("");
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      setFormData(initialLoginFormData);
      navigate("/dashboard");
    } catch (err) {
      showError(
        err.detail ||
        err.message ||
        "Invalid email or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const featureCards = [
    {
      icon: HiShieldCheck,
      title: "Confidential",
      description: "Protected session and secure data encryption.",
    },
    {
      icon: HiSparkles,
      title: "AI Powered",
      description: "Real-time risk scoring and adaptive insights.",
    },
    {
      icon: HiChartBar,
      title: "Student Dashboard",
      description: "Track and analyze your academic wellbeing trends.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        
        {/* Login Form Panel (Appears FIRST on mobile, LEFT column on desktop) */}
        <div className="order-1 lg:order-1 lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Header Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-md shadow-blue-600/20">
                🧠
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Student Health
                </span>
                <span className="text-xs font-semibold tracking-wide text-blue-600 mt-0.5">
                  Hutano Risk Analyzer
                </span>
              </div>
            </div>

            {/* Form Title & Registration Navigation Link */}
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
                  Log in to access your wellbeing dashboard and risk assessments.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/#navbar"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                >
                  Home
                </Link>
                <p className="text-sm text-slate-600 font-medium">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 font-extrabold hover:underline transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 rounded-md px-1 cursor-pointer"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>

            {/* Error Notification Area */}
            {errorMessage && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium flex items-center gap-3 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiEnvelope className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiLockClosed className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <HiEyeSlash className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">
                    Remember me
                  </span>
                </label>
               
                <a
                  href="#forgot-password"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
                >
                   <del>Forgot Password? </del>
                </a>
                
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <span>Log In</span>
                    <HiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Soft Modern Illustration Panel (Appears SECOND on mobile, RIGHT column on desktop) */}
        <div className="order-2 lg:order-2 lg:col-span-5 bg-slate-50/80 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-slate-100 text-slate-800 flex flex-col justify-between relative overflow-hidden">
          
          {/* Decorative Subtle Background Gradients */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

          {/* Top Hero Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/60 text-xs font-semibold text-blue-700 mb-6">
              <HiCheckCircle className="w-4 h-4 text-blue-600" />
              <span>Secure Access</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900">
              Welcome Back
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Continue monitoring your wellbeing securely. Access your ongoing
              assessments, historical analytics, and personal guidance.
            </p>
          </div>

          {/* Softer Light Feature Cards */}
          <div className="relative z-10 my-8 space-y-3.5">
            {featureCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index}
                  className="group p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Professional Disclaimers Footer */}
          <div className="relative z-10 pt-4 border-t border-slate-200/80 text-xs text-slate-500 space-y-1">
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span>Educational Support Tool</span>
              <span className="flex items-center gap-1 text-blue-600">
                <HiInformationCircle className="w-4 h-4" />
                Not a Medical Diagnosis
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}