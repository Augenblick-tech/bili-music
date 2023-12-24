import { useRef } from "react"

export const useScrollToTop = <T extends HTMLElement>(options?: ScrollToOptions): [React.RefObject<T>, () => void] => {
  const elementRef = useRef<T>(null)
  const scrollToTop = () => {
    elementRef.current?.scrollTo({
      top: 0,
      ...options,
    })
  }
  return [elementRef, scrollToTop] as const
}
