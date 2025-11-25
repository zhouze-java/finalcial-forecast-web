import {BasePageQueryRequest} from "@/api/common/BasePageQueryRequest";

/** 收入列表入参 **/
export interface IncomeRecordListRequest extends BasePageQueryRequest {
    /**
     * 类型ID
     */
    incomeTypeId?: number;
}