import axios from "axios";
import router from "../route/route";
import { Message, MessageBox } from 'element-ui'

const request = axios.create({
    baseURL: 'http://192.168.10.47:8089/',
    timeout: 5000
})

request.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    res => {
        return res
    },
    error => {
        Message.error('账号密码错误')
        return Promise.reject(error)
    }
)

export default request

