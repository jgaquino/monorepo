import { type JWT } from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

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
interface UserData {
  id: string;
  email: string;
  role: string;
}

const getJwtPayload = ({ id, email, role }: UserData): JwtPayload => ({
  id,
  email,
  role,
});

const sign = (fastify: FastifyInstance, userData: UserData): string => {
  const payload: JwtPayload = getJwtPayload(userData);
  return fastify.jwt.sign(payload);
};

export default sign;
