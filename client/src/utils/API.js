// used to search for a particular anime, was thinking of taking the canonicalTitle field from kitsu and plugging it into the query
// so if they want more information than we provide, there will be a link that takes them into the myanimelist website
export const searchJikanApi = (query) => {
  return fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`);
};

// get Trending anime from Kitsu
export const getJikanTrending = () => {
  return fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity');
};

// has a max response of 10 categories, clicking on relationships => anime => related brings up anime of that category and
// at the bottom there is links to first, next, last and are used to see more categories
export const getJikanCategory = (id) =>
  fetch(`https://api.jikan.moe/v3/genre/anime/${id}/1`);

// when getting the response, go to category => links => related to get the type of category
// then clicking on relationships => anime => related brings up anime's of that category
export const getCategoryFavorites = () =>
  fetch('https://api.jikan.moe/v3/top/anime/1/airing');
