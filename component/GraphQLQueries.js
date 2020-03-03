import gql from 'graphql-tag';

export const searchQuery1 = gql`
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
      }
    }
  }
`;

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
        display_phone
        rating
        price
        location {
          address1
          state
          city
        }
        hours {
          open {
            start
            end
            day
          }
          is_open_now
        }
      }
    }
  }
`;

export function searchQueryFunction(latitude, longitude) {
  return gql`
  query {
    search(
      latitude: ${latitude}
      longitude: ${longitude}
      radius: 2000
      limit: 50
      term: "food"
    ) {
      total
      business {
        name
        url
        photos
        display_phone
        rating
        price
        location {
          address1
          state
          city
        }
        hours {
          open {
            start
            end
            day
          }
          is_open_now
        }
      }
    }
  }
`;
}
