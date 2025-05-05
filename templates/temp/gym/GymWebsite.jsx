/* components/templates/TemplateGym.jsx */
"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
 import { FaWhatsapp, FaDumbbell, FaRunning, FaHeartbeat, FaCalendarAlt, FaUserShield, FaShieldAlt, FaRegClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { createLead } from "@/app/store/leadSlice";
import { collectAnalytics } from "@/app/store/analyticSlice";

/* ---------------- Helper Functions ---------------- */
const arr = (v) => (Array.isArray(v) ? v : []);
const safe = (v, d = "") => v ?? d;

/* ---------------- Theme Toggle Component ---------------- */
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true';
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

/* ---------------- Navbar Component ---------------- */
const Navbar = ({ d = {} }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            {d.logoUrl ? (
              <img src={d.logoUrl} alt={d.brandName} className="h-10" />
            ) : (
              <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                {safe(d.brandName, "GYM NAME")}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {arr(d.navLinks).map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={d.ctaHref || "#contact"}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              {safe(d.ctaLabel, "Join Now")}
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-800 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {arr(d.navLinks).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-800 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4">
                <a
                  href={d.ctaHref || "#contact"}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  {safe(d.ctaLabel, "Join Now")}
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

/* ---------------- HERO SECTION ---------------- */
const Hero = ({ d = {} }) => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 bg-gray-100 dark:bg-gray-900">
    {/* Background Image or Gradient */}
    {d.backgroundImage ? (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={d.backgroundImage}
          alt="Gym background"
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 dark:from-black/80 dark:to-black/50"></div>
      </div>
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-gray-900/50 dark:from-orange-900/30 dark:via-red-900/30 dark:to-gray-900/70"></div>
    )}

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          {safe(d.headline, "Transform Your Body")}{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {safe(d.highlight, "Redefine Your Life")}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          {safe(d.subtext, "Join our gym — the ultimate fitness destination. Personal training, group classes, and transformation programs under one roof.")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {d.primaryCta && (
            <a
              href={d.primaryHref || "#contact"}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg font-bold text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {d.primaryCta}
            </a>
          )}
          {d.secondaryCta && (
            <a
              href={d.secondaryHref || "#"}
              className="border-2 border-orange-500 text-orange-500 dark:text-orange-400 dark:border-orange-400 px-8 py-4 rounded-lg font-bold text-center hover:bg-orange-500/10 transition-colors"
            >
              {d.secondaryCta}
            </a>
          )}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- ABOUT SECTION ---------------- */
const About = ({ d = {} }) => (
  <section className="py-16 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {safe(d.tag, "About Us")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {safe(d.heading, "More Than Just a Gym")}
          </h2>
          {arr(d.paragraphs).map((p, idx) => (
            <p key={idx} className="text-gray-700 dark:text-gray-300 mb-4">
              {p}
            </p>
          ))}
          {d.stats && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              {arr(d.stats).map((stat, idx) => (
                <div key={idx} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-orange-500 dark:text-orange-400">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src={safe(d.imageUrl, "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b")}
              alt={safe(d.imageAlt, "Gym interior")}
              className="w-full h-auto object-cover"
            />
          </div>
          {d.videoUrl && (
            <div className="mt-6 relative rounded-xl overflow-hidden shadow-2xl">
              <video autoPlay loop muted playsInline className="w-full h-auto">
                <source src={d.videoUrl} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- SERVICES SECTION ---------------- */
const Services = ({ d = {} }) => (
  <section className="py-16 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {safe(d.tag, "Our Programs")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {safe(d.heading, "Transform Your Fitness Journey")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          {safe(d.subtext, "We offer a variety of programs to help you achieve your fitness goals")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {arr(d.services).map((service, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={safe(service.image, "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b")}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-orange-500 text-white p-3 rounded-lg inline-flex">
                  {service.icon === "dumbbell" && <FaDumbbell size={24} />}
                  {service.icon === "running" && <FaRunning size={24} />}
                  {service.icon === "heartbeat" && <FaHeartbeat size={24} />}
                  {service.icon === "calendar" && <FaCalendarAlt size={24} />}
                  {service.icon === "shield" && <FaUserShield size={24} />}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{service.description}</p>
              <a
                href={service.ctaHref || "#contact"}
                className="inline-flex items-center text-orange-500 dark:text-orange-400 font-semibold hover:underline"
              >
                Learn more
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- WHY CHOOSE US SECTION ---------------- */
const WhyChooseUs = ({ d = {} }) => (
  <section className="py-16 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {safe(d.tag, "Why Choose Us")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {safe(d.heading, "Your Success Is Our Priority")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          {safe(d.subtext, "We go above and beyond to ensure you achieve your fitness goals")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {arr(d.features).map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-100 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <div className="bg-orange-500 text-white p-3 rounded-lg inline-flex mb-6">
              {feature.icon === "dumbbell" && <FaDumbbell size={24} />}
              {feature.icon === "shield" && <FaShieldAlt size={24} />}
              {feature.icon === "clock" && <FaRegClock size={24} />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- TRANSFORMATIONS SECTION ---------------- */
const Transformations = ({ d = {} }) => (
  <section className="py-16 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {safe(d.tag, "Success Stories")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {safe(d.heading, "Real People, Real Results")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          {safe(d.subtext, "See what our members have achieved with our programs")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {arr(d.stories).map((story, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <div className="flex">
                <div className="w-1/2 p-2">
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <img
                      src={story.beforeImage}
                      alt={`Before: ${story.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2">
                      Before
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <img
                      src={story.afterImage}
                      alt={`After: ${story.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-center py-2">
                      After
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{story.name}</h3>
              <p className="text-orange-500 dark:text-orange-400 font-semibold mb-3">{story.result}</p>
              <p className="text-gray-700 dark:text-gray-300">{story.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- PRICING SECTION ---------------- */
const Pricing = ({ d = {} }) => (
  <section className="py-16 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {safe(d.tag, "Membership Plans")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {safe(d.heading, "Affordable Plans For Everyone")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          {safe(d.subtext, "Choose the plan that fits your fitness goals and budget")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {arr(d.plans).map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
              plan.highlight ? "border-2 border-orange-500 transform -translate-y-2" : "border border-gray-200 dark:border-gray-700"
            }`}
          >
            {plan.highlight && (
              <div className="bg-orange-500 text-white text-center py-2 font-bold">
                Most Popular
              </div>
            )}
            <div className="p-8 bg-white dark:bg-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                {plan.priceSuffix && (
                  <span className="text-gray-600 dark:text-gray-300">/{plan.priceSuffix}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {arr(plan.features).map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaHref || "#contact"}
                className={`block text-center py-3 px-6 rounded-lg font-bold transition-colors ${
                  plan.highlight
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                    : "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
                }`}
              >
                {safe(plan.cta, "Get Started")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- TESTIMONIALS SECTION ---------------- */
const Testimonials = ({ d = {} }) => (
  <section className="py-16 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {safe(d.tag, "Testimonials")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {safe(d.heading, "What Our Members Say")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          {safe(d.subtext, "Don't just take our word for it - hear from our community")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {arr(d.reviews).map((review, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="text-orange-500 dark:text-orange-400 text-2xl mr-2">★</div>
              <div className="text-orange-500 dark:text-orange-400 text-2xl mr-2">★</div>
              <div className="text-orange-500 dark:text-orange-400 text-2xl mr-2">★</div>
              <div className="text-orange-500 dark:text-orange-400 text-2xl mr-2">★</div>
              <div className="text-orange-500 dark:text-orange-400 text-2xl">★</div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{review.quote}"</p>
            <div className="flex items-center">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- TRAINERS SECTION ---------------- */
const Trainers = ({ d = {} }) => (
  <section className="py-16 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {safe(d.tag, "Our Team")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {safe(d.heading, "Meet Our Expert Trainers")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          {safe(d.subtext, "Certified professionals dedicated to your success")}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {arr(d.trainers).map((trainer, idx) => (
          <div key={idx} className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64 overflow-hidden">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                <p className="text-orange-300">{trainer.specialty}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {arr(trainer.certifications).map((cert, cIdx) => (
                  <span key={cIdx} className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs px-3 py-1 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{trainer.bio}</p>
              <div className="flex space-x-3">
                {trainer.social?.instagram && (
                  <a href={trainer.social.instagram} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
                {trainer.social?.facebook && (
                  <a href={trainer.social.facebook} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- SCHEDULE SECTION ---------------- */
const Schedule = ({ d = {} }) => (
  <section className="py-16 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          {safe(d.tag, "Class Schedule")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {safe(d.heading, "Plan Your Workout")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          {safe(d.subtext, "Join our group classes at convenient times")}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-4 px-6 text-left">Time</th>
              {arr(d.days).map((day, idx) => (
                <th key={idx} className="py-4 px-6 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {arr(d.timeSlots).map((time, tIdx) => (
              <tr
                key={tIdx}
                className={`border-b border-gray-200 dark:border-gray-700 ${
                  tIdx % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : ""
                }`}
              >
                <td className="py-4 px-6 font-medium">{time}</td>
                {arr(d.days).map((day, dIdx) => {
                  const classInfo = d.schedule.find(
                    (c) => c.day === day && c.time === time
                  );
                  return (
                    <td key={dIdx} className="py-4 px-6 text-center">
                      {classInfo ? (
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {classInfo.className}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {classInfo.trainer}
                          </div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

/* ---------------- FAQ SECTION ---------------- */
const FAQ = ({ d = {} }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {safe(d.tag, "FAQs")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {safe(d.heading, "Frequently Asked Questions")}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            {safe(d.subtext, "Find answers to common questions about our gym")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {arr(d.questions).map((faq, idx) => (
            <div key={idx} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => toggleAccordion(idx)}
              >
                <h3 className="text-lg font-semibold text-left text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-orange-500 dark:text-orange-400 transition-transform ${
                    activeIndex === idx ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === idx ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-6 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- CONTACT SECTION ---------------- */
const Contact = ({ d = {} }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const websiteUrl = window.location.href;
    const subdomain = window.location.pathname.split("/site/")[1] || "unknown";

    await dispatch(
      createLead({
        name,
        email,
        phone,
        message: `Goal: ${goal}\nMessage: ${message}`,
        websiteUrl,
        subdomain,
      })
    )
      .then((result) => {
        if (result?.payload?.success) {
          setStatus("success");
          setName("");
          setEmail("");
          setPhone("");
          setGoal("");
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
    <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {safe(d.tag, "Get In Touch")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {safe(d.heading, "Ready To Start Your Journey?")}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            {safe(d.subtext, "Contact us today to schedule your free trial or ask any questions")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {d.address && (
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg mr-4">
                      <FaMapMarkerAlt className="text-orange-500 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {d.address.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}

                {d.phone && (
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg mr-4">
                      <FaPhone className="text-orange-500 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        <a href={`tel:${d.phone.replace(/\D/g, '')}`} className="hover:text-orange-500 dark:hover:text-orange-400">
                          {d.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {d.email && (
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg mr-4">
                      <FaEnvelope className="text-orange-500 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        <a href={`mailto:${d.email}`} className="hover:text-orange-500 dark:hover:text-orange-400">
                          {d.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {d.hours && (
                  <div className="flex items-start">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg mr-4">
                      <FaRegClock className="text-orange-500 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Opening Hours</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {d.hours.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {d.mapEmbed && (
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={d.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="dark:grayscale dark:opacity-80"
                ></iframe>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Goal
                  </label>
                  <select
                    id="goal"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                  >
                    <option value="">Select your goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                    <option value="Sports Performance">Sports Performance</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {status === "success" && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-center">
                  Thanks! We'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-center">
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

/* ---------------- FOOTER SECTION ---------------- */
const Footer = ({ d = {} }) => (
  <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12">
        {/* About Column */}
        <div>
          <h3 className="text-xl font-bold mb-6">{safe(d.brand, "Gym Name")}</h3>
          <p className="text-gray-400 mb-6">
            {safe(d.description, "Transform your body and redefine your life with our expert training programs and state-of-the-art facilities.")}
          </p>
          <div className="flex space-x-4">
            {arr(d.social).map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="text-gray-400 hover:text-orange-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.platform === "facebook" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                )}
                {social.platform === "instagram" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                )}
                {social.platform === "twitter" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                )}
                {social.platform === "youtube" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-xl font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {arr(d.links).map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Hours Column */}
        <div>
          <h3 className="text-xl font-bold mb-6">Opening Hours</h3>
          <ul className="space-y-3 text-gray-400">
            {arr(d.hours).map((hour, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{hour.day}</span>
                <span>{hour.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3 className="text-xl font-bold mb-6">Newsletter</h3>
          <p className="text-gray-400 mb-6">
            Subscribe to our newsletter for fitness tips, special offers, and gym updates.
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          {safe(d.copyright, `© ${new Date().getFullYear()} Gym Name. All rights reserved.`)}
        </p>
        {d.license && (
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            License: {d.license}
          </p>
        )}
      </div>
    </div>
  </footer>
);

/* ---------------- WHATSAPP FLOATING BUTTON ---------------- */
const WhatsAppButton = ({ d = {} }) => {
  if (!d.number) return null;
  
  return (
    <a
      href={`https://wa.me/${d.number.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

/* ---------------- MAIN TEMPLATE COMPONENT ---------------- */
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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 font-sans antialiased">
      {/* Navbar */}
      <Navbar d={data.navbar} />

      {/* Hero Section */}
      {data.hero && <Hero d={data.hero} />}

      {/* About Section */}
      {data.about && <About d={data.about} />}

      {/* Services Section */}
      {data.services && <Services d={data.services} />}

      {/* Why Choose Us Section */}
      {data.whyChooseUs && <WhyChooseUs d={data.whyChooseUs} />}

      {/* Transformations Section */}
      {data.transformations && <Transformations d={data.transformations} />}

      {/* Pricing Section */}
      {data.pricing && <Pricing d={data.pricing} />}

      {/* Testimonials Section */}
      {data.testimonials && <Testimonials d={data.testimonials} />}

      {/* Trainers Section */}
      {data.trainers && <Trainers d={data.trainers} />}

      {/* Schedule Section */}
      {data.schedule && <Schedule d={data.schedule} />}

      {/* FAQ Section */}
      {data.faq && <FAQ d={data.faq} />}

      {/* Contact Section */}
      {data.contact && <Contact d={data.contact} />}

      {/* Footer */}
      {data.footer && <Footer d={data.footer} />}

      {/* WhatsApp Button */}
      {data.whatsapp && <WhatsAppButton d={data.whatsapp} />}
    </div>
  );
}