/* /components/Tooltip.jsx
   A lightweight, Tailwind-powered tooltip that works in both
   light & dark themes and doesn’t pull in extra libraries. */

   "use client";

   import React, { useState, useRef, useEffect } from "react";
   
   export function Tooltip({ content, children, side = "top" }) {
     const [open, setOpen] = useState(false);
     const [coords, setCoords] = useState({ x: 0, y: 0 });
     const ref = useRef(null);
   
     useEffect(() => {
       if (!open || !ref.current) return;
       const rect = ref.current.getBoundingClientRect();
       const gap = 8; // distance between element and tooltip
   
       switch (side) {
         case "bottom":
           setCoords({ x: rect.left + rect.width / 2, y: rect.bottom + gap });
           break;
         case "left":
           setCoords({ x: rect.left - gap, y: rect.top + rect.height / 2 });
           break;
         case "right":
           setCoords({ x: rect.right + gap, y: rect.top + rect.height / 2 });
           break;
         default: // top
           setCoords({ x: rect.left + rect.width / 2, y: rect.top - gap });
       }
     }, [open, side]);
   
     return (
       <>
         {/* trigger */}
         <span
           ref={ref}
           onMouseEnter={() => setOpen(true)}
           onMouseLeave={() => setOpen(false)}
           onFocus={() => setOpen(true)}
           onBlur={() => setOpen(false)}
           className="inline-flex"
         >
           {children}
         </span>
   
         {/* tooltip */}
         {open && (
           <div
             style={{
               position: "fixed",
               left: coords.x,
               top: coords.y,
               transform:
                 side === "top"
                   ? "translate(-50%, -100%)"
                   : side === "bottom"
                   ? "translate(-50%, 0)"
                   : side === "left"
                   ? "translate(-100%, -50%)"
                   : "translate(0, -50%)",
               pointerEvents: "none",
               zIndex: 50,
             }}
             className="whitespace-pre rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg
                        dark:bg-gray-700"
           >
             {content}
           </div>
         )}
       </>
     );
   }
   