<script setup>
const propsData = defineProps({
  header: { type: Object },
})

const checked = ref(null)
const items = ref([])


const load = ({ done }) => {
  if (items.value.length >= 30) {
    done('empty')
  } else {
    const arr = Array.from({ length: 10 }, (k, v) => v + 1)

    done('loading')
    setTimeout(() => {
      arr.forEach(e => {
        items.value.push(e)
      })
      done('ok')
    }, 1000)
    
  }
  
}


const icons = {
  0: 'bxs-cube-alt',
  1: 'bxs-cylinder',
  2: 'bxs-pyramid',
}

onMounted(() => {
  nextTick(() => {
    propsData.header.setHeaderData([
      {
        name: '新建',
        color: '#42A5F5',
        size: 'large',
        width: 80,
        mark: '是否新建任务？',
        fn: ({ close, openLoading, closeLoading }) => {
          close()
        },
      },
     
      {
        name: '编辑',
        color: '#00ACC1',
        size: 'large',
        width: 80,
        mark: '是否编辑选中任务？',
        fn: ({ close, openLoading, closeLoading }) => {
          close()
        },
      },
      {
        name: '完成',
        color: '#66BB6A',
        size: 'large',
        width: 80,
        mark: '是否完成选中任务？',
        fn: ({ close, openLoading, closeLoading }) => {
          openLoading({
            text: '正在更新状态中',
          })
          close()
          setTimeout(() => {
            closeLoading()
          }, 2000)
        },
      },
      {
        name: '删除',
        color: '#EF5350',
        size: 'large',
        width: 80,
        mark: '是否删除选中任务？',
        fn: ({ close, openLoading, closeLoading }) => {
          openLoading({
            text: '正在删除中',
          })
          close()
          setTimeout(() => {
            closeLoading()
          }, 2000)
        },
      },
      {
        name: '开始',
        color: '#D32F2F',
        icon: 'bxs-zap',
        size: 'large',
        width: 120,
        mark: '是否开启任务？',
        fn: ({ close, openLoading, closeLoading }) => {
          openLoading({
            text: '正在开启中',
          })
          close()
          setTimeout(() => {
            closeLoading()
          }, 2000)
        },
      },
    ])
  })
})
onUnmounted(() => {
  propsData.header.setHeaderData([])
})
</script>

<template>
  <VInfiniteScroll
    class="h-100"
    :items="items"
    empty-text="暂无数据"
    @load="load"
  >
    <template
      v-for="(item, i) in items"
      :key="item"
    >
      <VCard
    
        class="d-flex flex-column mb-3"
        style="overflow: unset;"
        :variant="checked === i ? 'outlined': 'flat'"
        @click="checked = i"
      >
        <VCardSubtitle style="border-radius: 0.5rem 0.5rem 0 0;background: #111;color: #fff;line-height: 1.875rem;">
          <span>{{ i + 1 }}</span><span class="mx-5">IN BEARBEIYUNG</span> <span>1089</span>
        </VCardSubtitle>
        <VCardText class="py-2">
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex gap-3 align-center">
              <VAvatar
                :icon="icons[i%3]"
                color="#7986CB"
                size="50"
                rounded
                variant="tonal"
              />
              <div>
                <h6>Mazak VARIAXIS C600 | 3001 - KSP - 160 -1</h6>
                <h6>002_DEMO_MAIN</h6>
              </div>
            </div>
            <div class="d-flex gap-4 align-center">
              <VProgressCircular
                :rotate="
                  360"
                :size="70"
                :width="6"
                :model-value="20"
                color="teal"
              >
                <template #default>
                  <h6>5/25</h6>
                </template>
              </VProgressCircular>
              <div>
                <h6>开始时间：</h6>
                <h6>平均周期：</h6>
                <h6>预计结束时间：</h6>
              </div>
              <div class="text-right">
                <h6>21/09/2023 15:00:00</h6>
                <h6>00:50:00</h6>
                <h6>21/09/2023 15:00:00</h6>
              </div>
            </div>
          </div>
        </VCardText>
      </VCard>
    </template>
  </VInfiniteScroll>
</template>
