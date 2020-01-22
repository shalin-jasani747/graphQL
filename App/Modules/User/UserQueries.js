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
      posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const UPDATE_USER_INFO = gql`
  mutation(
    $userId: String!
    $avatar: String!
    $email: String!
    $name: String!
  ) {
    update_user(
      where: {id: {_eq: $userId}}
      _set: {avatar: $avatar, email: $email, name: $name}
    ) {
      returning {
        id
        avatar
        name
      }
      affected_rows
    }
  }
`;

const NEW_POST_SUBSCRIPTION = gql`
  subscription($userId: String!) {
    post(order_by: {id: desc}, where: {user_id: {_eq: $userId}}, limit: 1) {
      id
    }
  }
`;

const FETCH_USERS_POST_LIST = gql`
  query($offset: Int!, $userId: String!) {
    post(
      order_by: {id: desc}
      where: {user_id: {_eq: $userId}}
      offset: $offset
      limit: 5
    ) {
      id
    }
  }
`;

export {
  GET_USER_INFO,
  UPDATE_USER_INFO,
  NEW_POST_SUBSCRIPTION,
  FETCH_USERS_POST_LIST,
};
