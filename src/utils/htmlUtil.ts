import { proxyUrl } from "@/api/axios"

/**
 * 删除字符串中的 HTML 标签
 */
export function removeHTMLTags(str: string): string {
  return str.replace(/<[^>]+>/g, "")
}

export const addProtocolToUrl = (url: string, secure: boolean = false): string => {
  if (url.startsWith("//")) {
    return `${secure ? "https:" : "http:"}${url}`
  }
  return url
}

export const addProxyToUrl = (url: string): string => {
  return `${proxyUrl}${addProtocolToUrl(url)}`
}

export const getTopDomain = (url: string) => {
  if (!url) {
    return "localhost"
  }

  url = url.replace(/(^\w+:|^)\/\//, "")
  url = url.split("/")[0]
  url = url.split(":")[0]

  const parts = url.split(".")
  const topDomain = parts.slice(-2).join(".")

  return topDomain
}
