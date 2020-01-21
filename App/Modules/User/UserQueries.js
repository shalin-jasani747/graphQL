import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query($userId: String!) {
    user(where: {id: {_eq: $userId}}) {
      avatar
      email
      id
      name
      posts {
        id
      }
    }
  }
`;

export {GET_USER_INFO};
