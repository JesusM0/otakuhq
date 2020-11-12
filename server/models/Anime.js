const { Schema } = require('mongoose');

const animeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  rated: {
    type: String,
  },
  score: {
    type: String,
  },
  description: {
    type: String,
  },
  // mal_id from jikan api
  animeId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = animeSchema;
