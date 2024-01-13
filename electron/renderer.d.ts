export interface IElectronAPI {
  sendMessage: (message: string) => void
}

export interface IBiliAuth {
  openLoginWindow: () => void
  handleLogout: () => void
  getCookies: () => Promise<string>
  getLocalStorage?: () => Promise<Record<string, string>>
  onLoginSuccess: (callback: (cookies: Electron.Cookie[], localStorage: Record<string, string>) => void) => void
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
