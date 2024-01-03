<script setup>
import { useLocale } from 'vuetify'

const { t } = useLocale()
const density = inject('density')
const expanded = ref()
let expandedArr = []

let desserts = [
  {
    id: 1,
    name: '夹具1号',
    code: 2001,
    exmx1: 600,
    exmy1: 400,
    exmz1: 150,
    maxKg: 30,
    group: '夹具-1 + 托板G',
  },
  {
    id: 2,
    name: '夹具2号',
    code: 2002,
    exmx1: 600,
    exmy1: 400,
    exmz1: 150,
    maxKg: 30,
    group: '夹具-2 + 托板H',
  },
  {
    id: 3,
    name: '夹具3号',
    code: 2003,
    exmx1: 600,
    exmy1: 400,
    exmz1: 150,
    maxKg: 30,
    group: '夹具-3 + 托板I',
  },
  {
    id: 4,
    name: '夹具4号',
    code: 2003,
    exmx1: 600,
    exmy1: 400,
    exmz1: 150,
    maxKg: 30,
    group: '-',
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

onMounted(() => {
})


const headers = ref([
  // {
  //   align: 'start',
  //   sortable: false,
  //   key: 'exclusive',
  //   fixed: true,
  //   minWidth: 70,
  // },
  {
    title: t('名称'),
    align: 'center',
    sortable: false,
    key: 'name',
    minWidth: 90,
  },
  { title: t('组'), key: 'group', align: 'center', sortable: false, minWidth: 100 },
  
])

const serverItems = ref([])
const loading = ref(true)
function loadItems ({ page, itemsPerPage, sortBy }) {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    loading.value = false
    expanded.value = items[0].id
  })
}

const submit = () => {
  return new Promise(resolve => {
    resolve()
  })
}

defineExpose({
  submit,
})
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
        }
      })
      expandedArr.map(e => {
        if(!newVal.includes(e)) {
          expanded = e 
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
    <template #loading />
  </VDataTableVirtual>
</template>
