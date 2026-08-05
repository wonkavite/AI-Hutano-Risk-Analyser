import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiEye,
  HiEyeSlash,
  HiLockClosed,
  HiEnvelope,
  HiUser,
  HiShieldCheck,
  HiSparkles,
  HiAcademicCap,
  HiArrowRight,
  HiCheckCircle,
  HiInformationCircle,
  HiXCircle,
} from "react-icons/hi2";
import useAuth from "../../hooks/useAuth";

const initialRegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

export default function Register() {
  const [formData, setFormData] = useState(initialRegisterFormData);
  const errorTimeoutRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

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

  // Dynamic Password Validation Checks
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };

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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      showError("Please enter your full name.");
      return;
    }

    if (!validateEmail(formData.email)) {
      showError("Please enter a valid email address.");
      return;
    }

    const isPasswordValid = Object.values(passwordChecks).every(Boolean);
    if (!isPasswordValid) {
      showError("Password does not meet all security requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match. Please verify and try again.");
      return;
    }

    if (!formData.agreeToTerms) {
      showError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await register({
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      setFormData(initialRegisterFormData);
      navigate("/dashboard");
    } catch (err) {
      showError(
        err?.response?.data?.detail ||
        err?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const featureCards = [
    {
      icon: HiShieldCheck,
      title: "Secure & Private",
      description: "End-to-end confidential data handling.",
    },
    {
      icon: HiSparkles,
      title: "AI Powered",
      description: "Precision analytics driven by CatBoost AI.",
    },
    {
      icon: HiAcademicCap,
      title: "Student Focused",
      description: "Customized for academic stress patterns.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        
        {/* Registration Form Panel */}
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

            {/* Form Title & Top Log In Navigation Link */}
            <div className="mb-8 flex items-baseline justify-between flex-wrap gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Create an Account
                </h1>
                <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
                  Join thousands of students monitoring their mental wellbeing confidentially.
                </p>
              </div>
              <p className="text-sm text-slate-600 font-medium">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-extrabold hover:underline transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 rounded-md px-1"
                >
                  LOG IN
                </Link>
              </p>
            </div>

            {/* Error Notification Area */}
            {errorMessage && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium flex items-center gap-3 transition-all"
              >
                <HiXCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiUser className="w-5 h-5" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

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
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <HiEyeSlash className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Interactive Password Strength Indicators */}
                <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px] sm:text-xs font-medium">
                  <span className={`flex items-center gap-1 transition-colors ${passwordChecks.length ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                    <span className="text-xs">{passwordChecks.length ? "✓" : "•"}</span> Minimum 8 characters
                  </span>
                  <span className={`flex items-center gap-1 transition-colors ${passwordChecks.uppercase ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                    <span className="text-xs">{passwordChecks.uppercase ? "✓" : "•"}</span> One uppercase letter
                  </span>
                  <span className={`flex items-center gap-1 transition-colors ${passwordChecks.lowercase ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                    <span className="text-xs">{passwordChecks.lowercase ? "✓" : "•"}</span> One lowercase letter
                  </span>
                  <span className={`flex items-center gap-1 transition-colors ${passwordChecks.number ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                    <span className="text-xs">{passwordChecks.number ? "✓" : "•"}</span> One number
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <HiLockClosed className="w-5 h-5" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full pl-11 pr-11 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm sm:text-base placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <HiEyeSlash className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-600 font-normal leading-snug">
                    I agree to the{" "}
                    <a
                      href="#terms"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#privacy"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.agreeToTerms}
                className="w-full mt-2 py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <HiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Soft Modern Illustration Panel */}
        <div className="order-2 lg:order-2 lg:col-span-5 bg-slate-50/80 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-slate-100 text-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

          {/* Top Hero Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/60 text-xs font-semibold text-blue-700 mb-6">
              <HiCheckCircle className="w-4 h-4 text-blue-600" />
              <span>Confidential Assessment</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900">
              Start Your Wellbeing Journey
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Take proactive steps toward understanding your mental health.
              Our platform offers a safe, secure space designed specifically
              for university students.
            </p>
          </div>

          {/* Feature Cards */}
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