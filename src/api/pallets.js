import { baseRequest } from '@/utils/request'

export default {
  palletsListBOARD(data) {
    return baseRequest(`/sss/pallet/list/BOARD`, data, 'get')
  },
  palletsListBOX(data) {
    return baseRequest(`/sss/pallet/list/BOX`, data, 'get')
  },
  palletsListFIXTURE(data) {
    return baseRequest(`/sss/pallet/list/FIXTURE`, data, 'get')
  },
}
