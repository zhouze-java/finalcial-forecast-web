import request from '@/api/request'
import {
    IncomeTypeTreeResponse,
    IncomeTypeDetailResponse,
    IncomeListResponse
} from "@/api/incomeAndExpenditure/dto/response/IncomeResponse";
import {IncomeRecordListRequest} from "@/api/incomeAndExpenditure/dto/request/IncomeRequest";
import {DefaultPageResponse} from "@/api/common/DefaultPageResponse";


/**
 * 类型列表
 */
export function getIncomeTypeList(){
    return request.get<IncomeTypeTreeResponse[]>('/income/typeList')
}

/**
 * 详情
 * @param id id
 */
export function getIncomeTypeDetail(id: number){
    return request.get<IncomeTypeDetailResponse>(`/income/type/${id}`)
}

/**
 * 新建
 * @param data 保存
 */
export function createIncomeType(data: IncomeTypeDetailResponse) {
    return request.post<IncomeTypeDetailResponse>(`/income/type`, data, {showSuccessMessage: true});
}

/**
 * 更新
 *
 * @param id id
 * @param data 数据
 */
export function updateIncomeType(id: number, data: IncomeTypeDetailResponse) {
    return request.put(`/income/type/${id}`, data, {showSuccessMessage: true});
}

/**
 * 删除
 * @param id id
 */
export function deleteIncomeType(id: number) {
    return request.delete(`/income/type/${id}`,null, {showSuccessMessage: true});
}

/**
 * 数据列表
 * @param param 查询参数
 */
export function getRecordList(param: IncomeRecordListRequest){
    return request.post<DefaultPageResponse<IncomeListResponse>>('/income/record/list', param)
}

/**
 * 数据详情
 * @param id 主键ID
 */
export function getRecordDetail(id: number){
    return request.get<IncomeTypeDetailResponse>(`/income/record/${id}`);
}

/**
 * 删除记录
 * @param id 主键
 */
export function deleteRecord(id: number) {
    return request.delete(`/income/record/${id}`,null, {showSuccessMessage: true});
}