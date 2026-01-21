import * as z from 'zod'

export const PostSchema = z.object({
    title : z.string().min(1).max(255),
    content : z.string().min(1).max(255),
    author : z.string().min(1).max(50),
});

export const UpdatePostSchema = PostSchema.pick({
    title: true,
    content: true,
    author: true
}).partial();

export type PostInput = z.infer<typeof PostSchema>;