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
      try {
        const { id } = req.params as { id: string };
        const { title, content } = req.body as Post;
        const { id: userId } = req.user as User;

        const post: Post | null = await DatabasePostOperations.findOne(id);

        if (Validations.postNotFound(post))
          return res.code(401).send({ error: "Post not found" });
        if (Validations.userNotOwner(post, userId))
          return res.code(401).send({ error: "Not the owner" });

        return res.send(
          await DatabasePostOperations.updateOne(id, { title, content })
        );
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.delete(
    "/posts/:id",
    { preHandler: fastify.authenticate },
    async (req, res) => {
      try {
        const { id } = req.params as { id: string };
        const { id: userId } = req.user as User;
        const post: Post | null = await DatabasePostOperations.findOne(id);

        if (Validations.userNotOwner(post, userId))
          return res.code(401).send({ error: "Not the owner" });

        await DatabasePostOperations.deleteOne(id);

        return res.code(204).send();
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );
}

const Validations = {
  postNotFound: (post: Post | null) => !post,
  userNotOwner: (post: Post | null, userId: string) => userId !== post?.userId,
};
