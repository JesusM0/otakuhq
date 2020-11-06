export const searchJikanApi = (query) => {
  return fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`);
};
