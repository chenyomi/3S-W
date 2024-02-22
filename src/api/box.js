import { baseRequest } from '@/utils/request'

export default {
  boxList(data) {
    return baseRequest(`/sss/materialbox/list`, data, 'get')
  },
  boxEdit(data) {
    return baseRequest(`/sss/materialbox`, data, data.id? 'put' : 'post')
  },
}
