import React, { useState, useEffect } from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Nav from '../components/Nav';
import Auth from '../utils/auth';
import { searchJikanApi } from '../utils/API';
import { getSavedAnimeIds } from '../utils/localStorage';
// ??import axios from 'axios';;

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
    <div className='container'>
      <h1>OtakuHQ</h1>
      <Nav></Nav>
      <form onSubmit={handleFormSubmit}>
        <input
          name='searchInput'
          type='text'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      <div>
        <CardColumns>
          {searchedAnimes.map((anime) => {
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
                  <p className='small'>Rating: {anime.rating}</p>
                  <Card.Text>{anime.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedAnimeIds?.some(
                        (savedAnimeId) => savedAnimeIds === anime.animeId
                      )}
                      className='btn-block btn-info'
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
