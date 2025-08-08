import Fastify from "fastify";
import cors from "@fastify/cors";
import "./plugins/dotenv";
import { registerSwagger } from "./plugins/swagger/config";
import { jwtPlugin } from "fastify-auth-jwt";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import loginRoute from "./routes/login";

(async () => {
  const app = Fastify();
  const port = (process.env.PORT || 3000) as number;
  const URL = process.env.APP_URL || `http://localhost:${port}`;

  await app.register(cors, { origin: true });
  await registerSwagger(app);
  await app.register(jwtPlugin);
  await app.register(loginRoute);
  await app.register(userRoutes);
  await app.register(postRoutes);

  app.listen({ port, host: "0.0.0.0" }, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${URL}`);
  });
})();
