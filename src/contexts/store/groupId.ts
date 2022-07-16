import { atom } from 'recoil'

export const gameDataState = atom({
  key: 'gameData',
  default: {
    groupId: null,
    totalAmount: null,
    playersNumber: null
  }
})
