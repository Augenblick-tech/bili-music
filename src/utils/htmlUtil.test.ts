import { expect, test } from "vitest"
import { getTopDomain } from "./htmlUtil"

test("get top domain `bilibili.com` from `https://www.bilibili.com`", () => {
  expect(getTopDomain("https://www.bilibili.com")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `www.bilibili.com`", () => {
  expect(getTopDomain("www.bilibili.com")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `https://www.bilibili.com/`", () => {
  expect(getTopDomain("https://www.bilibili.com/")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `www.bilibili.com/`", () => {
  expect(getTopDomain("www.bilibili.com/")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `https://api.bilibili.com`", () => {
  expect(getTopDomain("https://api.bilibili.com")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `https://api.bilibili.com/`", () => {
  expect(getTopDomain("https://api.bilibili.com/")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `https://bilibili.com`", () => {
  expect(getTopDomain("https://bilibili.com")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `https://bilibili.com/`", () => {
  expect(getTopDomain("https://bilibili.com/")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `https://www.bilibili.com/video/BV1V54y1R7aT`", () => {
  expect(getTopDomain("https://www.bilibili.com/video/BV1V54y1R7aT")).toBe("bilibili.com")
})

test("get top domain `bilibili.com` from `www.bilibili.com/video/BV1V54y1R7aT`", () => {
  expect(getTopDomain("www.bilibili.com/video/BV1V54y1R7aT")).toBe("bilibili.com")
})

test("get top domain `localhost` from `http://localhost:123`", () => {
  expect(getTopDomain("http://localhost:123")).toBe("localhost")
})

test("get top domain `localhost` from `localhost:123`", () => {
  expect(getTopDomain("localhost:123")).toBe("localhost")
})
