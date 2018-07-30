import apiService from './api';

function getDigitInfo(nthValue) {
  return apiService.get(`/digits/${nthValue}`)
    .then(({ data }) => data);
}

export default {
  getDigitInfo
};
