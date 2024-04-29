const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db/connect");

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("welcome to  my website");
});

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is listening to port ${port}...`);
  });
};

start();
