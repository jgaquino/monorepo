import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { FastifyPluginAsync } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  fastify.decorate("authenticate", async (request, response) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      response.code(401).send({ message: "Unauthorized" });
    }
  });
});

export default jwtPlugin;
