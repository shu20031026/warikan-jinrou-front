import { atom } from 'recoil'

export interface GroupId {
  groupId: string | null
}

export interface QueryId {
  sessionId: string | null
  totalPrice: number | null
}

export const groupIdState = atom<GroupId>({
  key: 'groupId',
  default: {
    groupId: null
  }
})

export const queryState = atom<QueryId>({
  key: 'QueryId',
  default: {
    sessionId: null,
    totalPrice: null
  }
})
