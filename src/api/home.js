import fetch from '@/utils/request'

export function getIndexInfo(params) {
  return fetch({
    url: '/index/indexPage'
  })
}
