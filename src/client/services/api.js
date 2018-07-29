import axios from 'axios';
import store from '../store';

function init() {
  return axios.create({ baseURL: '/api' });;
}

export {
  init
};

export default init();
