const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJWT = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return new Error("Incorrect email or password");
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return new Error("User with the same email address already exists");
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword });
    const token = generateJWT(user.id, user.email);
    res.cookie("accessToken", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const candidate = await User.findOne({ where: { email } });
    if (!candidate) {
      return new Error("User with such email does not exist");
    }
    let comparePassword = bcrypt.compareSync(password, candidate.password);
    if (!comparePassword) {
      return new Error("Incorrect password");
    }
    const token = generateJWT(candidate.id, candidate.email, candidate.role);
    res.cookie("accessToken", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ token });
  }

  async logout(req, res) {
    res.clearCookie('accessToken');

    return res.json({message: "Success!"})
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
