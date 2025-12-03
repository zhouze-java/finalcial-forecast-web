import request from '@/api/request'
import {
    ExpenseRecordDetailResponse,
    ExpenseRecordListResponse,
    ExpenseTypeDetailResponse,
    ExpenseTypeTreeResponse
} from "@/api/incomeAndExpenditure/dto/response/ExpenseResponse";
import {
    ExpenseRecordListRequest,
    ExpenseRecordSaveRequest
} from "@/api/incomeAndExpenditure/dto/request/ExpenseRequest";
import {DefaultPageResponse} from "@/api/common/DefaultPageResponse";


/**
 * 类型列表
 */
export function getExpenseTypeList(){
    return request.get<ExpenseTypeTreeResponse[]>('/expense/typeList')
}

/**
 * 详情
 * @param id id
 */
export function getExpenseTypeDetail(id: number){
    return request.get<ExpenseTypeDetailResponse>(`/expense/type/${id}`)
}

/**
 * 新建
 * @param data 保存
 */
export function createExpenseType(data: ExpenseTypeDetailResponse) {
    return request.post<ExpenseTypeDetailResponse>(`/expense/type`, data, {showSuccessMessage: true});
}

/**
 * 更新
 *
 * @param id id
 * @param data 数据
 */
export function updateExpenseType(id: number, data: ExpenseTypeDetailResponse) {
    return request.put(`/expense/type/${id}`, data, {showSuccessMessage: true});
}

/**
 * 删除
 * @param id id
 */
export function deleteExpenseType(id: number) {
    return request.delete(`/expense/type/${id}`,null, {showSuccessMessage: true});
}

/**
 * 数据列表
 * @param param 查询参数
 */
export function getRecordList(param: ExpenseRecordListRequest){
    return request.post<DefaultPageResponse<ExpenseRecordListResponse>>('/expense/recordList', param)
}

/**
 * 数据详情
 * @param id ID
 */
export function getRecordDetail(id: number){
    return request.get<ExpenseRecordDetailResponse>(`/expense/record/${id}`);
}

/**
 * 保存支出
 * @param data 支出信息
 */
export function createRecord(data: ExpenseRecordSaveRequest) {
    return request.post(`/expense/record`, data, {showSuccessMessage: true});
}

/**
 * 更新支出
 * @param id 主键
 * @param data 支出信息
 */
export function updateRecord(id: number, data: ExpenseRecordSaveRequest) {
    return request.put(`/expense/record/${id}`, data, {showSuccessMessage: true});
}

/**
 * 删除数据
 * @param id 主键
 */
export function deleteRecord(id: number) {
    return request.delete(`/expense/record/${id}`,null, {showSuccessMessage: true});
}