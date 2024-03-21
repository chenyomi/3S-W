import { baseRequest } from '@/utils/request'

export default {
  getStorage(data) {
    return baseRequest(`/sss/storage/pallet`, data, 'get')
  },
  getStorageMaterial(data) {
    return baseRequest(`/sss/storage/material`, data, 'post')
  },
  getStorageMaterialCheck(data) {
    return baseRequest(`/sss/storage/material/check`, data, 'post')
  },
}
