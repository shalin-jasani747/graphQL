import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import RootContainer from './RootContainer';
import ApolloClient from '../App/Services/ApolloClient';

const {client} = new ApolloClient();

const App = () => (
  <ApolloProvider client={client}>
    <RootContainer />
  </ApolloProvider>
);

export default App;
