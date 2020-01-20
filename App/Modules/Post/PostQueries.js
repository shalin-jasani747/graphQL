import gql from 'graphql-tag';

const NEW_POST_SUBSCRIPTION = gql`
  subscription {
    post(order_by: {id: desc}, limit: 1) {
      id
      caption
      url
      created_at
      user {
        id
        name
        avatar
      }
    }
  }
`;

const FETCH_POST = gql`
  query {
    post(order_by: {id: desc}, limit: 5) {
      id
      caption
      url
      created_at
      user {
        id
        name
        avatar
      }
    }
  }
`;

const LOAD_MORE_POST = gql`
  query($last_id: Int!) {
    post(order_by: {id: desc}, where: {id: {_lt: $last_id}}, limit: 10) {
      id
      caption
      url
      created_at
      user {
        id
        name
        avatar
      }
    }
  }
`;

const INSERT_POST = gql`
  mutation($caption: String!, $url: String!) {
    insert_post(objects: [{caption: $caption, url: $url}]) {
      returning {
        id
        caption
        url
        created_at
        user {
          id
          name
          avatar
        }
      }
      affected_rows
    }
  }
`;

const UPDATE_POST = gql`
  mutation($id: Int!, $caption: String!, $url: String!) {
    update_post(where: {id: {_eq: $id}}, _set: {caption: $caption, url: $url}) {
      returning {
        id
        caption
        url
        created_at
        user {
          id
          name
          avatar
        }
      }
      affected_rows
    }
  }
`;

const DELETE_POST = gql`
  mutation($id: Int!) {
    delete_post(where: {id: {_eq: $id}}) {
      returning {
        id
      }
      affected_rows
    }
  }
`;

export {
  NEW_POST_SUBSCRIPTION,
  FETCH_POST,
  LOAD_MORE_POST,
  INSERT_POST,
  UPDATE_POST,
  DELETE_POST,
};
