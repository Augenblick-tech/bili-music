import { useState } from "react"
import type { MenuList, MenuListItem, MenuListPath } from "@/types/MenuList"

const useMenu = (): [MenuListPath, MenuList[], (item: MenuListItem) => void] => {
  const [current, setCurrent] = useState<MenuListPath>("pickup")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuList, _] = useState<MenuList[]>([
    {
      isFoldable: false,
      key: "network",
      list: [
        {
          name: "为我推荐",
          key: "pickup",
          icon: "icon-tuijian",
          path: "pickup",
        },
        {
          name: "云音乐收藏",
          key: "collection",
          icon: "icon-shoucang",
          path: "collection",
        },
        {
          name: "播客",
          key: "podcast",
          icon: "icon-boke",
          path: "podcast",
        },
        {
          name: "私人漫游",
          key: "private",
          icon: "icon-siren",
          path: "private",
        },
        {
          name: "社区",
          key: "community",
          icon: "icon-shequ",
          path: "community",
        },
      ],
    },
    {
      isFoldable: false,
      key: "local",
      list: [
        {
          name: "我喜欢的音乐",
          key: "like",
          icon: "icon-xihuan",
          path: "like",
        },
        {
          name: "最近播放",
          key: "recent",
          icon: "icon-zuijinbofang",
          path: "recent",
        },
        {
          name: "我的播客",
          key: "myPodcast",
          icon: "icon-wodeboke",
          path: "myPodcast",
        },
        {
          name: "我的收藏",
          key: "myCollection",
          icon: "icon-wodeshoucang",
          path: "myCollection",
        },
      ],
    },
  ])

  const changeMenu = (item: MenuListItem) => {
    setCurrent(item.path)
  }

  return [current, menuList, changeMenu]
}

export default useMenu
