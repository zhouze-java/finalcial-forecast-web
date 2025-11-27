import request from '@/api/request'
import {FamilyMemberResponse} from "@/api/family/dto/response/FamilyMemberResponse";


export function getFamilyList() {
    return request.get<FamilyMemberResponse[]>('/familyMember/list')
}

export function getFamilyMemberById(id: number) {
    return request.get<FamilyMemberResponse>(`/familyMember/${id}`, null);
}

export function addFamilyMember(data: FamilyMemberResponse) {
    return request.post('/familyMember', data,{showSuccessMessage: true})
}

export function updateFamilyMember(id: number, data: FamilyMemberResponse) {
    return request.put(`/familyMember/${id}`, data,{showSuccessMessage: true})
}

export function deleteFamilyMember(id: number) {
    return request.delete(`/familyMember/${id}`,null,{showSuccessMessage: true})
}
