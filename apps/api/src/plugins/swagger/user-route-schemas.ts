import {
  CreateUserSchema,
  CreateUserResponseSchema,
  UserSchema,
  UpdateUserSchema,
  UserSchemaWithoutPassword,
} from "db/schemas/User";

const USER_TAG = "User";
export const userRouteSchemas = {
  getAll: {
    schema: {
      tags: [USER_TAG],
      summary: "Get all users",
      response: {
        200: {
          type: "array",
          items: UserSchemaWithoutPassword,
        },
        500: {
          type: "string",
        },
      },
    },
  },
  getOne: {
    schema: {
      tags: [USER_TAG],
      summary: "Get a specific user by id",
      response: {
        200: UserSchemaWithoutPassword,
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        500: {
          type: "string",
        },
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
        500: {
          type: "string",
        },
      },
    },
  },
  updateOne: {
    schema: {
      tags: [USER_TAG],
      summary: "Update specific user by id",
      body: UpdateUserSchema,
      security: [{ bearerAuth: [] }],
      response: {
        201: CreateUserResponseSchema,
        401: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        500: {
          type: "string",
        },
      },
    },
  },
  deleteOne: {
    schema: {
      tags: [USER_TAG],
      summary: "Delete specific user by id",
      security: [{ bearerAuth: [] }],
      response: {
        204: {
          type: "null",
          description: "User deleted successfully",
        },
        401: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        500: {
          type: "string",
        },
      },
    },
  },
};
