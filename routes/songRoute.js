const express = require("express");
const router = express.Router();

const {
  createSong,
  getAllSongs,
  getSongBySinger,
  getSongByTitle,
} = require("../controller/songController");

router.post("/createSong", createSong);
router.get("/getAllSongs", getAllSongs);
router.get("/getSongBySinger", getSongBySinger);
router.get("/getSongByTitle", getSongByTitle);

module.exports = router;
