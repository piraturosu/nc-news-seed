const endpointsJson = require("../endpoints.json");

function getApi(req, res, next) {
  res.status(200).send({ endpoints: endpointsJson });
}

module.exports = { getApi };
