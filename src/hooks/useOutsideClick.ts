import { useEffect, useState } from "react"

const useOutsideClick = (
  ...refs: React.RefObject<HTMLElement>[]
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
        setIsShow(false)
      }
    }

    const handleFocus = () => {
      setIsShow(true)
    }

    refs.forEach((ref) => {
      ref.current?.addEventListener("focus", handleFocus)
    })
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      refs.forEach((ref) => {
        ref.current?.removeEventListener("focus", handleFocus)
      })
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [refs])

  return [isShow, setIsShow]
}

export default useOutsideClick
