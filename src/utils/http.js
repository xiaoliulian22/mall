
import axios from 'axios';
import { Message, Loading } from 'element-ui';
let localhosts = '';   //请求的后台域名

axios.interceptors.request.use(config => {//请求之前(可以设置token)
    return config
}, error => {
    Message.error(error)
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {//数据拿到之后
    return response.data
}, error => {
    Message.error('Http请求失败，请联系管理员');
    return Promise.reject(error.response);;
});

export default {
    post(url, data) {//post请求
        // const loading = Loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // });
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                baseURL: localhosts,
                url,
                data: data,
                withCredentials: true,
                timeout: 10000,//响应时间
            }).then(res => {
                // loading.close();
                if (res.code === 0) return resolve(res)
                Message.error(res.message)
            }, err => {
                // loading.close();
                Message.error(res.message)
                return reject(res)
            })
        })
    },
    get(url, params) {//get请求
        // const loading = this.$loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // });
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                baseURL: localhosts,
                url,
                params,
                withCredentials: true,
                timeout: 10000,//响应时间
            }).then(res => {
                // loading.close();
                if (res.code === 0) return resolve(res.data)
                Message.error(res.message)
            }, err => {
                // loading.close();
                Message.error(res.message)
                return reject(res)
            })
        })
    }
}