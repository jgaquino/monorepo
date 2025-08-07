import type { FastifyInstance } from "fastify";
import { DatabasePostOperations } from "db";
import { PostContentType, PostType } from "db/schemas/Post";
import { UserType } from "db/schemas/User";
import { PostRouteSchemas } from "../plugins/swagger";
import { onlyAuthenticate } from "fastify-auth-jwt";

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/posts",
    {
      ...onlyAuthenticate(fastify),
      ...PostRouteSchemas.createOne,
    },
    async (req, res) => {
      const { title, content } = req.body as PostContentType;
      const { id: userId } = req.user as UserType;

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

  fastify.get(
    "/posts",
    {
      ...PostRouteSchemas.getAll,
    },
    async (_, res) => {
      try {
        return res.code(200).send(await DatabasePostOperations.findMany());
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.get(
    "/posts/:id",
    {
      ...PostRouteSchemas.getOne,
    },
    async (req, res) => {
      const { id } = req.params as { id: string };

      try {
        return res.code(200).send(await DatabasePostOperations.findOne(id));
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.patch(
    "/posts/:id",
    {
      ...onlyAuthenticate(fastify),
      ...PostRouteSchemas.updateOne,
    },
    async (req, res) => {
      try {
        const { id } = req.params as { id: string };
        const { title, content } = req.body as Partial<PostContentType>;
        const { id: userId } = req.user as UserType;

        const post: PostType | null = await DatabasePostOperations.findOne(id);

        if (Validations.postNotFound(post))
          return res.code(401).send({ error: "Post not found" });
        if (Validations.userNotOwner(post, userId))
          return res.code(401).send({ error: "Not the owner" });

        return res
          .code(200)
          .send(await DatabasePostOperations.updateOne(id, { title, content }));
      } catch (error) {
        return res.code(500).send(error);
      }
    }
  );

  fastify.delete(
    "/posts/:id",
    {
      ...onlyAuthenticate(fastify),
      ...PostRouteSchemas.deleteOne,
    },
    async (req, res) => {
      try {
        const { id } = req.params as { id: string };
        const { id: userId } = req.user as UserType;
        const post: PostType | null = await DatabasePostOperations.findOne(id);

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
  postNotFound: (post: PostType | null) => !post,
  userNotOwner: (post: PostType | null, userId: string) =>
    userId !== post?.userId,
};
