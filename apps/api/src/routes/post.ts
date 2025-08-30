import type { FastifyInstance } from "fastify";
import { DatabasePostOperations } from "db";
import { PostContentType, PostType } from "db/schemas/Post";
import { UserType } from "db/schemas/User";
import { postRouteSchemas } from "../plugins/swagger/post-route-schemas";
import { onlyAuthenticate } from "fastify-auth-jwt";

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/posts",
    {
      ...onlyAuthenticate(fastify),
      ...postRouteSchemas.createOne,
    },
    async (req, res) => {
      const { title, content } = req.body as PostContentType;
      const { id: userId } = req.user as UserType;

      try {
        return res
          .status(201)
          .send(
            await DatabasePostOperations.createOne({ title, content, userId })
          );
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );

  fastify.get(
    "/posts",
    {
      ...postRouteSchemas.getAll,
    },
    async (_, res) => {
      try {
        return res.status(200).send(await DatabasePostOperations.findMany());
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );

  fastify.get(
    "/posts/:id",
    {
      ...postRouteSchemas.getOne,
    },
    async (req, res) => {
      const { id } = req.params as { id: string };
      const post: PostType | null = await DatabasePostOperations.findOne(id);

      if (Validations.postNotFound(post))
        return res.status(401).send({ message: "Post not found" });

      try {
        return res.status(200).send(post);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );

  fastify.patch(
    "/posts/:id",
    {
      ...onlyAuthenticate(fastify),
      ...postRouteSchemas.updateOne,
    },
    async (req, res) => {
      try {
        const { id } = req.params as { id: string };
        const { title, content } = req.body as Partial<PostContentType>;
        const { id: userId } = req.user as UserType;

        const post: PostType | null = await DatabasePostOperations.findOne(id);

        if (Validations.postNotFound(post))
          return res.status(401).send({ message: "Post not found" });
        if (Validations.userNotOwner(post, userId))
          return res.status(401).send({ message: "Not the owner" });

        return res
          .status(200)
          .send(await DatabasePostOperations.updateOne(id, { title, content }));
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );

  fastify.delete(
    "/posts/:id",
    {
      ...onlyAuthenticate(fastify),
      ...postRouteSchemas.deleteOne,
    },
    async (req, res) => {
      try {
        const { id } = req.params as { id: string };
        const { id: userId } = req.user as UserType;
        const post: PostType | null = await DatabasePostOperations.findOne(id);

        if (Validations.postNotFound(post))
          return res.status(401).send({ message: "Post not found" });
        if (Validations.userNotOwner(post, userId))
          return res.status(401).send({ message: "Not the owner" });

        await DatabasePostOperations.deleteOne(id);

        return res.status(204).send();
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );
}

const Validations = {
  postNotFound: (post: PostType | null) => !post,
  userNotOwner: (post: PostType | null, userId: string) =>
    userId !== post?.userId,
};
