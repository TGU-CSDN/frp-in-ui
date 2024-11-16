import { readFile, writeFile } from "node:fs/promises";
import toml from "@iarna/toml";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { name } = query;

    if(!name) {
        return {
            code: 400,
            data: null,
            msg: `name不能为空`,
        };
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

  let res = null, delIndex = null;
  tomlData.proxies.forEach((element, index) => {
    if (element.name == name) {
        delIndex = index;
    }
  });
  tomlData.proxies.splice(delIndex, 1);
  const tomlString = toml.stringify(tomlData);
  const writeRes = await writeFile(`${frpPath}/frpc-copy.toml`, tomlString, "utf8");
  if (writeRes) {
    res = {
      code: 500,
      data: null,
      msg: `写入文件错误`,
    };
  }

  if (res) {
    return res;
  }
  return {
    code: 200,
    data: name,
    msg: `删除成功`,
  };
});
