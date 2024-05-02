const { getToken } = require("../utils/token");

const User = require("../model/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //request will be invalid if email already exists
    const user = await User.findOne({ email });
    if (user) {
      res.status(403).json({ error: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { firstName, lastName, email, password: hashedPassword };
    const createUser = await User.create(newUser);

    const token = await getToken(email, createUser);

    res.status(200).json({ createUser, token });
  } catch (error) {
    res.json(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(301).json("enter all field!!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).json("user with email doesn't exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(403).json("wrong password");
  }

  res.status(200).json({ user });
};

module.exports = { registerUser, loginUser };
