/* components/templates/TemplateRealEstate.jsx */
"use client";
import { collectAnalytics } from "@/app/store/analyticSlice";
import { createLead } from "@/app/store/leadSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
 
// Helper functions
const arr = (v) => (Array.isArray(v) ? v : []);
const safe = (v, d = "") => v ?? d;

/* ========== COMPONENTS ========== */

/* — NAVBAR — */
const Navbar = ({ d = {}, theme = "light" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-gray-900 shadow-lg"
            : "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            {d.logoUrl ? (
              <img
                src={d.logoUrl}
                alt={d.brandName || "Logo"}
                className="h-10 w-auto"
              />
            ) : (
              <span
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {d.brandName || "REAL ESTATE"}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {arr(d.links).map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {link.label}
              </a>
            ))}
            {d.cta && (
              <a
                href={d.ctaHref || "#contact"}
                className="rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:from-orange-600 hover:to-red-600"
              >
                {d.cta}
              </a>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } pb-4`}
          >
            <div className="space-y-2 px-2 pt-2">
              {arr(d.links).map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              {d.cta && (
                <a
                  href={d.ctaHref || "#contact"}
                  className="block rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-base font-medium text-white shadow"
                >
                  {d.cta}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

/* — HERO — */
const Hero = ({ d = {}, theme = "light" }) => (
  <section
    className={`relative flex min-h-screen items-center justify-center overflow-hidden pt-20 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}
  >
    {/* Background Image */}
    {d.backgroundImage && (
      <div className="absolute inset-0">
        <img
          src={d.backgroundImage}
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-gray-900/80" : "bg-white/50"
          }`}
        />
      </div>
    )}

    {/* Content */}
    <div className="relative z-10 mx-auto max-w-7xl px-6 text-center sm:px-10">
      <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
        {safe(d.headlineStart)}{" "}
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {safe(d.highlight)}
        </span>
      </h1>
      {d.subtext && (
        <p className="mx-auto mb-8 max-w-3xl text-lg sm:text-xl">{d.subtext}</p>
      )}

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {d.primaryCta && (
          <a
            href={d.primaryHref || "#contact"}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
          >
            {d.primaryCta}
          </a>
        )}
        {d.secondaryCta && (
          <a
            href={d.secondaryHref || "#properties"}
            className="rounded-lg border border-orange-500 px-6 py-3 font-semibold text-orange-600 transition-colors hover:bg-orange-50 dark:border-orange-400 dark:text-orange-300 dark:hover:bg-gray-800"
          >
            {d.secondaryCta}
          </a>
        )}
      </div>

      {/* Stats ribbon */}
      {arr(d.stats).length > 0 && (
        <div className="mx-auto mt-16 max-w-4xl">
          <div
            className={`grid grid-cols-2 gap-6 rounded-xl p-6 sm:grid-cols-4 ${
              theme === "dark"
                ? "bg-gray-800/50 backdrop-blur"
                : "bg-white/80 backdrop-blur"
            }`}
          >
            {d.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-orange-500 sm:text-4xl">
                  {stat.value}
                </div>
                <div
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);

 

/* — ABOUT US — */
const About = ({ d = {}, theme = "light" }) => (
  <section
    className={`py-16 ${
      theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
    }`}
  >
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-xl">
            <img
              src={d.image}
              alt={d.imageAlt || "About Us"}
              className="h-full w-full object-cover"
            />
          </div>
          {d.experienceYears && (
            <div className="absolute -bottom-6 -right-6 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-center text-white shadow-lg">
              <span className="text-2xl font-bold">{d.experienceYears}+</span>
              <span className="text-xs font-medium">Years</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">
            {d.tag || "About Us"}
          </span>
          <h2
            className={`mb-6 text-3xl font-extrabold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {d.heading || "Our Story"}
          </h2>
          {arr(d.paragraphs).map((p, i) => (
            <p
              key={i}
              className={`mb-4 text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {p}
            </p>
          ))}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {arr(d.stats).map((stat, i) => (
              <div
                key={i}
                className={`rounded-lg p-4 ${
                  theme === "dark" ? "bg-gray-700" : "bg-white"
                }`}
              >
                <div className="text-2xl font-bold text-orange-500">
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          {d.cta && (
            <a
              href={d.ctaHref || "#contact"}
              className="mt-8 inline-block rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow transition-all hover:scale-105 hover:shadow-lg"
            >
              {d.cta || "Learn More"}
            </a>
          )}
        </div>
      </div>
    </div>
  </section>
);

/* — SERVICES — */
const Services = ({ d = {}, theme = "light" }) => {
  if (arr(d.services).length === 0) return null;

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">
            {d.tag || "What We Offer"}
          </span>
          <h2
            className={`mb-6 text-3xl font-extrabold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {d.heading || "Our Services"}
          </h2>
          {d.sub && (
            <p
              className={`mx-auto max-w-2xl text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {d.sub}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {d.services.map((service, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300">
                {service.icon ? (
                  <img src={service.icon} alt="" className="h-8 w-8" />
                ) : (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                )}
              </div>
              <h3
                className={`mb-3 text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {service.description}
              </p>
              <a
                href={service.link || "#"}
                className={`inline-flex items-center text-sm font-medium ${
                  theme === "dark"
                    ? "text-orange-400 hover:text-orange-300"
                    : "text-orange-600 hover:text-orange-500"
                }`}
              >
                Learn more
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* — TEAM — */
const Team = ({ d = {}, theme = "light" }) => {
  if (arr(d.members).length === 0) return null;

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">
            {d.tag || "Our Professionals"}
          </span>
          <h2
            className={`mb-6 text-3xl font-extrabold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {d.heading || "Meet Our Team"}
          </h2>
          {d.sub && (
            <p
              className={`mx-auto max-w-2xl text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {d.sub}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {d.members.map((member, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-6 text-center">
                <h3
                  className={`mb-1 text-xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`mb-4 text-sm ${
                    theme === "dark" ? "text-orange-300" : "text-orange-500"
                  }`}
                >
                  {member.position}
                </p>
                <p
                  className={`mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  {arr(member.social).map((social, j) => (
                    <a
                      key={j}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full p-2 ${
                        theme === "dark"
                          ? "bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      }`}
                    >
                      <img src={social.icon} alt="" className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* — TESTIMONIALS — */
const Testimonials = ({ d = {}, theme = "light" }) => {
  if (arr(d.testimonials).length === 0) return null;

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">
            {d.tag || "Client Feedback"}
          </span>
          <h2
            className={`mb-6 text-3xl font-extrabold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {d.heading || "What Our Clients Say"}
          </h2>
          {d.sub && (
            <p
              className={`mx-auto max-w-2xl text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {d.sub}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {d.testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="mb-6 flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <svg
                      key={j}
                      className={`h-5 w-5 ${
                        j < testimonial.rating
                          ? "text-orange-500"
                          : theme === "dark"
                          ? "text-gray-600"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p
                className={`mb-6 italic ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4
                    className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* — CONTACT — */
const Contact = ({ d = {}, theme = "light" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const siteId = window.location.pathname.split("/site/")[1];
    const websiteUrl = window.location.href;

    try {
      await dispatch(
        createLead({
          name,
          email,
          phone,
          message,
          interest,
          websiteUrl,
          siteId,
        })
      ).unwrap();

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setInterest("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className={`py-16 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-300">
            {d.tag || "Get In Touch"}
          </span>
          <h2
            className={`mb-6 text-3xl font-extrabold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {d.heading || "Contact Us"}
          </h2>
          {d.sub && (
            <p
              className={`mx-auto max-w-2xl text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {d.sub}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3
              className={`mb-6 text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Information
            </h3>
            <div
              className={`space-y-6 rounded-xl p-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}
            >
              {d.address && (
                <div className="flex">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Address
                    </h4>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {d.address}
                    </p>
                  </div>
                </div>
              )}
              {d.phone && (
                <div className="flex">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Phone
                    </h4>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {d.phone}
                    </p>
                  </div>
                </div>
              )}
              {d.email && (
                <div className="flex">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Email
                    </h4>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {d.email}
                    </p>
                  </div>
                </div>
              )}
              {d.hours && (
                <div className="flex">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Working Hours
                    </h4>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {d.hours}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3
              className={`mb-6 text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Send Us a Message
            </h3>
            <form
              onSubmit={handleSubmit}
              className={`space-y-6 rounded-xl p-6 ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className={`mb-2 block text-sm font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`block w-full rounded-lg border px-4 py-3 text-sm ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                        : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                    }`}
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`mb-2 block text-sm font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`block w-full rounded-lg border px-4 py-3 text-sm ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                        : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                    }`}
                    placeholder="john@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className={`mb-2 block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`block w-full rounded-lg border px-4 py-3 text-sm ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                  }`}
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="interest"
                  className={`mb-2 block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I'm interested in
                </label>
                <select
                  id="interest"
                  className={`block w-full rounded-lg border px-4 py-3 text-sm ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                  }`}
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="buying">Buying a property</option>
                  <option value="selling">Selling a property</option>
                  <option value="renting">Renting a property</option>
                  <option value="investment">Investment advice</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`mb-2 block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`block w-full rounded-lg border px-4 py-3 text-sm ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                  }`}
                  placeholder="Your message here..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <div
                  className={`rounded-lg bg-green-100 p-4 text-center text-sm font-medium text-green-700 ${
                    theme === "dark" ? "bg-green-900/30 text-green-300" : ""
                  }`}
                >
                  Thank you! We'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div
                  className={`rounded-lg bg-red-100 p-4 text-center text-sm font-medium text-red-700 ${
                    theme === "dark" ? "bg-red-900/30 text-red-300" : ""
                  }`}
                >
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* — FOOTER — */
const Footer = ({ d = {}, theme = "light" }) => (
  <footer
    className={`py-12 ${
      theme === "dark"
        ? "bg-gray-900 text-gray-300"
        : "bg-gray-800 text-gray-300"
    }`}
  >
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="grid gap-12 md:grid-cols-4">
        {/* About */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            {d.brandName || "Real Estate"}
          </h3>
          <p className="mb-6">{d.aboutText}</p>
          <div className="flex space-x-4">
            {arr(d.socialLinks).map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-700 p-2 text-gray-300 transition-colors hover:bg-orange-500 hover:text-white"
              >
                <img src={social.icon} alt="" className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            {arr(d.quickLinks).map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-orange-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
          <ul className="space-y-2">
            {arr(d.services).map((service, i) => (
              <li key={i}>
                <a
                  href={service.href}
                  className="transition-colors hover:text-orange-400"
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>
          <p className="mb-4">{d.newsletterText}</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className={`flex-1 rounded-l-lg border border-r-0 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                  : "border-gray-500 bg-gray-700 text-white placeholder-gray-300"
              }`}
            />
            <button
              type="submit"
              className="rounded-r-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:from-orange-600 hover:to-red-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p>{d.copyright}</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            {arr(d.legalLinks).map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm transition-colors hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

/* — WHATSAPP FLOATING BUTTON — */
const WhatsAppButton = ({ phone, theme = "light" }) => {
  if (!phone) return null;

  return (
    <a
      href={`https://wa.me/${phone.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
          alt="WhatsApp"
          className="relative h-12 w-12"
        />
      </div>
    </a>
  );
};

/* ========== MAIN TEMPLATE ========== */
export default function TemplateRealEstate({ data }) {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Analytics
  useEffect(() => {
    const siteId = window.location.pathname.split("/site/")[1]?.split("/")[0];
    if (!siteId) return;

    const raw = localStorage.getItem("leadnary_session");
    let sessionData;

    const now = Date.now();

    try {
      sessionData = raw ? JSON.parse(raw) : null;
    } catch {
      sessionData = null;
    }

    if (
      !sessionData ||
      !sessionData.id ||
      now - sessionData.timestamp > 24 * 60 * 60 * 1000
    ) {
      sessionData = {
        id: crypto.randomUUID?.() || Math.random().toString(36).substring(2),
        timestamp: now,
      };
      localStorage.setItem("leadnary_session", JSON.stringify(sessionData));
    }

    const sessionId = sessionData.id;

    const width = window.innerWidth;
    const deviceType =
      width <= 768 ? "mobile" : width <= 1024 ? "tablet" : "desktop";

    dispatch(
      collectAnalytics({
        siteId,
        sessionId,
        referrer: document.referrer || "direct",
        deviceType,
      })
    );
  }, [dispatch]);

  return (
    <div
      className={`min-h-screen w-full font-sans antialiased transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navbar */}
      <Navbar d={data.navbar} theme={theme} />

      {/* Hero Section */}
      <Hero d={data.hero} theme={theme} />

      {/* Featured Properties */}
 
      {/* About Us */}
      <About d={data.about} theme={theme} />

      {/* Services */}
      <Services d={data.services} theme={theme} />

      {/* Team */}
      <Team d={data.team} theme={theme} />

      {/* Testimonials */}
      <Testimonials d={data.testimonials} theme={theme} />

      {/* Contact */}
      <Contact d={data.contact} theme={theme} />

      {/* Footer */}
      <Footer d={data.footer} theme={theme} />

      {/* WhatsApp Button */}
      <WhatsAppButton phone={data.whatsapp} theme={theme} />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <svg
            className="h-6 w-6 text-yellow-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
