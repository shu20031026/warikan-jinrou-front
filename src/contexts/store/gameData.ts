import { atom } from 'recoil'

export interface GroupId {
  groupId: string | null
}

export interface SessionId {
  sessionId: string | null
}

export const groupIdState = atom<GroupId>({
  key: 'groupId',
  default: {
    groupId: null
  }
})

export const sessionIdState = atom<SessionId>({
  key: 'sessionId',
  default: {
    sessionId: null
  }
})
