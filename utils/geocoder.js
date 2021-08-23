const NodeGeocoder = require("node-geocoder");

const createGeoCoder = () =>
  NodeGeocoder({
    provider: process.env.GEOCODER_PROVIDER,
    httpAdatper: "https",
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
  });

module.exports = createGeoCoder;
