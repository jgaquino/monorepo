import { PrismaClient, type User, type Post } from "@prisma/client";

const prisma = new PrismaClient();

export const DatabaseUserOperations = {
  createOne: async (newUser: User) => {
    return await prisma.user.create({ data: newUser });
  },
  deleteOne: async (id: string) => {
    return await prisma.user.delete({ where: { id } });
  },
  updateOne: async (id: string, user: User) => {
    return await prisma.user.update({
      where: { id },
      data: user,
    });
  },
  findMany: async () => {
    return await prisma.user.findMany();
  },
  findOne: async (id: string | null, email?: string) => {
    const query = (id && { id }) || (email && { email }) || null;
    if (!query) throw new Error("Pass id or email");
    return await prisma.user.findUnique({ where: query });
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
