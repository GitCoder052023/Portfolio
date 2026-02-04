/**
 * Like Button Component
 * Button to like/unlike a publication (requires authentication)
 */

"use client";

import { useState, useOptimistic, useTransition } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { API_ROUTES, PAGE_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
    const { isSignedIn } = useAuth();
    const [isPending, startTransition] = useTransition();

    const [state, setState] = useState({
        isLiked: initialIsLiked,
        likeCount: initialLikeCount,
    });

    const [optimisticState, addOptimistic] = useOptimistic(
        state,
        (current, newLiked: boolean) => ({
            isLiked: newLiked,
            likeCount: newLiked ? current.likeCount + 1 : current.likeCount - 1,
        })
    );

    const handleLike = async () => {
        if (!isSignedIn) {
            toast.error(
                <span>
                    Please{" "}
                    <Link href={PAGE_ROUTES.signIn} className="underline font-medium">
                        sign in
                    </Link>{" "}
                    to like publications
                </span>
            );
            return;
        }

        const newLikedState = !optimisticState.isLiked;

        startTransition(async () => {
            addOptimistic(newLikedState);

            try {
                const response = await fetch(API_ROUTES.like(publicationId), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Failed to update like");
                }

                const data = await response.json();

                setState({
                    isLiked: data.liked,
                    likeCount: data.likeCount,
                });
            } catch (error) {
                // Revert optimistic update
                setState(state);
                toast.error("Failed to update like. Please try again.");
            }
        });
    };

    const isLiked = optimisticState.isLiked;
    const likeCount = optimisticState.likeCount;

    return (
        <button
            type="button"
            onClick={handleLike}
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
