/**
 * Comment Section Component
 * Display and add comments on publications
 */

"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Send, Loader2, Trash2, Reply } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { API_ROUTES, PAGE_ROUTES } from "@/lib/constants";
import type { CommentWithUser } from "@/types";
import { cn } from "@/lib/utils";

interface CommentSectionProps {
    publicationId: string;
    initialComments: CommentWithUser[];
    className?: string;
}

export function CommentSection({
    publicationId,
    initialComments,
    className,
}: CommentSectionProps) {
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
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
                const response = await fetch(API_ROUTES.comments(publicationId), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content }),
                });

                if (!response.ok) {
                    throw new Error("Failed to post comment");
                }

                const data = await response.json();

                // Add new comment to the list
                setComments([...comments, data.comment]);
                setNewComment("");
                toast.success("Comment posted!");
            } catch (error) {
                toast.error("Failed to post comment. Please try again.");
            }
        });
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            const response = await fetch(API_ROUTES.comments(publicationId), {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commentId }),
            });

            if (!response.ok) throw new Error("Failed to delete");

            setComments(comments.filter((c) => c.id !== commentId));
            toast.success("Comment deleted");
        } catch (error) {
            toast.error("Failed to delete comment");
        }
    };

    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-neutral-600" />
                <h3 className="font-serif text-lg font-semibold text-neutral-900">
                    Comments ({comments.length})
                </h3>
            </div>

            {/* Comment Form */}
            {isSignedIn ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex gap-3">
                        {user?.imageUrl && (
                            <Image
                                src={user.imageUrl}
                                alt={user.fullName || "User"}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        )}
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Share your thoughts..."
                                className="textarea"
                                rows={3}
                                maxLength={2000}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending || !newComment.trim()}
                            className="btn btn-primary"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            <span>Post Comment</span>
                        </button>
                    </div>
                </form>
            ) : (
                <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center">
                    <p className="text-sm text-neutral-600">
                        <Link href={PAGE_ROUTES.signIn} className="text-primary-600 font-medium hover:underline">
                            Sign in
                        </Link>{" "}
                        to join the discussion
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {comments.length === 0 ? (
                        <p className="text-sm text-neutral-500 py-4 text-center">
                            No comments yet. Be the first to share your thoughts!
                        </p>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                currentUserId={user?.id}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

interface CommentItemProps {
    comment: CommentWithUser;
    currentUserId?: string;
    onDelete: (id: string) => void;
}

function CommentItem({ comment, currentUserId, onDelete }: CommentItemProps) {
    const isOwner = currentUserId === comment.userId;
    const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-3"
        >
            {/* Avatar */}
            {comment.user.avatarUrl ? (
                <Image
                    src={comment.user.avatarUrl}
                    alt={comment.user.displayName}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover"
                />
            ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                    {comment.user.displayName.charAt(0).toUpperCase()}
                </div>
            )}

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-900">
                        {comment.user.displayName}
                    </span>
                    <span className="text-xs text-neutral-400">•</span>
                    <time className="text-xs text-neutral-500">{formattedDate}</time>
                    {isOwner && (
                        <button
                            type="button"
                            onClick={() => onDelete(comment.id)}
                            className="ml-auto text-neutral-400 hover:text-red-500 transition-colors"
                            aria-label="Delete comment"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
                <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                    {comment.content}
                </p>
            </div>
        </motion.div>
    );
}
