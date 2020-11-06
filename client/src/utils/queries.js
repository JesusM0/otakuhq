import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      savedAnimes {
        animeId
        title
        rated
        description
        image
        link
      }
    }
  }
`;
