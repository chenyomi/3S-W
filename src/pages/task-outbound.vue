<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import OutboundForm from './task-outbound-form.vue'

const { mdAndDown } = useDisplay()
const route = useRoute()
const router = useRouter()

const color =  {
  0: {
    color: '#435b63',
    name: '空',
  },
  1: {
    color: '#00796B',
    name: '少量',
  },
  2: {
    color: '#FF8F00',
    name: '快满',
  },
  3: {
    color: '#B71C1C',
    name: '已满',
  },
}

let num = 0
if (route.query.type == '0' && route.query.process == 'in') num = 3
if (route.query.type == '0' && route.query.process !== 'in') num = 5
if (route.query.type == '1' && route.query.process == 'in') num = 5
if (route.query.type == '1' && route.query.process !== 'in') num =35

const box = ref(new Array(num))


const btnList = inject('btnList')
const snackbar = ref(false)
const snackbarData = ref({})
const timer = ref(null)

const showDetail = item => {
  snackbarData.value = item
  select.value = item.index
  snackbar.value = true
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    snackbar.value = false
  }, 3000)
}

const select = ref(null)

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '完成',
      color: '#D32F2F',
      icon: 'bxs-zap',
      size: 'large',
      width: 220,
      mark: '是否创建',
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading({
          text: '保存中',
        })
        close()
        setTimeout(() => {
          closeLoading()
          router.push({ path: '/tasklist' })
        }, 1000)
      },
    }]
  })
})
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <VCard
      class="pt-2 pb-2 d-flex flex-column"
      style="flex: 1;"
    >
      <h4 class="mx-3 px-3 mb-2 d-flex justify-space-between align-center">
        <div>
          <span style="display: inline-block;vertical-align: middle;"> {{ route.query.type == '0'?'料箱':'料盘' }}：</span>
          <VChip
            color="#4CAF50"
            class="mx-3 justify-center"
            style="width: 8.125rem;"
          >
            {{ snackbarData.name || '未选择' }}
          </VChip>
        </div>
        <div class="d-flex align-center">
          <template
            v-for="[key, e] of Object.entries(color)"
            :key="key"
          >
            <div :style="`width: 1.2rem;height: 1.2rem;background: ${e.color};border-radius: 0.1875rem;margin-left: 1.25rem;margin-right: 0.5rem`" />
            <div style="font-size: 0.75rem;">
              {{ e.name }}
            </div>
          </template>
        </div>
        <VDialog
          v-if="mdAndDown"
          width="800"
        >
          <template #activator="{ props }">
            <VBtn
              color="primary"
              v-bind="props"
              variant="tonal"
            >
              <VIcon icon="bxs-cube-alt" />
            </VBtn>
          </template>
          <VCard>
            <VCardText>
              <OutboundForm :data="snackbarData" />
            </VCardText>
          </VCard>
        </VDialog>
      </h4>
      <VDivider />
      <div
        class="d-flex px-4 pt-5 pb-4 flex-wrap gap-3 text-center"
        style="flex: 1;overflow-y: scroll;"
      >
        <div
          v-for="(item, index) in box"
          :key="item"
          style="position: relative;overflow: hidden;width: 70px;height: 70px;border-radius: 6px;color: #fff;font-size: 12px;"
          :style="{
            background: color[index % 8 == 0? 1: 0].color,
            border: select == index ? '2px solid #FF80AB' : '2px solid rgb(var(--v-theme-surface))'
          }"
          @click="showDetail({
            name: (index + 1) + (route.query.type == '0' ? '号料箱' : '号料盘'),
            code: index + 1,
            mNum: route.query.type == '0' ? 0 : 10,
            num: 32,
            mName: '80*80*80 物料A' + '-' + (index + 1),
            pro: index%2 ==0 ?'0': '1',
            status: 0,
            clientX: 80,
            clientY: 80,
            clientZ: 80,
            clientR: 10,
            shift: 118,
            index: index
          })"
        >
          <VIcon
            :icon="route.query.type == '0' ? 'bx-archive': 'bx-selection'"
            color="#bdbdbd"
            size="30"
            class="mt-3"
          />
          <div
            class="position-absolute text-center w-100"
            style="bottom: 0;left: 0;background: rgba(33, 33, 33, 70%);"
          >
            0{{ index + 1 }}
          </div>
        </div>
      </div>
      <VTooltip
        v-model="snackbar"
        activator="parent"
        location="top"
        :open-on-hover="false"
      >
        <span class="pt-2">
          {{ snackbarData.name }}
        </span>
      </VTooltip>
    </VCard>
    <VCard
      v-if="!mdAndDown"
      class="mt-3 pt-2 pb-2"
    >
      <div class="px-6">
        <OutboundForm :data="snackbarData" />
      </div>
    </VCard>
  </div>
</template>

