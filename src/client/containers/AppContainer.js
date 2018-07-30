import { connect } from 'react-redux';
import {
  bindActionCreators
} from 'redux';

import App from '../components/App';
import * as digitsActionCreators from '../actions/digits';

function mapStateToProps(state) {
  return {
    digitInfo: state.getIn(['digits', 'digitInfo'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      digits: bindActionCreators(digitsActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
