import {BasePageQueryRequest} from "@/api/common/BasePageQueryRequest";

/** 支出列表入参 **/
export interface ExpenseRecordListRequest extends BasePageQueryRequest {
    /**
     * 支出类型Id
     */
    expenseTypeId?: number;
}

/**
 * 支出保存参数
 */
export interface ExpenseRecordSaveRequest {

    /*描述 */
    description: string;

    /*家庭成员id */
    memberId: number;

    /*类型id */
    expenseTypeId: number;

    /*金额 */
    amount: number;

    /*起始时间 */
    startDate: number;

    /* 结束时间（固定收入可选） */
    endDate: number;

    /* 增长率（可选） */
    growthRate?: number;

}