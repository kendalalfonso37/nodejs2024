const jwt = require("jsonwebtoken");
require("dotenv").config();

let jwtExpirationTime = parseInt(process.env.JWT_EXPIRATION_TIME) || 900; // 15m
let jwtRefreshExpirationTime =
  parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME) || 3600; // 1h

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: jwtExpirationTime,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: jwtRefreshExpirationTime,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
