import axios from "axios";
import {provide} from "vue";

const request = axios.create({
    // baseURL: appConfig.request.baseURL,  // API 请求的默认前缀
    // timeout: appConfig.request.timeout // 请求超时时间
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 5000
})

request.interceptors.request.use(function (config) {
    return config;
}, function (error:any) {
    return Promise.resolve(error)
});

request.interceptors.response.use(function (response) {
    return response;
}, function (error:any) {
    return Promise.resolve(error)
});

export default request;

export function useRequest() {
    provide('axiosRequest', request)
}


