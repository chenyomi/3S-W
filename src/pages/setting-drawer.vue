<script setup>
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

let desserts = [
  {
    id: 1,
    distans: 8,
    name: '800*400 1004792',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 8,
    exmx3: 83,
    exmx4: 10,
    exmy1: 20,
    exmy2: 4,
    exmy3: 83,
    exmy4: 10,
    raster: 3,
  },
  {
    id: 2,
    distans: 8,
    name: '800*400 1004792',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
  },
  {
    id: 3,
    distans: 8,
    name: '800*400 1004792',
    status: true,
    type: 1,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
  },
  {
    id: 4,
    distans: 8,
    name: '800*400 1004792',
    status: true,
    type: 1,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 8,
    exmx3: 83,
    exmx4: 10,
    exmy1: 20,
    exmy2: 4,
    exmy3: 83,
    exmy4: 10,
    raster: 3,
  },
  {
    id: 5,
    distans: 8,
    name: '800*400 1004792',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
  },
  {
    id: 6,
    distans: 8,
    name: '800*400 1004792',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
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
      slot: shallowRef(drawerForm),  
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
      slot: shallowRef(drawerForm), 
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
    minWidth: 70,
  },
  {
    title: t('名称'),
    align: 'start',
    sortable: false,
    key: 'name',
    minWidth: 180,
  },
  { title: t('安全距离'), key: 'distans', align: 'center', sortable: false, minWidth: 90 },
  { title: t('厚度'), key: 'raster', align: 'center', sortable: false, minWidth: 60 },
  { title: t('板') + '（X-Y）', key: 'exmx0', align: 'center', sortable: false, minWidth: 90 },
  { title: t('原点偏移') + '（X-Y）', key: 'exmx1', align: 'center', sortable: false, minWidth: 130 },
  { title: t('占位') + '（X-Y）', key: 'exmx2', align: 'center', sortable: false, minWidth: 110 },
  { title: t('占位单元尺寸') + '（X-Y）', key: 'exmx3', align: 'center', sortable: false, minWidth: 160 },
  { title: t('占位单元间距') + '（X-Y）', key: 'exmx4', align: 'center', sortable: false, minWidth: 160 },
])


function loadItems ({ page, itemsPerPage, sortBy }) {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    loading.value = false
    expanded.value = items[0].id
    btnList.value[1].slotData = serverItems.value.filter(c => c.id == items[0].id)[0]
  })
}


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
  <VDataTableVirtual
    fixed-header
    :headers="headers"
    :items="serverItems"
    :loading="loading"
    loading-text=""
    hover
    height="calc(100vh - 230px)"
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
    <template #item.exmx0="{ item }">
      {{ item.exmx0 }}-{{ item.exmy0 }}
    </template>
    <template #item.exmx1="{ item }">
      {{ item.exmx1 }}-{{ item.exmy1 }}
    </template>
    <template #item.exmx2="{ item }">
      {{ item.exmx2 }}-{{ item.exmy2 }}
    </template>
    <template #item.exmx3="{ item }">
      {{ item.exmx3 }}-{{ item.exmy3 }}
    </template>
    <template #item.exmx4="{ item }">
      {{ item.exmx4 }}-{{ item.exmy4 }}
    </template>
    <template #loading />
    <template #bottom>
      <div style="text-align: end;">
        <VBtn
          class="ma-2 w-25"
          @click="openModal"
        >
          {{ $t('预览') }}
        </VBtn>
      </div>
    </template>
  </VDataTableVirtual>
  <Modal ref="modal" />
</template>
