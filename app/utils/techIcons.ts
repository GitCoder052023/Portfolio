import {
    DEV_ICON_NAMES,
    ICONIFY_ICONS,
    ICON_SLUG_MAP,
    TECH_COLORS,
} from "@/app/constants/techIcons";

export function getTechIconConfig(name: string) {
    const techName = name.toLowerCase().trim();
    const color = TECH_COLORS[techName] || "#787774";

    let iconUrl: string;

    if (DEV_ICON_NAMES[techName]) {
        iconUrl = `https://icon.icepanel.io/Technology/svg/${DEV_ICON_NAMES[techName]}.svg`;
    } else if (ICONIFY_ICONS[techName]) {
        iconUrl = `https://api.iconify.design/${ICONIFY_ICONS[techName]
            }.svg?color=${color.replace("#", "%23")}`;
    } else {
        const iconSlug =
            ICON_SLUG_MAP[techName] || techName.replace(/[^a-z0-9]/g, "");
        iconUrl = `https://cdn.simpleicons.org/${iconSlug}/${color.replace(
            "#",
            ""
        )}`;
    }

    return {
        iconUrl,
        color,
    };
}
