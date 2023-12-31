export interface MenuList {
  isFoldable: boolean
  isFolded?: boolean
  key: string
  list: MenuListItem[]
}

export interface MenuListItem {
  name: string
  key: string
  icon?: string
  path: string
}
