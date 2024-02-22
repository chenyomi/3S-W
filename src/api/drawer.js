import { baseRequest } from '@/utils/request'

export default {
  drawerList(data) {
    return baseRequest(`/sss/trawlboard/list`, data, 'get')
  },
  drawerEdit(data) {
    return baseRequest(`/sss/trawlboard`, data, data.id? 'put' : 'post')
  },
}
