import fs from 'node:fs/promises';
export async function compareFiles(file1, file2) {
  try {
    const stat1 = await fs.stat(file1);
    const stat2 = await fs.stat(file2);

    // 获取修改时间
    const mtime1 = stat1.mtime;
    const mtime2 = stat2.mtime;

    if (mtime1 > mtime2) {
      return 1;
    } else if (mtime1 < mtime2) {
      return -1
    } else {
      return 0;
    }
  } catch (err) {
    return null;
  }
}
