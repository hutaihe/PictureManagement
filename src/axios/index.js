import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
axios.defaults.baseURL = 'http://127.0.0.1:10010/';
// 请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    })
export default {
    fetch(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            }).catch((error) => { reject(error) })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, QS.stringify(params)).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            }).catch((error) => { reject(error) })
        })
    },
    put(url, params) {
        return new Promise((resolve, reject) => {
            axios.put(url, QS.stringify(params)).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            }).catch((error) => { reject(error) })
        })
    },
    delete(url) {
        return new Promise((resolve, reject) => {
            axios.delete(url).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            }).catch((error) => { reject(error) })
        })
    },
    deleteIds(url, ids) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                params: {
                  ids: ids
                },
                paramsSerializer: params => {
                  return QS.stringify(params, { indices: false });
                },
            }).then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            }).catch((error) => { reject(error) })
        })
    }
}
