/**
 * Created by 小黄书 on 2019/03/01.
 * 用户相关api
 */
import * as API from './index'

export default {
  // 登录
  login: params => {
    return API.POSTFORM('/api/admin/login', params)
  },

  // 登出
  logout: params => {
    return API.GET('/api/admin/logout', params)
  },
  // 获取权限目录
  getRoles: params => {
    return API.GET('/api/admin/rolesinfo', params)
  },
  // 修改个人信息
  changeProfile: params => {
    return API.POSTFORM('/api/admin/update', params)
  },

  // 修改密码
  changePWD: params => {
    return API.POSTFORM('/api/admin/changePassword', params)
  }
}
