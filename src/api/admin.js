import fetch from '@/utils/request'
import qs from 'qs'
export function getadminlist(params) {
  return fetch({
    url: '/permission/admininfo',
    method: 'get',
    data: {
      info: 0
    }
  })
}

export function getrolename() {
  return fetch({
    url: '/permission/getrolename',
    method: 'get'
  })
}

export function getzhuanyiList() {
  return fetch({
    url: '/permission/getzhuanyiList',
    method: 'get'
  })
}
