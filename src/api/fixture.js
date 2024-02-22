import { baseRequest } from '@/utils/request'

export default {
  fixtureList(data) {
    return baseRequest(`/sss/fixture/list`, data, 'get')
  },
  fixtureEdit(data) {
    return baseRequest(`/sss/fixture`, data, data.id? 'put' : 'post')
  },
}
