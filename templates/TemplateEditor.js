"use client";

import React, { useState, useMemo } from "react";
import { buildFields } from "@/templates/field-helper";
import { getDeep, setDeep } from "@/lib/deep-utils";

export default function TemplateEditor({ initialData, onDataChange }) {
    const [data, setData] = useState(initialData);

    /* rebuild list whenever data changes */
    //   const fields = useMemo(() => buildFields(data), [data]);

    const fields = useMemo(() => buildFields(data), [JSON.stringify(data)]);



    /* -------- helpers -------- */
    const commit = (fn) => {
        fn();                         // mutate
        const clone = structuredClone(data);
        setData(clone);               // re-render
        onDataChange?.(clone);        // notify parent
    };

    const handleText = (p, v) => commit(() => setDeep(data, p, v));

    const handleFile = (p, file) => {
        const r = new FileReader();
        r.onload = () => commit(() => setDeep(data, p, r.result));
        r.readAsDataURL(file);
    };

    const cloneFirst = (arr) =>
        typeof arr[0] === "object" ? { ...arr[0] } : arr[0];

    const addItem = (arrPath) =>
        commit(() => {
            const arr = getDeep(data, arrPath) ?? [];
            arr.push(cloneFirst(arr));
            setDeep(data, arrPath, arr);
        });

    const removeItem = (itemPath) =>
        commit(() => {
            const [arrPath, idx] = itemPath.split(/\[(\d+)\]/).filter(Boolean);
            const arr = getDeep(data, arrPath);
            arr.splice(Number(idx), 1);
        });

    /* -------- UI -------- */
    return (
        <form className="space-y-6">
            {fields.map(({ path, label, type }) => {
                const val = getDeep(data, path);
                const isImg = type === "image";

                return (
                    <div key={path} className="flex flex-col">
                        <label className="font-semibold mb-1">{label}</label>

                        {isImg ? (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleFile(path, f);
                                    }}
                                />
                                {val && (
                                    <img
                                        src={val}
                                        alt="preview"
                                        className="mt-2 h-32 w-auto rounded border"
                                    />
                                )}
                            </>
                        ) : (
                            <input
                                type="text"
                                value={val ?? ""}
                                onChange={(e) => handleText(path, e.target.value)}
                                className="rounded border px-3 py-2"
                            />
                        )}

                        {/* remove button for array items */}
                        {/\[\d+\]$/.test(path) && (
                            <button
                                type="button"
                                onClick={() => removeItem(path)}
                                className="mt-2 text-sm text-red-500"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                );
            })}
        </form>
    );
}
