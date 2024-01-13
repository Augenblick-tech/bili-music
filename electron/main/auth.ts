import { app } from "electron"
import fs from "fs-extra"
import { join } from "node:path"

export const getCookies = async () => {
  const cookies = (await fs.readJSON(join(app.getPath("userData"), "cookies.json"))) as Electron.Cookie[]
  return cookies
}

export const setCookies = async (cookies: Electron.Cookie[]) => {
  await fs.writeJSON(join(app.getPath("userData"), "cookies.json"), cookies)
}

export const getParsedCookies = (cookies: Electron.Cookie[]) => {
  return cookies
    .filter((cookie) => cookie.domain === ".bilibili.com")
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ")
}
