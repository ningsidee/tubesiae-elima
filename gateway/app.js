const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        headers: req.headers,
      };
    },
    introspection: true,
    playground: true,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.get("/health", (req, res) => {
    res.json({
      service: "GraphQL Gateway",
      status: "OK",
      port: PORT,
      graphql: `http://localhost:${PORT}${server.graphqlPath}`,
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 GraphQL Gateway running on port ${PORT}`);
    console.log(
      `🚀 GraphQL Playground: http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
