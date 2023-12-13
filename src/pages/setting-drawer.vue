<script setup>
import { nextTick, onUnmounted } from 'vue'

const propsData = defineProps({
  header: { type: Object },
})

const items = [
  { title: '储位-1', value: '0' },
  { title: '储位-2', value: '1' },
  { title: '储位-3', value: '2' },
  { title: '储位-4', value: '3' },
]

const select = ref({ title: '储位-1', value: '0' })

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
  distans: 11,
  name: '128*108 1004792',
  status: true,
  exmx1: 84,
  exmx2: 9,
  exmx3: 128,
  exmx4: 148,
  exmy1: -30,
  exmy2: 4,
  exmy3: 105,
  exmy4: 118,
  raster: 118,
  shift: 118,
  
})

const tab = 'one'
</script>

<template>
  <VCard class="h-100">
    <VContainer>
      <VRow>
        <VCol cols="4">
          <VSelect
            v-model="select"
            :items="items"
            density="compact"
            label="当前储位"
          />
        </VCol>
        <VCol
          cols="4"
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
          cols="4"
          class="text-center"
        >
          <VChip
            class="ma-1"
            color="#4CAF50"
          >
            Y轴方向
          </VChip>
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.distans"
            label="安全距离"
            density="comfortable"
            class="mb-2"
            suffix="mm"
          />
          <VTextField
            v-model="formData.name"
            label="名称："
            density="comfortable"
            class="mb-2"
          />
          
          <VTextField
            v-model="formData.raster"
            label="Raster厚度："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.shift"
            label="shift："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VSwitch
            v-model="formData.status"
            color="primary"
            class="mt-6"
            label="启用/禁用"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.exmx1"
            label="原点偏移："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmx2"
            label="占位："
            density="comfortable"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmx3"
            label="占位单元尺寸："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmx4"
            label="占位单元间距："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.exmy1"
            label="原点偏移："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmy2"
            label="占位："
            density="comfortable"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmy3"
            label="占位单元尺寸："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmy4"
            label="占位单元间距："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
</template>
