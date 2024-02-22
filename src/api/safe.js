import { baseRequest } from '@/utils/request'

export default {
  safe(data) {
    return baseRequest(`/sss/config/safe`, data, 'get')
  },
}
