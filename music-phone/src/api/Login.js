import request from '../utils/request'

//邮箱登录
export const login = (params) =>
  request({
    url: '/login',
    method: 'POST',
    params,
  })

//获取短信验证码
export const sendCode = (params) =>
  request({
    url: '/captcha/sent',
    method: 'POST',
    params,
  })

//验证短信验证码
export const textCode = (params) =>
  request({
    url: '/captcha/verify',
    method: 'POST',
    params,
  })
