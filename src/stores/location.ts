import { atom } from "jotai"

type Location = {
  pathname: string
  search: string
  hash: string
  searchParams: URLSearchParams
}

const locationAtom = atom<Location>({
  pathname: "/",
  search: "",
  hash: "",
  searchParams: new URLSearchParams(),
})

export { locationAtom }
