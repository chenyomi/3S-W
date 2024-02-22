import { baseRequest } from '@/utils/request'

export default {
  getStorage(data) {
    return baseRequest(`/sss/storage/pallet`, data, 'get')
  },
}
