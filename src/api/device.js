import http from '@/utils/fetch'

export function queryDeviceList(deviceRequestVo) {
  const url = '/api/device/queryList'
  return http.post(url, JSON.stringify(deviceRequestVo))
}
export function queryDeviceCount(deviceRequestVo) {
  const url = '/api/device/queryCount'
  return http.post(url, JSON.stringify(deviceRequestVo))
}

export function updateDevice(deviceRequestVo) {
  const url = '/api/device/updateDevice'
  return http.post(url, JSON.stringify(deviceRequestVo))
}
