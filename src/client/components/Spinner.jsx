import React from 'react';

import spinner from '../images/spinner.svg';

function Spinner() {
  return (
    <div className="c-spinner__overlay">
      <div className="c-spinner__container">
        <img className="c-spinner" src={spinner} />
      </div>
    </div>
  );
}

export default Spinner;
