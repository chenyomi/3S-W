<script setup>
import materialApi from '@/api/material'
import Modal from '@/layouts/components/modal.vue'
import { getDictObj } from '@/utils/utils'
import { useLocale } from 'vuetify'
import material3d from './setting-material-3d.vue'
import materialForm from './setting-material-form.vue'

const { t } = useLocale()
const serverItems = ref([])
const loading = ref(true)
const density = inject('density')
const expanded = ref()
const modal = ref()

let expandedArr = []
setTimeout(() => {
  loading.value = false
}, 1000)

const loadItems = () => {
  materialApi.materialList().then(res => {
    serverItems.value = res.rows

    expanded.value = res.rows[0].id
    btnList.value[1].slotData = res.rows[0]
  })
}

let type = ref()
type.value = getDictObj('sss_material_template_shape')

const btnList = inject('btnList')

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '新增',
      color: '#42A5F5',
      size: 'large',
      width: 80,
      formWidth: 800,
      slot: shallowRef(materialForm),
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
      slot: shallowRef(materialForm),
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
    minWidth: 70,
    width: 70,
  },
  {
    title: t('名称'),
    align: 'start',
    sortable: false,
    key: 'materialTemplateName',
    minWidth: 90,
  },
  { title: t('形状'), key: 'materialTemplateShape', align: 'center', sortable: false, minWidth: 90 },
  { title: t('尺寸') + '（X-Y-Z）', key: 'materialTemplateLengthX', align: 'center', sortable: false, minWidth: 90 },

])

const openModal = () => {
  modal.value.open({
    formWidth: 600,
    hideDiaName: true,
    hideDiaOk: true,
    hideDiaCancel: true,
    slot: shallowRef(material3d),
    slotData: serverItems.value.filter(c => c.id == expanded.value)[0],
    fn: ({ close, openLoading, closeLoading, diaFormRef }) => {

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
    <template #item.materialTemplateShape="{ item }">
      {{ type[item.materialTemplateShape] }}
    </template>
    <template #item.materialTemplateLengthX="{ item }">
      {{ item.materialTemplateLengthX }}-{{ item.materialTemplateLengthY }}-{{ item.materialTemplateLengthZ }}
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
