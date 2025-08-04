import { PrismaClient, type User } from "@prisma/client";

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
