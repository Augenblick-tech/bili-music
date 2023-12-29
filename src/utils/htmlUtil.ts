/**
 * 删除字符串中的 HTML 标签
 */
export function removeHTMLTags(str: string): string {
  return str.replace(/<[^>]+>/g, "")
}
