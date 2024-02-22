import { baseRequest } from '@/utils/request'

export default {
  handList(data) {
    return baseRequest(`/sss/hand/list`, data, 'get')
  },
  handEdit(data) {
    return baseRequest(`/sss/hand`, data, data.id? 'put' : 'post')
  },
}
