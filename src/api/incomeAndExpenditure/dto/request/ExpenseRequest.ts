import {BasePageQueryRequest} from "@/api/common/BasePageQueryRequest";

/** 支出列表入参 **/
export interface ExpenseRecordListRequest extends BasePageQueryRequest {
    /**
     * 支出类型Id
     */
    expenseTypeId?: number;
}