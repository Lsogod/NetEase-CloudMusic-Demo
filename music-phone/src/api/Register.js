//封装要发起的请求
import request from '@/utils/request'

//使用手机号注册账户
export const register = (params) =>
  request({
    url: '/register/cellphone',
    params,
  })

//判断当前手机号是否被注册
export const registerPhone = (params) =>
  request({
    url: '/cellphone/existence/check',
    params,
  })