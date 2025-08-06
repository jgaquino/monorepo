import { Type, Static } from "@sinclair/typebox";
import { PostSchema } from "./Post";

export const UserSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
  email: Type.String({ format: "email" }),
  password: Type.String(),
  role: Type.String(),
  posts: Type.Optional(Type.Array(PostSchema)),
});
export const CreateUserSchema = Type.Pick(UserSchema, [
  "email",
  "password",
  "role",
]);
export const CreateUserResponseSchema = Type.Pick(UserSchema, [
  "id",
  "email",
  "password",
  "role",
]);
export const UpdateUserSchema = Type.Partial(CreateUserSchema);

export type UserType = Static<typeof UserSchema>;
export type CreateUserType = Static<typeof CreateUserSchema>;
export type UserReponseType = Static<typeof CreateUserResponseSchema>;
