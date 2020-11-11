import React from 'react';
import { CardColumns, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import { removeAnimeId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_ANIME } from '../utils/mutations';
import { REMOVE_ANIME } from '../utils/mutations';

function SavedAnimes() {
  const { loading, data } = useQuery(GET_ME);
  const [removeAnime] = useMutation(REMOVE_ANIME, {
    update(cache, { data: { removeAnime } }) {
      try {
        const { user } = cache.readQuery({ query: GET_ME });

        cache.writeQuery({
          query: GET_ME,
          data: { me: { removeAnime, ...user } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const userData = data?.me || {};

  const handleDeleteAnime = async (animeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeAnime({
        variables: { animeId },
      });

      removeAnimeId(animeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <h1>Viewing saved Anime!</h1>
      <h2>
        {userData.savedAnimes.length
          ? `Viewing ${userData.savedAnimes.length} saved ${
              userData.savedAnimes.length === 1 ? 'animes' : 'animes'
            }:`
          : 'You have no saved Anime!'}
      </h2>
      <CardColumns>
        {userData.savedAnimes.map((anime) => {
          return (
            <Card key={anime.animeId} border='dark'>
              {anime.image ? (
                <Card.Img
                  src={anime.image}
                  alt={`The cover for ${anime.title}`}
                  variant='top'
                />
              ) : null}
              <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
                <Card.Text>{anime.description}</Card.Text>
                <Button
                  className='btn-block btn-danger'
                  onClick={() => handleDeleteAnime(anime.animeId)}
                >
                  Delete this Anime!
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
      <Link to='/'>Back To Home</Link>
    </>
  );
}

export default SavedAnimes;
