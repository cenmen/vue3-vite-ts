import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';

interface Config {
  [key: string]: string;
}

interface ConfigRes {
  VITE_PORT: number;
  VITE_SOURCE_MAP: boolean;
  VITE_REPORT: boolean;
  AUTH_API: string;
}

// 将纯字符串配置转换类型
const toTransformConfig = (config: Config) => {
  const isNumberKeys = ['VITE_PORT'];
  return Object.entries(config).reduce((total, cur) => {
    const [key, value] = cur;
    if (value === 'true') return { ...total, [key]: true };
    if (value === 'false') return { ...total, [key]: false };
    if (isNumberKeys.includes(key)) return { ...total, [key]: Number(value) };
    return { ...total, [key]: value };
  }, {});
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_PORT, VITE_SOURCE_MAP, VITE_REPORT, AUTH_API } = toTransformConfig(env) as ConfigRes;

  return {
    plugins: [vue(), vueJsx(), VITE_REPORT && visualizer()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      cors: true,
      // https: false,
      port: VITE_PORT,
      proxy: {
        [AUTH_API]: {
          target: `http://api.${mode}.com`,
          changeOrigin: true,
          rewrite: (path) => path.replace(RegExp(`^${AUTH_API}`), '')
        }
      }
    },
    build: {
      sourcemap: VITE_SOURCE_MAP,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  };
});
