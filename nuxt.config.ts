// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'node:fs';
import toml from "@iarna/toml";
const conf = fs.readFileSync(`./config/conf.toml`, "utf8");
const tomlData = toml.parse(conf);

export default defineNuxtConfig({
  title: 'Frp in UI',
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@tdesign-vue-next/nuxt',
    'nuxt-file-storage'
  ],
  runtimeConfig: {
    frpPath: tomlData.frpPath || '/usr/local/frp',
    port: tomlData.port || 7000,
  },
})
