import { useAtom, useAtomValue } from "jotai"
import type { WritableAtom } from "jotai"
import { handleUserCreatedFolderAtom, handleUserCollectedFolderAtom } from "@/stores/UserFavFolder/UserFavFolder"
import { useEffect, useState } from "react"
import type { MenuProps } from "antd"
import { getFavFolderInfo } from "@/api/BiliUserFavFolder"
import type { UserFavFolder, UserFavFolderItem } from "@/types/bili/BiliUserFavFolder"
import { userAtom } from "@/stores/AuthInfo"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

/**
 * @description 获取用户收藏夹数据
 * @param fetchFolderAtom
 * @param getIconNode
 * @returns
 */
const useFetchItems = <T extends UserFavFolderItem>(
  fetchFolderAtom: WritableAtom<UserFavFolder<T[]> | null, [mid: number], Promise<void>>,
  getIconNode: (url: string) => React.ReactNode,
) => {
  const [userFolder, getUserFolder] = useAtom(fetchFolderAtom)
  const [userItems, setUserItems] = useState<MenuItem[]>()
  const user = useAtomValue(userAtom)

  useEffect(() => {
    const fetchUserCreatedFolder = async () => {
      const userId = user?.id
      console.log("userId", userId)
      if (!userId) {
        setUserItems([])
        return
      }
      await getUserFolder(Number(userId))
    }
    fetchUserCreatedFolder()
  }, [getUserFolder, user])

  useEffect(() => {
    const fetchItems = async () => {
      if (!userFolder) return

      const fetchedItems = await Promise.all(
        userFolder.list.map(async (item) => {
          const favInfo = await getFavFolderInfo({ media_id: item.id })
          return getItem(item.title, item.id, getIconNode(favInfo.data.cover))
        }),
      )

      setUserItems(fetchedItems)
    }

    fetchItems()
  }, [getIconNode, userFolder])

  return userItems
}

const useMenuList = (getIconNode: (url: string) => React.ReactNode) => {
  const userCreatedItems = useFetchItems(handleUserCreatedFolderAtom, getIconNode)
  const userCollectedItems = useFetchItems(handleUserCollectedFolderAtom, getIconNode)
  const [items, setItems] = useState<MenuProps["items"]>()

  useEffect(() => {
    setItems((prev) => {
      if (!prev) return []

      const staticItems: MenuItem[] = [getItem("首页", "home")]

      const newCreatedItems: MenuItem[] = [
        { type: "divider" },
        getItem("创建的歌单", "folder-created", undefined, userCreatedItems),
      ]

      const newCollectedItems: MenuItem[] = [
        { type: "divider" },
        getItem("收藏的歌单", "folder-collected", undefined, userCollectedItems),
      ]

      return staticItems.concat(userCreatedItems ? newCreatedItems : [], userCollectedItems ? newCollectedItems : [])
    })
  }, [userCollectedItems, userCreatedItems])

  return items
}

export default useMenuList
