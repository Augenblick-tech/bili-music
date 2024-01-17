import type { MenuProps } from "antd"
type MenuItem = Required<MenuProps>["items"][number]

export type ContextMenuItem = MenuItem

export type ContextMenuRef = {
  setPos: (x: number, y: number) => void
  setItems: (items: MenuItem[]) => void
}
