import fetch from '@/utils/request'

export function getLogs(params = {
  pageNum: 1,
  pageSize: 10
}) {
  return fetch({
    url: '/checklog/checklog',
    method: 'get',
    params: params
  })
}
