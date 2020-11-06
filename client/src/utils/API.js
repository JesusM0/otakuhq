// used to search for a particular anime, was thinking of taking the canonicalTitle field from kitsu and plugging it into the query
// so if they want more information than we provide, there will be a link that takes them into the myanimelist website
export const searchJikanApi = (query) => {
  return fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`);
};

// get Trending anime from Kitsu
export const getKitsuTrending = () =>
  fetch('https://kitsu.io/api/edge/trending/anime');

// brings up list of all the anime not sorted, at the bottom there is links to first, next, last and are used to see more anime's
// 10 anime's per response
export const getKitsuAnime = () => fetch('https://kitsu.io/api/edge/anime');

// has a max response of 10 categories, clicking on relationships => anime => related brings up anime of that category and
// at the bottom there is links to first, next, last and are used to see more categories
export const getKitsuCategories = () =>
  fetch('https://kitsu.io/api/edge/categories');

// when getting the response, go to category => links => related to get the type of category
// then clicking on relationships => anime => related brings up anime's of that category
export const getCategoryFavorites = () =>
  fetch('https://kitsu.io/api/edge/category-favorites');
