<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import taskTypeRetrieval from './task-type-retrieval.vue'


const active = ref(null)
const router = useRouter()
const btnList = inject('btnList')
const message = inject('message')


onMounted(() => {
  nextTick(() => {

    //warehousing
    btnList.value = [{
      name: '创建',
      color: '#7986CB',
      size: 'large',
      width: 220,
      formWidth: 600,
      mark: `是否创建任务？`,
      hideDiaName: true,
      before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
        switch (active.value) {
        case 0:
          dialog.value = true
          break
        case 1:
          dialog.value = true
          break
        case 2:
          router.push({ path: '/process/product' })
          break
        default:
          message.value.open({
            text: '请选择类型',
          })
          break
        }
      },
      slot: shallowRef(taskTypeRetrieval), 
      fn: ({ close, diaFormRef }) => {
        
        switch (active.value) {
        case 0:
          diaFormRef.submit().then(res => {
            if (res == -1) {
              message.value.open({
                text: '请选择一项',
              })
              
              return
            }
            close()
            router.push({
              path: '/warehousing', query: {
                type: res,
              },
            })
          })
          break
        case 1:
          diaFormRef.submit().then(res => {
            if (res == -1) {
              message.value.open({
                text: '请选择一项',
              })
              
              return
            }
            close()
            router.push({
              path: '/retrieval', query: {
                type: res,
              } })
          })
          break
        case 2:
          router.push({ path: '/process/product' })
          break
        default:
          break
        }
      
        
      },
    }]
  })
})
</script>

<template>
  <div class="d-flex justify-center gap-8 align-center h-100 text-center">
    <VCard
      class="px-13 py-15"
      border
      :color="active === 0 ? '#7986CB' :''"
      @click="() => {active = 0}"
    >
      <VIcon
        icon="bx-package"
        size="45"
        rounded
        variant="tonal"
      />
      <div class="mt-2">
        入库
      </div>
    </VCard>
    <VCard
      class="px-13 py-15"
      border
      :color="active === 1 ? '#7986CB' :''"
      @click="() => {active = 1}"
    >
      <VIcon
        icon="bx-link-external"
        size="45"
        rounded
      />
      <div class="mt-2">
        出库
      </div>
    </VCard>
    <VCard
      variant="flat"
      class="px-13 py-15"
      border
      :color="active === 2 ? '#7986CB' :''"
      @click="() => {active = 2}"
    >
      <VIcon
        icon="bx-outline"
        size="45"
        rounded
        variant="tonal"
      />
      <div class="mt-2">
        加工
      </div>
    </VCard>
  </div>
</template>
