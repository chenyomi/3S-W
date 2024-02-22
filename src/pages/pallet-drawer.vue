<script setup>
import palletsApi from '@/api/pallets'
import { useLocale } from 'vuetify'

const { t } = useLocale()
const density = inject('density')
const expanded = ref()
let expandedArr = []

const serverItems = ref([])
const loading = ref(true)


onMounted(() => {
  
})

const loadItems = () => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
  palletsApi.palletsListBOARD().then(res => {
    serverItems.value = res.rows.filter(e => e.upper)
  })
}

const headers = ref([
  // {
  //   align: 'start',
  //   sortable: false,
  //   key: 'exclusive',
  //   fixed: true,
  //   width: 70,
  // },
  {
    title: t('名称'),
    align: 'center',
    sortable: false,
    key: 'palletName',
    minWidth: 90,
  },
  { title: t('组'), key: 'upper', align: 'center', sortable: false, minWidth: 100 },
  
])



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
    <template #item.upper="{ item }">
      {{ item.upper?.name }} + {{ item.lower?.name }}
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
