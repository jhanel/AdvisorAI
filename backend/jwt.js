const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create and export token for a user
exports.createToken = function (fn, ln, id) {
  return _createToken(fn, ln, id);
};

// Internal function to create a token
_createToken = function (fn, ln, id) {
  try {
    const user = { userId: id, firstName: fn, lastName: ln };

    // Simple token (without expiration)
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    return { accessToken: accessToken };
  } catch (e) {
    return { error: e.message };
  }
};

// Check if token is expired or invalid
exports.isExpired = function (token) {
  var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) => {
    if (err) return true;
    else return false;
  });

  return isError;
};

// Refresh and return a new token from the old one
exports.refresh = function (token) {
  var ud = jwt.decode(token, { complete: true });

  var userId = ud.payload.userId;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;

  return _createToken(firstName, lastName, userId);
};