import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export async function registerSwagger(fastify: FastifyInstance) {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "User and Post API",
        version: "1.0.0",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description:
            "Enter your bearer token in the format **Bearer &lt;token>**",
        },
      },
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });
}
