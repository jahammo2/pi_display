import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const propTypes = {
  actions: PropTypes.shape({
    digits: PropTypes.shape({
      getDigitInfo: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  digitInfo: ImmutablePropTypes.mapContains({
    digit: PropTypes.number,
    giphyUrl: PropTypes.string,
    othValue: PropTypes.number,
    nthValue: PropTypes.number
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      nthValue: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

class App extends Component {
  componentWillMount() {
    return this.props.actions.digits.getDigitInfo(this.props.match.params.nthValue);
  }

  render() {
    const digitInfo = this.props.digitInfo;

    return (
      <div>
        <div>{digitInfo.get('digit')}</div>
        <div>{digitInfo.get('giphyUrl')}</div>
        <div>{digitInfo.get('othValue')}</div>
        <div>{digitInfo.get('nthValue')}</div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
