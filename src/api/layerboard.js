import { baseRequest } from '@/utils/request'

export default {
  layerboardList(data) {
    return baseRequest(`/sss/layerboard/list`, data, 'get')
  },
  layerboardEdit(data) {
    return baseRequest(`/sss/layerboard`, data, data.id? 'put' : 'post')
  },
}
