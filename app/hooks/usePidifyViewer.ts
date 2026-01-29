"use client";

import { useState } from "react";

export function usePidifyViewer(totalPages: number = 12) {
    const [previewPage, setPreviewPage] = useState(1);

    const nextPage = () => setPreviewPage((prev) => Math.min(totalPages, prev + 1));
    const prevPage = () => setPreviewPage((prev) => Math.max(1, prev - 1));

    return {
        previewPage,
        nextPage,
        prevPage,
        totalPages,
    };
}
