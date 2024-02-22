<script setup>
import deviceApi from '@/api/device'
import { cloneDeep } from 'lodash'

const propsData = defineProps({
  data: { type: Object },
})

const density = inject('density')
const formData = ref(cloneDeep(propsData.data))

const submit = () => {
  return new Promise(resolve => {
    deviceApi.deviceEdit(formData.value).finally(() => {
      resolve()
    })
  })
}

defineExpose({
  submit,
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="4">
        <VTextField
          v-model="formData.machineryName"
          label="设备名称："
          :density="density"
          class="mb-2"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="4">
        <VTextField
          v-model="formData.machineryProductionDelay"
          label="生产延时："
          :density="density"
          suffix="s"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.machinerySwitchDelay"
          label="切换延时："
          :density="density"
          suffix="s"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.machineryStartDelay"
          label="启动延时："
          :density="density"
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
          v-model="formData.machineryCalibrateX"
          label="校准设定值："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.machineryMinX"
          label="最小定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.machineryMaxX"
          label="最大定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.machineryCalibrateY"
          label="校准设定值："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.machineryMinY"
          label="最小定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.machineryMaxY"
          label="最大定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.machineryCalibrateZ"
          label="校准设定值："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.machineryMinZ"
          label="最小定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.machineryMaxZ"
          label="最大定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
