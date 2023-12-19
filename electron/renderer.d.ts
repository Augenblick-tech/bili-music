export interface IElectronAPI {
	sendMessage: (message: string) => void
}

export interface IBiliAuth {
	openLoginWindow: () => void
	handleLogout: () => void
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
