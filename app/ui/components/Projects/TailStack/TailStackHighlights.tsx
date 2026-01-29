"use client";

import { TAILSTACK_HIGHLIGHTS } from "@/app/data/tailstack";

export default function TailStackHighlights() {
    return (
        <div className="grid md:grid-cols-3 gap-6 mb-14">
            {TAILSTACK_HIGHLIGHTS.map((h, i) => (
                <div key={i} className={`p-7 bg-gradient-to-br ${h.color} rounded-2xl border ${h.borderColor} hover:shadow-lg transition-all`}>
                    <h3 className="text-xl font-semibold text-[#37352f] mb-3">{h.title}</h3>
                    <p className="text-sm text-[#787774]">{h.description}</p>
                </div>
            ))}
        </div>
    );
}
