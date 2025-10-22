const jwt = require("jsonwebtoken");
// TODO: Tech Debt: hacer variable de entorno para guardar el tiempo del accessToken y del refreshToken

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "1h" });
};

module.exports = { generateAccessToken, generateRefreshToken };
