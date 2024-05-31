import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
}
