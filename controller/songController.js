const Song = require("../model/song");

const createSong = async (req, res) => {
  try {
    const { title, genre, image, music, singer } = req.body;

    if (!title || !genre || !image || !music) {
      res.status(301).json("fill every field");
    }

    const song = { title, genre, image, music, singer };
    const newSong = await Song.create(song);
    res.status(200).json(newSong);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllSongs = async (req, res) => {
  const songs = await Song.find();
  res.status(200).json({ songs });
};

const getSongBySinger = async (req, res) => {
  const singer = req.query.singer;
  const songs = await Song.find({ singer: singer });

  console.log(songs.length);
  return res.status(200).json(songs);
};

const getSongByTitle = async (req, res) => {
  const name = req.query.name;
  const songs = await Song.find({ title: name });
  return res.status(200).json(songs);
};

module.exports = { createSong, getAllSongs, getSongBySinger, getSongByTitle };
