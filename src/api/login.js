import { baseRequest } from '@/utils/request'

export default {
  login(data) {
    return baseRequest(`/login`, data, 'post')
  },
}
