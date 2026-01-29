"use client";

export default function TailStackHeader() {
    return (
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#787774]" />
                <span className="text-sm font-semibold text-[#787774] uppercase tracking-widest">Flagship Project</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#37352f] tracking-tight">TailStack</h2>
            <p className="text-lg sm:text-xl text-[#787774] max-w-3xl leading-relaxed">
                The flagship Monorepo Project Architecture and boilerplate for ERN applications.
            </p>
        </div>
    );
}
