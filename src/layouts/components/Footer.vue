<script setup>
import { inject, onMounted, onUnmounted } from 'vue';
const text = ref('')
const point = ref('')
let timer = null

clearInterval(timer)
timer = setInterval(() => {
  if (point.value.length < 6) {
    point.value += ' .'
  } else {
    point.value = ''
  }
}, 500)
const socket = inject('socket')
onMounted(() => {
  socket.addSubscribe('sss/task')
  socket.onChange = (topic, msg) => {
    if (topic == 'sss/task') {
      text.value = msg.poolInfo
    }
  }
})
onUnmounted(() => {
  socket.removeSubscribe('sss/task')
})
</script>

<template>
  <VCard class="d-flex h-100 align-center position-relative" link>
    <div class="d-flex align-center cursor-pointer gap-3" style="user-select: none;">
      <VProgressLinear model-value="100" class="w-100" style="position: absolute;" height="8" striped />
      <IconBtn class="ms-2" to="/worklog">
        <VAvatar color="rgb(var(--v-theme-background))" icon="bx-bell" />
      </IconBtn>
      <h5>
        {{ text }} {{ text && point }}
      </h5>
    </div>
  </VCard>
</template>
