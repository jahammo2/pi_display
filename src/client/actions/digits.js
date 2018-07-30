import actionTypes from '../constants/actionTypes';
import digitsService from '../services/digits';

function getDigitInfo(nthValue) {
  return function(dispatch) {
    dispatch({ type: actionTypes.GET_DIGIT_INFO_START });

    return digitsService
      .getDigitInfo(nthValue)
      .then((digitInfo) => {
        dispatch({
          type: actionTypes.GET_DIGIT_INFO_SUCCESS,
          payload: { digitInfo }
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_DIGIT_INFO_FAILURE,
          payload: { error }
        });
      });
  };
}

export {
  getDigitInfo
};
