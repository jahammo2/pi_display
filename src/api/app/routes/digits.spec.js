'use strict';

const app = require('../../config/app');
const helpers = require('../controllers/helpers');

const TEST_DIGITS = [
  {
    digit: 3,
    othValue: 1,
    nthValue: 1
  },
  {
    digit: 1,
    othValue: 1,
    nthValue: 2
  },
  {
    digit: 4,
    othValue: 1,
    nthValue: 3
  },
  {
    digit: 7,
    othValue: 8,
    nthValue: 100
  },
  {
    digit: 9,
    othValue: 105,
    nthValue: 999
  },
  {
    digit: 8,
    othValue: 101,
    nthValue: 1000
  }
];

describe('digit requests', function() {
  beforeEach(function() {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('GET /digits/:nthdigit', function() {
    let giphyUrl;

    beforeEach(function() {
      giphyUrl = faker.internet.url();

      const mockGiphyData = {
        data: [
          {
            images: {
              original: {
                gif_url: giphyUrl
              }
            }
          }
        ]
      };

      this.sandbox.stub(helpers, 'gifSearch').callsFake(() => {
        return Promise.resolve(mockGiphyData);
      });
    });

    TEST_DIGITS.forEach(({ nthValue, digit, othValue }) => {
      let endpoint;
      let expectedDigitInfo;
      let promise;
      let request;

      beforeEach(function() {
        expectedDigitInfo = {
          digit,
          giphyUrl,
          othValue,
          nthValue
        };

        endpoint = `/api/digits/${nthValue}`;
        request = apiRequest(app);
        promise = request.get(endpoint);
      });

      it('will respond with a 200', function() {
        return promise
          .then((response) => {
            expect(response).to.have.status(200);
          });
      });

      it('will return the digit\'s information', function() {
        return promise
          .then(({ body }) => {
            expect(body).to.deep.equal(expectedDigitInfo);
          });
      });
    });
  });

  context('when the digit does not exist', function() {
    it('returns the first digit of pi');
  });
});
