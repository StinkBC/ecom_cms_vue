/**
 * Created by 小黄书 on 2019/03/01.
 * 用户相关api
 */
import * as API from './index'

export default {
  // 登录
  upload: params => {
    return API.UPLOAD('/api/upload', params)
  }
}
