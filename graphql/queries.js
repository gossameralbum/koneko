// queries.js
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
        type
        startDate {
          year
        }
      }
      pageInfo {
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
        type
        startDate {
          year
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const GET_MEDIA_DETAILS = gql`
  query GetMediaDetails($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      format
      type
      duration
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      countryOfOrigin
      genres
      description
    }
  }
`;
