import "./dotenv-config";
import Fastify from "fastify";
import { jwtPlugin } from "fastify-auth-jwt";
import { registerSwagger } from "./swagger";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import loginRoute from "./routes/login";

const app = Fastify();
const port = (process.env.PORT || 3000) as number;

registerSwagger(app);
app.register(jwtPlugin);
app.register(loginRoute);
app.register(userRoutes);
app.register(postRoutes);

app.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) throw err;
  console.log(`Server listening on http://localhost:${port}`);
});
