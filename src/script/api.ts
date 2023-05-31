import service from "./http";

interface loginData {
  username: string,
  password: string,
}

export const login = (data: loginData) => {
  return service({
    url: "/login",
    method: 'post',
    data,
  })
}
// 商品列表接口
export const getGoodsList = () => {
  return service({
    url:'/getGoodsList',
    method: 'get'
  })
}
// 用户列表
export const getUserList = () => {
  return service({
    url:'/getUserList',
    method: 'get'
  })
}
// 角色列表
export const getRoleList = () => {
  return service({
    url:'/getRoleList',
    method: 'get'
  })
}
// 权限列表
export const getAuthorityList = () => {
  return service({
    url:'/getAuthorityList',
    method: 'get'
  })
}
