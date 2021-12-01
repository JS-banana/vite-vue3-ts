import { Buffer } from 'buffer/';

export const strToUtf8 = (val: string) => {
  let str = '';
  str = Buffer.from(val.toString().slice(2), 'hex').toString('utf8');
  try {
    str = JSON.parse(str).b;
  } catch (error) {
    console.log(error);
  }
  return str;
};
