import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.anilist.co',
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  cache: new InMemoryCache(),
});

export default client;
