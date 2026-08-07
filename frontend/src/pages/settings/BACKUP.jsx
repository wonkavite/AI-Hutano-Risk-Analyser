import React, { useEffect, useState } from "react";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePencilSquare,
  HiOutlineXMark,
  HiCheckCircle,
  HiExclamationCircle,
} from "react-icons/hi2";

import { HiArrowPath } from "react-icons/hi2";

import {
  getCurrentUser,
  updateUser,
} from "../../services/userService";

export default function Settings() {
  // ============================================
  // USER STATE
  // ============================================

  const [userId, setUserId] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Used to restore values when user cancels editing
  const [originalUser, setOriginalUser] = useState({
    username: "",
    email: "",
  });

  // ============================================
  // UI STATE
  // ============================================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editMode, setEditMode] = useState(false);

  // Notification
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [createdAt, setCreatedAt] = useState("");

  // ============================================
  // AUTO HIDE ALERT
  // ============================================

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  // ============================================
  // LOAD USER
  // ============================================

  const loadUser = async () => {
    try {
     const data = await getCurrentUser();

console.log("Current User:", data);

setUserId(data.id);

setUsername(data.username);
setEmail(data.email);
setCreatedAt(data.created_at);

setOriginalUser({
  username: data.username,
  email: data.email,
});

    } catch (error) {
      console.error(error);

      setMessage("Failed to load profile.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // ============================================
  // ENABLE EDIT MODE
  // ============================================

  const handleToggleEdit = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    // Cancel editing

    setUsername(originalUser.username);
    setEmail(originalUser.email);

    setEditMode(false);
  };

  // ============================================
  // APPLY CHANGES
  // ============================================

  const handleApplyChanges = async () => {

    // Validation

   if (!username.trim()) {
  setMessage("Username cannot be empty.");
  setMessageType("error");
  return;
}

if (!email.trim()) {
  setMessage("Email cannot be empty.");
  setMessageType("error");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  setMessage("Please enter a valid email.");
  setMessageType("error");
  return;
}

    try {

      setSaving(true);

      await updateUser({
        username,
        email,
      });

      setMessage("Profile updated successfully.");
      setMessageType("success");

      // Refresh user from DB

      await loadUser();

      // Exit edit mode

      setEditMode(false);

    } catch (error) {

      console.error(error);

      setMessage(
        error.detail ||
        error.message ||
        "Failed to update profile."
      );

      setMessageType("error");

    } finally {
      setSaving(false);
    }
  };

  return (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

      {/* ============================
          PAGE TITLE
      ============================ */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Account Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your account information.
        </p>
      </div>

      {/* ============================
          LOADING STATE
      ============================ */}

      {loading ? (

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

      ) : (

      <>
        {/* ============================
            PROFILE CARD
        ============================ */}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">

              <h2 className="text-2xl font-bold text-slate-900">
                {username}
              </h2>

              <p className="text-slate-500 mt-1">
                {email}
              </p>
              <p className="mt-2 text-sm text-slate-400">
  Member since{" "}
  {createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "-"}
</p>

            </div>

          </div>

        </div>

        {/* ============================
            ALERT
        ============================ */}

        {message && (

          <div
            className={`mt-6 rounded-2xl p-4 flex items-start gap-3 ${
              messageType === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >

            {messageType === "success" ? (

              <HiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0"/>

            ) : (

              <HiExclamationCircle className="w-6 h-6 text-red-600 flex-shrink-0"/>

            )}

            <p
              className={`text-sm font-medium ${
                messageType === "success"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {message}
            </p>

          </div>

        )}

        {/* ============================
            UPDATE CARD
        ============================ */}

        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

            <h2 className="text-xl font-bold text-slate-900">
              Update Profile
            </h2>

            <button
              onClick={handleToggleEdit}
              className={`rounded-xl px-5 py-3 font-semibold transition ${
                editMode
                  ? "bg-slate-100 hover:bg-slate-200"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >

              {editMode ? (
                <span className="flex items-center gap-2">
                  <HiOutlineXMark className="w-5 h-5"/>
                  Cancel Editing
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <HiOutlinePencilSquare className="w-5 h-5"/>
                  Update Your Profile
                </span>
              )}

            </button>

          </div>

          {/* ============================
              FORM
          ============================ */}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Username */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>

              <div className="relative">

                <HiOutlineUser className="absolute left-4 top-4 w-5 h-5 text-slate-400"/>

                <input
                  value={username}
                  disabled={!editMode}
                  onChange={(e)=>setUsername(e.target.value)}
                  className={`w-full rounded-2xl pl-12 pr-4 py-3 border transition ${
                    editMode
                      ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-500"
                      : "bg-slate-100 border-slate-200"
                  }`}
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">

                <HiOutlineEnvelope className="absolute left-4 top-4 w-5 h-5 text-slate-400"/>

                <input
                  value={email}
                  disabled={!editMode}
                  onChange={(e)=>setEmail(e.target.value)}
                  className={`w-full rounded-2xl pl-12 pr-4 py-3 border transition ${
                    editMode
                      ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-500"
                      : "bg-slate-100 border-slate-200"
                  }`}
                />

              </div>

            </div>

          </div>

          {/* ============================
              APPLY BUTTON
          ============================ */}

          <div className="mt-10">

            <button

              disabled={!editMode || saving}

              onClick={handleApplyChanges}

              className={`w-full rounded-2xl py-4 font-bold text-lg transition ${
                editMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >

              {saving ? (
  <span className="flex items-center justify-center gap-2">
    <HiArrowPath className="w-5 h-5 animate-spin" />
    Saving...
  </span>
) : (
  "Apply Changes"
)}

            </button>

          </div>

        </div>

      </>
      )}

    </div>
  </div>
);
