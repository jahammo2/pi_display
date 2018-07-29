import { connect } from 'react-redux';
import {
  bindActionCreators
} from 'redux';

import App from '../components/App';
import * as helloWorldActionCreators from '../actions/helloWorldActions';

function mapStateToProps(state) {
  return {
    helloWorld: state.get('helloWorld'),
    name: state.get('name')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      helloWorld: bindActionCreators(helloWorldActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
