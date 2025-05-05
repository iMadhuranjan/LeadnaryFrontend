/* components/templates/TemplateDentist.jsx */
"use client";
import { motion } from "framer-motion";
import { FaTooth, FaClinicMedical, FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { collectAnalytics } from "@/app/store/analyticSlice";
import { createLead } from "@/app/store/leadSlice";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

/* ---------------- small helpers ---------------- */
const arr = (v) => (Array.isArray(v) ? v : []);
const safe = (v, d = "") => v ?? d;

/* Animation variants */
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

/* ---------------- SECTION RENDERERS ------------ */
/*— NAVBAR —*/
const Navbar = ({ d = {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'}`}
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <img
                                src={d.logoUrl || "/dentist-logo.png"}
                                alt="Dentist logo"
                                className="h-12"
                            />
                        </motion.div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-blue-600 hover:bg-blue-50"
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
                        </motion.button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {arr(d.links).map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium relative group"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {link.label}
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: '100%' }}
                                    />
                                </motion.a>
                            ))}
                            {d.cta && (
                                <motion.a
                                    href={d.ctaHref || "#appointment"}
                                    className="ml-4 rounded-md bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-2 font-medium text-white hover:from-blue-700 hover:to-teal-600"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {d.cta}
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white shadow-lg"
                >
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {arr(d.links).map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600"
                                variants={fadeIn}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        {d.cta && (
                            <motion.a
                                href={d.ctaHref || "#appointment"}
                                className="block rounded-md bg-gradient-to-r from-blue-600 to-teal-500 px-3 py-2 text-center text-base font-medium text-white"
                                variants={fadeIn}
                            >
                                {d.cta}
                            </motion.a>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

/*— HERO —*/
const Hero = ({ d = {} }) => (
    <section
        className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-32 pb-20"
        id="home"
    >
        <div className="absolute inset-0">
            <img
                src={d.backgroundImageUrl || "/dentist-hero-bg.jpg"}
                alt="Dental clinic"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-white/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.div variants={fadeIn}>
                    <span className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                        <FaTooth className="mr-2" /> {safe(d.tag, "Modern Dentistry")}
                    </span>
                </motion.div>

                <motion.h1 variants={fadeIn} className="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
                    {safe(d.headlineStart, "Your Smile")}{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                        {safe(d.highlight, "Our Priority")}
                    </span>
                </motion.h1>

                {d.subtext && (
                    <motion.p variants={fadeIn} className="mb-8 text-lg text-gray-700 md:text-xl max-w-2xl">
                        {d.subtext}
                    </motion.p>
                )}

                <motion.div variants={fadeIn} className="flex   gap-4">
                    {d.primaryCta && (
                        <motion.a
                            href={d.primaryHref || "#appointment"}
                            className="rounded-lg bg-gradient-to-r from-blue-600 to-teal-500
                         px-6 py-3 font-semibold text-white shadow-xl
                         transform transition duration-300 hover:scale-105 w-fit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {d.primaryCta}
                        </motion.a>
                    )}
                    {d.secondaryCta && (
                        <motion.a
                            href={d.secondaryHref || "#services"}
                            className="rounded-lg border border-blue-600 px-6 py-3 font-semibold
                         text-blue-600 shadow hover:bg-blue-50 transition-colors duration-300 w-fit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {d.secondaryCta}
                        </motion.a>
                    )}
                </motion.div>
            </motion.div>

            {d.imageUrl && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden md:block"
                >
                    <img
                        src={d.imageUrl}
                        alt="Happy patient"
                        className="rounded-xl shadow-2xl"
                    />
                    <motion.div
                        className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <FaClinicMedical className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Years Experience</p>
                                <p className="text-2xl font-bold text-gray-900">{safe(d.experienceYears, "15+")}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    </section>
);

/*— SERVICES —*/
const Services = ({ d = {} }) => (
    <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center mb-16"
            >
                <motion.div variants={fadeIn}>
                    <span className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                        <FaTooth className="mr-2" /> {safe(d.tag, "Our Services")}
                    </span>
                </motion.div>
                <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    {safe(d.heading, "Comprehensive Dental Care")}
                </motion.h2>
                {d.sub && (
                    <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-lg text-gray-600">
                        {d.sub}
                    </motion.p>
                )}
            </motion.div>

            <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {arr(d.services).map((service, idx) => (
                    <motion.div
                        key={idx}
                        variants={fadeIn}
                        className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-blue-100 cursor-pointer"
                        whileHover={{ y: -10 }}
                    >
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-all duration-300">
                            <img
                                src={service.iconUrl}
                                alt=""
                                className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {service.description}
                        </p>

                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

/*— ABOUT —*/
const About = ({ d = {} }) => (
    <section id="about" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-2 gap-12 items-center">
            {/* image */}
            {d.imageUrl && (
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <img
                        src={d.imageUrl}
                        alt={d.imageAlt || "Our dental clinic"}
                        className="rounded-xl shadow-xl"
                    />
                    <motion.div
                        className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <FaCalendarAlt className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Appointments</p>
                                <p className="text-2xl font-bold text-gray-900">{safe(d.appointmentsCount, "5000+")}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* text */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <motion.div variants={fadeIn}>
                    <span className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                        <FaTooth className="mr-2" /> {safe(d.tag, "About Us")}
                    </span>
                </motion.div>

                <motion.h2 variants={fadeIn} className="mt-4 mb-6 text-3xl font-extrabold">
                    {safe(d.heading, "Quality Care With Modern Technology")}
                </motion.h2>

                {arr(d.paragraphs).map((p, idx) => (
                    <motion.p key={idx} variants={fadeIn} className="mb-4 text-lg text-gray-700">
                        {p}
                    </motion.p>
                ))}

                <motion.div variants={fadeIn} className="mt-8 grid sm:grid-cols-2 gap-6">
                    {arr(d.stats).map((stat, idx) => (
                        <div key={idx} className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-full mr-4">
                                <img src={stat.iconUrl} alt="" className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {d.cta && (
                    <motion.a
                        variants={fadeIn}
                        href={d.ctaHref || "#"}
                        className="mt-8 inline-block rounded-md bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-3 font-semibold text-white shadow
                      transition-transform duration-300 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {d.cta}
                    </motion.a>
                )}
            </motion.div>
        </div>
    </section>
);

/*— DOCTORS —*/
const Doctors = ({ d = {} }) => (
    <section id="doctors" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center mb-16"
            >
                <motion.div variants={fadeIn}>
                    <span className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                        <FaTooth className="mr-2" /> {safe(d.tag, "Our Team")}
                    </span>
                </motion.div>
                <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    {safe(d.heading, "Meet Our Dentists")}
                </motion.h2>
                {d.sub && (
                    <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-lg text-gray-600">
                        {d.sub}
                    </motion.p>
                )}
            </motion.div>

            <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {arr(d.doctors).map((doctor, idx) => (
                    <motion.div
                        key={idx}
                        variants={fadeIn}
                        className="group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="relative overflow-hidden h-80">
                            <img
                                src={doctor.imageUrl}
                                alt={doctor.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <p className="text-white text-sm mb-1">{doctor.specialization}</p>
                                    <h3 className="text-white text-xl font-bold">{doctor.name}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                            <p className="text-blue-600 font-medium mb-4">{doctor.specialization}</p>
                            <p className="text-gray-600 mb-4">{doctor.bio}</p>
                            <div className="flex space-x-3">
                                {doctor.socialLinks?.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.url}
                                        className="text-gray-400 hover:text-blue-600 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {social.platform === 'facebook' && <FaFacebook className="text-lg" />}
                                        {social.platform === 'twitter' && <FaTwitter className="text-lg" />}
                                        {social.platform === 'instagram' && <FaInstagram className="text-lg" />}
                                        {social.platform === 'linkedin' && <FaLinkedin className="text-lg" />}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

/*— TESTIMONIALS —*/
const Testimonials = ({ d = {} }) => (
    <section id="testimonials" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center mb-16"
            >
                <motion.div variants={fadeIn}>
                    <span className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                        <FaTooth className="mr-2" /> {safe(d.tag, "Testimonials")}
                    </span>
                </motion.div>
                <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    {safe(d.heading, "What Our Patients Say")}
                </motion.h2>
                {d.sub && (
                    <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-lg text-gray-600">
                        {d.sub}
                    </motion.p>
                )}
            </motion.div>

            <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {arr(d.testimonials).map((testimonial, idx) => (
                    <motion.div
                        key={idx}
                        variants={fadeIn}
                        className="bg-white p-8 rounded-xl shadow-lg"
                        whileHover={{ y: -5 }}
                    >
                        <div className="mb-4 flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`h-5 w-5 ${star <= testimonial.rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="mb-6 text-gray-700 italic">"{testimonial.quote}"</p>
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
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

/*— APPOINTMENT —*/
const Appointment = ({ d = {} }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();

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
                phone,
                date,
                service,
                message,
                websiteUrl,
                subdomain,
                type: "appointment"
            })
        )
            .then((result) => {
                if (result?.payload?.success) {
                    setStatus("success");
                    setName("");
                    setEmail("");
                    setPhone("");
                    setDate("");
                    setService("");
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
        <section id="appointment" className="bg-gradient-to-r from-blue-600 to-teal-500 py-20 text-white">
            <div className="mx-auto max-w-7xl px-3">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeIn}>
                        <span className="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white">
                            <FaCalendarAlt className="mr-2" /> {safe(d.tag, "Book Now")}
                        </span>
                    </motion.div>
                    <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-extrabold sm:text-4xl">
                        {safe(d.heading, "Schedule Your Appointment")}
                    </motion.h2>
                    {d.sub && (
                        <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-lg text-blue-100">
                            {d.sub}
                        </motion.p>
                    )}
                </motion.div>

                <motion.div
                    className="bg-white rounded-xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid md:grid-cols-2">
                        {/* Form */}
                        <div className="p-8 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-black"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-black"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-black"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>


                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Your Problem
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-black"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <motion.button
                                        type="submit"
                                        className="w-fit rounded-md bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-teal-600 transition-colors duration-300"
                                        disabled={status === "loading"}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {status === "loading" ? "Booking..." : "Book Appointment"}
                                    </motion.button>
                                </div>

                                {status === "success" && (
                                    <div className="rounded-md bg-green-100 p-4 text-green-800">
                                        Thank you! Your appointment request has been sent. We'll contact you shortly to confirm.
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="rounded-md bg-red-100 p-4 text-red-800">
                                        Something went wrong. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Info */}
                        <div className="bg-blue-50 p-8 sm:p-10 flex flex-col justify-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                <motion.h3 variants={fadeIn} className="mb-6 text-2xl font-bold text-gray-900">
                                    Contact Information
                                </motion.h3>

                                <motion.div variants={fadeIn} className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <FaPhoneAlt className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                                            <p className="text-gray-600">{d.phone || "(123) 456-7890"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <FaEnvelope className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900">Email</h4>
                                            <p className="text-gray-600">{d.email || "info@dentistexample.com"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <FaMapMarkerAlt className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900">Address</h4>
                                            <p className="text-gray-600">
                                                {d.address || "123 Dental St, Smile City"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <FaClock className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900">Hours</h4>
                                            <p className="text-gray-600">
                                                {d.hours || "Mon-Fri: 8am - 6pm\nSat: 9am - 3pm"}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};


/*— FOOTER —*/
const Footer = ({ d = {} }) => (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 grid md:grid-cols-4 gap-12">
            {/* About */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h3 className="mb-6 text-xl font-bold">
                    <img
                        src={d.logoUrl || "/dentist-logo-white.png"}
                        alt="Dentist logo"
                        className="h-10"
                    />
                </h3>
                <p className="mb-6 text-gray-400">
                    {safe(
                        d.desc,
                        "Providing exceptional dental care with the latest technology and a compassionate approach."
                    )}
                </p>
                <div className="flex space-x-4">
                    {arr(d.social).map((s, i) => (
                        <motion.a
                            key={i}
                            href={s.href}
                            className="text-gray-400 hover:text-white transition-colors duration-300"
                            whileHover={{ y: -3 }}
                        >
                            <span className="sr-only">{s.name}</span>
                            {s.platform === 'facebook' && <FaFacebook className="text-xl" />}
                            {s.platform === 'twitter' && <FaTwitter className="text-xl" />}
                            {s.platform === 'instagram' && <FaInstagram className="text-xl" />}
                            {s.platform === 'linkedin' && <FaLinkedin className="text-xl" />}
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
            >
                <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-3">
                    {arr(d.links).map((l, i) => (
                        <li key={i}>
                            <motion.a
                                href={l.href}
                                className="text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                                whileHover={{ x: 5 }}
                            >
                                {l.label}
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Services */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="mb-6 text-lg font-semibold">Dental Services</h3>
                <ul className="space-y-3">
                    {arr(d.services).map((s, i) => (
                        <li key={i}>
                            <motion.a
                                href={s.href || "#"}
                                className="text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                                whileHover={{ x: 5 }}
                            >
                                {s.name}
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <h3 className="mb-6 text-lg font-semibold">Contact Us</h3>
                <ul className="space-y-4 text-gray-400">
                    <li className="flex items-start">
                        <FaMapMarkerAlt className="mt-1 mr-4 text-blue-400 flex-shrink-0" />
                        <span>{d.address || "123 Dental St, Smile City"}</span>
                    </li>
                    <li className="flex items-start">
                        <FaPhoneAlt className="mt-1 mr-4 text-blue-400 flex-shrink-0" />
                        <span>{d.phone || "(123) 456-7890"}</span>
                    </li>
                    <li className="flex items-start">
                        <FaEnvelope className="mt-1 mr-4 text-blue-400 flex-shrink-0" />
                        <span>{d.email || "info@dentistexample.com"}</span>
                    </li>
                    <li className="flex items-start">
                        <FaClock className="mt-1 mr-4 text-blue-400 flex-shrink-0" />
                        <div>
                            <p className="mb-1">Mon-Fri: 8am - 6pm</p>
                            <p>Sat: 9am - 3pm</p>
                        </div>
                    </li>
                </ul>
            </motion.div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-400">
            {safe(
                d.copyright,
                `© ${new Date().getFullYear()} ${d.brand || "DentalCare"}. All rights reserved.`
            )}
        </div>
    </footer>
);

/* ---------------- MAIN TEMPLATE ---------------- */
export default function TemplateDentist({ data }) {
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
        <div className="min-h-screen w-full bg-white font-sans antialiased">
            {/* Meta tags */}
            <head>
                <title>
                    {data.meta?.title ||
                        "Modern Dental Care - Quality Dentistry Services"}
                </title>
                <meta
                    name="description"
                    content={
                        data.meta?.description ||
                        "Professional dental care with the latest technology. We provide comprehensive dental services for the whole family."
                    }
                />
                <meta
                    property="og:title"
                    content={
                        data.meta?.title ||
                        "Modern Dental Care - Quality Dentistry Services"
                    }
                />
                <meta
                    property="og:description"
                    content={
                        data.meta?.description ||
                        "Professional dental care with the latest technology. We provide comprehensive dental services for the whole family."
                    }
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={typeof window !== "undefined" ? window.location.href : ""}
                />
                <meta
                    property="og:image"
                    content={data.meta?.imageUrl || "/dentist-og-image.jpg"}
                />
            </head>

            {/* Navbar */}
            {data.navbar && <Navbar d={data.navbar} />}

            {/* Hero */}
            {data.hero && <Hero d={data.hero} />}


            {/* About */}
            {data.about && <About d={data.about} />}

            {/* Services */}
            {data.services && <Services d={data.services} />}


            {/* Doctors */}
            {data.doctors && <Doctors d={data.doctors} />}

            {/* Testimonials */}
            {data.testimonials && <Testimonials d={data.testimonials} />}

            {/* Appointment */}
            {data.appointment && <Appointment d={data.appointment} />}


            {/* Footer */}
            {data.footer && <Footer d={data.footer} />}
        </div>
    );
}