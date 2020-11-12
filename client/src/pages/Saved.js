import React from 'react';
import { CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeAnimeId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_ANIME } from '../utils/mutations';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Carousel from 'react-elastic-carousel';
import Item from '../components/Carousel/item';

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

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <div className="container">
      <section className="header saved">
        <Nav />
      </section>
      <h2 className="title">
        {userData.savedAnimes.length
          ? `Viewing ${userData.savedAnimes.length} saved ${
              userData.savedAnimes.length === 1 ? 'animes' : 'animes'
            }:`
          : 'You have no saved Anime!'}
      </h2>
      <CardColumns>
        {userData.savedAnimes.length ? (
          <Carousel className="slider" breakPoints={breakPoints}>
            {userData.savedAnimes.map((anime) => {
              return (
                <Item key={anime.animeId}>
                  <Card className="anime-card">
                    {anime.image ? (
                      <a
                        href={anime.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Card.Img
                          src={anime.image}
                          alt={`The cover for ${anime.title}`}
                          variant="top"
                        />
                      </a>
                    ) : null}
                    <Card.Body>
                      <Card.Title>{anime.title}</Card.Title>
                      <p>Score: {anime.score}/10</p>
                      <Card.Text>{anime.description}</Card.Text>
                      <Button
                        className="anime-btn delete"
                        onClick={() => handleDeleteAnime(anime.animeId)}
                      >
                        Delete this Anime!
                      </Button>
                    </Card.Body>
                  </Card>
                </Item>
              );
            })}
          </Carousel>
        ) : (
          ''
        )}
      </CardColumns>
      <Footer />
    </div>
  );
}

export default SavedAnimes;
