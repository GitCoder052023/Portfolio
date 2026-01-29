"use client";

import { useActiveState } from "@/app/hooks/useActiveState";
import { TAILSTACK_FEATURES } from "@/app/data/tailstack";

export default function TailStackFeatures() {
    const { active: activeFeature, setActive: setActiveFeature, clearActive } = useActiveState<number>();

    return (
        <div className="flex-1 space-y-3">
            {TAILSTACK_FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div
                        key={index}
                        onMouseEnter={() => setActiveFeature(index)}
                        onMouseLeave={clearActive}
                        className={`flex gap-4 p-4 sm:p-5 bg-white rounded-xl border transition-all duration-300 ${activeFeature === index ? "border-[#d4d4d1] shadow-md translate-x-1" : "border-[#e9e9e7] shadow-sm"
                            }`}
                    >
                        <div className={`flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br ${feature.accent} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-[#37352f]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#37352f] text-base sm:text-lg">{feature.title}</h4>
                            <p className="text-sm text-[#787774] mt-1">{feature.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
