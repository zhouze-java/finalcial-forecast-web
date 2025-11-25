import type {BaseTypeResponse} from "@/api/incomeAndExpenditure/dto/response/BaseTypeResponse";
import {BaseListResponse} from "@/api/incomeAndExpenditure/dto/response/BaseListResponse";

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
