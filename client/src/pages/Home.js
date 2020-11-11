import React, { useState, useEffect } from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap';
import Nav from '../components/Nav';
import Auth from '../utils/auth';
import { searchJikanApi } from '../utils/API';
import { saveAnimeIds, getSavedAnimeIds } from '../utils/localStorage';
import video from '../imgs/video.mp4';
import { SAVE_ANIME } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import Carousel from 'react-elastic-carousel';
import Item from '../components/Carousel/item';
import PopularAnime from '../components/PopularAnime';
import Footer from '../components/Footer';

function Home() {
  const [searchedAnimes, setSearchedAnimes] = useState([]);

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved animeId values
  const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());

  const [saveAnime] = useMutation(SAVE_ANIME);

  useEffect(() => {
    return () => saveAnimeIds(savedAnimeIds);
  });

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchJikanApi(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await response.json();

      const animeData = results.map((anime) => ({
        animeId: anime.mal_id,
        rating: anime.rated || ['No rating to display'],
        title: anime.title,
        score: anime.score,
        description: anime.synopsis,
        image: anime.image_url || '',
        link: anime.url,
      }));

      setSearchedAnimes(animeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // function to handle saving an anime to our database
  const handleSaveAnime = async (animeId) => {
    // find the book in `searchedAnime` state by the matching id
    const animeToSave = searchedAnimes.find(
      (anime) => anime.animeId === animeId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveAnime({
        variables: { ...animeToSave },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedAnimeIds([...savedAnimeIds, animeToSave.animeId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <section className="header">
        <Nav></Nav>
        <video className="bg-video" autoPlay muted loop>
          <source src={video} type="video/mp4" />
          Your browser is not supported!
        </video>
        <div className="heading-primary">
          <form className="search-bar" onSubmit={handleFormSubmit}>
            <input
              className="heading-search-bar"
              name="searchInput"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="heading-search-btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </section>
      <div>
        <h2>
          {searchedAnimes.length
            ? `Viewing ${searchedAnimes.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns className="search-container carousel">
          <Carousel breakPoints={breakPoints}>
            {searchedAnimes.map((anime) => {
              return (
                <Item>
                  <Card key={anime.animeId} className="anime-card">
                    {anime.image ? (
                      <Card.Img
                        src={anime.image}
                        alt={`The cover for ${anime.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{anime.title}</Card.Title>
                      <p className="small">Rating: {anime.rating}</p>
                      <p className="small">Score: {anime.score}/10</p>
                      <Card.Text>{anime.description}</Card.Text>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedAnimeIds?.some(
                            (savedAnimeId) => savedAnimeId === anime.animeId
                          )}
                          className="btn-block btn-info"
                          onClick={() => handleSaveAnime(anime.animeId)}
                        >
                          {savedAnimeIds?.some(
                            (savedAnimeId) => savedAnimeId === anime.animeId
                          )
                            ? 'This anime has already been saved!'
                            : 'Save this anime!'}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Item>
              );
            })}
          </Carousel>
        </CardColumns>
        <PopularAnime />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
