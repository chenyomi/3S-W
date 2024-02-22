<script setup>
import taskApi from '@/api/task'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import OutboundForm from './task-outbound-form.vue'
const { mdAndDown } = useDisplay()
const message = inject('message')
const route = useRoute()
const router = useRouter()
const box = ref()
const form = ref()
taskApi.taskStorage({
  id: route.query.id,
  type: `${route.query.type}_${route.query.process}`,
}).then(res => {
  box.value = res.data
})
const color = {
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


const btnList = inject('btnList')
const snackbar = ref(false)
const snackbarData = ref({})
const select = ref(null)
watch(() => select.value, newVal => {
  const item = box.value.filter(e => e.id == newVal)[0]
  snackbarData.value = item
})
onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '完成',
      color: '#D32F2F',
      icon: 'bxs-zap',
      size: 'large',
      width: 220,
      mark: '是否创建',
      before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
        if (!select.value) {
          message.value.open({
            text: '请选择一项',
          })
        } else if (route.query.process === "IN") {
          if (!form.value.formData.materialNumber) {
            message.value.open({
              text: '请输入数量',
            })
          }
        } else {
          dialog.value = true
        }

      },
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading({
          text: '保存中',
        })
        if (route.query.process === "IN") {
          form.value.formData.palletId = select.value
          taskApi.taskStorageIn(form.value.formData).then(res => {
            message.value.open({
              text: '保存成功',
            })
          }).finally(() => {
            close()
            closeLoading()
            router.push({ path: '/tasklist' })
          })
        }
        if (route.query.process === "OUT") {
          taskApi.taskStorageOut({
            storagePalletId: select.value
          }).then(res => {
            message.value.open({
              text: '保存成功',
            })
          }).finally(() => {
            close()
            closeLoading()
            router.push({ path: '/tasklist' })
          })
        }
      },
    }]
  })
})
</script>

<template>
  <div class="h-100 d-flex flex-column">
    <VCard class="pt-2 pb-2 d-flex flex-column" style="flex: 1;">
      <h4 class="mx-3 px-3 mb-2 d-flex justify-space-between align-center">
        <div>
          <span style="display: inline-block;vertical-align: middle;"> {{ route.query.type == 'BOX' ? '料箱' : '料盘'
          }}：</span>
          <VChip color="#4CAF50" class="mx-3 justify-center" style="width: 8.125rem;">
            {{ snackbarData.palletName || '未选择' }}
          </VChip>
        </div>
        <div class="d-flex align-center">
          <template v-for="[key, e] of Object.entries(color)" :key="key">
            <div
              :style="`width: 1.2rem;height: 1.2rem;background: ${e.color};border-radius: 0.1875rem;margin-left: 1.25rem;margin-right: 0.5rem`" />
            <div style="font-size: 0.75rem;">
              {{ e.name }}
            </div>
          </template>
        </div>
        <VDialog v-if="mdAndDown && route.query.process === 'IN'" width="800">
          <template #activator="{ props }">
            <VBtn color="primary" v-bind="props" variant="tonal">
              <VIcon icon="bxs-cube-alt" />
            </VBtn>
          </template>
          <VCard>
            <VCardText>
              <OutboundForm ref="form" />
            </VCardText>
          </VCard>
        </VDialog>
      </h4>
      <VDivider />
      <div class="d-flex px-4 pt-5 pb-4 flex-wrap gap-3 text-center" style="flex: 1;overflow-y: scroll;">
        <div v-for="(item, index) in box" :key="item"
          style="position: relative;overflow: hidden;width: 70px;height: 70px;border-radius: 6px;color: #fff;font-size: 12px;"
          :style="{
            background: '#435b63',
            border: select == item.id ? '2px solid #FF80AB' : '2px solid rgb(var(--v-theme-surface))'
          }" @click="() => select = item.id">
          <VIcon :icon="route.query.type == 'BOX' ? 'bx-archive' : 'bx-selection'" color="#bdbdbd" size="30"
            class="mt-3" />
          <div class="position-absolute text-center w-100" style="bottom: 0;left: 0;background: rgba(33, 33, 33, 70%);">
            0{{ index + 1 }}
          </div>
        </div>
      </div>
      <VTooltip v-model="snackbar" activator="parent" location="top" :open-on-hover="false">
        <span class="pt-2">
          {{ snackbarData.name }}
        </span>
      </VTooltip>
    </VCard>
    <VCard v-if="!mdAndDown && route.query.process === 'IN'" class="mt-3 pt-2 pb-2">
      <div class="px-6">
        <OutboundForm ref="form" />
      </div>
    </VCard>
  </div>
</template>

