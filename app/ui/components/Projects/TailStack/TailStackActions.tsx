"use client";

import { Github, ArrowRight } from "lucide-react";

export default function TailStackActions() {
    return (
        <a
            href="https://github.com/GitCoder052023/TailStack"
            target="_blank"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#37352f] text-white rounded-xl font-medium shadow-lg hover:bg-black transition-all"
        >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
            <ArrowRight className="w-4 h-4" />
        </a>
    );
}
