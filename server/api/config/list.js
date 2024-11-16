import { readFile, copyFile } from 'node:fs/promises';
import toml from '@iarna/toml';
import { compareFiles } from '../../utils/index';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { frpPath } = config;
  const compare = await compareFiles(`${frpPath}/frpc.toml`, `${frpPath}/frpc-copy.toml`);
  // 目前用的配置文件是最新的
  if(compare === 1 || compare === null) {
    await copyFile(`${frpPath}/frpc.toml`, `${frpPath}/frpc-copy.toml`);
  }
  const data = await readFile(`${frpPath}/frpc-copy.toml`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return err;
    }
  });
  const tomlData = toml.parse(data);
  return {
    code: 200,
    data: tomlData,
  };
});
