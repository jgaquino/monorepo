import Fastify from "fastify";

const app = Fastify();

app.get("/", async () => {
  return { message: "API running" };
});

app.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log("Server listening on http://localhost:3000");
});
