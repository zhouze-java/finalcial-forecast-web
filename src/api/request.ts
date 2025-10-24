import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import { message } from 'ant-design-vue'
import * as qs from 'qs'

const request = axios.create({
    baseURL: '/', // Vite 代理到 Spring Boot
    timeout: 5000,
    withCredentials: false, // 禁用 Cookie 等信息
    // 自定义参数序列化函数
    paramsSerializer: (params) => {
        return qs.stringify(params, { allowDots: true })
    }
})

// 请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const method = config.method?.toUpperCase()
        // 防止 GET 请求缓存
        if (method === 'GET') {
            config.headers['Cache-Control'] = 'no-cache'
            config.headers['Pragma'] = 'no-cache'
        }
        // 自定义参数序列化函数
        else if (method === 'POST') {
            const contentType = config.headers['Content-Type'] || config.headers['content-type']
            if (contentType === 'application/x-www-form-urlencoded') {
                if (config.data && typeof config.data !== 'string') {
                    config.data = qs.stringify(config.data)
                }
            }
        }

        return config
    },
    (error: AxiosError) => {
        // Do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response 拦截器
request.interceptors.response.use(
    async (response: AxiosResponse<any>) => {
        let { data } = response
        const config = response.config

        if (
            response.request.responseType === 'blob' ||
            response.request.responseType === 'arraybuffer'
        ) {
            // 注意：如果导出的响应为 json，说明可能失败了，不直接返回进行下载
            if (response.data.type !== 'application/json') {
                return response.data
            }
            data = await new Response(response.data).json()
        }

        // 获取错误信息
        const msg = data.msg || ''
        if (data.status === 401) {
            // 如果未认证，并且未进行刷新令牌，说明可能是访问令牌过期了

        } else if (data.status === 500) {
            message.error("服务器繁忙")
            return Promise.reject(new Error(msg))
        } else {
            return data
        }
    },
    (error: AxiosError) => {
        console.log('err' + error)
        message.error(message)
        return Promise.reject(error)
    }
)


export default request