export interface BiliResp<T> {
  code: BiliVideoURLRespCode
  message: string
  ttl: number
  data: T | null
}

enum BiliVideoURLRespCode {
  Susscess = 0,
  Error = -400,
  NoPermission = -403,
  NotFound = -404,
}
