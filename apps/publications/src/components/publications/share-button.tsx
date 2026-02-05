/**
 * Share Button Component
 * Button to share publication via native share or copy link
 */

"use client";

import { useState } from "react";
import { Share2, Check, Copy, Twitter, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils";

interface ShareButtonProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
}

export function ShareButton({ url, title, description, className }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const fullUrl = typeof window !== "undefined"
        ? `${window.location.origin}${url}`
        : url;

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url: fullUrl,
                });
            } catch (error) {
                // User cancelled or error
                if ((error as Error).name !== "AbortError") {
                    console.error("Share failed:", error);
                }
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            toast.success("Link copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error("Failed to copy link");
        }
        setIsOpen(false);
    };

    const shareLinks = [
        {
            name: "Twitter",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
        },
        {
            name: "Email",
            icon: Mail,
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this publication: ${fullUrl}`)}`,
        },
    ];

    return (
        <div className={cn("relative", className)}>
            <button
                type="button"
                onClick={handleNativeShare}
                className="btn btn-secondary btn-icon"
                aria-label="Share publication"
            >
                <Share2 className="h-4 w-4" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={cn(
                                "absolute right-0 top-full z-50 mt-2",
                                "min-w-[180px] rounded-lg border border-neutral-200 bg-white p-1.5 shadow-lg"
                            )}
                        >
                            {/* Copy Link */}
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                                <span>{copied ? "Copied!" : "Copy Link"}</span>
                            </button>

                            <div className="my-1.5 h-px bg-neutral-100" />

                            {/* Social Links */}
                            {shareLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                >
                                    <link.icon className="h-4 w-4" />
                                    <span>{link.name}</span>
                                </a>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

