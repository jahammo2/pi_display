import React from 'react';
import PropTypes from 'prop-types';

import Greeting from './Greeting';

const propTypes = {
  name: PropTypes.string.isRequired
};

const defaultProps = {
  name: 'World'
};

function App({ name }) {
  return (
    <div>
      <Greeting name={name} />
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
