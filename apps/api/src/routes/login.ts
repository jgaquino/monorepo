import type { FastifyInstance } from "fastify";
import { sign } from "fastify-auth-jwt";
import { DatabaseUserOperations } from "db";

export default function loginRoute(fastify: FastifyInstance) {
  fastify.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const user = await DatabaseUserOperations.findOne(null, email);
      if (user?.password !== password)
        return res.status(401).send("Unauthorized");

      const token = sign(fastify, user);
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
