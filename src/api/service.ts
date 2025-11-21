import axios from 'axios'
import * as qs from 'qs'
import { message } from 'ant-design-vue'

const BASE_URL = '/api'
const TIMEOUT_MILLISECONDS = 60000 // 超时链接

const instance = axios.create({
    withCredentials: false,
    baseURL: BASE_URL,
    timeout: TIMEOUT_MILLISECONDS,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})


instance.interceptors.request.use((config) => {
     // 每个接口新增时间戳
        let timestamp = new Date().getTime()
        if (config.url && config.url.includes('?')) {
            config.url = `${config.url}&t=${timestamp}`
        } else {
            config.url = `${config.url}?t=${timestamp}`
        }
        // PUT POST DELETE 方式提交的数据格式化
        if ((config.method === 'post' || config.method === 'put' || config.method === 'delete') && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data)
        }

        return config
    },
    (error) => Promise.reject(error)
);

function parseMessage(message: any) {
    if (!message) {
        return message
    }

    let text: string

    if (typeof message === 'string') {
        // 直接是字符串
        text = message
    } else if (typeof message === 'object' && message !== null) {
        // 对象，提取所有 value 并拼成字符串
        text = Object.values(message).join(', ')
    } else {
        // fallback
        text = message
    }

    return text
}

// 响应拦截器
instance.interceptors.response.use((response) => {
    // 下载类型特殊处理文件名
    const type = response.request.responseType || ''
    if (type.includes('blob')) {
        let disposition = response.headers['content-disposition']
        let filename = '默认文件名'
        if (disposition && disposition.indexOf('filename=') !== -1) {
            filename = decodeURI(disposition.substring(disposition.indexOf('filename=') + 9, disposition.length))
        }
        response.data.filename = filename
    }
    const { showSuccessMessage } = response.config as any
    if (showSuccessMessage && (response.status === 200 || response.status === 201)) {
        const msg = parseMessage(response.data?.message) || '操作成功'
        message.success(msg)
    }

    return response.data
}, (error) => {
    switch (error.response && error.response.status) {
        case 400:
            error.message = '请求错误(400)'
            const msg = parseMessage(error.response?.data?.message)
            message.error(msg || error.message)
            break
        case 401:
            error.message = '登录信息已过期，请重新登录'
            message.error(error.message)
            break
        case 403:
            error.message = '没有权限'
            message.error(error.message)
            break
        case 404:
            error.message = '资源不存在'
            message.error(error.message)
            break
        case 408:
            error.message = '请求超时(408)'
            message.error(error.response?.data?.msg || error.message)
            break
        case 500:
            error.message = '服务器错误(500)'
            message.error(error.response?.data?.msg || error.message)
            break
        case 501:
            error.message = '服务未实现(501)'
            message.error(error.message)
            break
        case 502:
            error.message = '网络错误(502)'
            message.error(error.message)
            break
        case 503:
            error.message = '服务不可用(503)'
            message.error(error.message)
            break
        case 504:
            error.message = '网络超时(504)'
            message.error(error.message)
            break
        case 505:
            error.message = 'HTTP版本不受支持(505)'
            message.error(error.message)
            break
    }
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        message.error("网络异常")
    }
    return Promise.reject(error)
})

export default instance