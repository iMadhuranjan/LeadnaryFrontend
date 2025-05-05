"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiCreditCard,
  FiGlobe,
  FiLogIn,
  FiEdit,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { getProfile, updateProfile } from "@/app/store/profileSlice";
import { SharingunLoader } from "@/components/Spinner";
import Link from "next/link";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    industry: "",
    location: "",
  });

  useEffect(() => {
    setLoading(true);
    dispatch(getProfile())
      .then((result) => {
        setProfileData(result.payload);
        setFormData({
          bio: result.payload.bio || "",
          gender: result.payload.gender || "other",
          industry: result.payload.industry || "other",
          location: result.payload.location || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const resultAction = await dispatch(updateProfile(formData));
      if (updateProfile.fulfilled.match(resultAction)) {
        const updatedProfile = resultAction.payload;
        setProfileData(updatedProfile);
        setEditing(false);
      } else {
        setError(resultAction.payload?.message || "Failed to update profile");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      bio: profileData.bio || "",
      gender: profileData.gender || "other",
      industry: profileData.industry || "other",
      location: profileData.location || "",
    });
    setEditing(false);
  };

  if (loading) {
    return <SharingunLoader />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-800">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                className="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
              Error Loading Profile
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 font-medium text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:from-red-600 dark:to-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-800">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <FiUser className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
              No Profile Data Found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              We couldn't find any profile data associated with your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const maxProjectsByPlan = {
    free: 1,
    pro: 5,
    business: 10,
  };

  const maxLimit = maxProjectsByPlan[profileData.plan] || 1;
  const used = profileData.subdomains?.length || 0;
  const remaining = Math.max(0, maxLimit - used);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Profile
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Manage your account information and settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditing(!editing)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all ${
              editing
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                : "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:opacity-90 dark:from-violet-700 dark:to-violet-800"
            }`}
          >
            {editing ? (
              <>
                <FiX className="h-4 w-4" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FiEdit className="h-4 w-4" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
          {editing && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2.5 font-medium text-white shadow-lg transition hover:opacity-90 dark:from-green-600 dark:to-green-700"
            >
              <FiCheck className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="relative h-24 bg-gradient-to-r from-blue-500 to-violet-500 dark:from-violet-600 dark:to-violet-700"></div>
            <div className="px-6 pb-6 pt-16">
              <div className="flex flex-col items-center">
                <div className="absolute -mt-36 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-gray-800">
                  <img
                    src={profileData.profileImageUrl}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                  {editing && (
                    <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 dark:bg-violet-700 dark:hover:bg-violet-800">
                      <FiEdit className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profileData.username}
                </h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {profileData.plan === "business" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                      <FiBriefcase className="h-3 w-3" />
                      Business Plan
                    </span>
                  ) : profileData.plan === "pro" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                      <FiCreditCard className="h-3 w-3" />
                      Pro Plan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      <FiUser className="h-3 w-3" />
                      Free Plan
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {profileData.email}
                    </p>
                    {profileData.isEmailVerified && (
                      <span className="mt-1 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiCalendar className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Member Since
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(profileData.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiLogIn className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Last Login
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(profileData.lastLogin)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiGlobe className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Provider
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {profileData.provider.charAt(0).toUpperCase() +
                        profileData.provider.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Limit Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Projects Limit
              </h3>
              <span className="rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-1 text-xs font-medium text-blue-800 dark:from-violet-900/30 dark:to-violet-800/30 dark:text-violet-400">
                {used}/{maxLimit} used
              </span>
            </div>
            <div className="mt-4">
              <div className="relative h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="absolute left-0 top-0 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 dark:from-violet-600 dark:to-violet-700"
                  style={{
                    width: `${Math.min((used / maxLimit) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">
                  {remaining}
                </span>{" "}
                projects remaining on your {profileData.plan} plan
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Bio Section */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    About Me
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiUser className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                {editing ? (
                  <div className="mt-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                     
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
                    {profileData.bio ? (
                      <p>{profileData.bio}</p>
                    ) : (
                      <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center dark:border-gray-600">
                        <p className="text-gray-500 dark:text-gray-400">
                          No bio provided yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Information
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiUser className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Gender */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Gender
                    </label>
                    {editing ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    ) : (
                      <div className="flex items-center rounded-lg bg-gray-100 px-4 py-2.5 dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {profileData.gender
                            ? profileData.gender.charAt(0).toUpperCase() +
                              profileData.gender.slice(1)
                            : "Not specified"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Industry
                    </label>
                    {editing ? (
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      >
                        <option value="Business">Business</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Student">Student</option>
                        <option value="Developer">Developer</option>
                        <option value="Marketer">Marketer</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div className="flex items-center rounded-lg bg-gray-100 px-4 py-2.5 dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {profileData.industry
                            ? profileData.industry.charAt(0).toUpperCase() +
                              profileData.industry.slice(1)
                            : "Not specified"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    {editing ? (
                      <div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Enter your location"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          City, Country
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center rounded-lg bg-gray-100 px-4 py-2.5 dark:bg-gray-700">
                        <FiMapPin className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {profileData.location || "Not specified"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Subdomains Section */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Your Projects ({profileData.subdomains.length})
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FiGlobe className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                {profileData.subdomains.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {profileData.subdomains
                      .slice(0, 6)
                      .map((subdomain, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -2 }}
                          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="truncate font-medium text-gray-900 dark:text-white">
                                {subdomain.name || `Project ${idx + 1}`}
                              </h4>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Active
                              </span>
                            </div>

                            <div className="mt-3 flex justify-end">
                              <Link
                                href={`/dashboard/edit`}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                View Details →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      No projects yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by creating your first project.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/dashboard/websites/new"
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:opacity-90 dark:from-violet-700 dark:to-violet-800"
                      >
                        Create First Project
                      </Link>
                    </div>
                  </div>
                )}
                {profileData.subdomains.length > 6 && (
                  <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                    <Link
                      href="/dashboard/websites"
                      className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      View All Projects
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
