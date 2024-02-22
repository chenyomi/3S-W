<script setup>
import taskApi from '@/api/task';
const propsData = defineProps({
  data: { type: Object },
})

const density = inject('density')
const formData = ref(propsData.data)

const submit = () => {
  return new Promise(resolve => {
    taskApi.taskSplit({
      groupId: formData.value.groupId,
      number: formData.value.num
    })
      .then((res) => {
        resolve(res)
      })
  })
}

defineExpose({
  submit,
})
</script>

<template>
  <VContainer>
    <h4 class="mb-4">
      {{ $t('拆分') }}
    </h4>
    <VTextField v-model="formData.num" :label="$t('数量')" :density="density" type="number" />
  </VContainer>
</template>
