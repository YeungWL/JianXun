const getters = {
  token: state => state.user.accessToken,
  accessToken: state => state.user.accessToken,  
  userInfo: state => state.user.userInfo,
  rootLists: state => state.menuRoots.rootLists,//菜单
}

export default getters
