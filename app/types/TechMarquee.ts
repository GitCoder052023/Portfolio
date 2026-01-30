export interface TechIconItemProps {
    name: string;
    slug: string;
    category: string;
    color: string;
    iconUrl?: string;
}

export interface MarqueeRowProps {
    icons: TechIconItemProps[];
    direction?: "left" | "right";
    speed?: number;
}