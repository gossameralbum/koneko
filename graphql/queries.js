import { gql } from '@apollo/client';

export const SEARCH_MEDIA = gql`
  query SearchMedia($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(search: $search, isAdult: false) {
        id
        episodes 
        chapters
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
      pageInfo {
        currentPage
        lastPage
        hasNextPage
      }
    }
  }
`;

export const GET_POPULAR_MEDIA = gql`
  query GetPopularMedia($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(sort: POPULARITY_DESC, isAdult: false) {
        id
        episodes 
        chapters
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
      pageInfo {
        currentPage
        lastPage
        hasNextPage
      }
    }
  }
`;
