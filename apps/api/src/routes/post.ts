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

  fastify.get("/posts/:id", async (req, res) => {
    const { id } = req.params as { id: string };

    try {
      return res.send(await DatabasePostOperations.findOne(id));
    } catch (error) {
      return res.code(500).send(error);
    }
  });

  fastify.put(
    "/posts/:id",
    { preHandler: fastify.authenticate },
    async (req, res) => {
      const { id } = req.params as { id: string };
      const { title, content } = req.body as Post;
      const { id: userId } = req.user as User;

      const post = await DatabasePostOperations.findOne(id);

      const validations = {
        postNotFound: !post,
        userNotOwner: userId !== post?.userId,
      };
      if (validations.postNotFound)
        return res.code(401).send({ error: "Post not found" });
      if (validations.userNotOwner)
        return res.code(401).send({ error: "Not the owner" });

      try {
        return res.send(
          await DatabasePostOperations.updateOne(id, { title, content })
        );
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );
}
