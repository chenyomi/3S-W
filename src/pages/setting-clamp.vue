<script setup>
const propsData = defineProps({
  header: { type: Object },
})

onMounted(() => {
  nextTick(() => {
    propsData.header.setHeaderData([{
      name: '保存',
      color: '#66BB6A',
      icon: 'bx-cloud-upload',
      size: 'large',
      width: 220,
      mark: '是否保存并上传更新数据？',
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading({
          text: '正在上传更新',
        })
        close()
        setTimeout(() => {
          closeLoading()
        }, 2000)
      },
    }])
  })
})
onUnmounted(() => {
  propsData.header.setHeaderData([])
})

const formData = ref({

  code: 1601,
  exmx1: 320,
  exmx2: 160,
  exmy1: 235,
  exmy2: 170,
  
})

const items = [
  { title: '夹具-1', value: '0' },
  { title: '夹具-2', value: '1' },
  { title: '夹具-3', value: '2' },
  { title: '夹具-4', value: '3' },
]

const select = ref({ title: '夹具-1', value: '0' })
import { ref } from 'vue'
</script>

<template>
  <VCard class="h-100">
    <VContainer>
      <VRow>
        <VCol
          cols="6"
          class="text-center"
        >
          <VSelect
            v-model="select"
            :items="items"
            density="comfortable"
            label="当前夹具"
          />
        </VCol>
        <VCol
          cols="6"
          class="text-center"
        >
          <VTextField
            v-model="formData.code"
            label="编号："
            density="comfortable"
          />
        </VCol>
        <VCol
          cols="6"
          class="text-center"
        >
          <VChip
            class="ma-1"
            color="#FF9800"
          >
            X轴方向
          </VChip>
        </VCol>
        <VCol
          cols="6"
          class="text-center"
        >
          <VChip
            class="ma-1"
            color="#4CAF50"
          >
            Y轴方向
          </VChip>
        </VCol>
        
        <VCol cols="6">
          <VTextField
            v-model="formData.exmx1"
            label="尺寸："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmx2"
            label="定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
        </VCol>
        <VCol cols="6">
          <VTextField
            v-model="formData.exmy1"
            label="尺寸："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmy2"
            label="定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
</template>
