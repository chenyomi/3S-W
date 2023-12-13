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
  timer1: 600,
  timer2: 600,
  timer3: 10,
  exmx1: 0,
  exmx2: 0,
  exmx3: 0,
  exmy1: 0,
  exmy2: 0,
  exmy3: 0,
  exmz1: 0,
  exmz2: 0,
  exmz3: 0,
})
</script>

<template>
  <VCard class="h-100">
    <VContainer>
      <VRow>
        <VCol cols="4">
          <VTextField
            v-model="formData.timer1"
            label="生产延时："
            density="comfortable"
            suffix="s"
            class="mb-2"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.timer2"
            label="切换延时："
            density="comfortable"
            suffix="s"
            class="mb-2"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.timer3"
            label="启动延时："
            density="comfortable"
            suffix="s"
            class="mb-2"
          />
        </VCol>
      </VRow>
      <VRow>
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
        <VCol
          cols="4"
          class="text-center"
        >
          <VChip
            class="ma-1"
            color="#2196F3"
          >
            Z轴方向
          </VChip>
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.exmx1"
            label="校准设定值："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmx2"
            label="最小定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmx3"
            label="最大定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.exmy1"
            label="校准设定值："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmy2"
            label="最小定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmy3"
            label="最大定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
        </VCol>
        <VCol cols="4">
          <VTextField
            v-model="formData.exmz1"
            label="校准设定值："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmz2"
            label="最小定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
          <VTextField
            v-model="formData.exmz3"
            label="最大定位："
            density="comfortable"
            suffix="mm"
            class="mb-2"
          />
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
</template>
