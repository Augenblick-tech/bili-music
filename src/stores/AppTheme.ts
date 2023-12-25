import { atom } from "jotai"

const _themeAtom = atom("default")

export const themeAtom = atom(
  (get) => get(_themeAtom),
  (_get, set, update: string) => {
    document.documentElement.setAttribute("data-theme", update)
    set(_themeAtom, update)
  },
)
