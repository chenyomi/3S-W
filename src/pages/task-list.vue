
<script setup>
import taskApi from '@/api/task'
import Modal from '@/layouts/components/modal.vue'
import { inject, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import taskListCut from './task-list-cut.vue'

const btnList = inject('btnList')
const message = inject('message')

const router = useRouter()
const checked = ref(null)
const items = ref([])
const modal = ref()

let parmas = ref({
  pageNum: 1,
  pageSize: 10,
  nextPage: 0,
})

const getData = done => {
  taskApi.taskList(parmas.value).then(res => {
    done && done('loading')
    res.data.list.forEach(e => {
      items.value.push(e)
    })
    parmas.value.pageNum++
    parmas.value.nextPage = res.data.nextPage
    // eslint-disable-next-line promise/no-callback-in-promise
    done && done('ok')
  })
}

getData()

const load = ({ done }) => {
  if (!parmas.value.nextPage) {
    done('empty')
  } else {
    getData(done)
  }
}


const icons = {
  0: 'bxs-cube-alt',
  1: 'bxs-cylinder',
  2: 'bxs-pyramid',
}


const handleMove = evt => {
  return !(evt.related.dataset.type !== "PAUSE")
}

const endEvent = e => {
  const arr = []
  items.value.forEach(item => {
    arr.push(item.groupId)
  })
  taskApi.taskSort(arr)
}
const clickCut = (e) => {
  modal.value.open({
    formWidth: 300,
    mark: '拆分任务', // 介绍
    slot: shallowRef(taskListCut),  // 引入表单模板 非必填
    slotData: e, // 引入模板模板Data
    // 弹窗表单提交事件 { close, openLoading, closeLoading, diaFormRef }
    fn: ({ close, openLoading, closeLoading, diaFormRef }) => {

      // 模板的submit 需要暴露 submit 事件
      diaFormRef.submit().then((res) => {
        const index = items.value.findIndex(e => e.groupId === res.data[0].groupId)
        items.value[index] = res.data[0]
        items.value.splice(index + 1, 0, res.data[1])
        // 关闭弹窗
        close()
      })
    }
  })
}
const socket = inject('socket')
onMounted(() => {
  socket.onChangeData = (topic, msg) => {
    if (topic === 'sss/task') {
      const index = items.value.findIndex(e => e.groupId === msg.groupId)
      items.value[index].taskFinishTotal = msg.taskNumber
      items.value[index].groupState = msg.groupState
      console.log(msg)
    }
  }
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
        name: '删除',
        color: '#66BB6A',
        size: 'large',
        width: 80,
        mark: '是否删除选中任务？',
        before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
          if (!checked.value) {
            message.value.open({
              text: '请选择一项',
            })
          } else {
            const item = items.value.filter(e => e.groupId === checked.value)[0]
            if (item.groupState === 'RUN') {
              message.value.open({
                text: '该项正在运行中',
              })
            } else if (item.groupState === 'FINISH') {
              dialog.value = true
            } else if (item.groupState === 'PAUSE') {
              dialog.value = true
            }
          }

        },
        fn: ({ close, openLoading, closeLoading }) => {
          openLoading({
            text: '正在更新状态中',
          })
          close()
          taskApi.taskDelete({
            id: checked.value,
          }).then(res => {
            const index = items.value.findIndex(e => e.groupId === checked.value)
            items.value.splice(index, 1)
          }).finally(e => {
            closeLoading()
          }).catch(err => {
            message.value.open({
              text: err.msg,
            })
          })
        },
      },
      {
        name: '终止',
        color: '#EF5350',
        size: 'large',
        width: 80,
        mark: '是否终止选中任务？',
        before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
          if (!checked.value) {
            message.value.open({
              text: '请选择一项',
            })
          } else {
            const item = items.value.filter(e => e.groupId === checked.value)[0]
            if (item.groupState === 'RUN') {
              dialog.value = true

            } else if (item.groupState === 'FINISH') {
              message.value.open({
                text: '该项已经完成',
              })
            } else if (item.groupState === 'PAUSE') {
              message.value.open({
                text: '该项未启动',
              })
            }
          }

        },
        fn: ({ close, openLoading, closeLoading }) => {
          openLoading({
            text: '正在终止中',
          })
          close()
          taskApi.taskStop({
            id: checked.value,
          }).then(res => {
            const index = items.value.findIndex(e => e.groupId === checked.value)
            items.value[index].groupState = 'PAUSE'
          }).finally(e => {
            closeLoading()
          }).catch(err => {
            message.value.open({
              text: err.msg,
            })
          })
        },
      },
      {
        name: '开始',
        color: '#D32F2F',
        icon: 'bxs-zap',
        size: 'large',
        width: 120,
        mark: '是否开启任务？',
        before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
          if (!checked.value) {
            message.value.open({
              text: '请选择一项',
            })
          } else {
            const item = items.value.filter(e => e.groupId === checked.value)[0]
            if (item.groupState === 'RUN') {
              message.value.open({
                text: '该项正在运行中',
              })
            } else if (item.groupState === 'FINISH') {
              message.value.open({
                text: '该项已经完成',
              })
            } else if (item.groupState === 'PAUSE') {
              dialog.value = true
            }
          }

        },
        fn: ({ close, openLoading, closeLoading }) => {
          openLoading({
            text: '正在开启中',
          })
          close()
          taskApi.taskRun({
            id: checked.value,
          }).then(res => {
            const index = items.value.findIndex(e => e.groupId === checked.value)
            items.value.unshift(items.value.splice(index, 1)[0])
          }).finally(e => {
            closeLoading()
          }).catch(err => {
            message.value.open({
              text: err.msg,
            })
          })
        },
      },
    ]
  })
})
onUnmounted(() => {
  // socket.removeSubscribe('sss/task')
})
const dictType = {
  'RUN': 'flat',
  'PAUSE': 'tonal',
  'FINISH': 'text',
}
</script>

<template>
  <VInfiniteScroll class="h-100" :items="items" empty-text="暂无数据" @load="load">
    <Draggable v-model="items" handle=".move" item-key="id" ghost-class="task-ghost" :animation="100" :move="handleMove"
      @end="endEvent">
      <template #item="{ index, element }">
        <VCard class="d-flex flex-column mb-3" style="overflow: unset;" :data-type="element.groupState"
          @click="checked = element.groupId">
          <VCardSubtitle class="d-flex align-center justify-space-between"
            style="border-radius: 0.5rem 0.5rem 0 0;color: #fff;line-height: 1.875rem;"
            :style="checked === element.groupId ? 'background: rgb(121, 134, 203);' : 'background: #111'">
            <div><span>{{ element.groupId }}</span><span class="mx-5">{{ element.taskType }} </span> <span>{{
              element.groupState }}</span></div>
            <VBtn v-if="element.groupState !== 'RUN'" size="mini" class="px-1" color="#ffffff"
              @click.stop="clickCut(element)">
              <VIcon icon="bx-grid" />
            </VBtn>
          </VCardSubtitle>
          <VCardText class="py-2">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex gap-3 align-center">
                <VAvatar :class="element.groupState == 'PAUSE' ? 'move' : ''" :icon="icons[element.materialShape % 3]"
                  color="#7986CB" size="50" rounded :variant="dictType[element.groupState]" />
                <div>
                  <h6>{{ element.taskName }}</h6>
                  <h6>001_DEMO_MAIN</h6>
                </div>
              </div>
              <div class="d-flex gap-4 align-start">
                <VProgressCircular :rotate="360" :size="70" :width="6"
                  :model-value="element.taskFinishTotal * 100 / element.taskTotal"
                  :color="element.groupState == 'RUN' ? '#66BB6A' : 'teal'" :indeterminate="element.groupState == 'RUN'">
                  <template #default>
                    <h6>{{ element.taskFinishTotal }}/{{ element.taskTotal }}</h6>
                  </template>
                </VProgressCircular>
                <div>
                  <h6>开始时间：</h6>
                  <h6>平均周期：</h6>
                  <h6>预计结束时间：</h6>
                </div>
                <div class="text-right">
                  <h6 style="width: 9.375rem;">
                    {{ element.startTime || '-' }}
                  </h6>
                  <h6 style="width: 9.375rem;">
                    {{ element.averageCycleStr || '-' }}
                  </h6>
                  <h6 style="width: 9.375rem;">
                    {{ element.finishTime || '-' }}
                  </h6>
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
 
<style lang="scss" scoped>
.task-ghost {
  background: rgb(var(--v-theme-surface), 0.9);

  * {
    visibility: hidden;
  }
}
</style>
