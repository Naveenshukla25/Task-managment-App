import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import validators from "validator";

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "user Already exist" });
    }
    // validating
    if (!validators.isEmail(email)) {
      return res.json({
        success: false,
        message: " Please enter  a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: " please enter strong password ",
      });
    }
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });
    const user = await newUser.save();
    //const token = createtoken(user._id);
    res.json({ success: true, user: { username: user.username } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Error in registering " });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "all field required " });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(user.password === password)) {
      return res.status(400).json({ msg: "invalid email or password" });
    }
    const token = createtoken(user._id);
    res.json({ success: true, token, user: { username: user.username } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Error " });
  }
};
