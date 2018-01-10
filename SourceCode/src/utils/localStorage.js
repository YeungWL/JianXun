
import Crypt from './crypto'

export default{
    /**
     *判断是否为json对象
     */
  isJsonString: function (objectString) {
    if (typeof (objectString) === 'object' && Object.prototype.toString.call(objectString).toLowerCase() === '[object object]' && !objectString.length) {
      return true
    } else {
      return false
    }
  },
    /**
     *localStorage 存储数据
     */
  localSetItem: function (key, value) {
    if (!key) return
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    // Crypt.stringToBase64(key)
    window.localStorage.setItem(Crypt.stringToBase64(key), Crypt.localRsaEncrypt(value))
  },

  /**
   *localStorage 读取数据
   */
  localGetItem: function (key) {
    if (!key) return
    let DecryptString = window.localStorage.getItem(Crypt.stringToBase64(key))
    return Crypt.DecryptString(DecryptString)
  },

  /**
   *删除localStorage
   */
  localRemoveItem: function (key) {
    if (!key) return
    window.localStorage.removeItem(Crypt.stringToBase64(key))
  },
  /**
   * 存储sessionStorage
   */
  sessionSetItem: function (key, value) {
    if (!key) return
    if (typeof content !== 'string') {
      value = JSON.stringify(value)
    }
    window.sessionStorage.setItem(Crypt.stringToBase64(key), Crypt.localRsaEncrypt(value))
  },
  /**
   * 获取sessionStorage
   */
  sessionGetItem: function (key) {
    if (!key) return
    let DecryptString = window.sessionStorage.getItem(Crypt.stringToBase64(key))
    return Crypt.DecryptString(DecryptString)
  },
  /**
   * 删除sessionStorage
   */
  sessionRemoveItem: function (key) {
    if (!key) return
    window.sessionStorage.removeItem(Crypt.stringToBase64(key))
  },
  /**
   * 清除所有的key/value
   */
  clearCache: function () {
    window.sessionStorage.clear()
    window.localStorage.clear()
  }
}
