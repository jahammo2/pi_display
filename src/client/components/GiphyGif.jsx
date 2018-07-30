import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  giphyUrl: PropTypes.string
};

function GiphyGif({ giphyUrl }) {
  return (
    <div className="c-giphy-gif__container">
      <img
        className="c-giphy-gif"
        src={giphyUrl}
        alt="Loading"
        title="Loading"
      />
    </div>
  );
}

GiphyGif.propTypes = propTypes;

export default GiphyGif;
