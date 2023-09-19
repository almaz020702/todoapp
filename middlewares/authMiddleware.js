module.exports = function (req, res, next) {
  const cookies = req.cookies;
  const accessToken = cookies.accessToken;
  if (!accessToken) {
    throw new Error("User is not authorized")
  }
  next()
};
