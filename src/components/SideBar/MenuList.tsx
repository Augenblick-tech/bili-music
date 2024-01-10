import type { MergeWithDefaultProps } from "@/types/MergeWithDefaultProps"
import { Menu } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import useMenuList from "./useMenuList"
import { useCallback } from "react"
import MusicImage from "@/components/common/MusicImage"

const MenuList = ({ className }: MergeWithDefaultProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const items = useMenuList(
    useCallback((imgUrl) => {
      return <MusicImage src={imgUrl} className="w-6 h-6 object-cover rounded" loading="lazy" />
    }, []),
  )

  const defaultPath = "home"

  return (
    <Menu
      className={`${className ?? ""}
        bg-transparent text-[0.8125rem] px-2
        [&_.ant-menu-item-selected]:bg-menu-selected [&_.ant-menu-item-selected]:text-white
        [&_.ant-menu.ant-menu-sub.ant-menu-inline]:bg-transparent
        [&_.ant-menu-item.ant-menu-item-only-child]:py-1
      `}
      style={{
        borderInlineEnd: "none",
      }}
      defaultSelectedKeys={[defaultPath]}
      selectedKeys={[location.pathname.split("/").reverse()[0] ?? ""]}
      inlineIndent={12}
      mode="inline"
      onClick={({ key, keyPath, domEvent }) => {
        console.log({ key, keyPath, domEvent })
        const path = keyPath.reverse().join("/")
        navigate(path)
      }}
      items={items}
    />
  )
}

export default MenuList
