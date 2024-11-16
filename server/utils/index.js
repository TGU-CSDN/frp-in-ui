import fs from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';

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

export function compareMd5(file1, file2) {
  const buffer1 = readFileSync(file1);
  const buffer2 = readFileSync(file2);
  const hash1 = crypto.createHash('md5');
  const hash2 = crypto.createHash('md5');
  hash1.update(buffer1, 'utf8');
  const md51 = hash1.digest('hex');
  hash2.update(buffer2, 'utf8');
  const md52 = hash2.digest('hex');
  return md51 === md52;
}
