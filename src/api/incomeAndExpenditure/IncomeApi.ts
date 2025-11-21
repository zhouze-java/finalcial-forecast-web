import request from '@/api/request'
import type {BaseTypeVO} from '@/api/incomeAndExpenditure/BaseTypeVO'

export interface IncomeTypeTreeVO extends BaseTypeVO { }

export interface IncomeTypeDetailVO extends BaseTypeVO {
    /**
     * 是否允许设置年化率
     */
    allowsAnnualRate: boolean,

}

/**
 * 类型列表
 */
export function getIncomeTypeList(){
    return request.get<IncomeTypeTreeVO[]>('/income/typeList')
}

/**
 * 详情
 * @param id id
 */
export function getIncomeTypeDetail(id: number){
    return request.get<IncomeTypeDetailVO>(`/income/type/${id}`)
}

/**
 * 新建
 * @param data 保存
 */
export function createIncomeType(data: IncomeTypeDetailVO) {
    return request.post<IncomeTypeDetailVO>(`/income/type`, data, {showSuccessMessage: true});
}

/**
 * 更新
 *
 * @param id id
 * @param data 数据
 */
export function updateIncomeType(id: number, data: IncomeTypeDetailVO) {
    return request.put(`/income/type/${id}`, data, {showSuccessMessage: true});
}

/**
 * 删除
 * @param id id
 */
export function deleteIncomeType(id: number) {
    return request.delete(`/income/type/${id}`,null, {showSuccessMessage: true});
}
