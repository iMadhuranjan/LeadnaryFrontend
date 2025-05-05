import TemplateRealEstate from "./temp/realestate/RealEstate2";
import TemplateA from "./TemplateA";
import { buildFields } from "./field-helper";
import TemplateGym from "./temp/gym/gym1";
import TemplateDentist from "./temp/doctor/Dentist1";
import TemplateProfileCard from "./temp/card/ProfileCard";

/* every image property ends with ...Url */
const defaultDataTemplateA = {
    hero: {
        headlineStart: "Empower",
        highlight: "Your Growth",
        subtext: "We help brands grow online.",
        primaryCta: "Get Started",
        primaryHref: "#services",
        secondaryCta: "Contact Us",
        secondaryHref: "#contact",
    },

    logosHeading: "Trusted by Industry Leaders",
    logos: [
        {
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        },
        {
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        },
        {
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        },
        {
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        },
    ],

    about: {
        tag: "About Us",
        heading: "Who We Are",
        paragraphs: [
            "We are a team of passionate digital marketers dedicated to helping businesses thrive in the online world.",
            "With over 10 years of combined experience, we've helped hundreds of clients achieve their digital goals through innovative strategies and data-driven approaches.",
        ],
        cta: "Learn More",
        ctaHref: "#about",
        imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
        imageAlt: "Our team working together",
    },

    servicesTag: "Our Services",
    servicesHeading: "Comprehensive Digital Solutions",
    servicesSub:
        "We offer end-to-end digital marketing services tailored to your business needs.",
    services: [
        {
            title: "SEO & Content Strategy",
            description:
                "Boost your rankings and organic traffic with our comprehensive SEO services.",
            iconUrl: "https://cdn-icons-png.flaticon.com/512/2774/2774134.png",
        },
        {
            title: "Social Media Marketing",
            description: "Build your brand presence across all major platforms.",
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3665/3665927.png",
        },
        {
            title: "PPC Advertising",
            description:
                "Get immediate results with our targeted pay-per-click campaigns.",
            iconUrl: "https://cdn-icons-png.flaticon.com/512/2721/2721620.png",
        },
    ],

    stats: [
        { value: "500+", label: "Projects Delivered" },
        { value: "95%", label: "Client Retention" },
        { value: "10M+", label: "Leads Generated" },
        { value: "24/7", label: "Support Available" },
    ],

    testimonialsTag: "Client Success",
    testimonialsHeading: "What Our Clients Say",
    testimonials: [
        {
            quote:
                "Working with this team transformed our online presence. Our organic traffic increased by 300% in just 6 months!",
            name: "Sarah Williams",
            role: "CMO, GreenTech",
            avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
            quote:
                "The PPC campaigns they set up for us have the best ROI we've ever seen. Highly recommend their services!",
            name: "Michael Chen",
            role: "Marketing Director, TechStart",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        },
    ],

    pricingTag: "Flexible Plans",
    pricingHeading: "Simple, Transparent Pricing",
    pricingSub: "Choose the plan that fits your business needs.",
    pricing: [
        {
            name: "Starter",
            price: "$299",
            priceSuffix: "/month",
            features: [
                "Basic SEO Optimisation",
                "Monthly Reports",
                "5 Keywords",
                "Email Support",
            ],
            cta: "Get Started",
            ctaHref: "#contact",
        },
        {
            name: "Growth",
            price: "$799",
            priceSuffix: "/month",
            features: [
                "Advanced SEO + PPC",
                "Weekly Reports",
                "20 Keywords",
                "2 Blog Posts / mo",
            ],
            cta: "Most Popular",
            ctaHref: "#contact",
            highlight: true,
        },
    ],

    cta: {
        heading: "Ready to Transform Your Digital Presence?",
        sub: "Get in touch today for a free consultation and let's discuss how we can help grow your business.",
        label: "Schedule a Call",
        href: "#contact",
    },

    contact: {
        heading: "Let's Talk About Your Project",
        sub: "We'd love to hear from you!",
        address: "123 Digital Avenue\nSan Francisco, CA 94107",
        phone: "+1 (555) 123-4567",
        email: "hello@yourbrand.com",
    },

    footer: {
        brand: "Digital Growth Pro",
        desc: "Helping businesses thrive in the digital world through innovative marketing solutions.",
        social: [
            {
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
                href: "https://facebook.com",
            },
        ],
        links: [
            { label: "Home", href: "/" },
            { label: "Services", href: "#services" },
            { label: "Contact", href: "#contact" },
        ],
        newsletterText: "Subscribe for marketing tips & special offers.",
        copyright: "© 2025 Digital Growth Pro.",
    },
};

export const defaultDataTemplateGym = {
    meta: {
        title: "PowerFit Gym - Your Ultimate Fitness Destination",
        description:
            "Join PowerFit Gym for world-class fitness facilities, expert trainers, and a supportive community to help you achieve your health goals.",
        imageUrl: "/gym-og-image.jpg",
    },

    navbar: {
        logoUrl: "https://wallpapers.com/images/hd/power-strength-gym-logo-khg0w0k0loef8uvu-khg0w0k0loef8uvu.jpg",
        links: [
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Features", href: "#features" },
            { label: "Gallery", href: "#gallery" },
            { label: "Trainers", href: "#trainers" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Contact", href: "#contact" },
        ],
        cta: "Join Now",
        ctaHref: "#contact",
    },

    hero: {
        headlineStart: "Transform Your Body",
        highlight: "Transform Your Life",
        subtext:
            "Join our premier fitness center with state-of-the-art equipment, expert trainers, and a supportive community to help you reach your goals.",
        primaryCta: "Start Free Trial",
        primaryHref: "#contact",
        secondaryCta: "View Facilities",
        secondaryHref: "#gallery",
        backgroundImageUrl:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },

    about: {
        tag: "About Us",
        heading: "More Than Just A Gym",
        paragraphs: [
            "At PowerFit, we're committed to helping you achieve your fitness goals in a supportive, motivating environment. Our 24/7 facility is equipped with the latest cardio and strength training equipment.",
            "Our certified trainers are passionate about fitness and dedicated to helping you succeed. Whether you're a beginner or an experienced athlete, we have programs tailored to your needs.",
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        imageAlt: "Modern gym interior with equipment",
        cta: "Learn More",
        ctaHref: "#features",
    },

    features: {
        tag: "Our Features",
        heading: "Why Choose PowerFit",
        sub: "We offer everything you need for your fitness journey",
        items: [
            {
                title: "24/7 Access",
                description:
                    "Work out anytime that fits your schedule with our round-the-clock access.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/3143/3143477.png",
            },
            {
                title: "Expert Trainers",
                description:
                    "Certified professionals to guide you through every step of your journey.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
            },
            {
                title: "Premium Equipment",
                description: "State-of-the-art machines from leading fitness brands.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
            },
            {
                title: "Group Classes",
                description: "50+ classes weekly including HIIT, Yoga, and Spin.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
            },
            {
                title: "Personal Training",
                description: "Customized programs tailored to your specific goals.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
            },
            {
                title: "Recovery Zone",
                description: "Sauna, massage chairs, and stretching areas.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/3143/3143477.png",
            },
        ],
    },

    gallery: {
        tag: "Our Facility",
        heading: "Take A Look Inside",
        sub: "Explore our world-class fitness center",
        images: [
            {
                imageUrl:
                    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
                alt: "Cardio equipment area",
            },
            {
                imageUrl:
                    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                alt: "Weight training area",
            },
            {
                imageUrl:
                    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                alt: "Group class in session",
            },
            {
                imageUrl:
                    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                alt: "Personal training session",
            },
            {
                imageUrl:
                    "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
                alt: "Functional training zone",
            },
            {
                imageUrl:
                    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                alt: "Locker room and amenities",
            },
        ],
    },

    trainers: {
        tag: "Our Team",
        heading: "Meet Our Expert Trainers",
        sub: "Certified professionals dedicated to your success",
        trainers: [
            {
                name: "Alex Johnson",
                specialty: "Strength & Conditioning",
                imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
                bio: "10+ years experience helping athletes reach peak performance",
            },
            {
                name: "Sarah Miller",
                specialty: "Yoga & Mobility",
                imageUrl: "https://randomuser.me/api/portraits/women/33.jpg",
                bio: "RYT-500 certified with a holistic approach to fitness",
            },
            {
                name: "James Wilson",
                specialty: "Weight Loss",
                imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
                bio: "Helped 200+ clients achieve sustainable weight loss",
            },
            {
                name: "Lisa Chen",
                specialty: "HIIT & Cardio",
                imageUrl: "https://randomuser.me/api/portraits/women/55.jpg",
                bio: "Creates high-energy workouts that deliver results",
            },
        ],
    },

    testimonials: {
        tag: "Success Stories",
        heading: "What Our Members Say",
        items: [
            {
                quote:
                    "PowerFit changed my life! Lost 50lbs and gained so much confidence. The trainers are amazing!",
                name: "Jessica W.",
                role: "Member since 2020",
                avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
                rating: 5,
            },
            {
                quote:
                    "Best gym in town! The equipment is top-notch and the community keeps me motivated.",
                name: "David K.",
                role: "Member since 2021",
                avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
                rating: 5,
            },
            {
                quote:
                    "I've tried many gyms but PowerFit's personal training program is truly transformative.",
                name: "Maria G.",
                role: "Member since 2022",
                avatarUrl: "https://randomuser.me/api/portraits/women/63.jpg",
                rating: 5,
            },
        ],
    },

    contact: {
        heading: "Start Your Fitness Journey Today",
        sub: "Get in touch for a free tour or trial session",
        address: "123 Fitness Avenue\nNew York, NY 10001",
        phone: "(555) 123-4567",
        email: "info@powerfitgym.com",
        hours:
            "Open 24/7 for members\nStaffed hours: Mon-Fri 6am-10pm, Sat-Sun 8am-8pm",
    },

    footer: {
        brand: "PowerFit Gym",
        desc: "Your premier fitness destination for achieving health and wellness goals.",
        social: [
            {
                icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
                href: "#",
                name: "Facebook",
            },
            {
                icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
                href: "#",
                name: "Instagram",
            },
            {
                icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
                href: "#",
                name: "Twitter",
            },
        ],
        links: [
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Features", href: "#features" },
            { label: "Trainers", href: "#trainers" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Contact", href: "#contact" },
        ],
        newsletterText:
            "Subscribe to our newsletter for fitness tips and special offers",
        copyright: `© ${new Date().getFullYear()} PowerFit Gym. All rights reserved.`,
    },
};

/* default data for TemplateDentist.jsx */
export const defaultDataTemplateDentist = {
    meta: {
        title: "BrightSmile Dental Clinic – Modern, Compassionate Dentistry",
        description:
            "BrightSmile Dental Clinic provides comprehensive family dentistry with cutting‑edge technology and a patient‑first approach.",
        imageUrl: "https://dentistchannel.online/frontend/images/logo_light.webp",
    },

    navbar: {
        logoUrl: "https://dentistchannel.online/frontend/images/logo_light.webp",
        links: [
            { label: "Home", href: "#home" },
            { label: "Services", href: "#services" },
            { label: "About", href: "#about" },
            { label: "Dentists", href: "#doctors" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "FAQ", href: "#faq" },
        ],
        cta: "Book Appointment",
        ctaHref: "#appointment",
    },

    hero: {
        tag: "Family & Cosmetic Dentistry",
        headlineStart: "Exceptional Care",
        highlight: "Healthy Smiles",
        subtext:
            "Experience pain‑free, high‑precision dental treatments in a welcoming environment designed for your comfort.",
        primaryCta: "Schedule Visit",
        primaryHref: "#appointment",
        secondaryCta: "Our Services",
        secondaryHref: "#services",
        backgroundImageUrl:
            "https://images.unsplash.com/photo-1675526607070-f5cbd71dde92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageUrl:
            "https://www.truenumbers.it/wp-content/uploads/2018/09/quanti-dentisti-ci-sono-in-italia.jpg",
        experienceYears: "20+",
    },

    services: {
        tag: "Our Services",
        heading: "Comprehensive Dental Care",
        sub: "Personalized treatments for every stage of life",
        services: [
            {
                title: "Routine Check‑ups",
                description: "Thorough exams, digital X‑rays, and personalised treatment plans.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/599/599288.png",
                learnMoreHref: "#appointment",
            },
            {
                title: "Teeth Whitening",
                description: "In‑office and take‑home options for brighter smiles in less time.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/3082/3082257.png",
                learnMoreHref: "#appointment",
            },
            {
                title: "Dental Implants",
                description: "Long‑lasting replacements that look and function like natural teeth.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/1693/1693784.png",
                learnMoreHref: "#appointment",
            },
            {
                title: "Invisalign Aligners",
                description: "Virtually invisible orthodontic treatment for all ages.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2947/2947945.png",
                learnMoreHref: "#appointment",
            },
            {
                title: "Emergency Care",
                description: "Same‑day relief for pain, fractures, or lost restorations.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2661/2661377.png",
                learnMoreHref: "#appointment",
            },
            {
                title: "Pediatric Dentistry",
                description: "Gentle, engaging care to build healthy habits early.",
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2784/2784420.png",
                learnMoreHref: "#appointment",
            },
        ],
    },

    about: {
        tag: "About Us",
        heading: "Technology‑Driven, Patient‑Centric",
        paragraphs: [
            "Since 2005 BrightSmile has combined advanced technology with compassionate service to deliver outstanding results.",
            "Our team continuously trains on the latest techniques, ensuring safer, faster, and more comfortable treatments.",
        ],
        imageUrl:
            "https://plus.unsplash.com/premium_photo-1675686363507-22a8d0e11b4c?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Dental clinic interior",
        stats: [
            {
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
                value: "10 000+",
                label: "Happy Patients",
            },
            {
                iconUrl: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
                value: "98%",
                label: "Patient Satisfaction",
            },
            {
                iconUrl: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
                value: "20+",
                label: "Years Experience",
            },
            {
                iconUrl: "https://cdn-icons-png.flaticon.com/512/3176/3176291.png",
                value: "5",
                label: "Dentists on Staff",
            },
        ],
        cta: "Meet Our Team",
        ctaHref: "#doctors",
    },

    doctors: {
        tag: "Our Team",
        heading: "Meet Our Dentists",
        sub: "Experienced professionals committed to your oral health",
        doctors: [
            {
                name: "Dr. Ananya Kapoor, DDS",
                specialization: "Implantology",
                imageUrl: "https://randomuser.me/api/portraits/women/48.jpg",
                bio: "Diplomate of the ICOI with 15 years placing and restoring implants.",
                socialLinks: [
                    { platform: "linkedin", url: "#" },
                    { platform: "instagram", url: "#" },
                ],
            },
            {
                name: "Dr. Rohit Sharma, MDS",
                specialization: "Orthodontics",
                imageUrl: "https://randomuser.me/api/portraits/men/46.jpg",
                bio: "Certified Invisalign provider treating over 1 000 cases.",
                socialLinks: [
                    { platform: "facebook", url: "#" },
                    { platform: "twitter", url: "#" },
                ],
            },
            {
                name: "Dr. Priya Nair, BDS",
                specialization: "Pediatric Dentistry",
                imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
                bio: "Creates a fun, stress‑free experience for children of all ages.",
                socialLinks: [
                    { platform: "instagram", url: "#" },
                    { platform: "facebook", url: "#" },
                ],
            },
        ],
    },

    testimonials: {
        tag: "Patient Voices",
        heading: "What Our Patients Say",
        sub: "Real stories from people we have helped",
        testimonials: [
            {
                quote:
                    "I avoided dentists for years until I found BrightSmile. The team is caring, and my implant looks fantastic.",
                name: "Meera S.",
                role: "Patient since 2022",
                avatarUrl: "https://randomuser.me/api/portraits/women/52.jpg",
                rating: 5,
            },
            {
                quote:
                    "Efficient, painless root canal and the follow‑up was excellent. Highly recommend Dr. Sharma.",
                name: "Rahul V.",
                role: "Patient since 2021",
                avatarUrl: "https://randomuser.me/api/portraits/men/38.jpg",
                rating: 5,
            },
            {
                quote:
                    "My daughter actually likes going to the dentist now thanks to Dr. Nair. The clinic is spotless and welcoming.",
                name: "Aditi L.",
                role: "Parent",
                avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
                rating: 5,
            },
        ],
    },

    appointment: {
        tag: "Book Now",
        heading: "Schedule Your Appointment",
        sub: "Fill out the form and our coordinator will confirm within one business day",
        services: [
            "Routine Check‑up",
            "Teeth Whitening",
            "Dental Implants",
            "Invisalign Consultation",
            "Root Canal Therapy",
            "Emergency Visit",
        ],
        phone: "(022) 4000‑1234",
        email: "appointments@brightsmileclinic.com",
        address: "101 Health Avenue, Mumbai 400001",
        hours: "Mon‑Fri 8 am – 8 pm; Sat 9 am – 5 pm",
    },

    footer: {
        logoUrl: "https://dentistchannel.online/frontend/images/logo_light.webp",
        brand: "BrightSmile Dental Clinic",
        desc:
            "Delivering modern, gentle dentistry focused on long‑term oral health and patient comfort.",
        social: [
            { platform: "facebook", href: "#" },
            { platform: "instagram", href: "#" },
            { platform: "twitter", href: "#" },
            { platform: "linkedin", href: "#" },
        ],
        links: [
            { label: "Home", href: "#home" },
            { label: "Services", href: "#services" },
            { label: "About", href: "#about" },
            { label: "Dentists", href: "#doctors" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "FAQ", href: "#faq" },
            { label: "Book Appointment", href: "#appointment" },
        ],
        services: [
            { name: "Teeth Whitening", href: "#services" },
            { name: "Dental Implants", href: "#services" },
            { name: "Invisalign Aligners", href: "#services" },
            { name: "Emergency Care", href: "#services" },
        ],
        copyright: `© ${new Date().getFullYear()} BrightSmile Dental Clinic. All rights reserved.`,
    },
};



const defaultprofileData = {
    meta: {
        title: "Jane Doe - UX Designer",
        description: "Professional UX Designer with 5+ years of experience creating beautiful digital experiences",
        imageUrl: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    profile: {
        bannerImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2070&q=80",
        imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        name: "Jane Doe",
        title: "Senior UX Designer",
        isVerified: true,
        bio: "Passionate about creating intuitive user experiences. Specializing in mobile apps and web design.",
        stats: [
            { value: "5+", label: "Years", icon: "award" },
            { value: "120+", label: "Projects", icon: "project" },
            { value: "85", label: "Clients", icon: "client" }
        ],
        skills: ["UI/UX Design", "Figma", "User Research", "Prototyping", "Frontend"],
        socialLinks: [
            { platform: "linkedin", url: "https://linkedin.com/in/janedoe" },
            { platform: "github", url: "https://github.com/janedoe" },
            { platform: "twitter", url: "https://twitter.com/janedoe" },
            { platform: "website", url: "https://janedoe.design" },
            { platform: "email", url: "mailto:jane@doe.com" }
        ],
        contactButton: "Contact Me",
        contactHref: "#contact"
    }
};


export const templates = [
    {
        id: "TemplateA",
        name: "Universal landing page",
        preview: TemplateA,
        component: TemplateA,
        category: "business",
        access: "pro",
        previewUrl: "https://yourwebsite.com/live/business-template",
        defaultData: defaultDataTemplateA,
        fields: buildFields(defaultDataTemplateA),
    },
    {
        id: "GymTemplate1",
        name: "Gym Template A",
        preview: TemplateGym,
        component: TemplateGym,
        access: "free",
        access: "pro",
        previewUrl: "https://yourwebsite.com/live/business-template",
        category: "GYM",
        defaultData: defaultDataTemplateGym,
        fields: buildFields(defaultDataTemplateGym),
    },
    {
        id: "DoctorTempalte1",
        name: "Dentist Template",
        preview: TemplateDentist,
        component: TemplateDentist,
        category: "doctor",
        access: "pro",
        previewUrl: "https://yourwebsite.com/live/real-estate-template",
        defaultData: defaultDataTemplateDentist,
        fields: buildFields(defaultDataTemplateDentist),
    }, {
        id: "TemplateProfileCard",
        name: "Profile Card",
        preview: TemplateProfileCard,
        component: TemplateProfileCard,
        category: "card",
        access: "free",
        previewUrl: "https://yourwebsite.com/live/real-estate-template",
        defaultData: defaultprofileData,
        fields: buildFields(defaultprofileData),
    },
];

export const getTemplate = (id) => templates.find((t) => t.id === id);
