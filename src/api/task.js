import { baseRequest } from '@/utils/request'

export default {
  taskList(data) {
    return baseRequest(`/sss/task/list`, data, 'get')
  },
  taskSort(data) {
    return baseRequest(`/sss/task/sort`, data, 'post')
  },
  taskRun(data) {
    return baseRequest(`/sss/task/runById`, data, 'post')
  },
  taskSplit(data) {
    return baseRequest(`/sss/task/split`, data, 'post')
  },
  taskStorage(data) {
    return baseRequest(`/sss/task/storage`, data, 'get')
  },
  taskStorageSelector(data) {
    return baseRequest(`/sss/task/storage/selector`, data, 'get')
  },
  taskStorageIn(data) {
    return baseRequest(`/sss/task/storage/in`, data, 'post')
  },
  taskStop(data) {
    return baseRequest(`/sss/task/stop`, data, 'post')
  },
  taskDelete(data) {
    return baseRequest(`/sss/task`, data, 'delete')
  },
}
