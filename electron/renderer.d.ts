export interface IElectronAPI {
  sendMessage: (message: string) => void
}

export interface IBiliAuth {
  openLoginWindow: () => void
  handleLogout: () => void
  getCookies: () => Promise<Electron.Cookie[]>
}

export interface IWindowControl {
  minimize: () => void
  maximize: () => void
  close: () => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
    biliAuth: IBiliAuth
    windowControl: IWindowControl
  }
}
