import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import type { ContextMenuItem, ContextMenuRef } from "@/types/ContextMenu"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ConfigProvider, Menu } from "antd"

type ContextMenuProps = MergeWithDefaultProps & {
  visible?: boolean
  onClick?: (item: ContextMenuItem) => void
}

const ContextMenu = forwardRef<ContextMenuRef, ContextMenuProps>(({ className, visible, onClick }, ref) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<ContextMenuItem[]>([])
  const [pos, setPosState] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect()
      const { innerWidth, innerHeight } = window

      // Check if the menu will go out of bounds
      const outOfBoundsRight = pos.x + rect.width > innerWidth
      const outOfBoundsBottom = pos.y + rect.height > innerHeight

      // If the menu will go out of bounds, move it to the left/top
      if (outOfBoundsRight) {
        pos.x -= rect.width
      }
      if (outOfBoundsBottom) {
        pos.y -= rect.height
      }

      menuRef.current.style.left = `${pos.x}px`
      menuRef.current.style.top = `${pos.y}px`
    }
  }, [pos])

  const setPos = (x: number, y: number) => {
    setPosState({ x, y })
  }

  useImperativeHandle(ref, () => ({
    setPos,
    setItems: (items: ContextMenuItem[]) => {
      setItems(items)
    },
  }))

  return (
    <div
      className={`${className ?? ""} ${
        visible ? "block" : "hidden"
      } fixed z-10 bg-white shadow-lg p-[2px] rounded-xl border overflow-hidden`}
      ref={menuRef}
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHeight: 32,
              itemActiveBg: "transparent",
            },
          },
        }}
      >
        <Menu
          className={`text-[0.8125rem] min-w-[10rem]`}
          style={{
            borderInlineEnd: "none",
          }}
          items={items}
          selectable={false}
          mode="vertical"
          onClick={onClick}
        />
      </ConfigProvider>
    </div>
  )
})

export default ContextMenu
