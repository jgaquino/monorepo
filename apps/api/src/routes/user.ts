import type { FastifyInstance } from "fastify";
import { CreateUserType, UserType } from "db/schemas/User";
import { DatabaseUserOperations } from "db";
import { userRouteSchemas } from "../plugins/swagger/user-route-schemas";
import { onlyAuthenticate } from "fastify-auth-jwt";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/users",
    { ...userRouteSchemas.createOne },
    async (req, res) => {
      const newUser = req.body as CreateUserType;
      try {
        return res
          .status(201)
          .send(await DatabaseUserOperations.createOne(newUser));
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );

  fastify.get("/users", { ...userRouteSchemas.getAll }, async (_, res) => {
    try {
      return res.status(200).send(await DatabaseUserOperations.findMany());
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  fastify.get(
    "/users/:id",
    { ...userRouteSchemas.getOne },
    async (req, res) => {
      const { id } = req.params as { id: string };
      try {
        const user = await DatabaseUserOperations.findOne(id);

        if (Validations.userNotFound(user))
          return res.status(404).send({ message: "User not found" });

        return res.status(200).send(user);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );

  fastify.patch(
    "/users/:id",
    {
      ...onlyAuthenticate(fastify),
      ...userRouteSchemas.updateOne,
    },
    async (req, res) => {
      const { id } = req.params as { id: string };
      const user = req.body as Partial<CreateUserType>;
      const currentUser = req.user as UserType;

      if (Validations.userNotOwner(currentUser, id))
        return res
          .status(401)
          .send({ message: "Only able to update your own data" });

      try {
        return res.send(await DatabaseUserOperations.updateOne(id, user));
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );

  fastify.delete(
    "/users/:id",
    {
      ...onlyAuthenticate(fastify),
      ...userRouteSchemas.deleteOne,
    },
    async (req, res) => {
      const { id } = req.params as { id: string };
      const currentUser = req.user as UserType;

      if (Validations.userNotOwner(currentUser, id))
        return res
          .status(401)
          .send({ message: "Only able to delete your own user" });

      try {
        await DatabaseUserOperations.deleteOne(id);
        return res.status(204).send();
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  );
}

const Validations = {
  userNotFound: (user: Omit<UserType, "password"> | null) => !user,
  userNotOwner: (user: UserType | null, userId: string) => userId !== user?.id,
};
