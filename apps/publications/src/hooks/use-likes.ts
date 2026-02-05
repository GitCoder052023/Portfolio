/**
 * useLikes Hook
 * Manages the state and logic for publication likes with optimistic updates
 */

import { useState, useOptimistic, useTransition, useMemo } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { PAGE_ROUTES } from "@/constants";
import { toggleLike } from "@/api/likes";

interface UseLikesProps {
    publicationId: string;
    initialLikeCount: number;
    initialIsLiked: boolean;
}

export function useLikes({
    publicationId,
    initialLikeCount,
    initialIsLiked,
}: UseLikesProps) {
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
            return { error: "unauthenticated" };
        }

        const newLikedState = !optimisticState.isLiked;

        startTransition(async () => {
            addOptimistic(newLikedState);

            try {
                const data = await toggleLike(publicationId);
                setState({
                    isLiked: data.liked,
                    likeCount: data.likeCount,
                });
            } catch (error) {
                // Revert is handled by the fact that setState(state) would happen,
                // but since we are using optimistic state, failing to call setState with new data
                // will effectively revert when transition finishes if we didn't update base state.
                setState(state);
                toast.error("Failed to update like. Please try again.");
            }
        });
    };

    return {
        isLiked: optimisticState.isLiked,
        likeCount: optimisticState.likeCount,
        handleLike,
        isPending,
        isSignedIn,
    };
}

