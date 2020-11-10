import React, { useState, useEffect } from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/Nav';
import Auth from '../utils/auth';
import { searchJikanApi } from '../utils/API';
import { getSavedAnimeIds } from '../utils/localStorage';
import video from '../imgs/video.mp4';

function Home() {
  const [searchedAnimes, setSearchedAnimes] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved animeId values
  const [savedAnimeIds, setAnimeIds] = useState(getSavedAnimeIds());

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
        animeId: anime.id,
        rating: anime.rated || ['No rating to display'],
        title: anime.title,
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

  return (
    <div className="container">
      <section className="header">
        <Nav></Nav>
        <video class="bg-video" autoPlay muted loop>
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
        <CardColumns>
          {searchedAnimes.map((anime) => {
            return (
              <Card key={anime.animeId} border="dark">
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
                  <Card.Text>{anime.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedAnimeIds?.some(
                        (savedAnimeId) => savedAnimeIds === anime.animeId
                      )}
                      className="btn-block btn-info"
                      // onClick={() => handleSavedAnime(anime.animeId)}
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
            );
          })}
        </CardColumns>
      </div>
    </div>
  );
}

export default Home;
