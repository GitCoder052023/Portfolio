"use client";

export default function TailStackBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-100 via-amber-50 to-transparent rounded-full blur-3xl opacity-40" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-100 via-pink-50 to-transparent rounded-full blur-3xl opacity-30" />
        </div>
    );
}
