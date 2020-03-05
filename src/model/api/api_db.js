/**
 * Created by 小黄书 on 2019/03/01.
 * 用户相关api
 */
import * as API from './index'

export default {
  // 登录
  dblist: params => {
    return API.GET('/api/db/list', params)
  },
  search: params => {
    return API.GET('/api/db/query', params)
  },
  exportExcel:params => {
    return API.DOWNLOAD('/api/db/excel', params)
  },

}
