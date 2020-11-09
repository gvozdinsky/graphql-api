import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AlbumResolver } from "./modules/album/resolvers";
import { PurchaseResolver } from "./modules/purchase/resolvers";

let schema;
export async function createSchema() {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [AlbumResolver, PurchaseResolver],
    });
  }
  return schema;
}

export async function createApolloServer() {
  // Caches schema creation for faster tests
  const schema = await createSchema();

  return new ApolloServer({
    schema,
    playground: true,
  });
}

export async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const server = await createApolloServer();

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}
