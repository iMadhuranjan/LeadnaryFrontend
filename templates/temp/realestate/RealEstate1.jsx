"use client";
import { collectAnalytics } from "@/app/store/analyticSlice";
import { createLead } from "@/app/store/leadSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Helper functions
const arr = (v) => (Array.isArray(v) ? v : []);
const safe = (v, d = "") => v ?? d;

/* ========== COMPONENTS ========== */

// WhatsApp Floating Button
const WhatsAppButton = ({
  phone,
  message = "Hello, I'm interested in becoming a channel partner",
}) => {
  if (!phone) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-14 w-14 rounded-full bg-green-500 shadow-lg transition-all hover:bg-green-600 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-8 w-8 fill-white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29 3.617c-.173.076-.347.061-.423-.061-.076-.123-.291-.396-.356-.471-.064-.074-.132-.074-.248-.024l-.423.198c-.099.05-.198.074-.347.074-.149 0-.347-.05-.545-.248-.198-.198-.767-.744-.92-1.002-.153-.258-.183-.432-.008-.694.093-.136.208-.306.311-.471.11-.173.124-.273.062-.421-.063-.149-.132-.347-.198-.521-.066-.173-.132-.281-.198-.281-.066 0-.132-.01-.215-.01-.083 0-.215.033-.329.083l-.413.207c-.173.083-.347.182-.52.281-.174.099-.26.149-.334.149-.083 0-.174-.075-.348-.223-.173-.149-.364-.347-.554-.545-.198-.198-.416-.521-.554-.793-.139-.272-.111-.417 0-.533.112-.116.557-.557.744-.744.174-.174.223-.273.334-.422.11-.15.055-.273.027-.298l-.186-.223c-.062-.074-.124-.149-.248-.223s-.273-.062-.372-.037l-.421.083c-.132.033-.347.116-.52.545-.173.426-.66 1.324-.66 1.812 0 .488.174.942.26 1.09.086.148.347.471.793.793.446.322.744.471 1.157.644.413.174.793.149 1.072.1.278-.05.793-.298 1.006-.595.213-.297.426-.694.554-.893.128-.198.223-.174.372-.074l1.215.793c.149.099.26.149.347.149.086 0 .173-.05.26-.099.086-.05.173-.124.223-.198.061-.083.061-.149.023-.223l-.446-.892z" />
          <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.768 0-3.46-.51-4.93-1.48l-3.59.98.98-3.59A9.932 9.932 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z" />
        </svg>
      </a>
    </div>
  );
};

// Navbar
const Navbar = ({ logoImage, links, cta }) => {
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
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              {logoImage && (
                <img src={logoImage} alt="Logo" className="h-10 w-auto" />
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {arr(links).map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            {cta && (
              <a
                href={cta.href}
                className="hidden md:inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
              >
                {cta.label}
              </a>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
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
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white">
          {arr(links).map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              {link.label}
            </a>
          ))}
          {cta && (
            <a
              href={cta.href}
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

// Hero Section
const Hero = ({
  backgroundImages,
  headlineStart,
  highlight,
  subtext,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!backgroundImages || backgroundImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      {/* Background images slider */}
      {/* {backgroundImages && backgroundImages.length > 0 && (
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              style={{ backgroundImage: `url(${image})` }
            />
          ))}
          <div className="absolute inset-0 bg-white bg-opacity-70" />
        </div>
      )} */}

      <div className="relative z-10 max-w-7xl px-6 text-center sm:px-10">
        <h1 className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl text-gray-900">
          {safe(headlineStart)}{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {safe(highlight)}
          </span>
        </h1>
        {subtext && (
          <p className="mx-auto mb-8 max-w-3xl text-lg md:text-xl text-gray-600">
            {subtext}
          </p>
        )}

        <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
          {primaryCta && (
            <a
              href={primaryHref || "#"}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105"
            >
              {primaryCta}
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryHref || "#"}
              className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-colors duration-300 hover:bg-blue-50"
            >
              {secondaryCta}
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="h-8 w-8 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

// Partner Benefits
const PartnerBenefits = ({ benefits }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Channel Partner Benefits
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Join our network and unlock exclusive advantages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {arr(benefits).map((benefit, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 bg-white"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                    <img src={benefit.iconImage} alt="" className="h-6 w-6" />
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-gray-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partner Program
const PartnerProgram = ({ program }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div>
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800 mb-4">
            {program.tag}
          </span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {program.heading}
          </h2>

          {arr(program.paragraphs).map((p, idx) => (
            <p key={idx} className="mb-4 text-lg text-gray-600">
              {p}
            </p>
          ))}

          {program.features && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {arr(program.features).map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {program.cta && (
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href={program.ctaHref || "#"}
                className="rounded-md bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 font-semibold text-white shadow transition-transform duration-300 hover:scale-105"
              >
                {program.cta}
              </a>
              {program.secondaryCta && (
                <a
                  href={program.secondaryCtaHref || "#"}
                  className="rounded-md border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-colors duration-300 hover:bg-blue-50"
                >
                  {program.secondaryCta}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Image */}
        {program.imageUrl && (
          <div className="relative rounded-xl shadow-xl overflow-hidden">
            <img
              src={program.imageUrl}
              alt={program.imageAlt || "Partner program"}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

// Stats Section
const Stats = ({ stats }) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
          {arr(stats).map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partner Testimonials
const PartnerTestimonials = ({ testimonials }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            What Our Partners Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Hear from our successful channel partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {arr(testimonials).map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:scale-105 bg-gray-50"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 italic text-gray-700">"{testimonial.quote}"</p>
              <div className="flex items-center">
                {testimonial.avatarImage && (
                  <img
                    src={testimonial.avatarImage}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = ({ contact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const path = window.location.pathname.split("/site/")[1];
    const subdomain = path || "unknown";
    const websiteUrl = window.location.href;

    try {
      await dispatch(
        createLead({
          name,
          email,
          phone,
          message,
          websiteUrl,
          subdomain,
        })
      ).unwrap();

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {contact.heading || "Become a Partner"}
          </h2>
          {contact.sub && (
            <p className="mb-8 text-lg text-gray-600">{contact.sub}</p>
          )}

          <div className="space-y-6 text-gray-700">
            {contact.address && (
              <div className="flex">
                <svg
                  className="h-6 w-6 mr-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p>
                    {contact.address.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {contact.phone && (
              <div className="flex">
                <svg
                  className="h-6 w-6 mr-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p>{contact.phone}</p>
                </div>
              </div>
            )}

            {contact.email && (
              <div className="flex">
                <svg
                  className="h-6 w-6 mr-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p>{contact.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md p-3 bg-white border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md p-3 bg-white border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md p-3 bg-white border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-md p-3 bg-white border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-md font-medium hover:from-blue-700 hover:to-indigo-800 transition-colors disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : "Become a Partner"}
            </button>

            {status === "success" && (
              <div className="p-3 rounded-md bg-green-100 text-green-800">
                Thank you! We'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="p-3 rounded-md bg-red-100 text-red-800">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = ({ footer }) => {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Column */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            {footer.logoImage && (
              <img src={footer.logoImage} alt="Logo" className="h-10 mr-3" />
            )}
            <span className="text-xl font-bold">{footer.brand}</span>
          </div>
          <p className="text-gray-400 mb-6">{footer.description}</p>
          <div className="flex space-x-4">
            {arr(footer.social).map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src={social.iconImage}
                  alt={social.name}
                  className="h-6 w-6"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {arr(footer.links).map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <address className="not-italic text-gray-400 space-y-2">
            {footer.address && (
              <p>
                {footer.address.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )}
            {footer.phone && (
              <p>
                <a
                  href={`tel:${footer.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {footer.phone}
                </a>
              </p>
            )}
            {footer.email && (
              <p>
                <a
                  href={`mailto:${footer.email}`}
                  className="hover:text-white transition-colors"
                >
                  {footer.email}
                </a>
              </p>
            )}
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
        {footer.copyright ||
          `© ${new Date().getFullYear()} All Rights Reserved`}
      </div>
    </footer>
  );
};

/* ========== MAIN TEMPLATE ========== */
export default function RealEstateCPTemplate({ data }) {
  const dispatch = useDispatch();

  // Analytics tracking
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
    <div className="min-h-screen w-full bg-gray-50 font-sans antialiased">
      {/* Navbar */}
      <Navbar
        logoImage={data.navbar?.logoImage}
        links={data.navbar?.links}
        cta={data.navbar?.cta}
      />

      {/* Hero Section */}
      {data.hero && <Hero {...data.hero} />}

      {/* Partner Benefits */}
      {data.benefits && <PartnerBenefits benefits={data.benefits} />}

      {/* Partner Program */}
      {data.program && <PartnerProgram program={data.program} />}

      {/* Stats Section */}
      {data.stats && <Stats stats={data.stats} />}

      {/* Partner Testimonials */}
      {data.testimonials && (
        <PartnerTestimonials testimonials={data.testimonials} />
      )}

      {/* Contact Section */}
      {data.contact && <Contact contact={data.contact} />}

      {/* Footer */}
      {data.footer && <Footer footer={data.footer} />}

      {/* WhatsApp Button */}
      {data.whatsapp && (
        <WhatsAppButton
          phone={data.whatsapp.phone}
          message={data.whatsapp.message}
        />
      )}
    </div>
  );
}
