/**
 * Created by 小黄书 on 2019/6/9.
 */
import axios from 'axios'

import qs from 'qs'

axios.defaults.withCredentials = true

axios.interceptors.response.use(
  function (response) {
    if (response.data && response.data.code < 0) {
      // 未登录的code检查
      if (response.data.code === -7) {
        if (process.browser && window.router.history.pending && window.router.history.pending.path != '/adminLogin') {
          window.router.push({
            path: '/adminLogin'
          })
        }
      } else if (response.data.code < 0) {
        if (response.data && response.data.popups.content) {
          return Promise.reject(new Error(response.data.popups.content))
        }
      }
    }

    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

// 基地址
let base = '' // 接口代理地址？？

// 通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}
export const UPLOAD = (url, params) => {
  return axios({
    url: `${base}${url}`,
    method: 'post',
    onUploadProgress: function (progressEvent) {

    },
    data: params
  }).then(res => res.data)
}

export const POSTFORM = (url, params) => {
  return axios
    .post(`${base}${url}`, qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then(res => res.data)
}
// contentType:'application/x-www-form-urlencoded; charset=UTF-8'
export const GET = (url, params) => {
  return axios.get(`${base}${url}`, { params: params }).then(res => res.data)
}

export const DOWNLOAD = (url, params) => {
  return axios
    .get(`${base}${url}`, { params: params, responseType: 'blob' })
    .then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios
    .delete(`${base}${url}`, { params: params })
    .then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
