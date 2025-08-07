import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import {
  CreateUserSchema,
  CreateUserResponseSchema,
  UserSchema,
  UpdateUserSchema,
} from "db/schemas/User";
import {
  CreatePostSchema,
  PostSchema,
  UpdatePostSchema,
} from "db/schemas/Post";

export async function registerSwagger(fastify: FastifyInstance) {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "User and Post API",
        description: "API documentation for my Fastify project",
        version: "1.0.0",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
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

const USER_TAG = "User";
export const UserRouteSchemas = {
  getAll: {
    schema: {
      tags: [USER_TAG],
      summary: "Get all users",
      response: {
        201: {
          type: "array",
          items: UserSchema,
        },
      },
    },
  },
  getOne: {
    schema: {
      tags: [USER_TAG],
      summary: "Get a specific user by id",
      response: {
        201: UserSchema,
      },
    },
  },
  createOne: {
    schema: {
      tags: [USER_TAG],
      summary: "Create new user",
      body: CreateUserSchema,
      response: {
        201: CreateUserResponseSchema,
      },
    },
  },
  updateOne: {
    schema: {
      tags: [USER_TAG],
      summary: "Update specific user by id",
      body: UpdateUserSchema,
      response: {
        201: CreateUserResponseSchema,
      },
    },
  },
  deleteOne: {
    schema: {
      tags: [USER_TAG],
      summary: "Delete specific user by id",
      response: {
        204: {
          type: "null",
          description: "User deleted successfully",
        },
      },
    },
  },
};

const POST_TAG = "POST";
export const PostRouteSchemas = {
  getAll: {
    schema: {
      tags: [POST_TAG],
      summary: "Get all posts",
      response: {
        200: {
          type: "array",
          items: PostSchema,
        },
      },
    },
  },
  getOne: {
    schema: {
      tags: [POST_TAG],
      summary: "Get a specific post by id",
      response: {
        200: PostSchema,
      },
    },
  },
  createOne: {
    schema: {
      tags: [POST_TAG],
      summary: "Create new post",
      body: CreatePostSchema,
      response: {
        201: PostSchema,
      },
    },
  },
  updateOne: {
    schema: {
      tags: [POST_TAG],
      summary: "Update a specific post by id",
      body: UpdatePostSchema,
      response: {
        200: PostSchema,
      },
    },
  },
  deleteOne: {
    schema: {
      tags: [POST_TAG],
      summary: "Delete a specific post by id",
      response: {
        204: {
          type: "null",
          description: "User deleted successfully",
        },
      },
    },
  },
};
