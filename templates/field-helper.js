/* templates/field‑helper.js
   -------------------------------------------------------------- */

const IMAGE_HINTS = ["url", "image", "img", "logo", "icon", "avatar"];

/**
 * Return a flat list of field descriptors.
 * Each descriptor:  { path, label, defaultValue, type }
 */
export function buildFields(node, base = "") {
  const out = [];

  const prettify = (p) =>
    p
      .replace(/\[(\d+)]/g, " $1") // logos[2] → logos 2
      .replace(/\./g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // const isImageKey = (key) =>
  //   IMAGE_HINTS.some((h) => key.toLowerCase().includes(h));


  const isImagePath = (fullPath) => {
    // remove trailing “[42]”
    const beforeIndex = fullPath.replace(/\[\d+]?$/, "");
    const leaf = beforeIndex.split(".").pop();     // e.g. backgroundImages
    return IMAGE_HINTS.some((h) => leaf.toLowerCase().includes(h));
  };


  const push = (path, value) =>
    out.push({
      path,
      label: prettify(path),
      defaultValue: value,
      type: isImagePath(path) ? "image" : "text",
    });

  /* depth‑first walk */
  const walk = (value, path = "") => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      push(path, value);
      return;
    }

    if (Array.isArray(value)) {
      if (value.every((v) => typeof v !== "object")) {
        /* list of primitives → treat each item as its own field */
        value.forEach((v, i) => push(`${path}[${i}]`, v));
      } else {
        /* list of objects */
        value.forEach((v, i) => walk(v, `${path}[${i}]`));
      }
      return;
    }

    /* regular object */
    if (value && typeof value === "object") {
      Object.entries(value).forEach(([k, v]) =>
        walk(v, path ? `${path}.${k}` : k)
      );
    }
  };

  walk(node, base);
  return out;
}
