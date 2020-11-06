const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const animeSchema = require('./Anime');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /[\S]+/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    savedAnimes: [animeSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
