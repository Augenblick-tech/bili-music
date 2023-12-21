import { useEffect, useRef, useState } from "react"

type LoadMoreResult = {
  hasMore: boolean
  nextPage: number
}

const useInfiniteScroll = <T extends HTMLElement>(
  loadMore: (page: number) => Promise<LoadMoreResult>,
): [React.RefObject<T>, boolean] => {
  const sentinel = useRef<T>(null)
  const currentPage = useRef(1)
  const isLoading = useRef(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading.current) {
        isLoading.current = true
        loadMore(currentPage.current).then((result) => {
          if (result.hasMore) {
            currentPage.current = result.nextPage
          } else {
            setHasMore(false)
          }
          isLoading.current = false
        })
      }
    })

    const current = sentinel.current

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [hasMore, loadMore])

  return [sentinel, hasMore]
}

export default useInfiniteScroll
