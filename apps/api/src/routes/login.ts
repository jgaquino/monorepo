import type { FastifyInstance } from "fastify";
import { sign } from "fastify-auth-jwt";
import { DatabaseUserOperations } from "db";

export default function loginRoute(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    {
      schema: {
        tags: ["User authentication"],
        summary: "User authentication with JWT",
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          500: {
            type: "string",
          },
        },
      },
    },
    async (req, res) => {
      try {
        const { email, password } = req.body as {
          email: string;
          password: string;
        };
        const user = await DatabaseUserOperations.findUserForAuth(email);
        if (user?.password !== password)
          return res.status(401).send({ message: "Wrong password" });

        const token = sign(fastify, user);
        res.status(201).send({ token });
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );
}
