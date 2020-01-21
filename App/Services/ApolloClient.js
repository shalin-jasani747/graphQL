import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient, HttpLink, split} from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {CachePersistor} from 'apollo-cache-persist';
import {setContext} from 'apollo-link-context';
import {getMainDefinition} from 'apollo-utilities';
import {WebSocketLink} from 'apollo-link-ws';
import Secrets from 'react-native-config';

const makeApolloClient = () => {
  // create an apollo link instance, a network interface for apollo client
  console.log('makeApolloClient');

  const httpLink = new HttpLink({
    uri: Secrets.API_URL,
    opts: {
      credentials: 'include',
    },
  });

  const wsLink = new WebSocketLink({
    uri: Secrets.WEBSOCKET_API_URL,
    options: {
      reconnect: true,
      // connectionParams: {
      //   authToken: AsyncStorage.getItem('@reactnative-graphql:session'),
      // },
    },
  });

  const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from whereever it exists - This is your choice.
    const session = await AsyncStorage.getItem('@reactnative-graphql:session');
    const {token} = JSON.parse(session);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const link = split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
  );

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();

  // Cache persistor
  const persistor = new CachePersistor({
    cache,
    storage: AsyncStorage,
  });

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });

  return {
    client,
    persistor,
  };
};

export default makeApolloClient;
