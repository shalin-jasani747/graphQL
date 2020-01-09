import gql from 'graphql-tag';

const GET_POST = gql`
  query {
    post {
      id
      caption
      url
      created_at
      likes_aggregate {
        aggregate {
          count
        }
      }
      user {
        name
        avatar
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation($caption: String!, $url: String!) {
    insert_post(objects: [{caption: $caption, url: $url}]) {
      affected_rows
    }
  }
`;

const UPDATE_POST = gql`
  mutation($id: Int!, $caption: String!, $url: String!) {
    update_post(where: {id: {_eq: $id}}, _set: {caption: $caption, url: $url}) {
      affected_rows
    }
  }
`;

const DELETE_POST = gql`
  mutation($id: Int!) {
    delete_post(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export {GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST};
