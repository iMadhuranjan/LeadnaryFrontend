/* components/templates/TemplateGym.jsx
   Data-driven gym website template
   ---------------------------------------------------------------- */
"use client";
import { collectAnalytics } from "@/app/store/analyticSlice";
import { createLead } from "@/app/store/leadSlice";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

/* ---------------- small helpers ---------------- */
const arr = (v) => (Array.isArray(v) ? v : []);
const safe = (v, d = "") => v ?? d;

/* ---------------- SECTION RENDERERS ------------ */
/*— HERO —*/
const Hero = ({ d = {} }) => (
  <section
    className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-900 py-20"
    id="home"
  >
    <div className="absolute inset-0">
      <img
        src={d.backgroundImageUrl || "/gym-hero-bg.jpg"}
        alt="Gym background"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70"></div>
    </div>

    <div className="relative z-10 max-w-3xl px-6 text-center sm:px-10">
      <h1 className="mb-6 text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
        {safe(d.headlineStart)}{" "}
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {safe(d.highlight)}
        </span>
      </h1>

      {d.subtext && (
        <p className="mx-auto mb-8 text-lg text-gray-200 drop-shadow-md md:text-xl">
          {d.subtext}
        </p>
      )}

      <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
        {d.primaryCta && (
          <a
            href={d.primaryHref || "#membership"}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500
                       px-6 py-3 font-semibold text-white shadow-xl
                       transform transition duration-300 hover:scale-105"
          >
            {d.primaryCta}
          </a>
        )}
        {d.secondaryCta && (
          <a
            href={d.secondaryHref || "#tour"}
            className="rounded-lg border border-white px-6 py-3 font-semibold
                       text-white shadow hover:bg-white/10 transition-colors duration-300"
          >
            {d.secondaryCta}
          </a>
        )}
      </div>
    </div>
  </section>
);

/*— NAVBAR —*/
const Navbar = ({ d = {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={d.logoUrl || "/gym-logo.png"}
              alt="Gym logo"
              className="h-10"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {arr(d.links).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-900 hover:text-orange-500 px-3 py-2 font-medium"
                >
                  {link.label}
                </a>
              ))}
              {d.cta && (
                <a
                  href={d.ctaHref || "#membership"}
                  className="ml-4 rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 font-medium text-white hover:from-orange-600 hover:to-red-600"
                >
                  {d.cta}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {arr(d.links).map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                {link.label}
              </a>
            ))}
            {d.cta && (
              <a
                href={d.ctaHref || "#membership"}
                className="block rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-center text-base font-medium text-white"
              >
                {d.cta}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

/*— ABOUT —*/
const About = ({ d = {} }) => (
  <section id="about" className="relative overflow-hidden bg-white py-16">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-12 items-center">
      {/* text */}
      <div>
        {d.tag && (
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600">
            {d.tag}
          </span>
        )}
        {d.heading && (
          <h2 className="mt-4 mb-6 text-3xl font-extrabold">{d.heading}</h2>
        )}
        {arr(d.paragraphs).map((p, idx) => (
          <p key={idx} className="mb-4 text-lg text-gray-700">
            {p}
          </p>
        ))}
        {d.cta && (
          <a
            href={d.ctaHref || "#"}
            className="inline-block rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow
                          transition-transform duration-300 hover:scale-105"
          >
            {d.cta}
          </a>
        )}
      </div>

      {/* image */}
      {d.imageUrl && (
        <div className="relative overflow-hidden rounded-xl shadow-xl">
          <img
            src={d.imageUrl}
            alt={d.imageAlt || "about our gym"}
            className="h-auto w-full object-cover"
          />
        </div>
      )}
    </div>
  </section>
);

/*— FEATURES —*/
const Features = ({ d = {} }) => (
  <section
    id="features"
    className="bg-gradient-to-b from-gray-50 to-white py-20"
  >
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="text-center">
        {d.tag && (
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-orange-100 to-amber-100 px-5 py-1.5 text-sm font-medium text-orange-600 shadow-sm transition-all hover:scale-105 hover:shadow-md">
            {d.tag}
          </span>
        )}
        {d.heading && (
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {d.heading}
          </h2>
        )}
        {d.sub && (
          <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed">
            {d.sub}
          </p>
        )}
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {arr(d.items).map((feature, idx) => (
          <div
            key={idx}
            className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 hover:border-orange-100 cursor-pointer"
          >
            {feature.iconUrl && (
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 group-hover:from-orange-100 group-hover:to-amber-100 transition-all duration-300">
                <img
                  src={feature.iconUrl}
                  alt=""
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/*— GALLERY —*/
const Gallery = ({ d = {} }) => (
  <section id="gallery" className="bg-white py-16">
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="text-center">
        {d.tag && (
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600">
            {d.tag}
          </span>
        )}
        {d.heading && (
          <h2 className="mb-6 text-3xl font-extrabold">{d.heading}</h2>
        )}
        {d.sub && (
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{d.sub}</p>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {arr(d.images).map((image, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={image.imageUrl}
              alt={image.alt || `Gym facility ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/*— TRAINERS —*/
const Trainers = ({ d = {} }) => (
  <section
    id="trainers"
    className="relative bg-gradient-to-b from-white to-gray-50 py-24 overflow-hidden"
  >
    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-orange-50 to-red-50 opacity-40 transform -skew-y-2 -translate-y-12"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-orange-100 opacity-10 blur-3xl"></div>

    <div className="mx-auto max-w-7xl px-6 sm:px-10 relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        {d.tag && (
          <span className="inline-block bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-5 py-1.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow duration-300 animate-float">
            {d.tag}
          </span>
        )}
        {d.heading && (
          <h2 className="mt-5 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {d.heading}
            </span>
          </h2>
        )}
        {d.sub && (
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {d.sub}
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {arr(d.trainers)
          .slice(0, 2)
          .map((trainer, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all duration-500 isolate"
            >
              {/* Floating 3D effect container */}
              <div className="perspective group-hover:perspective-active transition-all duration-700">
                {/* Image with parallax effect */}
                <div className="relative h-80 overflow-hidden rounded-t-[2rem] transform-style-preserve-3d group-hover:rotate-x-10 transition-transform duration-700">
                  <img
                    src={trainer.imageUrl}
                    alt={trainer.name}
                    className="absolute inset-0 h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                    loading="lazy"
                  />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content with slide-up effect */}
                <div className="p-8 text-center relative bg-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                      {trainer.name}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase text-orange-500 tracking-widest">
                    {trainer.specialty}
                  </p>
                  <div className="mt-6 h-px w-20 mx-auto bg-gradient-to-r from-transparent via-orange-300 to-transparent group-hover:w-32 transition-all duration-500"></div>
                  <p className="mt-6 text-gray-700 leading-relaxed">
                    {trainer.bio}
                  </p>

                  {/* Social icons (optional) */}
                  <div className="mt-6 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {[
                      /* Add social icons here if needed */
                    ].map((icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        {/* Icon component would go here */}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

    {/* Add this to your global CSS */}
    <style jsx>{`
      .perspective {
        perspective: 1500px;
      }
      .perspective-active {
        perspective: 1000px;
      }
      .transform-style-preserve-3d {
        transform-style: preserve-3d;
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    `}</style>
  </section>
);

/*— TESTIMONIALS —*/
const Testimonials = ({ d = {} }) => (
  <section id="testimonials" className="bg-white py-16">
    <div className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="text-center">
        {d.tag && (
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-600">
            {d.tag}
          </span>
        )}
        {d.heading && (
          <h2 className="mb-6 text-3xl font-extrabold">{d.heading}</h2>
        )}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {arr(d.items).map((testimonial, idx) => (
          <div key={idx} className="rounded-xl bg-gray-50 p-8 shadow-lg">
            <div className="mb-4 flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    star <= testimonial.rating
                      ? "text-orange-500"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-6 text-gray-700">"{testimonial.quote}"</p>
            <div className="flex items-center">
              {testimonial.avatarUrl && (
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  className="mr-3 h-12 w-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/*— CONTACT —*/
const Contact = ({ d = {} }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get("utm_source") || "");
    setUtmMedium(params.get("utm_medium") || "");
    setUtmCampaign(params.get("utm_campaign") || "");
    setUtmTerm(params.get("utm_term") || "");
    setUtmContent(params.get("utm_content") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const path = window.location.pathname.split("/site/")[1];
    const subdomain = path || "unknown";
    const websiteUrl = window.location.href;

    await dispatch(
      createLead({
        name,
        email,
        message,
        websiteUrl,
        subdomain,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
      })
    )
      .then((result) => {
        if (result?.payload?.success) {
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        setStatus("error");
        console.error("Error submitting form:", err);
      });
  };

  return (
    <section id="contact" className="bg-gray-900 text-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-12">
        {/* info */}
        <div>
          <h2 className="mb-6 text-3xl font-extrabold">
            {d.heading || "Get In Touch"}
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            {d.sub || "We'd love to hear from you"}
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-300">
                  {d.address || "123 Fitness St, Gym City"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-300">{d.phone || "(123) 456-7890"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-300">
                  {d.email || "info@gymexample.com"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Hours</h3>
                <p className="text-gray-300">
                  {d.hours || "Mon-Fri: 5am - 10pm\nSat-Sun: 7am - 8pm"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 px-4 py-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 px-4 py-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 px-4 py-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-300"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </div>

            {status === "success" && (
              <div className="rounded-md bg-green-900/50 p-4 text-green-300">
                Thank you! Your message has been sent. We'll get back to you
                soon.
              </div>
            )}

            {status === "error" && (
              <div className="rounded-md bg-red-900/50 p-4 text-red-300">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

/*— FOOTER —*/
const Footer = ({ d = {} }) => (
  <footer className="bg-gray-800 py-6 text-white">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-3 gap-8">
      {/* About */}
      <div>
        <h3 className="mb-4 text-xl font-bold">
          {safe(d.brand, "PowerFit Gym")}
        </h3>
        <p className="mb-6 text-gray-400">
          {safe(
            d.desc,
            "Your premier fitness destination for achieving health and wellness goals."
          )}
        </p>
        <div className="flex space-x-4">
          {arr(d.social).map((s, i) => (
            <a
              key={i}
              href={s.href}
              className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <span className="sr-only">{s.name}</span>
              <img src={s.icon} alt="" className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
        <ul className="space-y-2">
          {arr(d.links).map((l, i) => (
            <li key={i}>
              <a
                href={l.href}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Hours */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Opening Hours</h3>
        <ul className="space-y-2 text-gray-400">
          <li className="flex justify-between">
            <span>Monday - Friday</span>
            <span>5:00am - 10:00pm</span>
          </li>
          <li className="flex justify-between">
            <span>Saturday</span>
            <span>7:00am - 8:00pm</span>
          </li>
          <li className="flex justify-between">
            <span>Sunday</span>
            <span>7:00am - 8:00pm</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
      {safe(
        d.copyright,
        `© ${new Date().getFullYear()} PowerFit Gym. All rights reserved.`
      )}
    </div>
  </footer>
);

/* ---------------- MAIN TEMPLATE ---------------- */
export default function TemplateGym({ data }) {
  const dispatch = useDispatch();

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
  }, []);

  return (
    <div className="min-h-screen w-full bg-white font-sans antialiased scroll-container">
      {/* Meta tags */}
      <head>
        <title>
          {data.meta?.title ||
            "PowerFit Gym - Your Ultimate Fitness Destination"}
        </title>
        <meta
          name="description"
          content={
            data.meta?.description ||
            "Join PowerFit Gym for world-class fitness facilities, expert trainers, and a supportive community to help you achieve your health goals."
          }
        />
        <meta
          property="og:title"
          content={
            data.meta?.title ||
            "PowerFit Gym - Your Ultimate Fitness Destination"
          }
        />
        <meta
          property="og:description"
          content={
            data.meta?.description ||
            "Join PowerFit Gym for world-class fitness facilities, expert trainers, and a supportive community to help you achieve your health goals."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta
          property="og:image"
          content={data.meta?.imageUrl || "/gym-og-image.jpg"}
        />
      </head>

      {/* Navbar */}
      {data.navbar && <Navbar d={data.navbar} />}

      {/* Hero */}
      {data.hero && <Hero d={data.hero} />}

      {/* About */}
      {data.about && <About d={data.about} />}

      {/* Features */}
      {data.features && <Features d={data.features} />}

      {/* Gallery */}
      {data.gallery && <Gallery d={data.gallery} />}

      {/* Trainers */}
      {data.trainers && <Trainers d={data.trainers} />}

      {/* Testimonials */}
      {data.testimonials && <Testimonials d={data.testimonials} />}

      {/* Contact */}
      {data.contact && <Contact d={data.contact} />}

      {/* Footer */}
      {data.footer && <Footer d={data.footer} />}
    </div>
  );
}
