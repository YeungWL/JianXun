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
  }
}
