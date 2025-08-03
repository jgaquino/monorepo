import type { FastifyInstance } from "fastify";
import type { User } from "db/types";
import { DatabaseUserOperations } from "db";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (req, res) => {
    const newUser = req.body as User;
    try {
      return res
        .code(201)
        .send(await DatabaseUserOperations.createOne(newUser));
    } catch (error) {
      return res.code(500).send(error);
    }
  });

  fastify.get("/users", async (_, res) => {
    try {
      return res.send(await DatabaseUserOperations.findMany());
    } catch (error) {
      return res.code(500).send(error);
    }
  });

  fastify.get("/users/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    try {
      const user = await DatabaseUserOperations.findOne(id);
      if (!user) return res.code(404).send({ error: "User not found" });
      return res.send(user);
    } catch (error) {
      return res.code(500).send(error);
    }
  });

  fastify.put("/users/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    const user = req.body as User;
    try {
      return res.send(await DatabaseUserOperations.updateOne(id, user));
    } catch (error) {
      return res.code(500).send(error);
    }
  });

  fastify.delete("/users/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    try {
      await DatabaseUserOperations.deleteOne(id);
      return res.code(204).send();
    } catch (error) {
      return res.code(500).send(error);
    }
  });
}
