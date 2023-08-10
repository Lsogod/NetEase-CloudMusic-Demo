//封装要发起的请求
import request from '@/utils/request'

export const getRecommendListDetail = (params) =>
  request({
    url: '/playlist/detail',
    params,
  })
