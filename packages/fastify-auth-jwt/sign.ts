import { type JWT } from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import type { User } from "db/types";

declare module "fastify" {
  interface FastifyInstance {
    jwt: JWT;
  }
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const getJwtPayload = ({ id, email, role }: User): JwtPayload => ({
  id,
  email,
  role,
});

const sign = (fastify: FastifyInstance, user: User): string => {
  const payload: JwtPayload = getJwtPayload(user);
  return fastify.jwt.sign(payload);
};

export default sign;
