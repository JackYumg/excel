import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({
        importStyle: 'less',

      })],
      dts: resolve(__dirname, 'src/components.d.ts'),
    }),
    electron([
      {
        entry: 'electron-main/index.ts'
      },
      {
        entry: 'electron-main/preload.ts'
      },
    ])
  ],
  build: {
  },
  server: {
    port: 4300
  }
});