import { gql } from '@apollo/client';

export const SEARCH_MEDIA = gql`
  query SearchMedia($search: String) {
    Page(page: 1, perPage: 5) {
      media(search: $search) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        type
        startDate {
          year
        }
      }
    }
  }
`;
