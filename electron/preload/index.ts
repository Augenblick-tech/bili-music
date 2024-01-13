import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electronAPI", {
  // Test actively push message to the Electron-Renderer
  sendMessage: (message: string) => {
    window.postMessage(message, "*")
  },
})

contextBridge.exposeInMainWorld("biliAuth", {
  openLoginWindow: () => {
    ipcRenderer.send("login")
  },
  handleLogout: () => {
    ipcRenderer.send("logout")
  },
  getCookies: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer
        .invoke("getCookies")
        .then((cookies) => {
          resolve(cookies)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getLocalStorage: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer
        .invoke("getLocalStorage")
        .then((localStorage) => {
          resolve(localStorage)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  onLoginSuccess: (callback: (cookies: Electron.Cookie[], localStorage: Record<string, string>) => void) => {
    ipcRenderer.on("login-success", (_, cookies, localStorage) => {
      callback(cookies, localStorage)
    })
  },
})

contextBridge.exposeInMainWorld("windowControl", {
  minimize: () => {
    ipcRenderer.send("minimize")
  },
  maximize: () => {
    ipcRenderer.send("maximize")
  },
  close: () => {
    ipcRenderer.send("close")
  },
})
