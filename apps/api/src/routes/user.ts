import type { FastifyInstance } from "fastify";
import { prisma } from "db";
import type { User } from "db/types";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (req, res) => {
    const { password, email, role } = req.body as User;
    const user = await prisma.user.create({ data: { password, email, role } });
    return res.code(201).send(user);
  });

  fastify.get("/users", async (_, res) => {
    const users = await prisma.user.findMany();
    return res.send(users);
  });

  fastify.get("/users/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.code(404).send({ error: "User not found" });
    return res.send(user);
  });

  fastify.put("/users/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    const { password, email, role } = req.body as User;
    const user = await prisma.user.update({
      where: { id },
      data: { password, email, role },
    });
    return res.send(user);
  });

  fastify.delete("/users/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    await prisma.user.delete({ where: { id } });
    return res.code(204).send();
  });
}
