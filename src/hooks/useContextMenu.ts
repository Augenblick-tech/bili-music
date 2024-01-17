import { useEffect, useState } from "react"
import type { ContextMenuItem, ContextMenuRef } from "@/types/ContextMenu"

const useContextMenu = (menuRef: React.RefObject<ContextMenuRef>) => {
  const [visible, setVisible] = useState(false)

  const show = (event: React.MouseEvent, items?: ContextMenuItem[]) => {
    event.preventDefault()
    setVisible(true)
    menuRef.current?.setPos(event.clientX, event.clientY)
    menuRef.current?.setItems(items || [])
  }

  const hide = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (visible) {
      document.addEventListener("click", hide)
    }
    return () => {
      document.removeEventListener("click", hide)
    }
  }, [visible])

  return { visible, show, hide }
}

export default useContextMenu
