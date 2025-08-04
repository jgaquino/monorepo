import type { FastifyInstance } from "fastify";
import type { Post, User } from "db/types";
import { DatabasePostOperations } from "db";

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/posts",
    { preHandler: fastify.authenticate },
    async (req, res) => {
      const { title, content } = req.body as Post;
      const { id: userId } = req.user as User;

      try {
        return res
          .code(201)
          .send(
            await DatabasePostOperations.createOne({ title, content, userId })
          );
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.get("/posts", async (_, res) => {
    try {
      return res.send(await DatabasePostOperations.findMany());
    } catch (error) {
      return res.code(500).send(error);
    }
  });
}
