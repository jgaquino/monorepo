import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, response: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        response.code(401).send({ message: "Unauthorized" });
      }
    }
  );
});

export default jwtPlugin;
