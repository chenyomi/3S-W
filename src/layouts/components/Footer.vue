<script setup>
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
</script>

<template>
  <VCard
    class="d-flex h-100 align-center position-relative"
    link
  >
    <div
      class="d-flex align-center cursor-pointer gap-3"
      style="user-select: none;"
    >
      <VProgressLinear
        model-value="100"
        class="w-100"
        style="position: absolute;"
        height="8"
        striped
      />
      <IconBtn
        class="ms-2"
        to="/worklog"
      >
        <VAvatar
          color="rgb(var(--v-theme-background))"
          icon="bx-bell"
        />
      </IconBtn>
      <h5>
        [加工] [2/5] WELLLIH 3S-W | 90*90*90 - PL01 - J02 - 1 (执行中){{ point }}
      </h5>
    </div>
  </VCard>
</template>
