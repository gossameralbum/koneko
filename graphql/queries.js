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

export const GET_POPULAR_MEDIA = gql`
  query GetPopularMedia {
    Page(page: 1, perPage: 10) {
      media(sort: POPULARITY_DESC) {
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
