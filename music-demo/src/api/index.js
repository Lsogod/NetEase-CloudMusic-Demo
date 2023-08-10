//统一出口
import { recommendMusic, hotMusic } from '@/api/Home'
import { hotSearch, searchResult } from '@/api/Search'
import { getLyricById, getSongById } from '@/api/Play'
import { getCommentList } from '@/api/Comment'
import { getRecommendListDetail } from '@/api/Recommend'
import { login, sendCode, textCode } from '@/api/Login'

export const recommendMusicAPI = recommendMusic
export const hotMusicAPI = hotMusic
export const hotSearchAPI = hotSearch
export const searchResultAPI = searchResult
export const getLyricByIdAPI = getLyricById
export const getSongByIdAPI = getSongById
export const getCommentListAPI = getCommentList
export const getRecommendListDetailAPI = getRecommendListDetail
export const loginAPI = login
export const sendCodeAPI = sendCode
export const textCodeAPI = textCode
