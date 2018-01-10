/**
 * 加密 解密
 */
import crypto from 'crypto'

export default{
  encrypRsa: function (key, str) {
    if (str && str.length === 0) return ''
    key = key.replace('-----BEGIN PUBLIC KEY-----', '')
    key = key.replace('-----END PUBLIC KEY-----', '')
    let begin = '-----BEGIN PUBLIC KEY-----\n'
    let end = '-----END PUBLIC KEY-----'
    let ret = ''
    for (var i = 0; i < key.length; i += 64) {
      let a = key.slice(i, i + 64)
      ret += (a + '\n')
    }
    key = begin + ret + end
    let keyParam = {'key': key, padding: crypto.constants.RSA_PKCS1_PADDING}
    let plain = Buffer.from(str)
    return crypto.publicEncrypt(keyParam, plain).toString('base64')
  },
  // 字符转base64
  stringToBase64 (str) {
    if (str.length === 0) return ''
    return Buffer.from(str).toString('base64')
  },
  // 字符转义
  baseToString (encryptStr) {
    if (encryptStr.length === 0) return ''
    return Buffer.from(encryptStr, 'base64').toString()
  },
  // 本地加密
  localRsaEncrypt (str) {
    if (str && str.length === 0) return ''
    console.log(str)
    let publicKey = Buffer.from(process.rsaEncrypt.PUBKER, 'base64').toString()
    let keyParam = {'key': publicKey, padding: crypto.constants.RSA_PKCS1_PADDING}
    let plain = Buffer.from(str)
    return crypto.publicEncrypt(keyParam, plain).toString('base64')
  },
  // 本地解密
  localRsaDecrypt (str) {
    if (str && str.length <= 0) return ''
    let privateKey = Buffer.from(process.rsaEncrypt.PRIVKEY, 'base64').toString()
    let keyParam = {'key': privateKey, padding: crypto.constants.RSA_PKCS1_PADDING}
    let plain = Buffer.from(str, 'base64')
    return crypto.privateDecrypt(keyParam, plain).toString()
  }
}
