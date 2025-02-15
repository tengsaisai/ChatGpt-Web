import {
  RequestChatOptions,
  RequestImagesGenerations,
  RequestLoginParams,
  RequestOpenChatOptions,
  ResponseLoginData,
  UserDetail
} from '@/types'
import request from '.'

// 获取验证码
export function getCode(params: Omit<RequestLoginParams, 'code'>) {
  return request.get('/send_sms', params)
}

// 登陆
export function postLogin(params: RequestLoginParams) {
  return request.post<ResponseLoginData>('/login', params)
}

// 获取用户信息
export function getUserInfo() {
  return request.get<UserDetail>('/user/info')
}

// 请求对话
export function postCompletions(
  params: RequestChatOptions,
  config?: {
    headers?: { [key: string]: any }
    options?: { [key: string]: any }
  }
) {
  return request.postStreams<Response>('/completions', params, config)
}

// 直接请求三方 直链
export function postChatCompletions(
  url: string,
  params: RequestOpenChatOptions,
  config?: {
    headers?: { [key: string]: any }
    options?: { [key: string]: any }
  }
) {
  return request.postStreams<Response>(
    `${url}/v1/chat/completions`,
    { ...params, stream: true },
    config
  )
}

// 请求三方直接链接 绘画
export function postImagesGenerations(
  url: string,
  params: RequestImagesGenerations,
  headers?: { [key: string]: any },
  options?: { [key: string]: any }
) {
  return request
    .post<Array<{ url: string }>>(`${url}/v1/images/generations`, { ...params }, headers, options)
    .then((r) => ({ status: 0, data: r.data || [], message: r.message || '' }))
}
