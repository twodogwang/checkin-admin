import fetch from '@/utils/request'
import qs from 'qs'
export function getgrouplist(params = {
  pageInfo: {
    pageSize: 10,
    pageNum: 1
  }
}) {
  return fetch({
    url: '/permission/getGroupInfo',
    method: 'get',
    params: params
  })
}
