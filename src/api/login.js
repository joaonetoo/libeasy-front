import request from '@/utils/request'

export function login(login, password) {
  return request({
    url: '/users/auth',
    method: 'post',
    data: {
      login,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/check',
    method: 'post',
    headers: {"x-access-token": token}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
