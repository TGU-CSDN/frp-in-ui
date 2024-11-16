import shell from "shelljs";
import os from "node:os";
import { copyFile } from 'node:fs/promises';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { frpPath } = config;
  // 覆盖文件
  await copyFile(`${frpPath}/frpc-copy.toml`, `${frpPath}/frpc.toml`);
  let command = "";
  const platform = os.platform();
  // 字符串包含win
  if (platform.includes("win")) {
    return {
      code: 400,
      data: null,
      msg: `重启服务暂不支持windows系统`,
    };
  } else {
    command = `systemctl restart frpc`;
  }
  // 重启服务
  const res = await shell.exec(command);
  return {
    code: 200,
    data: res.code,
  };
});
