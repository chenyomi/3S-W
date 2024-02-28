import { baseRequest } from '@/utils/request'

export default {
  getSpeed(data) {
    return baseRequest(`/sss/grpc/speed`, data, 'get')
  },
  setSpeed(data) {
    return baseRequest(`/sss/grpc/speed`, data, 'post')
  },
}
