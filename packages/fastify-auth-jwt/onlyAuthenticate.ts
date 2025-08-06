import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      response: FastifyReply
    ) => Promise<void>;
  }
}

const onlyAuthenticate = (fastify: FastifyInstance) => ({
  preHandler: fastify.authenticate,
});

export default onlyAuthenticate;
