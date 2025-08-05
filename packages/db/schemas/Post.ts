import { Type, Static } from "@sinclair/typebox";

export const PostSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  title: Type.String(),
  content: Type.String(),
  userId: Type.String({ format: "uuid" }),
});
export const CreatePostSchema = Type.Pick(PostSchema, [
  "title",
  "content",
  "userId",
]);
export const UpdatePostSchema = Type.Partial(CreatePostSchema);

export type PostType = Static<typeof PostSchema>;
export type PostInputType = Static<typeof CreatePostSchema>;
