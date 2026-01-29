"use client";

export default function FooterCopyright() {
    return (
        <p className="text-sm text-[#787774] mt-8">
            © {new Date().getFullYear()} Hamdan Khubaib. All rights reserved.
        </p>
    );
}
