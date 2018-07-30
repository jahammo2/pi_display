'use strict';

const gphApiClient = require('giphy-js-sdk-core');

const config = require('../../../config');

function gifSearch(digit) {
  const client = gphApiClient(config.giphyApiKey);
  return client.search('gifs', { q: digit });
}

module.exports = gifSearch;
