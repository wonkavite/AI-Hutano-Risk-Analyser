import React, { useEffect, useRef, useState } from "react";
import { signInWithGoogle } from "../../firebase";
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

const [usernameConflict, setUsernameConflict] = useState(null);
const [newUsername, setNewUsername] = useState("");
const [usernameSubmitting, setUsernameSubmitting] = useState(false);

const [accountLinkRequired, setAccountLinkRequired] = useState(null);
const [linkPassword, setLinkPassword] = useState("");
const [linkSubmitting, setLinkSubmitting] = useState(false);
const [linkAlert, setLinkAlert] = useState(null);
const [googleIdToken, setGoogleIdToken] = useState(null);
const [googleAlert, setGoogleAlert] = useState(null);


  const navigate = useNavigate();
  const { register, googleLogin,  linkGoogleAccount, } = useAuth();

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
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Create an Account
                </h1>
                <p className="text-slate-500 text-sm sm:text-base mt-2 font-normal">
                  Join thousands of students monitoring their mental wellbeing confidentially.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/#navbar"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                >
                  Home
                </Link>
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



<div className="flex items-center gap-3 my-5">
  <div className="h-px flex-1 bg-slate-200" />
  <span className="text-xs font-medium text-slate-400">OR</span>
  <div className="h-px flex-1 bg-slate-200" />
</div>

<button
  type="button"
  onClick={async () => {
    try {
      const result = await signInWithGoogle();

      const idToken = await result.user.getIdToken();

      setGoogleIdToken(idToken);

      await googleLogin(idToken);

      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-up failed:", error);

      if (error?.detail?.status === "username_required") {
        setUsernameConflict(error.detail);
        setNewUsername("");
      }

      if (error?.detail?.status === "account_link_required") {
        setAccountLinkRequired(error.detail);
        setLinkPassword("");
      }
    }
  }}
  className="w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:shadow-md"
>
  {/* Google logo */}
  <svg
    className="w-5 h-5 shrink-0"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.92v2.42h3.14c1.84-1.69 2.93-4.18 2.93-7.37z"
    />
    <path
      fill="#34A853"
      d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.42c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.04H3.28v2.5A9.75 9.75 0 0 0 12 21.6z"
    />
    <path
      fill="#FBBC05"
      d="M6.53 13.71A5.86 5.86 0 0 1 6.22 12c0-.59.1-1.16.31-1.71v-2.5H3.28A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.21l3.25-2.5z"
    />
    <path
      fill="#EA4335"
      d="M12 6.25c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.72 5.39l3.25 2.5C7.3 7.97 9.46 6.25 12 6.25z"
    />
  </svg>

  <span>Sign up with Google</span>
</button>


{usernameConflict && (
  <div className="mt-5 p-5 rounded-2xl bg-amber-50 border border-amber-200">
    <h3 className="text-base font-bold text-slate-900">
      Choose a new username
    </h3>

    <p className="mt-1  bg-red-100 text-red-700 border border-red-200 rounded-lg p-3">
      {usernameConflict.message}
    </p>

    <div className="mt-4">
      <label
        htmlFor="newUsername"
        className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2"
      >
        New Username
      </label>

      <input
        id="newUsername"
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="Enter a new username"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
    </div>

    <button
  type="button"
  disabled={
    usernameSubmitting ||
    !newUsername.trim() ||
    !googleIdToken
  }
  onClick={async () => {
    try {
      setUsernameSubmitting(true);

      //console.log("Submitting new username:", newUsername.trim());
      await googleLogin(
        googleIdToken,
        newUsername.trim()
      );

      setUsernameConflict(null);
      setNewUsername("");
      setGoogleIdToken(null);

      navigate("/dashboard");

    } catch (error) {
      console.error(
        "Username submission failed:",
        error
      );
    } finally {
      setUsernameSubmitting(false);
    }
  }}
  className="w-full mt-4 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  {usernameSubmitting
    ? "Setting username..."
    : "Set Username"}
</button>
  </div>
)}




{accountLinkRequired && (
  <div className="mt-5 p-5 rounded-2xl bg-blue-50 border border-blue-200">

    <h3 className="text-base font-bold text-slate-900">
      Link your Google account with your previous account
    </h3>

    <p className="mt-2 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg p-3 text-sm leading-relaxed">
      {accountLinkRequired.message}
    </p>

    <div className="mt-4">
      <label
        htmlFor="linkPassword"
        className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2"
      >
        Your existing password
      </label>

      <input
        id="linkPassword"
        type="password"
        value={linkPassword}
        onChange={(e) => {
          setLinkPassword(e.target.value);
          setLinkAlert(null);
        }}
        placeholder="Enter your existing account password"
        disabled={linkSubmitting}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-60"
      />
    </div>

    {/* Alert */}
    {linkAlert && (
      <div
        className={`mt-4 p-3 rounded-xl border text-sm font-medium ${
          linkAlert.type === "success"
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-red-50 border-red-200 text-red-700"
        }`}
      >
        {linkAlert.type === "success" ? "✓ " : "✕ "}
        {linkAlert.message}
      </div>
    )}

    <button
      type="button"
      disabled={
        !linkPassword.trim() ||
        linkSubmitting ||
        !googleIdToken
      }
      onClick={async () => {
        try {
          //console.log("LINK BUTTON CLICKED");
          setLinkSubmitting(true);
          setLinkAlert(null);

          await linkGoogleAccount(
            googleIdToken,
            linkPassword.trim()
          );

          // Successful linking
          setLinkAlert({
            type: "success",
            message:
              "Your Google account has been linked successfully! Redirecting..."
          });

          setLinkPassword("");
          setGoogleIdToken(null);
          setAccountLinkRequired(null);

          // Give the user time to see the success message
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);

        } catch (error) {

          console.error("Google account linking failed:", error);

          let message =
            "Something went wrong while linking your Google account. Please try again.";

          const status =
            error?.detail?.status;

          if (status === "401") {
            message =
              "Incorrect password. Please enter the password for your existing account.";
          }

          if (error?.detail === "Invalid password.") {
            message =
              "Incorrect password. Please try again.";
          }

          if (error?.detail === "This Google account is already linked to another account.") {
            message =
              "This Google account is already linked to another account.";
          }

          if (status === "account_link_required") {
            message =
              error.detail.message;
          }

          setLinkAlert({
            type: "error",
            message,
          });

          // Automatically hide the error after 4 seconds
          setTimeout(() => {
            setLinkAlert(null);
          }, 4000);

        } finally {
          setLinkSubmitting(false);
        }
      }}
      className="w-full mt-4 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {linkSubmitting
        ? "Linking Google Account..."
        : "Link Google Account"}
    </button>

  </div>
)}






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