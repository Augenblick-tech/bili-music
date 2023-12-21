import { useEffect, useState } from "react"

export default function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      window.clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
