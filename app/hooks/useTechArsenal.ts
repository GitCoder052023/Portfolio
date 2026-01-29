"use client";

import { useState } from "react";

export function useTechArsenal() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [hoveredTech, setHoveredTech] = useState<number | null>(null);

    const selectCategory = (index: number) => setSelectedCategory(index);
    const setHovered = (index: number | null) => setHoveredTech(index);

    return {
        selectedCategory,
        hoveredTech,
        selectCategory,
        setHovered,
    };
}
