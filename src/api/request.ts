import instance from '@/api/service'
import {AxiosError} from "axios";

const request = {

    get<T = any>(url: string, data?: any, extra?: any): Promise<T> {
        return request.request("GET", url, {params: data}, extra);
    },

    post<T = any>(url: string, data?: any, extra?: any): Promise<T> {
        return request.request("POST", url, {data}, extra);
    },

    put<T = any>(url: string, data?: any, extra?: any): Promise<T> {
        return request.request("PUT", url, {data}, extra);
    },

    delete<T = any>(url: string, data?: any, extra?: any): Promise<T> {
        return request.request("DELETE", url, {params: data}, extra);
    },

    request<T = any>(method = "GET", url: string, options?: any, extra?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            instance({method, url, ...options,...extra})
                .then((res: any) => {
                    resolve(res)
                })
                .catch((e: Error | AxiosError) => {
                    reject(e)
                });
        });
    }
};

export default request;