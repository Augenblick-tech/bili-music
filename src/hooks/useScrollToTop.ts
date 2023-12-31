import { useCallback, useRef } from "react"

export const useScrollToTop = <T extends HTMLElement>(options?: ScrollToOptions): [React.RefObject<T>, () => void] => {
  const elementRef = useRef<T>(null)
  const scrollToTop = useCallback(() => {
    elementRef.current?.scrollTo({
      top: 0,
      ...options,
    })
  }, [options])
  return [elementRef, scrollToTop]
}
