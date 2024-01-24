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