import gql from 'graphql-tag';

export const GET_EXCHANGE_RATE = gql`
  query Currency($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`;
