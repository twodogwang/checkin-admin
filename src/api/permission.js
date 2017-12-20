import fetch from '@/utils/request'
import qs from 'qs'
export function getpermissionList(params = {
  pageSize: 10,
  pageNum: 1,
  big: 1,
  small: 11
}) {
  return fetch({
    url: '/permission/getpermissionList',
    method: 'get',
    params: params
  })
}
