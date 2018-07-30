import axios from 'axios';

function init() {
  return axios.create({ baseURL: '/api' });
}

export {
  init
};

export default init();
