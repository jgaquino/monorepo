import { PrismaClient } from "@prisma/client";
import { UserReponseType, CreateUserType, UserType } from "./schemas/User";
import { CreatePostType, PostType } from "./schemas/Post";

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
    userData: Partial<CreateUserType>
  ): Promise<UserReponseType> => {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  },
  findMany: async (): Promise<UserReponseType[]> => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
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
  findOne: async (id: string): Promise<UserReponseType | null> => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
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
  findUserForAuth: async (email: string): Promise<UserType | null> => {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });
  },
};

export const DatabasePostOperations = {
  createOne: async (newPost: CreatePostType): Promise<PostType> => {
    return await prisma.post.create({ data: newPost });
  },
  deleteOne: async (id: string): Promise<void> => {
    await prisma.post.delete({ where: { id } });
  },
  updateOne: async (
    id: string,
    post: Partial<CreatePostType>
  ): Promise<PostType> => {
    return await prisma.post.update({
      where: { id },
      data: post,
    });
  },
  findMany: async (): Promise<PostType[]> => {
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
  findOne: async (id: string): Promise<PostType | null> => {
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
