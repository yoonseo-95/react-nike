import { atom } from "recoil";

export const BookmarkAtom = atom({
  key: 'BookmarkAtom',
  default: []
})

export const CartItemAtom = atom({
  key: 'CartItemAtom',
  default: []
})

export const searchResultsState = atom({
  key: 'searchResultsState',
  default: [],
})

export const searchQueryState = atom({
  key: 'searchQueryState',
  default: ""
})

export const enteredFilterState = atom({
  key: 'enteredFilterState',
  default: [],
})

export const userMessagesState = atom({
  key: 'userMessages',
  default: [],
})

export const adminMessageState = atom({
  key: 'adminMessages',
  default: [],
})

export const chatRoomsState = atom({
  key: "chatRoomsState",
  default: []
})

export const showChatRoomState = atom({
  key: "showChatRoom",
  default: false
})

export const endMessageState = atom({
  key: "endMessage",
  default: ""
})


