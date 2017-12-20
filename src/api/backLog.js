import fetch from '@/utils/request'

export function getTodays(params) {
  return fetch({
    url: '/follow/getTodayTodoFollow'
  })
}

export function getAll(params) {
  return fetch({
    url: '/follow/getTodoFollow'
  })
}

export function done(param) {
  return fetch({
    url: '/follow/completeFollow',
    params: {
      id: param
    }
  })
}
