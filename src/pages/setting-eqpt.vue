<script setup>
import { useLocale } from 'vuetify'
import eqptForm from './setting-eqpt-form.vue'

const { t } = useLocale()

const density = inject('density')
const expanded = ref()
let expandedArr = []

const btnList = inject('btnList')

onMounted(() => {
  nextTick(() => {
    btnList.value =  [{
      name: '新增',
      color: '#42A5F5',
      size: 'large',
      width: 80,
      formWidth: 800,
      slot: shallowRef(eqptForm),  
      mark: '是否保存并上传更新数据？',
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
      slot: shallowRef(eqptForm), 
      mark: '是否保存并上传更新数据？',
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

const desserts = [
  {
    id: 1,
    name: '设备1号',
    timer1: 600,
    timer2: 600,
    timer3: 10,
    exmx1: 0,
    exmx2: 0,
    exmx3: 0,
    exmy1: 0,
    exmy2: 0,
    exmy3: 0,
    exmz1: 0,
    exmz2: 0,
    exmz3: 0,
  },
  {
    id: 2,
    name: '设备2号',
    timer1: 600,
    timer2: 600,
    timer3: 10,
    exmx1: 0,
    exmx2: 0,
    exmx3: 0,
    exmy1: 0,
    exmy2: 0,
    exmy3: 0,
    exmz1: 0,
    exmz2: 0,
    exmz3: 0,
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
    minWidth: 120,
  },
  { title: t('生产延时'), key: 'timer1', align: 'center', sortable: false, minWidth: 90 },
  { title: t('切换延时'), key: 'timer2', align: 'center', sortable: false, minWidth: 90 },
  { title: t('启动延时'), key: 'timer3', align: 'center', sortable: false, minWidth: 90 },
  { title: t('校准设定值') + '（X-Y-Z）', key: 'exmx1', align: 'center', sortable: false, minWidth: 150 },
  { title: t('最小定位') + '（X-Y-Z）', key: 'exmx2', align: 'center', sortable: false, minWidth: 140 },
  { title: t('最大定位') + '（X-Y-Z）', key: 'exmx3', align: 'center', sortable: false, minWidth: 140 },
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
      {{ item.exmx1 }}-{{ item.exmy1 }}-{{ item.exmz1 }}
    </template>
    <template #item.exmx2="{ item }">
      {{ item.exmx2 }}-{{ item.exmy2 }}-{{ item.exmz2 }}
    </template>
    <template #item.exmx3="{ item }">
      {{ item.exmx3 }}-{{ item.exmy3 }}-{{ item.exmz3 }}
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
