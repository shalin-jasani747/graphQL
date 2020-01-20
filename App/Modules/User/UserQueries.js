import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query($postId: Int!, $userId: String!) {
    post(where: {id: {_eq: $postId}}) {
      likes_aggregate {
        aggregate {
          count
        }
      }
      likes(where: {user_id: {_eq: $userId}}) {
        id
      }
    }
  }
`;

export {GET_USER_INFO};
