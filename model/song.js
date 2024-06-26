const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
  },
});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
