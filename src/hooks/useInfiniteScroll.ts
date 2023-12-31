import { useEffect, useRef, useState } from "react"

const useInfiniteScroll = <T extends HTMLElement>(
  loadMore: () => Promise<void>,
): [React.RefObject<T>, boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const sentinel = useRef<T>(null)
  const isLoading = useRef(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading.current) {
        isLoading.current = true
        loadMore()
          .catch((err) => {
            if (err === "No more results") {
              setHasMore(false)
            } else {
              console.error(err)
            }
          })
          .finally(() => {
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

  return [sentinel, hasMore, setHasMore]
}

export default useInfiniteScroll
