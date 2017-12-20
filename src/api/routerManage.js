import fetch from '@/utils/request'
import qs from 'qs'

export function getAllRouters(params) {
  return fetch({
    url: '/permission/getAllMenu'
  })
}

export function deleteRouter(params) {
  return fetch({
    url: '/permission/deleMenu',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function addRouter(params) {
  return fetch({
    url: '/permission/addMenu',
    method: 'post',
    data: qs.stringify(params)
  })
}
