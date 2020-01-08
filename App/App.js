import React, {Component} from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import RootContainer from './RootContainer';
import ApolloClient from '../App/Services/ApolloClient';

const {client} = new ApolloClient();

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootContainer />
      </ApolloProvider>
    );
  }
}

export default App;
