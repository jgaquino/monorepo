import "./dotenv-config";
import Fastify from "fastify";
import { jwtPlugin } from "fastify-auth-jwt";
import userRoutes from "./routes/user";
import loginRoute from "./routes/login";

const app = Fastify();

app.register(jwtPlugin);
app.register(loginRoute);
app.register(userRoutes);

app.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log("Server listening on http://localhost:3000");
});
