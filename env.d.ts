/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: number;
  readonly VITE_OPEN: boolean;
  readonly VITE_REPORT: boolean;
  readonly VITE_DROP_CONSOLE: boolean;
  readonly VITE_SOURCE_MAP: boolean;
  readonly VITE_GZIP: boolean;
  readonly AUTH_API: string;
  // 更多环境变量...
}
