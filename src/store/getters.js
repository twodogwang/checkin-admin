const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  urls: state => state.user.urls,
  roleName: state => state.user.roleName,
  permission_routers: state => state.router.routers,
  addRouters: state => state.router.addRouters,
  adminInfo: state => state.admin.adminInfo.content,
  groupInfo: state => state.group.groupInfo.content,
  groupPage: state => state.group.groupInfo.pageInfo,
  permissionInfo: state => state.permission.permissionInfo.content,
  permissionPage: state => state.permission.permissionInfo.pageInfo,
  zhuanyiList: state => state.admin.zhuanyiList.content
}
export default getters
