"use client";

import { useState } from "react";

export function useActiveState<T = number | string>(initialValue: T | null = null) {
    const [active, setActive] = useState<T | null>(initialValue);

    const setAsActive = (value: T | null) => setActive(value);
    const clearActive = () => setActive(null);

    return {
        active,
        setActive: setAsActive,
        clearActive,
        isActive: (value: T) => active === value,
    };
}
