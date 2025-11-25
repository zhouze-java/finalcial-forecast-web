
export interface FamilyMemberResponse {
    /** 主键 */
    id?: number

    /** 头像 */
    avatar: string

    /** 成员姓名 */
    name: string

    /** 年龄 */
    age: number

    /** 家庭关系（父母 / 配偶 / 子女） */
    relation: string

    /** 是否有收入 */
    hasIncome: boolean

    /** 是否有支出 */
    hasExpense: boolean
}