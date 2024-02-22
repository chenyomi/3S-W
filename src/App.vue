<script setup>

// import { startFir } from '@/utils/fireworks';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';
const { global } = useTheme()
// onMounted(() => {
//   startFir()
// })
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
  </VApp>
  <!-- <canvas id="fireworksCanvas" style="position: fixed;z-index: 9999;top: 0;left: 0;width: 100%;height: 100%;"></canvas> -->
</template>
