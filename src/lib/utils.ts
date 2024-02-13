import { DEFAULT_ALPHABET } from './constants';
import crypto from 'crypto';

// From https://github.com/lucia-auth/lucia/blob/3511fb95bbf35cdf8c31bafb626bc1813caa5fe3/packages/lucia/src/utils/crypto.ts#L6C1-L19C3
// to imitate how lucia auth does things.
export const generateRandomString = (
  length: number,
  alphabet: string = DEFAULT_ALPHABET
) => {
  const randomUint32Values = new Uint32Array(length);
  crypto.getRandomValues(randomUint32Values);
  const u32Max = 0xffffffff;
  let result = '';
  for (let i = 0; i < randomUint32Values.length; i++) {
    const rand = randomUint32Values[i] / (u32Max + 1);
    result += alphabet[Math.floor(alphabet.length * rand)];
  }
  return result;
};
