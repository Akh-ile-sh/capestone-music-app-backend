const jwt = require("jsonwebtoken");
require("dotenv").config();

const getToken = async (user) => {
  const token = jwt.sign({ identifier: user._id }, process.env.JWT_SECRET);
  return token;
};

module.exports = { getToken };
