import {BasePageQueryRequest} from "@/api/common/BasePageQueryRequest";

/** 收入列表入参 **/
export interface IncomeRecordListRequest extends BasePageQueryRequest {
    /**
     * 类型ID
     */
    incomeTypeId?: number;
}

/**
 * 收入保存参数
 */
export interface IncomeRecordSaveRequest {
    /*描述 */
    description: string;

    /*家庭成员id */
    memberId: number;

    /*类型id */
    incomeTypeId: number;

    /*金额 */
    amount: number;

    /*起始时间 */
    startDate: number;

    /* 结束时间（固定收入可选） */
    endDate: number;

    /* 收入增长率（可选） */
    growthRate?: number;

    /* 年化收益率（固定资产收入专用，可选） */
    annualRate?: number;
}