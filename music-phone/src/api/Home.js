//封装要发起的请求
import request from '@/utils/request'

//获取推荐音乐歌单列表
export const recommendMusic = (params) =>
  request({
    url: '/personalized',
    params,
  })

//获取最新音乐列表
export const hotMusic = (params) =>
  request({
    url: '/personalized/newsong',
    params,
  })
