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
        201: {
          type: "array",
          items: UserSchemaWithoutPassword,
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
      security: [{ bearerAuth: [] }],
      response: {
        201: CreateUserResponseSchema,
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
      },
    },
  },
};
