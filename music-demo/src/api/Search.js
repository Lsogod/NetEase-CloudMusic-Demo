//封装要发起的请求
import request from '@/utils/request'

//获取热搜列表
export const hotSearch = () =>
  request({
    url: '/search/hot',
  })

//获取搜索结果列表
export const searchResult = (params) =>
  request({
    url: '/cloudsearch',
    params,
  })
