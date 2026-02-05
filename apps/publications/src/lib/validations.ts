import { z } from 'zod';

export const commentSchema = z.object({
    content: z.string().min(1, 'Comment content is required').max(2000, 'Comment content is too long'),
    parentId: z.string().optional().nullable(),
});

export const deleteCommentSchema = z.object({
    commentId: z.string().min(1, 'Comment ID is required'),
});
