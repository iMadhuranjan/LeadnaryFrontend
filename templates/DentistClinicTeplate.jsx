/* components/templates/DentistTemplate.jsx */
"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { collectAnalytics } from "@/app/store/analyticSlice";
import { createLead } from "@/app/store/leadSlice";

/* ---------------- small helpers ---------------- */
const arr = (v) => (Array.isArray(v) ? v : []);
const safe = (v, d = "") => v ?? d;

/* ---------------- SECTION RENDERERS ------------ */
/*— HERO —*/
const Hero = ({ d = {} }) => (
  <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-blue-50 to-white">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-2xl" />
    </div>

    <div className="relative z-10 max-w-7xl px-6 text-center sm:px-10">
      <h1 className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl">
        {safe(d.headlineStart)}{" "}
        <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
          {safe(d.highlight)}
        </span>
      </h1>
      {d.subtext && (
        <p className="mx-auto mb-8 max-w-3xl text-lg md:text-xl">{d.subtext}</p>
      )}

      <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
        {d.primaryCta && (
          <a
            href={d.primaryHref || "#"}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-teal-500
                      px-6 py-3 font-semibold text-white shadow-md
                      transition-transform duration-300 hover:scale-105"
          >
            {d.primaryCta}
          </a>
        )}
        {d.secondaryCta && (
          <a
            href={d.secondaryHref || "#"}
            className="rounded-lg border border-blue-500 px-6 py-3 font-semibold
                      text-blue-600 transition-colors duration-300 hover:bg-blue-50"
          >
            {d.secondaryCta}
          </a>
        )}
      </div>
    </div>
  </section>
);

/*— ABOUT —*/
const About = ({ d = {} }) => (
  <section className="relative overflow-hidden bg-white py-16">
    <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-blue-100 opacity-20 blur-3xl" />
    <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-12">
      <div>
        {d.tag && (
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
            {d.tag}
          </span>
        )}
        {d.heading && (
          <h2 className="mt-4 mb-6 text-3xl font-extrabold">{d.heading}</h2>
        )}
        {arr(d.paragraphs).map((p, idx) => (
          <p key={idx} className="mb-4 text-lg">
            {p}
          </p>
        ))}
        {d.cta && (
          <a
            href={d.ctaHref || "#"}
            className="inline-block rounded-md bg-blue-500 px-6 py-3 font-semibold text-white shadow
                      transition-transform duration-300 hover:scale-105"
          >
            {d.cta}
          </a>
        )}
      </div>
      {d.imageUrl && (
        <div className="relative overflow-hidden rounded-xl shadow-xl">
          <img
            src={d.imageUrl}
            alt={d.imageAlt || "about"}
            className="h-auto w-full object-cover"
          />
        </div>
      )}
    </div>
  </section>
);

/*— SERVICES GRID —*/
const Services = ({ d }) =>
  arr(d.items).length ? (
    <section id="services" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHead {...d} />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {d.items.map((srv, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow transition-all
                        duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {srv.icon && (
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                  <img src={srv.icon} alt="" className="h-6 w-6" />
                </div>
              )}
              <h3 className="mb-2 text-xl font-semibold">{srv.title}</h3>
              <p className="text-gray-600">{srv.description}</p>
              <div
                className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-teal-500
                             transition-all duration-500 group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/*— TEAM SECTION —*/
const Team = ({ d }) =>
  arr(d.members).length ? (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHead {...d} />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {d.members.map((member, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-300 hover:scale-105"
            >
              {member.imageUrl && (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-64 w-full object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
                <p className="mt-2 text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/*— TESTIMONIALS —*/
const Testimonials = ({ d }) =>
  arr(d.items).length ? (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHead {...d} />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {d.items.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="mb-4 flex items-center">
                {t.avatarUrl && (
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="mr-4 h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
              <p className="text-gray-700">"{t.quote}"</p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < t.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/*— CONTACT —*/
const Contact = ({ d = {} }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await dispatch(
        createLead({
          name,
          email,
          phone,
          message,
          websiteUrl: window.location.href,
        })
      );
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="mb-4 text-3xl font-extrabold">
            {d.heading || "Contact Us"}
          </h2>
          {d.sub && <p className="mb-6 text-lg">{d.sub}</p>}
          <div className="space-y-4">
            {d.address && (
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-blue-500"
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
                <div>
                  {d.address.split("\n").map((s, i) => (
                    <span key={i}>
                      {s}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            )}
            {d.phone && (
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 mr-2 text-blue-500"
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
                <a
                  href={`tel:${d.phone.replace(/\D/g, "")}`}
                  className="hover:text-blue-600"
                >
                  {d.phone}
                </a>
              </div>
            )}
            {d.email && (
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 mr-2 text-blue-500"
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
                <a href={`mailto:${d.email}`} className="hover:text-blue-600">
                  {d.email}
                </a>
              </div>
            )}
            {d.hours && (
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-blue-500"
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
                <div>
                  <span className="font-semibold">Hours:</span>
                  <br />
                  {d.hours.split("\n").map((s, i) => (
                    <span key={i}>
                      {s}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-300 px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-300 px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-gradient-to-r from-blue-500 to-teal-500 py-3 font-semibold text-white hover:from-blue-600 hover:to-teal-600"
          >
            {status === "loading" ? "Sending..." : "Book Appointment"}
          </button>

          {status === "success" && (
            <p className="text-green-600 font-medium text-center">
              Thank you! We'll contact you shortly to confirm your appointment.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 font-medium text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

/*— FOOTER —*/
const Footer = ({ d = {} }) => (
  <footer className="bg-gray-900 py-12 text-white">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-4 gap-8">
      <div className="md:col-span-2">
        <h3 className="mb-4 text-xl font-bold">
          {safe(d.brand, "DentalCare")}
        </h3>
        <p className="mb-6 text-gray-400">
          {safe(
            d.desc,
            "Your trusted partner for comprehensive dental care and beautiful smiles."
          )}
        </p>
        <div className="flex space-x-4">
          {arr(d.social).map((s, i) => (
            <a
              key={i}
              href={s.href}
              className="opacity-80 hover:opacity-100 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={s.icon} alt={s.name} className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
        <ul className="space-y-2">
          {arr(d.links).map((l, i) => (
            <li key={i}>
              <a
                href={l.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Opening Hours</h3>
        <ul className="space-y-2 text-gray-400">
          {arr(d.hours).map((h, i) => (
            <li key={i} className="flex justify-between">
              <span>{h.day}</span>
              <span>{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-400">
      {d.copyright ||
        `© ${new Date().getFullYear()} DentalCare. All rights reserved.`}
    </div>
  </footer>
);

/* ------- tiny component used by several sections -------- */
const SectionHead = ({ tag, heading, sub }) => (
  <div className="text-center">
    {tag && (
      <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
        {tag}
      </span>
    )}
    {heading && <h2 className="mb-6 text-3xl font-extrabold">{heading}</h2>}
    {sub && <p className="mx-auto max-w-2xl text-lg">{sub}</p>}
  </div>
);

/* ---------------- MAIN TEMPLATE ---------------- */
export default function DentistTemplate({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Track page view
    dispatch(
      collectAnalytics({
        pageTitle: data.meta?.title || "Dental Clinic",
        pageUrl: window.location.href,
      })
    );
  }, [dispatch, data.meta]);

  return (
    <div className="min-h-screen w-full bg-white font-sans antialiased">
      {/* Meta tags */}
      <Head>
        <title>
          {data.meta?.title || "Premium Dental Care | Your Smile Matters"}
        </title>
        <meta
          name="description"
          content={
            data.meta?.description ||
            "Professional dental services for the whole family. Book your appointment today for a healthier smile."
          }
        />
        <meta
          property="og:title"
          content={
            data.meta?.title || "Premium Dental Care | Your Smile Matters"
          }
        />
        <meta
          property="og:description"
          content={
            data.meta?.description ||
            "Professional dental services for the whole family. Book your appointment today for a healthier smile."
          }
        />
        <meta property="og:type" content="website" />
        {data.meta?.imageUrl && (
          <meta property="og:image" content={data.meta.imageUrl} />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Render sections */}
      {data.hero && <Hero d={data.hero} />}

      {data.about && <About d={data.about} />}

      {data.services && (
        <Services
          d={{
            tag: data.servicesTag,
            heading: data.servicesHeading,
            sub: data.servicesSub,
            items: data.services,
          }}
        />
      )}

      {data.team && (
        <Team
          d={{
            tag: data.teamTag,
            heading: data.teamHeading,
            sub: data.teamSub,
            members: data.team,
          }}
        />
      )}

      {data.testimonials && (
        <Testimonials
          d={{
            tag: data.testimonialsTag,
            heading: data.testimonialsHeading,
            sub: data.testimonialsSub,
            items: data.testimonials,
          }}
        />
      )}

      {data.contact && <Contact d={data.contact} />}

      <Footer d={data.footer} />
    </div>
  );
}

// Head component for meta tags
const Head = ({ children }) => {
  useEffect(() => {
    // Dynamically update meta tags
    const title = children.find((child) => child.type === "title")?.props
      .children;
    const metaTags = children.filter((child) => child.type === "meta");

    if (title) {
      document.title = title;
    }

    metaTags.forEach((tag) => {
      const prop = Object.keys(tag.props).find(
        (p) => p.startsWith("property") || "name"
      );
      const value = tag.props[prop];
      const content = tag.props.content;

      let metaTag = document.querySelector(`meta[${prop}="${value}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute(prop, value);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    });
  }, [children]);

  return null;
};
