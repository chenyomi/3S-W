
<script setup>
import Modal from '@/layouts/components/modal.vue'
import { useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import taskListCut from './task-list-cut.vue'

const btnList = inject('btnList')
const router = useRouter()
const checked = ref(null)
const items = ref([])
const modal = ref()

let page = 0

const load = ({ done }) => {
  if (items.value.length >= 30) {
    done('empty')
  } else {
    const arr = Array.from({ length: 10 }, (k, v) => page * 10 +  v + 1)

    page = page + 1
    done('loading')
    setTimeout(() => {
      arr.forEach(e => {
        items.value.push({
          id: e,
          num: e,
        })
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



const endEvent = e => {
  console.log(e, '>>>>>>',
  )
}

const clickCut = () => {
  modal.value.open({
    formWidth: 300,
    mark: '拆分任务', // 介绍
    slot: shallowRef(taskListCut),  // 引入表单模板 非必填
    // slotData: serverItems.value.filter(c => c.id == expanded.value)[0], // 引入模板模板Data
    // 弹窗表单提交事件 { close, openLoading, closeLoading, diaFormRef }
    fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
      openLoading({
        text: '正在上传更新',
      })

      // 模板的submit 需要暴露 submit 事件
      diaFormRef.submit().finally(() => {
        // 关闭弹窗
        close()
        setTimeout(() => {
          closeLoading()
        }, 2000)
      })
    } })
}

onMounted(() => {
  
  nextTick(() => {
    btnList.value = [
      {
        name: '新建',
        color: '#42A5F5',
        size: 'large',
        width: 80,
        mark: '是否新建任务？',
        fn: ({ close, openLoading, closeLoading }) => {
          close()
          router.push({ path: '/task' })
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
          router.push({ path: '/task' })
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
    ]
  })
})
</script>

<template>
  <VInfiniteScroll
    class="h-100"
    :items="items"
    empty-text="暂无数据"
    @load="load"
  >
    <Draggable 
      v-model="items" 
      handle=".move"
      item-key="id"
      ghost-class="task-ghost"
      :animation="100"
      @start="drag=true" 
      @end="endEvent"
    >
      <template #item="{element, index}">
        <VCard
          class="d-flex flex-column mb-3"
          style="overflow: unset;"
          @click="checked = element.num"
        >
          <VCardSubtitle
            class="d-flex align-center justify-space-between"
            style="border-radius: 0.5rem 0.5rem 0 0;color: #fff;line-height: 1.875rem;"
            :style="checked === element.num ? 'background: rgb(121, 134, 203);': 'background: #111'"
          >
            <div><span>{{ element.num }}</span><span class="mx-5">IN BEARBEIYUNG  </span> <span>180{{ index + 1 }}</span></div>
            <VBtn
              v-if="index!==0"
              size="mini"
              class="px-1"
              color="#ffffff"
              @click.stop="clickCut"
            >
              <VIcon icon="bx-grid" />
            </VBtn>
          </VCardSubtitle>
          <VCardText class="py-2">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex gap-3 align-center">
                <VAvatar
                  :class="index>0?'move':''"
                  :icon="icons[element.num%3]"
                  color="#7986CB"
                  size="50"
                  rounded
                  variant="tonal"
                />
                <div>
                  <h6>WELLLIH 3S-W | 90*90*90 - PL01 - J02 -{{ index }}</h6>
                  <h6>001_DEMO_MAIN</h6>
                </div>
              </div>
              <div class="d-flex gap-4 align-center">
                <VProgressCircular
                  :rotate="
                    360"
                  :size="70"
                  :width="6"
                  :model-value="20"
                  :color="index==0? '#66BB6A': 'teal'"
                  :indeterminate="index==0"
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
    </Draggable>
  </VInfiniteScroll>
  <Modal ref="modal" />
</template>
 
<style lang="scss">
.task-ghost {
  background: rgb(var(--v-theme-surface), 0.9);

  * {
    visibility: hidden;
  }
}
</style>
