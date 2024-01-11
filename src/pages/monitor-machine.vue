<script setup>
const btnList = inject('btnList')

import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const series = {
  income: [{
    data: [
      24,
      21,
      30,
      22,
      42,
      26,
      35,
      29,
    ],
  }],
  expenses: [{
    data: [
      24,
      21,
      30,
      25,
      42,
      26,
      35,
      29,
    ],
  }],
  profit: [{
    data: [
      24,
      21,
      30,
      22,
      42,
      26,
      35,
      35,
    ],
  }],
}

const currentTab = ref('income')


const chartConfig = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`
  
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    grid: {
      strokeDashArray: 4.5,
      borderColor,
      padding: {
        left: 0,
        top: -20,
        right: 11,
        bottom: 7,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.25,
        opacityFrom: 0.5,
        stops: [
          0,
          95,
          100,
        ],
        shadeIntensity: 0.6,
        colorStops: [[
          {
            offset: 0,
            opacity: 0.4,
            color: currentTheme.primary,
          },
          {
            offset: 100,
            opacity: 0.2,
            color: currentTheme.surface,
          },
        ]],
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: currentTheme.primary,
      },
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [
        '',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
      ],
      labels: {
        style: {
          fontSize: '14px',
          colors: disabledTextColor,
          fontFamily: 'Public Sans',
        },
      },
    },
    yaxis: {
      min: 10,
      max: 50,
      show: false,
      tickAmount: 4,
    },
    markers: {
      size: 8,
      strokeWidth: 6,
      strokeOpacity: 1,
      hover: { size: 8 },
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [{
        size: 8,
        seriesIndex: 0,
        fillColor: '#fff',
        strokeColor: currentTheme.primary,
        dataPointIndex: series[currentTab.value][0].data.length - 1,
      }],
    },
  }
})

onMounted(() => {
  nextTick(() => {
    btnList.value = []
  })
})
</script>

<template>
  <div
    class="h-100"
    style="overflow-y: scroll;"
  >
    <VCard class="pt-2 pb-2">
      <h4 class="mx-3 mb-1">
        {{ $t('设备') }}：
      </h4>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3">
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bxs-pie-chart-alt"
            color="#7986CB"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm"> {{ $t('状态') }}：</span>
            <h6 class="text-base font-weight-medium">
              INAKTIV
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bxs-right-arrow-circle"
            color="#9575CD"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm"> {{ $t('出口状态') }}：</span>
            <h6 class="text-base font-weight-medium">
              IDLE
            </h6>
          </div>
        </div>
      </div>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3 mt-2">
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-recycle"
            color="#64B5F6"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm"> {{ $t('循环时间') }}：</span>
            <h6 class="text-base font-weight-medium">
              0:30:00
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-recycle"
            color="#4DB6AC"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm"> {{ $t('处理时间') }}：</span>
            <h6 class="text-base font-weight-medium">
              0:30:00
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-recycle"
            color="#4DD0E1"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm"> {{ $t('编辑时间') }}：</span>
            <h6 class="text-base font-weight-medium">
              0:30:00
            </h6>
          </div>
        </div>
      </div>
    </VCard>
    <VCard class="pt-2 pb-2 mt-3">
      <h4 class="mx-3 mb-1">
        {{ $t('连接') }}：
      </h4>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3">
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-link"
            color="#7986CB"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm"> {{ $t('在线') }}：</span>
            <h6
              class="text-base font-weight-medium "
              style="color: #43a047;"
            >
              ok
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-radio-circle-marked"
            color="#9575CD"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm">Ping：</span>
            <h6
              class="text-base font-weight-medium "
              style="color: #43a047;"
            >
              ok
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-rotate-right"
            color="#AED581"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm">{{ $t('NC准备') }}：</span>
            <h6 class="text-base font-weight-medium">
              -
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-link"
            color="#FF8A65"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm">{{ $t('连接') }}：</span>
            <h6 class="text-base font-weight-medium">
              -
            </h6>
          </div>
        </div>
      </div>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3 mt-2">
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-sync"
            color="#64B5F6"
            size="38"
            rounded
            variant="tonal"
          />
          <div class="text-start">
            <span class="text-sm"> {{ $t('循环中') }}：</span>
            <h6 class="text-base font-weight-medium">
              -
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bxs-copy"
            color="#4DB6AC"
            size="38"
            rounded
            variant="tonal"
          />
          <div class="text-start">
            <span class="text-sm"> {{ $t('准备加载') }}：</span>
            <h6 class="text-base font-weight-medium">
              -
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-layer"
            color="#4DD0E1"
            size="38"
            rounded
            variant="tonal"
          />

          <div class="text-start">
            <span class="text-sm"> {{ $t('程序') }}：</span>
            <h6
              class="text-base font-weight-medium "
              style="color: #43a047;"
            >
              ok
            </h6>
          </div>
        </div>
        <div
          class="d-flex align-center gap-3"
          style="width: 25%;"
        >
          <VAvatar
            icon="bx-target-lock"
            color="#AED581"
            size="38"
            rounded
            variant="tonal"
          />
          <div class="text-start">
            <span class="text-sm"> M59：</span>
            <h6
              class="text-base font-weight-medium "
              style="color: #43a047;"
            >
              ok
            </h6>
          </div>
        </div>
      </div>
    </VCard>
    <VCard class="pt-2 pb-2 mt-3">
      <VueApexCharts
        type="area"
        :height="241"
        :options="chartConfig"
        :series="series[currentTab]"
      />
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}
</style>
