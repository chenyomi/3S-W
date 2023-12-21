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


const items = [
  { title: '停用', value: false },
  { title: '启用', value: true },
]

defineExpose({
  submit,
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="4" />
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
          label="安全距离："
          :density="density"
          class="mb-2"
          suffix="mm"
        />
        <VTextField
          v-model="formData.name"
          label="网板名称："
          :density="density"
          class="mb-2"
        />
          
        <VTextField
          v-model="formData.raster"
          label="厚度："
          :density="density"
          suffix="mm"
          class="mb-4"
        />
        <VSelect
          v-model="formData.status"
          :density="density"
          :items="items"
          label="是否开启"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.exmx0"
          label="板："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx1"
          label="原点偏移："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx2"
          label="占位："
          :density="density"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx3"
          label="单元尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx4"
          label="单元间距："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.exmy0"
          label="板："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy1"
          label="原点偏移："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy2"
          label="占位："
          :density="density"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy3"
          label="单元尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy4"
          label="单元间距："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
