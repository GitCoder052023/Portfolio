import { SITE_CONFIG } from "../config/site";

export const HERO_CONTENT = {
    name: SITE_CONFIG.name,
    bio: "Backend-first Full-Stack Developer crafting end-to-end solutions • Part-time open-source builder & contributor • 6+ years of turning ideas into reality",
    profileImage: SITE_CONFIG.ogImage,
    actions: [
        {
            label: "About Me",
            href: "#about",
            primary: true,
        },
        {
            label: "Projects",
            href: "#projects",
            primary: false,
        },
    ],
};
