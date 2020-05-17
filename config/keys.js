const dotenv = require("dotenv").config();

module.exports = {
  mongoURI: `${process.env.REACT_APP_MONGO_URI}`,
  secretOrKey: "secret",
};
