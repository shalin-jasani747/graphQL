import {useQuery} from '@apollo/react-hooks';
import React from 'react';
import {withApollo} from 'react-apollo';
import {LOAD_MORE_POST} from '../Modules/Post/PostQueries';

class LoadMore extends React.Component {
  render() {
    console.log('here');
    return 0;
  }
}

export default withApollo(LoadMore);
