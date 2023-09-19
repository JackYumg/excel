/// <reference types="vite/client" />

import { ChannelType, openApis } from "../electron-main/preload";

declare global {
    interface Window {
        electronAPI: typeof openApis
    }
}