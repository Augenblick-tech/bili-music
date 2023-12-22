import { expect, test } from "vitest"
import { formatTime } from "./videoUtils"

test("format numeric timestamp `1703214266413` to `2023/12/22`", () => {
  expect(formatTime(1703214266413)).toBe("2023/12/22")
})

test("format string timestamp `1703214266413` to `2023/12/22`", () => {
  expect(formatTime("1703214266413")).toBe("2023/12/22")
})

test("throw an error on formatting invalid timestamp `foo`", () => {
  expect(() => formatTime("foo")).toThrowError("Invalid timestamp.")
})
