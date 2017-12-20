import fetch from '@/utils/request';
import qs from 'qs';

// 新增跟进
function addFollow(params) {
  return fetch({
    url: '/follow/addFollow',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 创建订单
function createOrder(params) {
  return fetch({
    url: '/customer/addOrder',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取派单人员
function getOrdee(params) {
  return fetch({
    url: '/getUser/getSeller',
    method: 'get'
  })
}

// 派单
function sendOrder(params) {
  return fetch({
    url: '/customer/sendCustomer',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 移入公海
function customerOut(params) {
  return fetch({
    url: 'customer/customerOut',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取风控经理
function getRiskManager(params) {
  return fetch({
    url: '/getUser/getFK',
    method: 'get'
  })
}

// 客户转移
function transformCustomer(params) {
  return fetch({
    url: '/customer/transformCustomer',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 获取已放款订单信息
function getOrder(params) {
  return fetch({
    url: '/customer/getOrder',
    method: 'get',
    params
  })
}

export function readLogs(params) {
  return fetch({
    url: '/customer/checkLog',
    params
  })
}

export {
  addFollow,
  createOrder,
  getOrdee,
  sendOrder,
  customerOut,
  getRiskManager,
  transformCustomer,
  getOrder
};
