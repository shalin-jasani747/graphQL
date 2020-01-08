import gql from 'graphql-tag';

const REGISTER_USER = gql`
  mutation($email: String!) {
    insert_user(objects: [{email: $email}]) {
      returning {
        id
      }
    }
  }
`;

export {REGISTER_USER};
