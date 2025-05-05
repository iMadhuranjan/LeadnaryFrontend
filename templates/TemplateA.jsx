/* components/templates/TemplateUniversal.jsx
   ONE template to rule them all – fully data-driven
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
  <section className="relative flex flex-col items-center justify-center overflow-hidden py-20">
    {/* BG blobs */}
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-br
                        from-emerald-400 to-cyan-400 opacity-30 blur-3xl"
      />
      <div
        className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gradient-to-tr
                        from-cyan-400 to-sky-400 opacity-20 blur-2xl"
      />
    </div>

    <div className="relative z-10 max-w-7xl px-6 text-center sm:px-10">
      <h1 className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl">
        {safe(d.headlineStart)}{" "}
        <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
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
            className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500
                          px-6 py-3 font-semibold text-white shadow-md
                          transition-transform duration-300 hover:scale-105"
          >
            {d.primaryCta}
          </a>
        )}
        {d.secondaryCta && (
          <a
            href={d.secondaryHref || "#"}
            className="rounded-lg border border-emerald-500 px-6 py-3 font-semibold
                          text-emerald-600 transition-colors duration-300 hover:bg-emerald-50"
          >
            {d.secondaryCta}
          </a>
        )}
      </div>
    </div>
  </section>
);

/* LOGO BELT */
const Logos = ({ d = {}, heading, list }) =>
  arr(list).length ? (
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
      {heading && (
        <h2 className="mb-8 text-center text-2xl font-extrabold">{heading}</h2>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
        {list.map((item, i) => (
          <img
            key={i}
            src={safe(item.logoUrl)}
            alt="logo"
            className="h-12 object-contain"
          />
        ))}
      </div>
    </section>
  ) : null;

/*— ABOUT —*/
const About = ({ d = {} }) => (
  <section className="relative overflow-hidden bg-white py-16">
    <div
      className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full
                       bg-cyan-200 opacity-20 blur-3xl"
    />
    <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-12">
      {/* text */}
      <div>
        {d.tag && (
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-600">
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
            className="inline-block rounded-md bg-emerald-500 px-6 py-3 font-semibold text-white shadow
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
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
                  <img src={srv.icon} alt="" className="h-6 w-6" />
                </div>
              )}
              <h3 className="mb-2 text-xl font-semibold">{srv.title}</h3>
              <p className="text-gray-600">{srv.description}</p>
              <div
                className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500
                                 transition-all duration-500 group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/*— STATS BELT —*/
const Stats = ({ d = [] }) =>
  d.length ? (
    <section className="relative bg-gradient-to-r from-cyan-500 to-sky-600 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
          {d.map((s, idx) => (
            <div key={idx}>
              <div className="mb-2 text-4xl font-bold">{s.value}</div>
              <div className="text-cyan-100">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/*— TESTIMONIAL CARDS —*/
const Testimonials = ({ d }) =>
  arr(d.items).length ? (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHead {...d} />
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {d.items.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gray-50 p-8 shadow transition-transform duration-300
                            hover:scale-105"
            >
              <p className="mb-6 text-gray-700">"{t.quote}"</p>
              <div className="flex items-center">
                {t.avatarUrl && (
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="mr-3 h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/*— PRICING TABLE —*/
const Pricing = ({ d }) =>
  arr(d.plans).length ? (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHead {...d} />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {d.plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-105 ${
                p.highlight ? "shadow-2xl ring-2 ring-emerald-500" : ""
              }`}
            >
              <h3 className="mb-4 text-xl font-semibold">{p.name}</h3>
              <div className="mb-8 flex items-end">
                <span className="text-3xl font-extrabold">{p.price}</span>
                {p.priceSuffix && <span className="ml-1">{p.priceSuffix}</span>}
              </div>
              <ul className="mb-8 space-y-3 text-gray-700">
                {arr(p.features).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              {p.cta && (
                <a
                  href={p.ctaHref || "#"}
                  className="inline-block w-full rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500
                                py-3 text-center font-semibold text-white hover:from-emerald-600 hover:to-cyan-600"
                >
                  {p.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

/*— BOTTOM CTA —*/
const BottomCta = ({ d = {} }) => (
  <section className="relative bg-white py-16">
    <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
      {d.heading && (
        <h2 className="mb-4 text-3xl font-extrabold">{d.heading}</h2>
      )}
      {d.sub && <p className="mb-8 text-lg">{d.sub}</p>}
      {d.label && (
        <a
          href={d.href || "#"}
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500
                        px-6 py-3 text-base font-medium text-white shadow-lg transition-transform duration-300
                        hover:scale-105"
        >
          {d.label}
        </a>
      )}
    </div>
  </section>
);

/*— CONTACT + FOOTER — simplified; keep as-is or extend —*/
const Contact = ({ d = {} }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const disptach = useDispatch();
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
    const subdomain = path || "unknown"; // fallback
    console.log("Subdomain:", subdomain);
    const websiteUrl = window.location.href;

    await disptach(
      createLead({
        name,
        email,
        // phone, // if you have it
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

  if (!d.heading && !d.address) return null; // no need to render empty section

  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-16">
        {/* info */}
        <div>
          {d.heading && (
            <h2 className="mb-4 text-3xl font-extrabold">{d.heading}</h2>
          )}
          {d.sub && <p className="mb-6 text-lg">{d.sub}</p>}
          <div className="space-y-4">
            {d.address && (
              <p>
                <span className="font-semibold">Address:</span>
                <br />
                {d.address.split("\n").map((s, i) => (
                  <span key={i}>
                    {s}
                    <br />
                  </span>
                ))}
              </p>
            )}
            {d.phone && (
              <p>
                <span className="font-semibold">Phone:</span> {d.phone}
              </p>
            )}
            {d.email && (
              <p>
                <span className="font-semibold">Email:</span> {d.email}
              </p>
            )}
          </div>
        </div>

        {/* actual lead capture form */}
        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            rows="4"
            placeholder="Message"
            className="w-full resize-none rounded-md border border-gray-300 px-4 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-white"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-600 font-medium text-center">
              Thanks! We'll get back to you soon.
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

const Footer = ({ d = {} }) => (
  <footer className="bg-gray-900 py-12 text-white">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-3 gap-8">
      {/* col 1 */}
      <div>
        <h3 className="mb-4 text-xl font-bold">{safe(d.brand)}</h3>
        <p className="mb-6 text-gray-400">{safe(d.desc)}</p>
        <div className="flex space-x-4">
          {arr(d.social).map((s, i) => (
            <a key={i} href={s.href} className="opacity-80 hover:opacity-100">
              <img src={s.icon} alt="" className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      {/* links */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
        <ul className="space-y-2">
          {arr(d.links).map((l, i) => (
            <li key={i}>
              <a href={l.href} className="text-gray-400 hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* newsletter */}
      <div>
        {d.newsletterText && (
          <>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-gray-400">{d.newsletterText}</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm"
              />
              <button
                className="rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </>
        )}
      </div>
    </div>

    {d.copyright && (
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-400">
        {d.copyright}
      </div>
    )}
  </footer>
);

/* ------- tiny component used by several sections -------- */
const SectionHead = ({ tag, heading, sub }) => (
  <div className="text-center">
    {tag && (
      <span className="mb-3 inline-block rounded-full bg-cyan-100 px-4 py-1 text-sm font-medium text-cyan-600">
        {tag}
      </span>
    )}
    {heading && <h2 className="mb-6 text-3xl font-extrabold">{heading}</h2>}
    {sub && <p className="mx-auto max-w-2xl text-lg">{sub}</p>}
  </div>
);

/* ---------------- MAIN UNIVERSAL TEMPLATE ---------------- */
export default function TemplateUniversal({ data }) {
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
    <div className="min-h-screen w-full bg-gray-50 font-sans antialiased">
      {/* Render only what the user provided */}
      {data.hero && <Hero d={data.hero} />}

      {arr(data.logos).length > 0 && (
        <Logos heading={data.logosHeheadading} list={data.logos} />
      )}

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

      {arr(data.stats).length > 0 && <Stats d={data.stats} />}

      {data.testimonials && (
        <Testimonials
          d={{
            tag: data.testimonialsTag,
            heading: data.testimonialsHeading,
            items: data.testimonials,
          }}
        />
      )}

      {data.pricing && (
        <Pricing
          d={{
            tag: data.pricingTag,
            heading: data.pricingHeading,
            sub: data.pricingSub,
            plans: data.pricing,
          }}
        />
      )}

      {data.cta && <BottomCta d={data.cta} />}

      {data.contact && <Contact d={data.contact} />}

      {data.footer && <Footer d={data.footer} />}
    </div>
  );
}
