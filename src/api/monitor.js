import { baseRequest } from '@/utils/request'

export default {
  monitor(data) {
    return baseRequest(`/sss/monitor`, data, 'get')
  },
}
