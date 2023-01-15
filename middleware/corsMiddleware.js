function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, UPDATE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
}

module.exports = cors;