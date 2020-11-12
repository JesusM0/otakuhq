import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      savedAnimes {
        animeId
        title
        rated
        score
        description
        image
        link
      }
    }
  }
`;
