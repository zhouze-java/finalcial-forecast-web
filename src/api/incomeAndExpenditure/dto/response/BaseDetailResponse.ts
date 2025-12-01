export interface BaseDetailResponse {
    /** id */
    id?: number

    /** 家庭成员id */
    memberId?: number

    /** 成员名称 */
    memberName?: string

    /** 周期 */
    cycle?: string

    /** 金额 */
    amount?: number

    /** 起始时间 */
    startDate?: string

    /** 结束时间（固定收入可选） */
    endDate?: string

    /** 增长率（可选） */
    growthRate?: number

    /** 描述/备注 */
    description?: string
}