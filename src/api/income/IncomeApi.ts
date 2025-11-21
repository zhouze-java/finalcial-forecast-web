import request from '@/api/request'

export interface IncomeTypeTreeVO {
    /**
     * id
     */
    id: string,

    /**
     * 名称
     */
    name: string,

    /**
     * 描述
     */
    description: string,
}

/**
 * 类型列表
 */
export function getIncomeTypeList(){
    return request.get<IncomeTypeTreeVO[]>('/income/typeList')
}