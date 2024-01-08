import { useEffect, useState } from "react"
import type { DependencyList } from "react"

const useLoading = (
  effect: () => boolean,
  deps?: DependencyList,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (effect()) setLoading(true)
    else setLoading(false)
  }, [effect, deps])

  return [loading, setLoading]
}

export default useLoading
