import { readFile, writeFile } from "node:fs/promises";
import toml from "@iarna/toml";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // 遍历body各属性
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const element = body[key];
      if (!element) {
        return {
          code: 400,
          data: null,
          msg: `${key}不能为空`,
        };
      }
    }
  }

  const config = useRuntimeConfig(event);
  const { frpPath } = config;
  const data = await readFile(`${frpPath}/frpc-copy.toml`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return err;
    }
  });
  const tomlData = toml.parse(data);

  //   console.log(tomlData);
  let res = null;
  tomlData.proxies.forEach((element) => {
    if (element.name == body.name) {
      console.log("隧道名称已存在");
      res = {
        code: 400,
        data: null,
        msg: `隧道名称${body.name}已存在`,
      };
    }
  });
  if (res) {
    return res;
  }

  tomlData.proxies.push(body);
  const tomlString = toml.stringify(tomlData);
  const writeRes = await writeFile(`${frpPath}/frpc-copy.toml`, tomlString, "utf8");
  if (writeRes) {
    res = {
      code: 500,
      data: null,
      msg: `写入文件错误`,
    };
  }
  console.log(writeRes);
  //   console.log(proxies);

  if (res) {
    return res;
  }
  return {
    code: 200,
    data: body,
  };
});
