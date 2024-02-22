<script setup>
import gripApi from '@/api/grip'
import { getDictObj } from '@/utils/utils'
import { useLocale } from 'vuetify'
import gripperForm from './setting-gripper-form.vue'

const density = inject('density')
const expanded = ref()
let expandedArr = []
const { t } = useLocale()
const types = getDictObj('sss_hand_type')

setTimeout(() => {
  loading.value = false
}, 1000)

const loadItems = () => {
  gripApi.handList().then(res => {
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
      slot: shallowRef(gripperForm),  
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
      slot: shallowRef(gripperForm), 
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


const headers = ref([
  {
    align: 'start',
    sortable: false,
    key: 'exclusive',
    fixed: true,
    width: 70,
  },
  {
    title: t('名称'),
    align: 'start',
    sortable: false,
    key: 'handName',
    minWidth: 90,
  },
  { title: t('编号'), key: 'handCode', align: 'center', sortable: false, minWidth: 90 },
  { title: t('类型'), key: 'handType', align: 'center', sortable: false, minWidth: 90 },
  { title: t('指数量'), key: 'fingerNumber', align: 'center', sortable: false, minWidth: 90 },
  { title: t('指长'), key: 'fingerLength', align: 'center', sortable: false, minWidth: 90 },
  { title: t('指宽'), key: 'fingerWidth', align: 'center', sortable: false, minWidth: 90 },
  { title: t('夹深'), key: 'fingerDepth', align: 'center', sortable: false, minWidth: 90 },
  { title: t('尺寸') + '（X-Y）', key: 'handSizeX', align: 'center', sortable: false, minWidth: 90 },
  { title: t('定位') + '（X-Y）', key: 'handLocateX', align: 'center', sortable: false, minWidth: 90 },
  
])

const serverItems = ref([])
const loading = ref(true)
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
    <template #item.handType="{ item }">
      {{ types[item.handType] }}
    </template>
    <template #item.handSizeX="{ item }">
      {{ item.handSizeX }}-{{ item.handSizeY }}
    </template>
    <template #item.handLocateX="{ item }">
      {{ item.handLocateX }}-{{ item.handLocateY }}
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
