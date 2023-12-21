<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  header: { type: Object },
})

const route = useRoute()
const router = useRouter()

const color =  {
  0: '#435b63', // 空储位
  1: '#0059ff', // 毛坯
}

const box = ref(new Array(30))


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
  <div
    class="h-100"
    style="overflow-y: scroll;"
  >
    <VCard class="pt-2 pb-2">
      <h4 class="mx-3 mb-1 px-3">
        {{ route.query.type == '0'?'料箱':'料盘' }}：
      </h4>
      <VDivider />
      <div class="d-flex px-4 pt-5 pb-4 flex-wrap gap-3 text-center">
        <div
          v-for="(item, index) in box"
          :key="item"
          style="position: relative;overflow: hidden;width: 70px;height: 70px;border-radius: 6px;color: #fff;font-size: 12px;"
          :style="{
            background: color[index % 8 == 0? 1: 0],
            border: select == index ? '2px solid #FF80AB' : '2px solid rgb(var(--v-theme-surface))'
          }"
          @click="showDetail({
            name: (index + 1) + (route.query.type == '0' ? '号料箱' : '号料盘'),
            code: index + 1,
            mNum: 10,
            mName: '80*80*80 物料A',
            status: 0,
            index: index
          })"
        >
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
        location="end"
        :open-on-hover="false"
      >
        <p class="pt-2">
          {{ route.query.type == '0' ? '料箱' : '料盘' }}名称：{{ snackbarData.name }}
        </p>
        <p>编号：{{ snackbarData.code }}</p>
        <p>物料名称：{{ snackbarData.mName }}</p>
        <p>物料数量：{{ snackbarData.mNum }}</p>
        <p>料盘状态：{{ snackbarData.status }}</p>
      </VTooltip>
    </VCard>
    <VCard class="mt-3 pt-2 pb-2">
      <h4 class="mx-3 mb-1 px-3">
        物料：
      </h4>
    </VCard>
  </div>
</template>

