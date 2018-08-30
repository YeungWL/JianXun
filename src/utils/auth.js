import Cookies from 'js-cookie'

const accessTokenKey = 'accessTokenKey'
const Roots = 'Rs'

export function getAccessToken() {
  return Cookies.get(accessTokenKey)
}


export function setAccessToken(accessTokenValue) {
  return Cookies.set(accessTokenKey, accessTokenValue)
}

export function removeAccessToken() {
  return Cookies.remove(accessTokenKey)
}

//获取权限
export function getStorageRoot() {
		return JSON.parse(sessionStorage.getItem(Roots));
}
//存储权限
export function setStorageRoot(value) {
	return sessionStorage.setItem(Roots,JSON.stringify(value));
}
//清除本地权限
export function removeStorageRoot(value) {
	return sessionStorage.removeItem(Roots);
}