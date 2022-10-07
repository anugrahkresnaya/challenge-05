const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dc5mvznuz',
  api_key: '927887713961187',
  api_secret: 'g1GvNLFefkKvLpHhUu4y3js5TS4',
  secure: true
});

module.exports = cloudinary;