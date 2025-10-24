import request from '@/api/index'

export interface FamilyMember {
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

export function getFamilyList() {
    return request.get<FamilyMember[]>('/familyMember/list')
}

export function addFamilyMember(data: FamilyMember) {
    return request.post('/familyMember', data)
}

export function updateFamilyMember(id: number, data: FamilyMember) {
    return request.put(`/familyMember/${id}`, data)
}

export function deleteFamilyMember(id: number) {
    return request.delete(`/familyMember/${id}`)
}
