/* eslint-disable no-underscore-dangle */
import { useMemo } from "react";
import {
  from,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { concatPagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://192.168.1.146:8080/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) =>
  // return the headers to the context so httpLink can read them
  ({
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    },
  })
);

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
