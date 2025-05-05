// // app/site/[subdomain]/head.jsx
// import { notFound } from "next/navigation";

// export default async function Head({ params }) {
//   const subdomain = params.subdomain;
//   const api = process.env.API_URL ?? "https://api.leadnary.com";
//   const res = await fetch(`${api}/api/page/${subdomain}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) return notFound();

//   const { data } = await res.json();
//   const meta = data.meta || {};

//   return (
//     <>
//       <title>
//         {"PowerFit Gym — Your Ultimate Fitness Destination"}
//       </title>
//       <meta
//         name="description"
//         content={
//           meta.description ||
//           "Join PowerFit Gym for world-class fitness facilities, expert trainers, and a supportive community."
//         }
//       />
//       <meta property="og:title" content={meta.title || ""} />
//       <meta property="og:description" content={meta.description || ""} />
//       {meta.imageUrl && <meta property="og:image" content={meta.imageUrl} />}
//     </>
//   );
// }
