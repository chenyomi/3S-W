<script setup>
import device from '@/api/device';
import { useLocale } from 'vuetify';
import eqptForm from './setting-eqpt-form.vue';

const { t } = useLocale()

const density = inject('density')
const expanded = ref()
let expandedArr = []
const loading = ref(true)
const btnList = inject('btnList')
const serverItems = ref()


const loadItems = () => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
  device.deviceList().then(res => {

    serverItems.value = res.rows

    expanded.value = res.rows[0].id
    btnList.value[1].slotData = res.rows[0]
  })
}

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
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
            loadItems()
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
            loadItems()
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

const headers = ref([
  {
    align: 'start',
    sortable: false,
    key: 'exclusive',
    fixed: true,
    width: 70,
    minWidth: 70,
  },
  {
    title: t('名称'),
    align: 'start',
    sortable: false,
    key: 'machineryName',
    minWidth: 120,
  },
  { title: t('生产延时'), key: 'machineryProductionDelay', align: 'center', sortable: false, minWidth: 90 },
  { title: t('切换延时'), key: 'machinerySwitchDelay', align: 'center', sortable: false, minWidth: 90 },
  { title: t('启动延时'), key: 'machineryStartDelay', align: 'center', sortable: false, minWidth: 90 },
  { title: t('校准设定值') + '（X-Y-Z）', key: 'machineryCalibrateX', align: 'center', sortable: false, minWidth: 160 },
  { title: t('最小定位') + '（X-Y-Z）', key: 'machineryMinX', align: 'center', sortable: false, minWidth: 140 },
  { title: t('最大定位') + '（X-Y-Z）', key: 'machineryMaxX', align: 'center', sortable: false, minWidth: 140 },
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
    <template #item.machineryCalibrateX="{ item }">
      {{ item.machineryCalibrateX }}-{{ item.machineryCalibrateY }}-{{ item.machineryCalibrateZ }}
    </template>
    <template #item.machineryMinX="{ item }">
      {{ item.machineryMinX }}-{{ item.machineryMinY }}-{{ item.machineryMinZ }}
    </template>
    <template #item.machineryMaxX="{ item }">
      {{ item.machineryMaxX }}-{{ item.machineryMaxY }}-{{ item.machineryMaxZ }}
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
