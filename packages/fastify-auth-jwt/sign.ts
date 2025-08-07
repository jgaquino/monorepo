import { type JWT } from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import { UserType } from "db/schemas/User";

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

const getJwtPayload = ({ id, email, role }: UserType): JwtPayload => ({
  id,
  email,
  role,
});

const sign = (fastify: FastifyInstance, user: UserType): string => {
  const payload: JwtPayload = getJwtPayload(user);
  return fastify.jwt.sign(payload);
};

export default sign;
