import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "./setup";

interface Options {
  query: string;
  variables?: Maybe<{
    [key: string]: any;
  }>;
}
export async function graphQLCall({ query, variables }: Options) {
  const schema: GraphQLSchema = await createSchema();
  return graphql({
    schema,
    source: query,
    variableValues: variables
  })
}