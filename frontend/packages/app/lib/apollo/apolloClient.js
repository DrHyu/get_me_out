/* eslint-disable no-underscore-dangle */
import { useMemo } from "react";
import {
  from,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../../utils/asyncStorage";

const httpLink = createHttpLink({
  // uri: "http://178.62.72.241:8080/graphql",
  uri: "http://ec2-54-246-79-54.eu-west-1.compute.amazonaws.com:8000/graphql/",
  credentials: "same-origin",
});

const authLink = setContext(async (_, { headers }) => {
  const { authToken, refreshToken } = await getToken();

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : null,
    },
  };
});

const errorCatchLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([errorCatchLink, authLink, httpLink]);

export function createApolloClient() {
  return new ApolloClient({
    link,
    cache: new InMemoryCache({}),
    defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  });
}
