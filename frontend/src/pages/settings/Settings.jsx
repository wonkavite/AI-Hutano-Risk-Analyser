import React, { useState, useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePencilSquare,
  HiOutlineXMark,
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { getCurrentUser, updateUser } from "../../services/userService";

export default function Settings() {
  // =========================================================
  // STATE MANAGEMENT
  // =========================================================
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    created_at: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "", // "success" or "error"
  });

  // =========================================================
  // EFFECTS
  // =========================================================
  useEffect(() => {
    fetchUserData();
  }, []);

  // Automatically clear notifications after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  // =========================================================
  // HANDLERS & LOGIC
  // =========================================================
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const data = await getCurrentUser();
      setUserData(data);
      setFormData({
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      showNotification(
        error?.detail || error?.message || "Failed to load user data.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      // Canceling edit: restore original values
      setFormData({
        username: userData.username,
        email: userData.email,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email } = formData;

    if (!username.trim()) {
      showNotification("Username cannot be empty.", "error");
      return false;
    }

    if (!email.trim()) {
      showNotification("Email cannot be empty.", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address.", "error");
      return false;
    }

    if (username === userData.username && email === userData.email) {
      showNotification("No changes detected.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      await updateUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
      });
      
      showNotification("Profile updated successfully!", "success");
      
      // Refresh data to get any backend formatting/changes
      await fetchUserData();
      setIsEditing(false);
    } catch (error) {
      showNotification(
        error?.detail || error?.message || "Failed to update profile.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // =========================================================
  // RENDER: LOADING STATE
  // =========================================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <HiOutlineArrowPath
          className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin mb-4"
          aria-hidden="true"
        />
        <p className="text-slate-500 font-medium text-sm sm:text-base animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  // =========================================================
  // RENDER: MAIN COMPONENT
  // =========================================================
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:py-10 sm:px-6 lg:py-12 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto flex flex-col gap-6 sm:gap-8">
        
        {/* =========================================================
            HEADER SECTION
        ========================================================= */}
        <header className="flex flex-col gap-1.5 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Manage your account information.
          </p>
        </header>

        {/* =========================================================
            PROFILE CARD SUMMARY
        ========================================================= */}
        <section 
          aria-label="Profile Summary"
          className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 transition-all duration-300"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center shrink-0 border-4 border-white shadow-md">
            <span className="text-3xl sm:text-4xl font-black text-blue-600 uppercase tracking-tighter">
              {userData.username ? userData.username.charAt(0) : "?"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2 sm:mt-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 truncate max-w-full">
              {userData.username}
            </h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 text-sm sm:text-base font-medium">
              <HiOutlineEnvelope className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{userData.email}</span>
            </div>
            {userData.created_at && (
              <div className="mt-2 text-xs sm:text-sm font-semibold text-slate-400 bg-slate-100/80 px-3 py-1.5 rounded-full w-fit mx-auto sm:mx-0">
                Member since {formatDate(userData.created_at)}
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            NOTIFICATIONS ALERT
        ========================================================= */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            notification.message ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`flex items-start sm:items-center gap-3 p-4 sm:p-5 rounded-2xl border shadow-sm ${
              notification.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
            role="alert"
          >
            {notification.type === "success" ? (
              <HiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-emerald-600 mt-0.5 sm:mt-0" aria-hidden="true" />
            ) : (
              <HiExclamationCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-rose-600 mt-0.5 sm:mt-0" aria-hidden="true" />
            )}
            <p className="text-sm sm:text-base font-medium leading-relaxed">
              {notification.message}
            </p>
          </div>
        </div>

        {/* =========================================================
            UPDATE FORM CARD
        ========================================================= */}
        <section 
          aria-label="Update Profile Form"
          className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-6 sm:gap-8 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 sm:pb-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Update Profile
            </h3>
            
            <button
              type="button"
              onClick={handleToggleEdit}
              className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isEditing
                  ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-700 focus-visible:ring-slate-500"
                  : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50 focus-visible:ring-blue-600 shadow-sm hover:shadow"
              }`}
            >
              {isEditing ? (
                <>
                  <HiOutlineXMark className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
                  <span>Cancel Editing</span>
                </>
              ) : (
                <>
                  <HiOutlinePencilSquare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
                  <span>Update Your Profile</span>
                </>
              )}
            </button>
          </div>

          <form className="flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Username Field */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="username" className="text-sm font-bold text-slate-700 pl-1">
                Username
              </label>
              <div className="relative flex items-center group">
                <div className={`absolute left-4 transition-colors duration-300 ${isEditing ? "text-blue-500" : "text-slate-400"}`}>
                  <HiOutlineUser className="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-medium outline-none transition-all duration-300 ${
                    isEditing
                      ? "bg-white text-slate-900 border-2 border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-md hover:border-blue-300"
                      : "bg-slate-50 text-slate-500 cursor-not-allowed border-2 border-slate-100 shadow-none"
                  }`}
                  aria-label="Username"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="email" className="text-sm font-bold text-slate-700 pl-1">
                Email Address
              </label>
              <div className="relative flex items-center group">
                <div className={`absolute left-4 transition-colors duration-300 ${isEditing ? "text-blue-500" : "text-slate-400"}`}>
                  <HiOutlineEnvelope className="w-5 h-5" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-medium outline-none transition-all duration-300 ${
                    isEditing
                      ? "bg-white text-slate-900 border-2 border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 shadow-md hover:border-blue-300"
                      : "bg-slate-50 text-slate-500 cursor-not-allowed border-2 border-slate-100 shadow-none"
                  }`}
                  aria-label="Email Address"
                />
              </div>
            </div>
          </form>
        </section>

        {/* =========================================================
            APPLY CHANGES BUTTON
        ========================================================= */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isEditing || isSaving}
          className={`w-full py-4 sm:py-4 px-6 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex justify-center items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isEditing
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1 active:translate-y-0 focus-visible:ring-blue-600"
              : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200/50"
          }`}
          aria-busy={isSaving}
        >
          {isSaving ? (
            <>
              <HiOutlineArrowPath className="w-5 h-5 sm:w-6 sm:h-6 animate-spin shrink-0" aria-hidden="true" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <span>Apply Changes</span>
          )}
        </button>

      </div>
    </div>
  );
}