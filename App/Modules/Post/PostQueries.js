import gql from 'graphql-tag';

const NEW_POST_SUBSCRIPTION = gql`
  subscription {
    post(order_by: {id: desc}, limit: 1) {
      id
    }
  }
`;

const FETCH_POST_LIST = gql`
  query($offset: Int!) {
    post(order_by: {id: desc}, offset: $offset, limit: 5) {
      id
    }
  }
`;

const FETCH_POST = gql`
  query($postId: Int!) {
    post(where: {id: {_eq: $postId}}) {
      id
      caption
      url
      user_id
      created_at
      user {
        id
        avatar
        name
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
  FETCH_POST_LIST,
  FETCH_POST,
  INSERT_POST,
  UPDATE_POST,
  DELETE_POST,
};
