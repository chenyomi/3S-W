<script setup>
const propsData = defineProps({
  data: { type: Object },
})

const density = inject('density')

const formData = ref(propsData.data)

const submit = () => {
  return new Promise(resolve => {
    resolve()
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
          v-model="formData.name"
          label="名称："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.code"
          label="编号："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.type"
          label="类型："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.gnum"
          label="指数量："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.glength"
          label="指长："
          :density="density"
        />
      </VCol>
      
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.gwidth"
          label="指宽："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.deep"
          label="夹深："
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
          v-model="formData.exmx1"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx2"
          label="定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="6">
        <VTextField
          v-model="formData.exmy1"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy2"
          label="定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
