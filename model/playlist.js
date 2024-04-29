const mongoose = require("mongoose");

const playlistSchema = new mongoose.model({
  title: {
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
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
