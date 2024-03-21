<script setup>
import drawerApi from '@/api/drawer'
import Modal from '@/layouts/components/modal.vue'
import { inject, nextTick, ref } from 'vue'
import { useLocale } from 'vuetify'
import drawerForm from './setting-drawer-form.vue'
import drawerSvg from './setting-drawer-svg.vue'

const { t } = useLocale()

const density = inject('density')
const serverItems = ref([])
const loading = ref(true)
const expanded = ref()
let expandedArr = []
const modal = ref()

setTimeout(() => {
  loading.value = false
}, 1000)

const loadItems = () => {
  drawerApi.drawerList().then(res => {
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
      slot: shallowRef(drawerForm),
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
      slot: shallowRef(drawerForm),
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
    minWidth: 70,
  },
  {
    title: t('名称'),
    align: 'start',
    sortable: false,
    key: 'trawlBoardName',
    minWidth: 120,
  },
  { title: t('安全距离'), key: 'trawlBoardSafeDistance', align: 'center', sortable: false, minWidth: 90 },
  { title: t('厚度'), key: 'trawlBoardThickness', align: 'center', sortable: false, minWidth: 60 },
  { title: t('板') + '（X-Y）', key: 'trawlBoardLengthX', align: 'center', sortable: false, minWidth: 100 },
  { title: t('原点偏移') + '（X-Y）', key: 'trawlBoardOffsetX', align: 'center', sortable: false, minWidth: 130 },
  { title: t('占位') + '（X-Y）', key: 'trawlBoardSiteX', align: 'center', sortable: false, minWidth: 120 },
  { title: t('占位单元尺寸') + '（X-Y）', key: 'trawlBoardSiteLengthX', align: 'center', sortable: false, minWidth: 160 },
  { title: t('占位单元间距') + '（X-Y）', key: 'trawlBoardSiteSpaceX', align: 'center', sortable: false, minWidth: 160 },
])

const openModal = () => {
  modal.value.open({
    formWidth: 854,
    hideDiaName: true,
    hideDiaOk: true,
    hideDiaCancel: true,
    slot: shallowRef(drawerSvg),
    slotData: serverItems.value.filter(c => c.id == expanded.value)[0],
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
  })
}
</script>

<template>
  <VDataTableVirtual fixed-header :headers="headers" :items="serverItems" :loading="loading" loading-text="" hover
    height="calc(100vh - 230px)" expand-on-click :density="density" @update:options="loadItems" @update:expanded="(newVal) => {
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
    <template #item.trawlBoardLengthX="{ item }">
      {{ item.trawlBoardLengthX }}-{{ item.trawlBoardLengthY }}
    </template>
    <template #item.trawlBoardOffsetX="{ item }">
      {{ item.trawlBoardOffsetX }}-{{ item.trawlBoardOffsetY }}
    </template>
    <template #item.trawlBoardSiteX="{ item }">
      {{ item.trawlBoardSiteX }}-{{ item.trawlBoardSiteY }}
    </template>
    <template #item.trawlBoardSiteLengthX="{ item }">
      {{ item.trawlBoardSiteLengthX }}-{{ item.trawlBoardSiteLengthY }}
    </template>
    <template #item.trawlBoardSiteSpaceX="{ item }">
      {{ item.trawlBoardSiteSpaceX }}-{{ item.trawlBoardSiteSpaceY }}
    </template>
    <template #loading />
    <template #bottom>
      <div style="text-align: end;">
        <VBtn class="ma-2 w-25" @click="openModal">
          {{ $t('预览') }}
        </VBtn>
      </div>
    </template>
  </VDataTableVirtual>
  <Modal ref="modal" />
</template>
