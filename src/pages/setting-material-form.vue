<script setup>
import materialApi from '@/api/material'
import { getDict } from '@/utils/utils'
import { cloneDeep } from 'lodash'

const propsData = defineProps({
  data: { type: Object },
})

const density = inject('density')
const formData = ref(cloneDeep(propsData.data))
const types = getDict('sss_material_template_shape')


const submit = () => {
  return new Promise(resolve => { 
    materialApi.materialEdit(formData.value).finally(() => {
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
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.materialTemplateName"
          label="名称："
          :density="density"
        />
      </VCol>
     
      <VCol
        cols="6"
        class="text-center"
      >
        <VSelect
          v-model="formData.materialTemplateShape"
          :density="density"
          :items="types"
          label="形状："
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
      <VCol
        cols="4"
        class="text-center"
      >
        <VChip
          class="ma-1"
          color="#4CAF50"
        >
          Z轴方向
        </VChip>
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.materialTemplateLengthX"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.materialTemplateLengthY"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.materialTemplateLengthZ"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
