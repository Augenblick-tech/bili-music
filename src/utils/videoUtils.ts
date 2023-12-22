export const formatPlayCount = (count: number) => {
  if (count < 10000) {
    return count
  }
  return `${Math.floor(count / 1000) / 10}万`
}

export const formatTime = (timestamp: string | number) => {
  if (isValidTimestamp(timestamp)) {
    const date = new Date(+timestamp)
    const formatter = Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })

    return formatter.format(date)
  }

  throw new Error("Invalid timestamp.")
}

type ValidTimestamp = string | number

const isValidTimestamp = (timestamp: number | string): timestamp is ValidTimestamp => {
  return new Date(+timestamp).getTime() > 0
}
