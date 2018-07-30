import * as digitsActions from './digits';
import digitsService from '../services/digits';

describe('Digits Actions', () => {
  beforeEach(function() {
    this.sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('#getDigitInfo', () => {
    context('successfully retrieving info', function() {
      let dispatch;
      let expectedDigitInfo;
      let expectedNthValue;
      let getDigitInfoFromService;
      let promise;

      beforeEach(function() {
        expectedNthValue = faker.random.number();
        expectedDigitInfo = {
          digit: faker.random.number(),
          giphyUrl: faker.internet.url(),
          othValue: faker.random.number(),
          nthValue: expectedNthValue
        };

        dispatch = this.sandbox.stub();
        getDigitInfoFromService = this.sandbox.stub(digitsService, 'getDigitInfo').callsFake(() => {
          return Promise.resolve(expectedDigitInfo);
        });

        promise = digitsActions.getDigitInfo(expectedNthValue)(dispatch);
      });

      it('dispatches a get digits info start action', function() {
        expect(dispatch.calledOnce).to.be.true;
        const [action] = dispatch.firstCall.args;
        expect(action).to.deep.equal({
          type: 'GET_DIGIT_INFO_START'
        });
      });

      it('gets the digits info', function() {
        expect(getDigitInfoFromService.calledOnce).to.be.true;
        const [nthValue] = getDigitInfoFromService.firstCall.args;
        expect(nthValue).to.equal(expectedNthValue);
      });

      it('dispatches a get digits info success action', function() {
        return promise.then(() => {
          expect(dispatch.calledTwice).to.be.true;
          const [action] = dispatch.secondCall.args;
          expect(action).to.deep.equal({
            type: 'GET_DIGIT_INFO_SUCCESS',
            payload: {
              digitInfo: expectedDigitInfo
            }
          });
        });
      });
    });

    context('failure retrieving the info', function() {
      let dispatch;
      let expectedErrorMsg;
      let promise;

      beforeEach(function() {
        dispatch = this.sandbox.stub();
        expectedErrorMsg = faker.hacker.phrase();
        this.sandbox.stub(digitsService, 'getDigitInfo').callsFake(() => {
          return Promise.reject(expectedErrorMsg);
        });

        promise = digitsActions.getDigitInfo()(dispatch);
      });

      it('dispatches a get digit info failure action', function() {
        return promise.then(() => {
          expect(dispatch.calledTwice).to.be.true;
          const [action] = dispatch.secondCall.args;
          expect(action).to.deep.equal({
            type: 'GET_DIGIT_INFO_FAILURE',
            payload: { error: expectedErrorMsg }
          });
        });
      });
    });
  });
});
