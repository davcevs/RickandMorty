import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ['filter'],
            merge(existing, incoming, { args }) {
              const merged = existing ? existing.results.slice(0) : [];
              if (args?.page > 1) {
                merged.push(...incoming.results);
              } else {
                merged.splice(0, merged.length, ...incoming.results);
              }
              return {
                ...incoming,
                results: merged,
              };
            },
          },
        },
      },
    },
  }),
})