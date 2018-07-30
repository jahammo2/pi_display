import Immutable from 'immutable';
import actionTypes from '../constants/actionTypes';

const INITIAL_STATE = Immutable.fromJS({
  digitInfo: new Immutable.Map(),
  isActive: false,
  isFetched: false
});

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.GET_DIGIT_INFO_START:
    return state.withMutations((map) => {
      map.delete('error');
      map.set('isActive', true);
    });

  case actionTypes.GET_DIGIT_INFO_SUCCESS:
    return state.withMutations((map) => {
      map.set('isActive', false);
      map.set('isFetched', true);
      map.set('digitInfo', Immutable.fromJS(action.payload.digitInfo));
    });

  case actionTypes.GET_DIGIT_INFO_FAILURE:
    return state.withMutations((map) => {
      map.set('error', action.payload.error);
      map.set('isActive', false);
    });

  default:
    return state;
  }
}

export default reducer;
