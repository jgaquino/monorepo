import {
  PostContentSchema,
  PostSchema,
  UpdatePostSchema,
} from "db/schemas/Post";

const POST_TAG = "POST";
export const postRouteSchemas = {
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
      body: PostContentSchema,
      security: [{ bearerAuth: [] }],
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
      security: [{ bearerAuth: [] }],
      response: {
        200: PostSchema,
      },
    },
  },
  deleteOne: {
    schema: {
      tags: [POST_TAG],
      summary: "Delete a specific post by id",
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
