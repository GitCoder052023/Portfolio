/**
 * Like Button Component
 * Button to like/unlike a publication (requires authentication)
 */

"use client";

import { Heart, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PAGE_ROUTES } from "@/constants";
import { cn } from "@/utils";
import Link from "next/link";
import { useLikes } from "@/hooks/use-likes";

import { toast } from "sonner";

interface LikeButtonProps {
    publicationId: string;
    initialLikeCount: number;
    initialIsLiked?: boolean;
    showCount?: boolean;
    className?: string;
}

export function LikeButton({
    publicationId,
    initialLikeCount,
    initialIsLiked = false,
    showCount = true,
    className,
}: LikeButtonProps) {
    const { isLiked, likeCount, handleLike, isPending, isSignedIn } = useLikes({
        publicationId,
        initialLikeCount,
        initialIsLiked,
    });

    const onLikeClick = async () => {
        const result = await handleLike();
        if (result?.error === "unauthenticated") {
            toast.error(
                <span>
                    Please{" "}
                    <Link href={PAGE_ROUTES.signIn} className="underline font-medium">
                        sign in
                    </Link>{" "}
                    to like publications
                </span>
            );
        }
    };

    return (
        <button
            type="button"
            onClick={onLikeClick}
            disabled={isPending}
            className={cn(
                "group flex items-center gap-2 rounded-lg px-3 py-2",
                "border border-neutral-200 bg-white",
                "transition-all duration-200",
                isLiked
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "text-neutral-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500",
                className
            )}
            aria-label={isLiked ? "Unlike publication" : "Like publication"}
        >
            <AnimatePresence mode="wait">
                {isPending ? (
                    <motion.div
                        key="loading"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="heart"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 1.2 }}
                    >
                        <Heart
                            className={cn(
                                "h-4 w-4 transition-all",
                                isLiked && "fill-current"
                            )}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {showCount && (
                <span className="text-sm font-medium tabular-nums">
                    {likeCount.toLocaleString()}
                </span>
            )}
        </button>
    );
}

