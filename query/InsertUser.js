import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const REGISTER_USER = gql`
  mutation($userId: Int!, $email: String) {
    insert_User(
      objects: [{id: $userId, email: $email}]
      on_conflict: {constraint: User_pkey, update_columns: [last_seen, name]}
    ) {
      affected_rows
    }
  }
`;

export default user => {
  const {loading, error, data} = useMutation(REGISTER_USER, {
    variables: {
      userId: user.id,
      email: user.email,
    },
    pollInterval: 100,
  });
  console.log(loading);
  console.log(error);
  console.log(data);
};
