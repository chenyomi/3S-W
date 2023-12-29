<script setup>
import { useLocale } from 'vuetify'
import palletForm from './setting-pallet-form.vue'

const density = inject('density')
const expanded = ref()
let expandedArr = []

let desserts = [
  {
    id: 1,
    name: '托板A',
    code: 1001,
    deep: 5,
    exmx1: 800,
    exmy1: 400,
    num: 3,
  },
  {
    id: 2,
    name: '托板B',
    code: 1002,
    deep: 5,
    exmx1: 800,
    exmy1: 400,
    num: 3,
  },
  {
    id: 3,
    name: '托板C',
    code: 1003,
    deep: 5,
    exmx1: 800,
    exmy1: 400,
    num: 3,
  },
]

const FakeAPI = {
  async fetch ({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const items = desserts

        const paginated = items

        resolve({ items: paginated })
      }, 500)
    })
  },
}

const btnList = inject('btnList')

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '新增',
      color: '#42A5F5',
      size: 'large',
      width: 80,
      formWidth: 800,
      slot: shallowRef(palletForm),  
      fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
        openLoading({
          text: '正在上传更新',
        })
        diaFormRef.submit().finally(() => {
          close()
          setTimeout(() => {
            closeLoading()
          }, 2000)
        })
      },
    }, {
      name: '编辑',
      color: '#00ACC1',
      size: 'large',
      width: 80,
      formWidth: 800,
      slot: shallowRef(palletForm), 
      fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
        openLoading({
          text: '正在上传更新',
        })
        diaFormRef.submit().finally(() => {
          close()
          setTimeout(() => {
            closeLoading()
          }, 2000)
        })
      },
    }, {
      name: '保存',
      color: '#66BB6A',
      icon: 'bx-cloud-upload',
      size: 'large',
      width: 220,
      mark: '是否保存并上传更新数据？',
      fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
        openLoading({
          text: '正在上传更新',
        })
        close()
        setTimeout(() => {
          closeLoading()
        }, 2000)
      },
    }]
  })
})

const { t } = useLocale()

const headers = ref([
  {
    align: 'start',
    sortable: false,
    key: 'exclusive',
    fixed: true,
    minWidth: 70,
  },
  {
    title: t('名称'),
    align: 'start',
    sortable: false,
    key: 'name',
    minWidth: 90,
  },
  { title: t('编号'), key: 'code', align: 'center', sortable: false, minWidth: 90 },
  { title: t('厚度'), key: 'deep', align: 'center', sortable: false, minWidth: 90 },
  { title: t('数量'), key: 'num', align: 'center', sortable: false, minWidth: 90 },
  { title: t('尺寸') + '（X-Y）', key: 'exmx1', align: 'center', sortable: false, minWidth: 90 },
  
])

const serverItems = ref([])
const loading = ref(true)
function loadItems ({ page, itemsPerPage, sortBy }) {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    loading.value = false
    expanded.value = items[0].id
    btnList.value[1].slotData = serverItems.value.filter(c => c.id == items[0].id)[0]
  })
}
</script>

<template>
  <VDataTableVirtual
    fixed-header
    :headers="headers"
    :items="serverItems"
    :loading="loading"
    loading-text=""
    hover
    height="calc(100vh - 175px)"
    expand-on-click
    :density="density"
    @update:options="loadItems"
    @update:expanded="(newVal) => {
      newVal.map(e => {
        if(!expandedArr.includes(e)) {
          expanded = e
          btnList[1].slotData = serverItems.filter(c => c.id == e)[0]
        }
      })
      expandedArr.map(e => {
        if(!newVal.includes(e)) {
          expanded = e 
          btnList[1].slotData = serverItems.filter(c => c.id == e)[0]
        }
      })
      expandedArr = newVal
    }"
  >
    <template #item.exclusive="{ item }">
      <VCheckbox
        :model-value="item.id == expanded"
        readonly
      />
    </template>
    <template #item.exmx1="{ item }">
      {{ item.exmx1 }}-{{ item.exmy1 }}  
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
