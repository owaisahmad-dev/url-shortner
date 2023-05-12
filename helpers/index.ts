import {createHash} from "crypto"
const sha256 = async (line: string) => {
  const hash = createHash('sha256');
  hash.write(line); // write a single line to the buffer
  return hash.digest('hex'); // returns hash as string
}

export {sha256}