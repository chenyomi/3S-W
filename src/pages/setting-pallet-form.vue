<script setup>
import layerboardApi from '@/api/layerboard'

const propsData = defineProps({
  data: { type: Object },
})

const density = inject('density')
const formData = ref(propsData.data)

const submit = () => {
  return new Promise(resolve => {
    layerboardApi.layerboardEdit(formData.value).finally(() => {
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
          v-model="formData.layerBoardName"
          label="托板名称："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.layerBoardCode"
          label="编号："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.layerBoardThickness"
          label="厚度："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      />
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
          v-model="formData.layerBoardLengthX"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="6">
        <VTextField
          v-model="formData.layerBoardLengthY"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
