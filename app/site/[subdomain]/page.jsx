// import { notFound } from "next/navigation";

// export default async function UserLanding({ params }) {
//   const { subdomain } = await params;

//   const res = await fetch(`https://api.leadnary.com/api/page/${subdomain}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     notFound();
//   }

//   const { template, data } = await res.json();

//   const normalized = template.toLowerCase(); // 🔥 always lower case match

//   let TemplateComponent;

//   if (normalized === "templatea") {   // ← notice: now it's lowercase match
//     const { default: TemplateA } = await import("@/templates/TemplateA");
//     TemplateComponent = TemplateA;
//   } else if (normalized === "templateb") {
//     const { default: TemplateB } = await import("@/templates/TemplateB");
//     TemplateComponent = TemplateB;
//   } else {
//     notFound();
//   }

//   return (
//     <main>
//       <TemplateComponent data={data} />
//     </main>
//   );
// }

// app/site/[subdomain]/page.jsx (or .tsx)

import { notFound } from "next/navigation";
import { templates } from "@/templates"; // ← we’ll reuse the master list

export const dynamic = "force-dynamic"; // ensure the route is SSR

export default async function UserLanding({ params }) {
  /* 1 ───────────── extract the sub‑domain */
  const { subdomain } = await params; // ‹ no “await” – params is sync

  /* 2 ───────────── fetch landing‑page data from your API */
  const api = process.env.API_URL ?? "https://api.leadnary.com";
  const res = await fetch(`${api}/api/page/${subdomain}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const { template, data } = await res.json(); // e.g. "RealEstate2"

  /* 3 ───────────── find the template entry (case‑insensitive) */
  const entry = templates.find(
    (t) => t.id.toLowerCase() === template.toLowerCase()
  );
  if (!entry) notFound(); // unknown template → 404

  const TemplateComponent = entry.component; // ← option A

  /* 5 ───────────── render */
  return (
    <main>
      <TemplateComponent data={data} />
    </main>
  );
}

// ← This runs on the server before rendering
export async function generateMetadata({ params }) {
  const subdomain = params.subdomain;
  const api = process.env.API_URL || "https://api.leadnary.com";
  const res = await fetch(`${api}/api/page/${subdomain}`, {
    cache: "no-store",
  });
  if (!res.ok) return { title: "Leadnary" }; // fallback

  const { data } = await res.json();
  const meta = data.meta || {};

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://leadnary.com/site/${subdomain}`,
      type: "website",
    },
  };
}
