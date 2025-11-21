import request from '@/api/request'

export interface FamilyMemberApi {
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
    return request.get<FamilyMemberApi[]>('/familyMember/list')
}

export function getFamilyMemberById(id: number) {
    return request.get<FamilyMemberApi>(`/familyMember/${id}`, null);
}

export function addFamilyMember(data: FamilyMemberApi) {
    return request.post('/familyMember', data,{showSuccessMessage: true})
}

export function updateFamilyMember(id: number, data: FamilyMemberApi) {
    return request.put(`/familyMember/${id}`, data,{showSuccessMessage: true})
}

export function deleteFamilyMember(id: number) {
    return request.delete(`/familyMember/${id}`,null,{showSuccessMessage: true})
}
