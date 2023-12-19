import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	// Test actively push message to the Electron-Renderer
	sendMessage: (message: string) => {
		window.postMessage(message, '*')
	},
})

contextBridge.exposeInMainWorld('biliAuth', {
	openLoginWindow: () => {
		ipcRenderer.send('login')
	},
	handleLogout: () => {
		ipcRenderer.send('logout')
	},
})

contextBridge.exposeInMainWorld('windowControl', {
	minimize: () => {
		ipcRenderer.send('minimize')
	},
	maximize: () => {
		ipcRenderer.send('maximize')
	},
	close: () => {
		ipcRenderer.send('close')
	},
})
