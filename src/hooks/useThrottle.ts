import { useState, useEffect } from "react"

export default function useThrottle<T>(value: T, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value)
  const [lastTime, setLastTime] = useState(Date.now())
  useEffect(() => {
    const now = Date.now()
    if (now - lastTime >= delay) {
      setThrottledValue(value)
      setLastTime(now)
    }
  }, [value, delay, lastTime])
  return throttledValue
}
