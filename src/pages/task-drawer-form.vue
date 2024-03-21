<script setup>
import { getDict } from '@/utils/utils';

const density = inject('density')

const formData = ref({
  materialTemplateShape: 0,
  materialTemplateLengthX: null,
  materialTemplateLengthY: null,
  materialTemplateLengthZ: null,
  materialNumber: null,
  materialName: '',
})


const proType = getDict('sss_material_template_shape')

const onChange = () => {
}


const submit = () => {
  return new Promise(resolve => {
    resolve(formData.value)
  })
}

defineExpose({
  submit
})
</script>
<template>
  <div class="px-5 pt-7 pb-5">
    <VSelect v-model="formData.materialTemplateShape" :items="proType" :density="density" class="mb-2" label="物料形状"
      @update:model-value="onChange" />
    <VTextField v-model="formData.materialName" label="物料名称：" :density="density" class="mb-2" />


    <VTextField v-if="formData.materialTemplateShape === 0" v-model="formData.materialTemplateLengthX" label="X轴长度："
      :density="density" class="mb-2" suffix="mm" @update:model-value="onChange" type="number" />
    <VTextField v-if="formData.materialTemplateShape === 0" v-model="formData.materialTemplateLengthY" label="Y轴长度："
      :density="density" class="mb-2" suffix="mm" @update:model-value="onChange" type="number" />
    <VTextField v-if="formData.materialTemplateShape === 1" v-model="formData.materialTemplateLengthX" label="半径："
      :density="density" class="mb-2" suffix="mm" @update:model-value="onChange" type="number" />
    <VTextField v-model="formData.materialTemplateLengthZ" label="Z轴长度：" :density="density" suffix="mm" class="mb-2"
      @update:model-value="onChange" type="number" />
    <VTextField v-model="formData.materialNumber" label="数量" :density="density" class="mb-2" type="number" />
  </div>
</template>

<style lang="scss" scoped>
canvas {
  background: none !important;
}
</style>
