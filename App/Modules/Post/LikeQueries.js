import gql from 'graphql-tag';

const FETCH_LIKES = gql`
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

const LIKE_POST = gql`
  mutation($postId: Int!, $userId: String!) {
    insert_like(objects: [{post_id: $postId, user_id: $userId}]) {
      affected_rows
    }
  }
`;

const UNLIKE_POST = gql`
  mutation($postId: Int!, $userId: String!) {
    delete_like(where: {user_id: {_eq: $userId}, post_id: {_eq: $postId}}) {
      affected_rows
    }
  }
`;

export {FETCH_LIKES, LIKE_POST, UNLIKE_POST};
