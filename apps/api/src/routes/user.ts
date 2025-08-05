import type { FastifyInstance } from "fastify";
import type { User } from "db/types";
import {
  CreateUserSchema,
  CreateUserResponseSchema,
  CreateUserType,
  UserSchema,
  UpdateUserSchema,
} from "db/schemas/User";
import { DatabaseUserOperations } from "db";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/users",
    {
      preHandler: fastify.authenticate,
      schema: {
        tags: ["User"],
        summary: "Create new user",
        body: CreateUserSchema,
        response: {
          201: CreateUserResponseSchema,
        },
      },
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

  fastify.get(
    "/users",
    {
      schema: {
        tags: ["User"],
        summary: "Get all users",
        response: {
          201: {
            type: "array",
            items: UserSchema,
          },
        },
      },
    },
    async (_, res) => {
      try {
        return res.send(await DatabaseUserOperations.findMany());
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.get(
    "/users/:id",
    {
      schema: {
        tags: ["User"],
        summary: "Get a specific user by id",
        response: {
          201: UserSchema,
        },
      },
    },
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
      schema: {
        tags: ["User"],
        summary: "Update specific user by id",
        body: UpdateUserSchema,
        response: {
          201: CreateUserResponseSchema,
        },
      },
    },
    async (req, res) => {
      const { id } = req.params as { id: string };
      const user = req.body as User;
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
      schema: {
        tags: ["User"],
        summary: "Delete specific user by id",
        response: {
          204: {
            type: "null",
            description: "User deleted successfully",
          },
        },
      },
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
