import gql from 'graphql-tag';

const GET_POST = gql`
  query {
    post {
      caption
      uri
    }
  }
`;

export {GET_POST};
