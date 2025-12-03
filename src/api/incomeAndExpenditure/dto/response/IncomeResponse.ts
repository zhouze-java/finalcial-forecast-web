import type {BaseTypeResponse} from "@/api/incomeAndExpenditure/dto/response/BaseTypeResponse";
import {BaseListResponse} from "@/api/incomeAndExpenditure/dto/response/BaseListResponse";
import {BaseDetailResponse} from "@/api/incomeAndExpenditure/dto/response/BaseDetailResponse";

export interface IncomeTypeTreeResponse extends BaseTypeResponse { }

export interface IncomeTypeDetailResponse extends BaseTypeResponse {
    /**
     * 是否允许设置年化率
     */
    allowsAnnualRate: boolean,

}

export interface IncomeListResponse extends BaseListResponse {
    /** 年化收益率（固定资产收入专用，可选） */
    annualRate?: number
}

export interface IncomeRecordDetailResponse extends BaseDetailResponse {
    /** 年化收益率（固定资产收入专用，可选） */
    annualRate?: number

    /** 收入类型ID */
    incomeTypeId?: number

    /** 收入类型名称 */
    incomeTypeName?: string
}