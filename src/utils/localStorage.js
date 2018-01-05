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
    window.localStorage.setItem(key, value)
  },

  /**
   *localStorage 读取数据
   */
  localGetItem: function (key) {
    if (!key) return
    return window.localStorage.getItem(key)
  },

  /**
   *删除localStorage
   */
  localRemoveItem: function (key) {
    if (!key) return
    window.localStorage.removeItem(key)
  },
  /**
   * 存储sessionStorage
   */
  sessionSetItem: function (key, value) {
    if (!key) return
    if (typeof content !== 'string') {
      value = JSON.stringify(value)
    }
    window.sessionStorage.setItem(key, value)
  },
  /**
   * 获取sessionStorage
   */
  sessionGetItem: function (key) {
    if (!key) return
    return window.sessionStorage.getItem(key)
  },
  /**
   * 删除sessionStorage
   */
  sessionRemoveItem: function (key) {
    if (!key) return
    window.sessionStorage.removeItem(key)
  },
  /**
   * 清除所有的key/value
   */
  clearCache: function () {
    window.sessionStorage.clear()
    window.localStorage.clear()
  }
}
