import gql from 'graphql-tag';

const FETCH_FOLLWERS = gql`
  query($followingId: String!, $userId: String!) {
    follow(
      where: {follower_id: {_eq: $userId}, following_id: {_eq: $followingId}}
    ) {
      id
    }
  }
`;

const FOLLOW_USER = gql`
  mutation($followingId: String!, $userId: String!) {
    insert_follow(
      objects: [{follower_id: $userId, following_id: $followingId}]
    ) {
      affected_rows
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation($followingId: String!, $userId: String!) {
    delete_follow(
      where: {follower_id: {_eq: $userId}, following_id: {_eq: $followingId}}
    ) {
      affected_rows
    }
  }
`;

const NUMBER_OF_FOLLOWING = gql`
  query($id: String!) {
    follow_aggregate(where: {follower_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
  }
`;

const NUMBER_OF_FOLLOWERS = gql`
  query($id: String!) {
    follow_aggregate(where: {following_id: {_eq: $id}}) {
      aggregate {
        count
      }
    }
  }
`;

export {
  FETCH_FOLLWERS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  NUMBER_OF_FOLLOWING,
  NUMBER_OF_FOLLOWERS,
};
