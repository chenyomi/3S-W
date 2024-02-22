<script setup>
import fixtureApi from '@/api/fixture'
import { getDictObj } from '@/utils/utils'
import { useLocale } from 'vuetify'
import clampForm from './setting-clamp-form.vue'

const density = inject('density')
const expanded = ref()
let expandedArr = []
const { t } = useLocale()
const serverItems = ref([])
const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 1000)

const loadItems = () => {
  fixtureApi.fixtureList().then(res => {
    serverItems.value = res.rows

    expanded.value = res.rows[0].id
    btnList.value[1].slotData = res.rows[0]
  })
}

let type = ref()
type.value = getDictObj('sss_fixture_type')

const btnList = inject('btnList')

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '新增',
      color: '#42A5F5',
      size: 'large',
      width: 80,
      formWidth: 800,
      slot: shallowRef(clampForm),  
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
      slot: shallowRef(clampForm), 
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
    key: 'fixtureName',
    minWidth: 90,
  },
  { title: t('编号'), key: 'fixtureCode', align: 'center', sortable: false, minWidth: 90 },
  { title: t('类型'), key: 'fixtureType', align: 'center', sortable: false, minWidth: 90 },
  { title: t('钳高'), key: 'fixtureTongsHeight', align: 'center', sortable: false, minWidth: 90 },
  { title: t('夹深'), key: 'fixtureDepth', align: 'center', sortable: false, minWidth: 90 },
  { title: t('尺寸') + '（X-Y）', key: 'fixtureSizeX', align: 'center', sortable: false, minWidth: 90 },
  { title: t('定位') + '（X-Y）', key: 'fixtureLocateX', align: 'center', sortable: false, minWidth: 90 },
  
])
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
    <template #item.fixtureType="{ item }">
      {{ type[item.fixtureType] }}
    </template>
    <template #item.fixtureSizeX="{ item }">
      {{ item.fixtureSizeX }}-{{ item.fixtureSizeY }}
    </template>
    <template #item.fixtureLocateX="{ item }">
      {{ item.fixtureLocateX }}-{{ item.fixtureLocateY }}
    </template>
    <template #loading />
  </VDataTableVirtual>
</template>
