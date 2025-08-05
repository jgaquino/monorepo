import { PrismaClient, type Post } from "@prisma/client";
import {
  UserReponseType,
  CreateUserType,
  UpdateUserType,
  UserType,
} from "./schemas/User";

const prisma = new PrismaClient();

export const DatabaseUserOperations = {
  createOne: async (newUser: CreateUserType): Promise<UserReponseType> => {
    return await prisma.user.create({ data: newUser });
  },
  deleteOne: async (id: string): Promise<void> => {
    await prisma.user.delete({ where: { id } });
  },
  updateOne: async (
    id: string,
    userData: UpdateUserType
  ): Promise<UserReponseType> => {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  },
  findMany: async (): Promise<UserType[]> => {
    return await prisma.user.findMany({
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            userId: true,
          },
        },
      },
    });
  },
  findOne: async (
    id: string | null,
    email?: string
  ): Promise<UserType | null> => {
    const query = (id && { id }) || (email && { email }) || null;
    if (!query) throw new Error("Either 'id' or 'email' must be provided.");
    return await prisma.user.findUnique({
      where: query,
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            userId: true,
          },
        },
      },
    });
  },
};

export const DatabasePostOperations = {
  createOne: async (newPost: Omit<Post, "id">) => {
    return await prisma.post.create({ data: newPost });
  },
  deleteOne: async (id: string) => {
    return await prisma.post.delete({ where: { id } });
  },
  updateOne: async (id: string, post: Omit<Post, "id" | "userId">) => {
    return await prisma.post.update({
      where: { id },
      data: post,
    });
  },
  findMany: async () => {
    return await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  },
  findOne: async (id: string) => {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  },
};
