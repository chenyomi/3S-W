import { baseRequest } from '@/utils/request'

export default {
  materialList(data) {
    return baseRequest(`/sss/materialtemplate/list`, data, 'get')
  },
  materialEdit(data) {
    return baseRequest(`/sss/materialtemplate`, data, data.id? 'put' : 'post')
  },
}
