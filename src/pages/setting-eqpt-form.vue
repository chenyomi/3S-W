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
      <VCol cols="4">
        <VTextField
          v-model="formData.name"
          label="设备名称："
          :density="density"
          class="mb-2"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="4">
        <VTextField
          v-model="formData.timer1"
          label="生产延时："
          :density="density"
          suffix="s"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.timer2"
          label="切换延时："
          :density="density"
          suffix="s"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.timer3"
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
          v-model="formData.exmx1"
          label="校准设定值："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx2"
          label="最小定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx3"
          label="最大定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.exmy1"
          label="校准设定值："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy2"
          label="最小定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy3"
          label="最大定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.exmz1"
          label="校准设定值："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmz2"
          label="最小定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmz3"
          label="最大定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
