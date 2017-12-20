import fetch from '@/utils/request.js'
import qs from 'qs'

export function getCustomer() {
  return fetch({
    url: '/statistics/statisticsCustomer'
  })
}

export function getSomebodyDetail(param) {
  return fetch({
    url: '/statistics/statisticsSingle',
    method: 'post',
    data: qs.stringify(param)
  })
}

export function getOrder() {
  return fetch({
    url: '/statistics/statisticsOrder'
  })
}
