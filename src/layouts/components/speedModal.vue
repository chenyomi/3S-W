<template>
  <div class="px-4 pt-8 pb-12">
    <v-slider :ticks="tickLabels" :max="100" :min="0" v-model="speed" step="10" show-ticks="always"
      tick-size="4"></v-slider>
  </div>
</template>

<script setup>
import grpcApi from '@/api/grpc';
const propsData = defineProps({
  data: { type: Number },
})
const tickLabels = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  60: '60',
  70: '70',
  80: '80',
  90: '90',
  100: '100'
}
const speed = ref(propsData.data)

const submit = () => {
  return new Promise(resolve => {
    grpcApi.setSpeed({ speed: speed.value }).then(() => {
      resolve(speed.value)
    })
  })
}

defineExpose({
  submit,
})
</script>
