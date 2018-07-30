import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Link
} from 'react-router-dom';

import GiphyGif from './GiphyGif';
import Spinner from './Spinner';

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
  isActive: PropTypes.func,
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

  componentWillReceiveProps(nextProps) {
    const nextNthValue = nextProps.match.params.nthValue;

    if (this.props.match.params.nthValue !== nextNthValue) {
      return this.props.actions.digits.getDigitInfo(nextNthValue);
    }
  }

  render() {
    const digitInfo = this.props.digitInfo;
    const nthValue = Number(this.props.match.params.nthValue);
    const nextNthValue = nthValue + 1;
    const prevNthValue = nthValue - 1;
    const prevLinkClass = `c-app__next-link ${prevNthValue > 0 ? '' : 'c-app__next-link--disabled'}`;

    return (
      <div className="c-app">
        {this.props.isActive && <Spinner />}

        <h1 className="c-app__headline c-heading u-super">Pi Display</h1>

        <div>
          <h2 className="c-heading">Digit: {digitInfo.get('digit')}</h2>
          <GiphyGif giphyUrl={digitInfo.get('giphyUrl')} />
        </div>

        <h2 className="c-heading">Oth Value: {digitInfo.get('othValue')}</h2>
        <h2 className="c-heading">Nth Value: {digitInfo.get('nthValue')}</h2>

        <div className="c-app__links">
          <h3 className="c-heading">
            <Link className={prevLinkClass} to={`/digits/${prevNthValue}`}>{'<<'} Previous</Link>
          </h3>

          <h3 className="c-heading">
            <Link className="c-app__next-link" to={`/digits/${nextNthValue}`}>Next {'>>'}</Link>
          </h3>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
