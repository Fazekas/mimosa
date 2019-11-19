import gql from 'graphql-tag';

export const searchQuery = gql`
  query {
    search(
      latitude: 42.281422
      longitude: -83.748482
      radius: 2000
      limit: 50
      term: "food"
    ) {
      total
      business {
        name
        url
        photos
        rating
        location {
          address1
          state
          city
        }
      }
    }
  }
`;

export const categoryQuery = gql`
  query {
    categories {
      total
    }
  }
`;
