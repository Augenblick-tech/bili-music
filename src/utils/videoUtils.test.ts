import { expect, test } from "vitest"
import { formatTime, formatDuration } from "./videoUtils"

test("format numeric timestamp `1703214266413` to `2023/12/22`", () => {
  expect(formatTime(1703214266413)).toBe("2023/12/22")
})

test("format string timestamp `1703214266413` to `2023/12/22`", () => {
  expect(formatTime("1703214266413")).toBe("2023/12/22")
})

test("throw an error on formatting invalid timestamp `foo`", () => {
  expect(() => formatTime("foo")).toThrowError("Invalid timestamp.")
})

test("format duration `123` to `2:03`", () => {
  expect(formatDuration(123)).toBe("2:03")
})

test("format duration `0` to `0:00`", () => {
  expect(formatDuration(0)).toBe("0:00")
})

test("format duration `6000` to `1:40:00`", () => {
  expect(formatDuration(6000)).toBe("1:40:00")
})
