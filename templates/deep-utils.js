// lib/deep-utils.js
export function splitPath(p) {
    // hero.tag → ['hero','tag']   |   services[1].title → ['services',1,'title']
    return p
        .replace(/\[(\d+)]/g, '.$1')  // [1] -> .1
        .split('.')
        .map((s) => (/^\d+$/.test(s) ? Number(s) : s));
}

export function getDeep(obj, path) {
    return splitPath(path).reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

export function setDeep(obj, path, value) {
    const parts = splitPath(path);
    let cur = obj;
    parts.slice(0, -1).forEach((k) => {
        if (cur[k] == null) cur[k] = typeof parts[parts.indexOf(k) + 1] === "number" ? [] : {};
        cur = cur[k];
    });
    cur[parts.at(-1)] = value;
}
