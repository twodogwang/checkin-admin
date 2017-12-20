import fetch from "@/utils/request.js";
import qs from 'qs'

export function addCustomer(params) {
  return fetch({
    url: '/customer/addcustomer',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function submitPersonalInfo(params) {
  return fetch({
    url: '/customer/changeInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function submitWorkInfo(params) {
  return fetch({
    url: '/customer/changeWorkInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function submitLegalInfo(params) {
  return fetch({
    url: '/customer/changeFarenInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function submitAssetInfo(params) {
  return fetch({
    url: '/customer/changeAssetInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function search(params) {
  return fetch({
    url: '/customer/serch',
    method: 'get',
    params: params
  })
}

export function searchById(params) {
  return fetch({
    url: '/customer/searchCustomerById',
    params: {
      customerId: params
    }
  })
}

export function getCustomerList(params = {}, type) {
  let uri = '';
  if (type === 'intention') {
    uri = '/customer/intentionCustomer';
  } else if (type === 'waitForTransform') {
    uri = '/customer/waitForTransform'
  } else if (type === 'alredyTransform') {
    uri = '/customer/alreadyTransform'
  } else if (type === 'highSeas') {
    uri = '/customer/highseasCustomer'
  }
  return fetch({
    url: uri,
    method: 'get',
    params: params
  })
}

export function searchcustomerlist(params = {}) {
  return fetch({
    url: '/customer/searchCustomerList',
    method: 'post',
    data: qs.stringify(params)
  })
}
