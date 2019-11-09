import axios from 'axios';
import {Toast} from 'vant';

// 向service传入 url, methods, params 先请求拦截器 再响应拦截器

// 先声明axios实例
const service = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 5000,   //超时配置 3秒
    responseType: 'json',   // 响应数据格式
    responseEncoding: 'utf8',  // 响应数据编码
})

// 响应拦截器
service.interceptors.response.use((res) => {
    Toast.clear();
    return res;
}, (err) => {
    Toast('请求失败')
    return Promise.reject(err)
})

// 请求拦截器
service.interceptors.request.use((config) => {
    Toast.loading(); // loading 加载相关
    // config.methods === 'POST'
    //     ? config.data = qs.stringify(config.params) // post 参数 data
    //     : config.params == config.params // get 参数 params
    return config;
}, (err) => {
    Toast('请求失败')
    return Promise.reject(err)
})

export default service
