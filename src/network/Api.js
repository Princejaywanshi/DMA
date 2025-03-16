import axios from 'axios';
import {baseUrl} from '../constants';

class Api {
  normalizePath(endpoint) {
    const url = endpoint.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (url !== null) {
      return endpoint;
    } else {
      return `${baseUrl}/${endpoint}`;
    }
  }

  defaultHeader(object) {
    Object.keys(object).forEach(key => {
      axios.defaults.headers.common[key] = object[key];
    });
  }

  GET(endpoint, params, headers = {}) {
    return new Promise((resolve, reject) => {
      axios({
        timeout: 10000,
        method: 'GET',
        url: this.normalizePath(endpoint),
        params,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
      })
        .then(response => {
          if (response?.status === 200) {
            resolve(response);
          } else {
            console.log('🚀 ~GET response:', response, endpoint);
            throw new Error(
              `Request failed with ${response?.data?.statusCode} => ${response?.data?.message}`,
            );
          }
        })
        .catch(error => {
          reject({
            error: true,
            message: error?.message || 'Api.GET error! Something is wrong',
          });
        });
    });
  }

  POST(endpoint, params, headers = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.normalizePath(endpoint), params, {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            ...headers,
          },
          timeout: 10000,
        })
        .then(response => {
          if (response?.status === 200) {
            resolve(response);
          } else {
            console.log('🚀 ~ POST ~ response:', response, endpoint);
            throw new Error(
              `Request failed with ${response?.data?.statusCode} => ${response?.data?.message}`,
            );
          }
        })
        .catch(error => {
          reject({
            error: true,
            message: error?.message || 'Api.POST error! Something is wrong',
          });
        });
    });
  }

  POSTFORM(endpoint, params, headers = {}) {
    return new Promise((resolve, reject) => {
      console.log(
        '🚀 ~ Api ~ .post ~ this.normalizePath(endpoint):',
        this.normalizePath(endpoint),
        headers,
      );
      const data = new FormData();
      if (params) {
        Object.keys(params).forEach(key => {
          data.append(key, params[key]);
        });
      }
      axios
        .post(this.normalizePath(endpoint), params, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            ...headers,
          },
          timeout: 10000,
        })
        .then(response => {
          console.log('🚀 ~ Api ~ returnnewPromise ~ response:', response);
          if (response?.status === 200) {
            resolve(response);
          } else {
            console.log('🚀 ~ POSTFORM ~ response:', response, endpoint);
            throw new Error(
              `Request failed with ${response?.data?.statusCode} => ${response?.data?.message}`,
            );
          }
        })
        .catch(error => {
          reject({
            error: true,
            message: error?.message || 'Api.POSTFORM error! Something is wrong',
          });
        });
    });
  }
}

export default new Api();
