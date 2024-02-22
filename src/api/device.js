import { baseRequest } from '@/utils/request'

export default {
  deviceList(data) {
    return baseRequest(`/sss/machinery/list`, data, 'get')
  },
  deviceEdit(data) {
    return baseRequest(`/sss/machinery`, data, data.id? 'put' : 'post')
  },
}
