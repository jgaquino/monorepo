import Fastify from "fastify";
import "./plugins/dotenv";
import { registerSwagger } from "./plugins/swagger";
import { jwtPlugin } from "fastify-auth-jwt";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import loginRoute from "./routes/login";

const app = Fastify();
const port = (process.env.PORT || 3000) as number;
const URL = process.env.APP_URL || `http://localhost:${port}`;

registerSwagger(app);
app.register(jwtPlugin);
app.register(loginRoute);
app.register(userRoutes);
app.register(postRoutes);

app.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) throw err;
  console.log(`Server listening on ${URL}`);
});
