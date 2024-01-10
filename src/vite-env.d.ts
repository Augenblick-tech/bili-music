/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAME: string
  readonly VITE_APP_PROXY_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
