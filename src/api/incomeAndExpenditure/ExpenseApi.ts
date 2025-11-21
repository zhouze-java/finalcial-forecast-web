import request from '@/api/request'
import type {BaseTypeVO} from '@/api/incomeAndExpenditure/BaseTypeVO'

export interface ExpenseTypeTreeVO extends BaseTypeVO { }

export interface ExpenseTypeDetailVO extends BaseTypeVO { }

/**
 * 类型列表
 */
export function getExpenseTypeList(){
    return request.get<ExpenseTypeTreeVO[]>('/expense/typeList')
}

/**
 * 详情
 * @param id id
 */
export function getExpenseTypeDetail(id: number){
    return request.get<ExpenseTypeDetailVO>(`/expense/type/${id}`)
}

/**
 * 新建
 * @param data 保存
 */
export function createExpenseType(data: ExpenseTypeDetailVO) {
    return request.post<ExpenseTypeDetailVO>(`/expense/type`, data, {showSuccessMessage: true});
}

/**
 * 更新
 *
 * @param id id
 * @param data 数据
 */
export function updateExpenseType(id: number, data: ExpenseTypeDetailVO) {
    return request.put(`/expense/type/${id}`, data, {showSuccessMessage: true});
}

/**
 * 删除
 * @param id id
 */
export function deleteExpenseType(id: number) {
    return request.delete(`/expense/type/${id}`,null, {showSuccessMessage: true});
}
