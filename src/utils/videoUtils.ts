export const formatPlayCount = (count: number) => {
  if (count < 10000) {
    return count
  }
  return `${Math.floor(count / 1000) / 10}万`
}

export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("en-CA")
}
