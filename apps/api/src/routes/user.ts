import type { FastifyInstance } from "fastify";
import { CreateUserType } from "db/schemas/User";
import { DatabaseUserOperations } from "db";
import { UserRouteSchemas } from "../swagger";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/users",
    {
      preHandler: fastify.authenticate,
      ...UserRouteSchemas.createOne,
    },
    async (req, res) => {
      const newUser = req.body as CreateUserType;
      try {
        return res
          .code(201)
          .send(await DatabaseUserOperations.createOne(newUser));
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.get("/users", { ...UserRouteSchemas.getAll }, async (_, res) => {
    try {
      return res.send(await DatabaseUserOperations.findMany());
    } catch (error) {
      return res.code(500).send(error);
    }
  });

  fastify.get(
    "/users/:id",
    { ...UserRouteSchemas.getOne },
    async (req, res) => {
      const { id } = req.params as { id: string };
      try {
        const user = await DatabaseUserOperations.findOne(id);
        if (!user) return res.code(404).send({ error: "User not found" });
        return res.send(user);
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.put(
    "/users/:id",
    {
      preHandler: fastify.authenticate,
      ...UserRouteSchemas.updateOne,
    },
    async (req, res) => {
      const { id } = req.params as { id: string };
      const user = req.body as Partial<CreateUserType>;
      try {
        return res.send(await DatabaseUserOperations.updateOne(id, user));
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.delete(
    "/users/:id",
    {
      preHandler: fastify.authenticate,
      ...UserRouteSchemas.deleteOne,
    },
    async (req, res) => {
      const { id } = req.params as { id: string };
      try {
        await DatabaseUserOperations.deleteOne(id);
        return res.code(204).send();
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );
}
