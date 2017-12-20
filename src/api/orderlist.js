import fetch from "@/utils/request.js";
import qs from 'qs'

export function getorderlist(params = {}, type) {
  let uri = '';
  if (type === 'unreceived') {
    uri = '/order/waitForAccept';
  } else if (type === 'handling') {
    uri = '/order/checkin'
  } else if (type === 'reprieve') {
    uri = '/order/getDeferOrder'
  } else if (type === 'alredyReleased') {
    uri = '/order/getPayforOrder'
  } else if (type === 'chargeBack') {
    uri = '/order/getChargebackOrder'
  } else if (type === 'approval') {
    uri = '/order/getApprovalOrder'
  } else if (type === 'all') {
    uri = '/order/getAllOrder'
  } else if (type === 'finished') {
    uri = '/order/getCompleteOrder'
  }
  return fetch({
    url: uri,
    method: 'get',
    params: params
  })
}

// 搜索全部订单（不包括已放款）
export function searchorderlist(params = {}) {
  return fetch({
    url: '/order/searchOrderList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 搜索已放款订单
export function searchpayfororderlist(params = {}) {
  return fetch({
    url: '/order/searchPayforOrderList',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取风控人员
export function getRisker() {
  return fetch({
    url: '/getUser/getFKcommissioner'
  })
}

// 移交
export function transformOrder(params) {
  return fetch({
    url: '/order/transformOrder',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 更改生产状态
export function changeProType(params) {
  return fetch({
    url: '/order/changeProType',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 更换渠道
export function changeChannel(params) {
  return fetch({
    url: '/order/changeChannel',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 填写日志
export function writeLog(params) {
  return fetch({
    url: '/order/writeLog',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 查看备注
export function readNotes(params) {
  return fetch({
    url: '/order/checkBz',
    method: 'get',
    params
  })
}

// 查看日志
export function readLogs(params) {
  return fetch({
    url: '/order/checkLog',
    method: 'get',
    params
  })
}

// 确认
export function confirm(params) {
  return fetch({
    url: '/order/affirmOrder',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function getPhoneNum(params) {
  return fetch({
    url: '/order/getCustomerTel',
    params
  })
}
