<script setup>
import layerboardApi from '@/api/layerboard';
import { useLocale } from 'vuetify';
import palletForm from './setting-pallet-form.vue';

const density = inject('density')
const expanded = ref()
const serverItems = ref([])
const loading = ref(true)
let expandedArr = []
setTimeout(() => {
  loading.value = false
}, 1000)

const loadItems = () => {
  layerboardApi.layerboardList().then(res => {
    serverItems.value = res.rows

    expanded.value = res.rows[0].id
    btnList.value[1].slotData = res.rows[0]
  })
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
            loadItems()
            closeLoading()
          }, 2000)
        })
      },
    }, {
      name: '编辑',
      color: '#00ACC1',
      size: 'large',
      width: 150,
      formWidth: 800,
      slot: shallowRef(palletForm),
      fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
        openLoading({
          text: '正在上传更新',
        })
        diaFormRef.submit().finally(() => {
          close()
          setTimeout(() => {
            loadItems()
            closeLoading()
          }, 2000)
        })
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
    width: 70,
  },
  {
    title: t('名称'),
    align: 'start',
    sortable: false,
    key: 'layerBoardName',
    minWidth: 90,
  },
  { title: t('编号'), key: 'layerBoardCode', align: 'center', sortable: false, minWidth: 90 },
  { title: t('厚度'), key: 'layerBoardThickness', align: 'center', sortable: false, minWidth: 90 },
  { title: t('尺寸') + '（X-Y）', key: 'layerBoardLengthX', align: 'center', sortable: false, minWidth: 90 },

])
</script>

<template>
  <VDataTableVirtual fixed-header :headers="headers" :items="serverItems" :loading="loading" loading-text="" hover
    height="calc(100vh - 175px)" expand-on-click :density="density" @update:options="loadItems" @update:expanded="(newVal) => {
      newVal.map(e => {
        if (!expandedArr.includes(e)) {
          expanded = e
          btnList[1].slotData = serverItems.filter(c => c.id == e)[0]
        }
      })
      expandedArr.map(e => {
        if (!newVal.includes(e)) {
          expanded = e
          btnList[1].slotData = serverItems.filter(c => c.id == e)[0]
        }
      })
      expandedArr = newVal
    }">
    <template #item.exclusive="{ item }">
      <VCheckbox :model-value="item.id == expanded" readonly />
    </template>
    <template #item.layerBoardLengthX="{ item }">
      {{ item.layerBoardLengthX }}-{{ item.layerBoardLengthY }}
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
