import shell from "shelljs";
import os from "node:os";
import { readFile, copyFile } from 'node:fs/promises';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { port } = config;
  console.log(os.platform());
  let command = "";
  const platform = os.platform();
  // 字符串包含win
  if (platform.includes("win")) {
    command = `netstat -aon|findstr ${port}`;
  } else {
    command = `lsof -i:${port}`;
  }
  const { frpPath } = config;
  const res = await shell.exec(command);
  // -1: 未重启应用配置文件, null: 无应用配置文件, 1: 已应用
  const compare = await compareFiles(`${frpPath}/frpc.toml`, `${frpPath}/frpc-copy.toml`);
  return {
    code: 200,
    data: {
        service: res.code,
        update: compare
    },
  };
});
