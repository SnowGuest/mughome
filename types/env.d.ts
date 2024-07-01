/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REQUEST_BASE_URL: string;
    readonly VITE_REQUEST_BASE_WS_URL: string;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}