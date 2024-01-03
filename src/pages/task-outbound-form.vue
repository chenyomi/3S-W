<script setup>
import { createMaterial } from '@/utils/createMaterial'
import { onMounted, onUnmounted, watch } from 'vue'

const propsData = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

let webGL = null
const density = inject('density')

const formData = ref({
  pro: '0',
  clientX: 80,
  clientY: 80,
  clientZ: 80,
  clientR: 10,
  shift: 118,
  mNum: 0,
  mName: '80*80*80 D01',
})

const proType = [
  { title: '立方体', value: '0' },
  { title: '圆柱体', value: '1' },
]

watch(() => propsData.data, newVal => {
  formData.value = Object.assign(formData.value, newVal)
  webGL.disWebGl()
  setTimeout(() => {
    webGL.updata(formData.value)
  }, 0)
})

const onChange = () => {
  webGL.disWebGl()
  setTimeout(() => {
    webGL.updata(formData.value)
  }, 0)
}

onMounted(() => {
  setTimeout(() => {
    formData.value = Object.assign(formData.value, propsData.data)
    webGL = new createMaterial()
  }, 0)
})
onUnmounted(() => {
  webGL.disWebGl()
})
</script>

<template>
  <VRow class="pt-3">
    <VCol cols="3">
      <VSelect
        v-model="formData.pro"
        :items="proType"
        :density="density"
        class="mb-2"
        label="物料形状"
        @update:model-value="onChange"
      />
      <VTextField
        v-model="formData.mName"
        label="物料名称："
        :density="density"
        class="mb-2"
      />
      <VTextField
        v-model="formData.mNum"
        label="数量"
        :density="density"
        class="mb-2"
      />
       
      <VTextField
        v-if="formData.pro === '0'"
        v-model="formData.clientX"
        label="X轴长度："
        :density="density"
        class="mb-2"
        suffix="mm"
        @update:model-value="onChange"
      />
      <VTextField
        v-if="formData.pro === '0'"
        v-model="formData.clientY"
        label="Y轴长度："
        :density="density"
        class="mb-2"
        suffix="mm"
        @update:model-value="onChange"
      />
      <VTextField
        v-if="formData.pro === '1'"
        v-model="formData.clientR"
        label="半径："
        :density="density"
        class="mb-2"
        suffix="mm"
        @update:model-value="onChange"
      />
      <VTextField
        v-model="formData.clientZ"
        label="Z轴长度："
        :density="density"
        suffix="mm"
        class="mb-2"
        @update:model-value="onChange"
      />
    </VCol>
    <VCol cols="9">
      <div
        id="box"
        class="w-100"
        style="height: 21.5rem;"
      />
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
canvas {
  background: none !important;
}
</style>
