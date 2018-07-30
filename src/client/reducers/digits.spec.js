import Immutable from 'immutable';
import digitsReducer from './digits';

const INITIAL_STATE = Immutable.fromJS({
  digitInfo: new Immutable.Map(),
  isActive: false,
  isFetched: false
});

describe('digitsReducer', function() {
  it('defaults to returning the initial state', function() {
    expect(digitsReducer(undefined, {})).to.eql(INITIAL_STATE); // eslint-disable-line no-undefined
  });

  it('handles bogus actions with ease', function() {
    const bogusAction = {
      type: 'BOGUS',
      payload: { fakeData: 1234 }
    };
    expect(digitsReducer(INITIAL_STATE, bogusAction)).to.deep.equal(INITIAL_STATE);
  });

  describe('GET_DIGIT_INFO_START action', function() {
    let nextState;

    beforeEach(function() {
      const previousState = INITIAL_STATE.set('error', faker.hacker.phrase());

      nextState = digitsReducer(previousState, {
        type: 'GET_DIGIT_INFO_START'
      });
    });

    it('deletes any existing error', function() {
      expect(nextState.has('error')).to.be.false;
    });

    it('sets isActive to true', function() {
      expect(nextState.get('isActive')).to.be.true;
    });
  });

  describe('GET_TOURS_SUCCESS', function() {
    let expectedDigitInfo;
    let nextState;

    beforeEach(function() {
      expectedDigitInfo = {
        digit: faker.random.number(),
        giphyUrl: faker.internet.url(),
        othValue: faker.random.number(),
        nthValue: faker.random.number()
      };

      const previousState = Immutable.fromJS({
        isActive: true
      });

      nextState = digitsReducer(previousState, {
        type: 'GET_DIGIT_INFO_SUCCESS',
        payload: {
          digitInfo: expectedDigitInfo
        }
      });
    });

    it('sets isActive to false', function() {
      expect(nextState.get('isActive')).to.be.false;
    });

    it('sets isFetched to true', function() {
      expect(nextState.get('isFetched')).to.be.true;
    });

    it('sets the digitInfo data to the response', function() {
      expect(nextState.get('digitInfo')).to.equal(Immutable.fromJS(expectedDigitInfo));
    });
  });

  describe('GET_DIGIT_INFO_FAILURE', function() {
    let expectedError;
    let nextState;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();

      const previousState = Immutable.fromJS({
        isActive: true
      });

      nextState = digitsReducer(previousState, {
        type: 'GET_DIGIT_INFO_FAILURE',
        payload: {
          error: expectedError
        }
      });
    });

    it('sets isActive to true', function() {
      expect(nextState.get('isActive')).to.be.false;
    });

    it('sets the error to the state', function() {
      expect(nextState.get('error')).to.equal(expectedError);
    });
  });
});
