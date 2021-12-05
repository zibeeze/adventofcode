import { readFileSync } from 'fs';

export function readStringFromFile(path: string) {
  return readFileSync(path).toString();
}
/***
 * PARSE ARRAY FROM TEXT FILE
 *
 * @param {String} path - path to file relative to root
 * @param {Array<String>} delimeters - MAX LENGTH 2 string to split by
 * @param {Boolean} convertToNum - convert final array to number
 */
export function parseArrayFromText(
  path: string,
  delimiters: string[],
  convertToNum: boolean
): string[] | number[] {
  const file = readStringFromFile(path);
  let result: any[] = file.split(delimiters[0]);
  delimiters = delimiters.slice(1);
  if (delimiters.length) {
    result = result.map((x) => x.split(delimiters[0]));
    if (convertToNum) {
      const newResult = [];
      result.forEach((res) => {
        newResult.push(res.map((x) => +x));
      });
      result = newResult;
    }
  } else {
    if (convertToNum) {
      result = result.map((x) => +x);
    }
  }
  return result;
}

export function intToBinaryString(number: number, length: number): string {
  let bin = (number >>> 0).toString(2);
  let count = bin.length;
  if (count > length) {
    throw new Error('SERIAL: CANNOT CONVERT TO BINARY, NUMBER IS TO LARGE');
  }
  while (count < length) {
    bin = `0${bin}`;
    count += 1;
  }
  return bin;
}
