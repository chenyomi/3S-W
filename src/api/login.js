import { baseRequest } from '@/utils/request'

export default {
  getResourceList(data) {
    return baseRequest(`/api/bizapp/biz/resource/analysis`, data, 'get')
  },
}
