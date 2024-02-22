import { baseRequest } from '@/utils/request'

export default {
  dictList(data) {
    return baseRequest(`/sss/dict`, data, 'get')
  },
}
