import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_Anime = gql`
  mutation saveAnime(
    $animeId: ID!
    $title: String
    $rated: String
    $description: String!
    $image: String!
    $link: String
  ) {
    saveAnime(
      animeId: $animeId
      title: $title
      rated: $rated
      description: $description
      image: $image
      link: $link
    ) {
      _id
      username
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

export const REMOVE_Anime = gql`
  mutation removeAnime($animeId: ID!) {
    removeAnime(animeId: $animeId) {
      _id
      username
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
