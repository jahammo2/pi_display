'use strict';

const generatePi = require('../../utils/generatePi');
const helpers = require('./helpers');

const digitMatches = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine'
};

function getGiphyUrl(digit) {
  return helpers
    .gifSearch(digitMatches[digit])
    .then(({ data }) => {
      return data[0].images.original.gif_url;
    });
}

function findOthValue(pi, digit) {
  let counter = 0;

  for (let i = 0; i < pi.length; i++) {
    if (pi[i] === digit.toString()) {
      counter++;
    }
  }

  return counter;
}

function buildDigits({ nthvalue }) {
  const nthValue = Number(nthvalue);
  const pi = generatePi.get(nthValue);
  const piAllDigits = pi.split('.').join('');
  const digit = Number(piAllDigits[piAllDigits.length - 1]);

  return getGiphyUrl(digit)
    .then((giphyUrl) => {
      return {
        digit,
        giphyUrl,
        othValue: findOthValue(piAllDigits, digit),
        nthValue
      };
    });
}

function getDigitInfo(req, res) {
  return buildDigits(req.params)
    .then((digitInfo) => {
      return res.status(200).json(digitInfo);
    });
}

module.exports = {
  getDigitInfo
};
