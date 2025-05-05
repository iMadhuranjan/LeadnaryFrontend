/* components/templates/TemplateProfileCard.jsx */
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { FiAward, FiBriefcase, FiUser } from "react-icons/fi";

/* ---------------- small helpers ---------------- */
const arr = (v) => (Array.isArray(v) ? v : []);
const safe = (v, d = "") => v ?? d;

/* Animation variants */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* ---------------- CARD COMPONENT ---------------- */
const ProfileCard = ({ d = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-md mx-auto"
    >
      <motion.div
        variants={fadeIn}
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
        whileHover={{ y: -10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Background Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          {d.bannerImageUrl && (
            <img
              src={d.bannerImageUrl}
              alt="Profile banner"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Profile Image */}
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <img
              src={d.imageUrl || "/default-profile.jpg"}
              alt={d.name || "Profile"}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {d.isVerified && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="pt-20 pb-8 px-6 text-center">
          {/* Name and Title */}
          <motion.h2
            variants={fadeIn}
            className="text-2xl font-bold text-gray-900"
          >
            {d.name || "John Doe"}
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-blue-600 font-medium mb-4"
          >
            {d.title || "Professional Title"}
          </motion.p>

          {/* Bio */}
          {d.bio && (
            <motion.p variants={fadeIn} className="text-gray-600 mb-6">
              {d.bio}
            </motion.p>
          )}

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="flex justify-center space-x-6 mb-6"
          >
            {d.stats?.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  {stat.icon === "award" && <FiAward className="mr-1" />}
                  {stat.icon === "project" && <FiBriefcase className="mr-1" />}
                  {stat.icon === "client" && <FiUser className="mr-1" />}
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills/Tags */}
          {d.skills && (
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-2 mb-6"
            >
              {arr(d.skills).map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          )}

          {/* Social Links */}
          <motion.div
            variants={staggerContainer}
            className="flex justify-center space-x-4"
          >
            {d.socialLinks?.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:text-white hover:bg-blue-500 transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <span className="sr-only">{social.platform}</span>
                {social.platform === "linkedin" && (
                  <FaLinkedin className="text-lg" />
                )}
                {social.platform === "github" && (
                  <FaGithub className="text-lg" />
                )}
                {social.platform === "twitter" && (
                  <FaTwitter className="text-lg" />
                )}
                {social.platform === "instagram" && (
                  <FaInstagram className="text-lg" />
                )}
                {social.platform === "website" && (
                  <FaGlobe className="text-lg" />
                )}
                {social.platform === "email" && (
                  <FaEnvelope className="text-lg" />
                )}
                {social.platform === "phone" && <FaPhone className="text-lg" />}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Contact Button */}
        {d.contactButton && (
          <motion.div variants={fadeIn} className="px-6 pb-6">
            <motion.a
              href={d.contactHref || "#contact"}
              className="block w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-center shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {d.contactButton}
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ---------------- MAIN TEMPLATE ---------------- */
export default function TemplateProfileCard({ data }) {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      {/* Meta tags */}
      <head>
        <title>
          {data.meta?.title ||
            `${data.profile?.name || "Profile"} - Professional Card`}
        </title>
        <meta
          name="description"
          content={
            data.meta?.description ||
            `Professional profile of ${data.profile?.name || "a professional"}`
          }
        />
        <meta
          property="og:title"
          content={
            data.meta?.title ||
            `${data.profile?.name || "Profile"} - Professional Card`
          }
        />
        <meta
          property="og:description"
          content={
            data.meta?.description ||
            `Professional profile of ${data.profile?.name || "a professional"}`
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta
          property="og:image"
          content={
            data.meta?.imageUrl ||
            data.profile?.imageUrl ||
            "/default-profile.jpg"
          }
        />
      </head>

      {/* Profile Card */}
      {data.profile && <ProfileCard d={data.profile} />}
    </div>
  );
}
