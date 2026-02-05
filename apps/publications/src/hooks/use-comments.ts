/**
 * useComments Hook
 * Manages the state and logic for publication comments
 */

import { useState, useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import type { CommentWithUser } from "@/types";
import { postComment, deleteComment } from "@/api/comments";

interface UseCommentsProps {
    publicationId: string;
    initialComments: CommentWithUser[];
}

export function useComments({ publicationId, initialComments }: UseCommentsProps) {
    const { isSignedIn } = useAuth();
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isPending, startTransition] = useTransition();

    const addComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isSignedIn) {
            toast.error("Please sign in to comment");
            return;
        }

        const content = newComment.trim();
        if (!content) {
            toast.error("Please enter a comment");
            return;
        }

        startTransition(async () => {
            try {
                const comment = await postComment(publicationId, content);
                setComments([...comments, comment]);
                setNewComment("");
                toast.success("Comment posted!");
            } catch (error) {
                toast.error("Failed to post comment. Please try again.");
            }
        });
    };

    const removeComment = async (commentId: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            await deleteComment(publicationId, commentId);
            setComments(comments.filter((c) => c.id !== commentId));
            toast.success("Comment deleted");
        } catch (error) {
            toast.error("Failed to delete comment");
        }
    };

    return {
        comments,
        newComment,
        setNewComment,
        isPending,
        addComment,
        removeComment,
        isSignedIn,
    };
}

