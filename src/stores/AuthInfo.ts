import { atom } from "jotai"

type User = {
  id: number
}

const _userAtom = atom<User>({
  id: 0,
})

export const userAtom = atom(
  (get) => get(_userAtom),
  (_get, set, userId?: string) => {
    if (!userId) {
      set(_userAtom, { id: 0 })
      return
    }
    set(_userAtom, { id: Number(userId) })
  },
)
