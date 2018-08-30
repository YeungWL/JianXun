/*
* @Author: fanglin
* 穷举child设置属性值
* @Date:   2018-07-26
*/

import Vue from 'vue'
function DataTransfer (data) {
  if (!(this instanceof DataTransfer)) {
    return new DataTransfer(data, null, null)
  }
}

DataTransfer.treeToArray = function (data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.childList && record.childList.length > 0) {
      let childList = DataTransfer.treeToArray(record.childList, record, _level, expandedAll)
      tmp = tmp.concat(childList)
    }
  })
  return tmp
}

export default DataTransfer
