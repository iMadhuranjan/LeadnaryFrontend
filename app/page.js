import WhatsInLeadnary from "@/components/HomeAboutus";
import HeroSection from "@/components/HomeHero";
import WhyLeadnary from "@/components/HomeWhyLeadnary";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatsInLeadnary />
      <WhyLeadnary />
    </>
  );
}


// app/page.js or app/page.tsx

export const metadata = {
  title: "Leadnary – Get Your Business Online in 60 Seconds",
  description:
    "Create professional, SEO-optimized landing pages with Leadnary in minutes. Choose a niche template, capture leads, track analytics, and grow your business — no coding needed. Best No Code Landing Page Builder with in build Lead Capture Form and Analytic System",
  openGraph: {
    title: "Leadnary - Build Landing Pages That Convert",
    description:
      "Create professional, SEO-optimized landing pages with Leadnary in minutes. Choose a niche template, capture leads, track analytics, and grow your business — no coding needed.",
    url: "https://leadnary.com",
    type: "website",
  },
};
