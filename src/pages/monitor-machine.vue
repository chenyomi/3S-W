<script setup>
const btnList = inject('btnList')

import monitorApi from '@/api/monitor';
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';
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
  const disabledTextColor = `rgba(${hexToRgb(String(currentTheme['on-surface']))},${variableTheme['disabled-opacity']})`
  const borderColor = `rgba(${hexToRgb(String(variableTheme['border-color']))},${variableTheme['border-opacity']})`

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: true },
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
const monitor = ref()
monitorApi.monitor().then(res => {
  monitor.value = res.data
})
onMounted(() => {
  nextTick(() => {
    btnList.value = []
  })
})
</script>

<template>
  <div class="h-100" style="overflow-y: scroll;">
    <VCard class="pt-2 pb-2">
      <h4 class="mx-3 mb-1">
        CPU：
      </h4>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3">
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bxs-pie-chart-alt" color="#7986CB" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm"> {{ $t('核心数') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.cpu.cpuNum || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bxs-right-arrow-circle" color="#9575CD" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm"> {{ $t('用户使用率') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.cpu.used && monitor?.monitorServer.cpu.used + '%' || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-recycle" color="#64B5F6" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm"> {{ $t('系统使用率') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.cpu.sys && monitor?.monitorServer.cpu.sys + "%" || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-recycle" color="#4DB6AC" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm"> {{ $t('当前空闲率') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.cpu.free && monitor?.monitorServer.cpu.free + "%" || '-' }}
            </h6>
          </div>
        </div>
      </div>
    </VCard>
    <VCard class="pt-2 pb-2 mt-3">
      <h4 class="mx-3 mb-1">
        {{ $t('内存') }}：
      </h4>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3">
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-link" color="#64B5F6" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm"> {{ $t('总内存') }}：</span>
            <h6 class="text-base font-weight-medium ">
              {{ monitor?.monitorServer.mem.total && monitor?.monitorServer.mem.total + 'G' || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-radio-circle-marked" color="#4DB6AC" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm">{{ $t('已用内存') }}：</span>
            <h6 class="text-base font-weight-medium ">
              {{ monitor?.monitorServer.mem.used && monitor?.monitorServer.mem.used + "G" || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-rotate-right" color="#4DD0E1" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm">{{ $t('剩余内存') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.mem.free && monitor?.monitorServer.mem.free + "G" || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-link" color="#AED581" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm">{{ $t('使用率') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.mem.usage && monitor?.monitorServer.mem.usage + '%' || '-' }}
            </h6>
          </div>
        </div>
      </div>
    </VCard>
    <VCard class="pt-2 pb-2 mt-3">
      <h4 class="mx-3 mb-1">
        {{ $t('服务器信息') }}：
      </h4>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3">
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-link" color="#7986CB" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm"> {{ $t('服务器名称') }}：</span>
            <h6 class="text-base font-weight-medium ">
              {{ monitor?.monitorServer.sys.computerName || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-radio-circle-marked" color="#9575CD" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm">{{ $t('操作系统') }}：</span>
            <h6 class="text-base font-weight-medium ">
              {{ monitor?.monitorServer.sys.osName || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-rotate-right" color="#AED581" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm">{{ $t('服务器IP') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.sys.computerIp || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-link" color="#FF8A65" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm">{{ $t('系统架构') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorServer.sys.osArch || '-' }}
            </h6>
          </div>
        </div>
      </div>
    </VCard>
    <VCard class="pt-2 pb-2 mt-3">
      <h4 class="mx-3 mb-1">
        {{ $t('当前设备') }}：
      </h4>
      <div class="d-flex align-center gap-y-4 flex-wrap px-3 mt-2">
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-sync" color="#64B5F6" size="38" rounded variant="tonal" />
          <div class="text-start">
            <span class="text-sm"> {{ $t('当前夹具') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorLocate.fixturePallet?.params.pallet.palletName || '无' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bxs-copy" color="#4DB6AC" size="38" rounded variant="tonal" />
          <div class="text-start">
            <span class="text-sm"> {{ $t('当前托盘') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorLocate.storagePallet?.params.pallet.palletName || '无' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-layer" color="#4DD0E1" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm"> {{ $t('当前手爪') }}：</span>
            <h6 class="text-base font-weight-medium ">
              {{ monitor?.monitorLocate.hand.handName || '-' }}
            </h6>
          </div>
        </div>
        <div class="d-flex align-center gap-3" style="width: 25%;">
          <VAvatar icon="bx-link" color="#AED581" size="38" rounded variant="tonal" />

          <div class="text-start">
            <span class="text-sm">{{ $t('手爪编号') }}：</span>
            <h6 class="text-base font-weight-medium">
              {{ monitor?.monitorLocate.hand.handCode || '-' }}
            </h6>
          </div>
        </div>
      </div>
    </VCard>
    <VCard class="pt-2 pb-2 mt-3">
      <VueApexCharts type="area" :height="150" :options="chartConfig" :series="series[currentTab]" />
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}
</style>
