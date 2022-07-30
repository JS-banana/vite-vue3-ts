// // 加密
// // 采用 DES

// import CryptoJS from 'crypto-js';

// const DES_KEY = 'xxxxx'; // 定义的 key

// const keyHex = CryptoJS.enc.Utf8.parse(DES_KEY);

// //DES加密
// export function encryptByDES(message: string) {
//   const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.ZeroPadding,
//   });
//   return encrypted.ciphertext.toString();
// }

// //DES加密
// export function decryptByDES(ciphertext: string) {
//   const decrypted = CryptoJS.DES.decrypt(
//     {
//       ciphertext: CryptoJS.enc.Hex.parse(ciphertext),
//     },
//     keyHex,
//     {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.ZeroPadding,
//     },
//   );
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
