export const FamilyMemberRelationMap = {
    ME: {desc: '我', color: 'orange'},
    ROOM_MATE: {desc: '配偶', color: 'pink'},
    PARENTS: {desc: '父母', color: 'blue'},
    CHILD: {desc: '子女', color: 'green'}
} as const

export type FamilyMemberRelationKey = keyof typeof FamilyMemberRelationMap

export function getRelationDisplay(relation: string) {
    const item = FamilyMemberRelationMap[relation as FamilyMemberRelationKey]
    return item ?? {desc: '未知', color: 'gray'}
}