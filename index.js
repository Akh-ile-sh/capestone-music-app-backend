const express = require("express");
const app = express();
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./model/user");

const connectDB = require("./db/connect");

//routes
const authRouter = require("./routes/authRoute");
const songRouter = require("./routes/songRoute");

const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to  my website");
});

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // User.findOne({ id: jwt_payload.sub }, function (err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
    const user = User.findOne({ id: jwt_payload.sub });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/song", songRouter);

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is listening to port ${port}...`);
  });
};

start();
