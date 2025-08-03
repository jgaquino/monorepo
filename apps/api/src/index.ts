import Fastify from "fastify";
import userRoutes from "./routes/user";

const app = Fastify();

app.register(userRoutes);

app.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log("Server listening on http://localhost:3000");
});
