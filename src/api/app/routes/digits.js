'use strict';

const DigitsController = require('../controllers/digits');

module.exports = function(api) {
  api.get('/digits/:nthvalue', DigitsController.getDigitInfo);
};
