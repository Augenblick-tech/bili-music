import type { ReactNode } from "react"

/**
 * 将给定的 Props 与两个 **可选的** Props：`className` 和 `children` 合并。
 *
 * @example
 *
 * type Props = {
 *   width: string;
 *   height: string;
 * }
 *
 * export default function MyComponent({ width, height, className, children }: MergeWithDefaultProps<Props>) {
 *   // width: string
 *   // height: string
 *   // className: string | undefined
 *   // children: React.ReactNode | undefined
 * }
 */
export type MergeWithDefaultProps<P = unknown> = P & {
  className?: string
  children?: ReactNode
}
