<script setup>
import taskApi from '@/api/task';
import { useLocale } from 'vuetify';
const density = inject('density')
const expanded = ref()
let expandedArr = []

const { t } = useLocale()
const colors = {
  'STOP': '#EF5350',
  'RUN': '#689F38',
  'STEPS': '#FFA726'
}
const itemsPerPage = ref(30)
const params = ref({
  pageNum: 1,
  pageSize: 30,
})
const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      taskApi.taskLog({
        pageNum: page,
        pageSize: itemsPerPage
      }).then(res => {
        const items = res.data.list

        const paginated = items

        resolve({ items: paginated, total: res.data.total })
      })
    })
  },
}

const btnList = inject('btnList')


onMounted(() => {
  nextTick(() => {
    btnList.value = []
  })
})


const headers = ref([
  {
    title: t('状态'),
    align: 'center',
    sortable: false,
    key: 'logType',
    width: 100,
  },

  {
    title: t('内容'),
    align: 'start',
    sortable: false,
    key: 'logInfo',
  },
  {
    title: t('类型'),
    align: 'center',
    sortable: false,
    key: 'taskType',
    width: 100,
  },
  {
    title: t('时间'),
    align: 'end',
    sortable: false,
    key: 'createTime',
    width: 200,
  },
])

const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(true)
function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
    expanded.value = items[0].id
  })
}
</script>

<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" fixed-header :headers="headers" :items="serverItems"
    :items-length="totalItems" :loading="loading" loading-text="" hover height="calc(100vh - 245px)" :density="density"
    @update:options="loadItems">
    <template #item.logType="{ item }">
      <VChip label :color="colors[item.logType]">
        {{ item.logType }}
      </VChip>
    </template>
    <template #loading />
  </v-data-table-server>
</template>
