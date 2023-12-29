<script setup>
import { inject, shallowRef } from 'vue'
import palletBox from './pallet-box.vue'
import palletClamp from './pallet-clamp.vue'
import palletDrawer from './pallet-drawer.vue'

const active = ref(-1)
const btnList = inject('btnList')
const message = inject('message')
const comp = ref()


onMounted(() => {
  nextTick(() => {

    //warehousing
    btnList.value = [{
      name: '查看',
      color: '#7986CB',
      size: 'large',
      width: 220,
      formWidth: 600,
      mark: `是否创建任务？`,
      hideDiaName: true,
      hideDiaCancel: true,
      hideDiaOk: true,
      before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText, selectRow }) => {
        if (active.value == -1) {
          message.value.open({
            text: '请选择查看内容',
          })
          
          return
        }
        if (active.value == 0) {
          selectRow.value.slot = shallowRef(palletDrawer)
        } else if (active.value == 1) {
          selectRow.value.slot = shallowRef(palletBox)
        } else if (active.value == 2) {
          selectRow.value.slot = shallowRef(palletClamp)
        } 
        
        dialog.value = true
      },
      slot: comp.value, 
      slotData: {},
      fn: ({ close, diaFormRef }) => {
        // switch (active.value) {
        // case 0:
        //   diaFormRef.submit().then(res => {
        //     close()
        //   })
        //   break
        // case 1:
        //   diaFormRef.submit().then(res => {
        //     close()
        //   })
        //   break
        // case 2:
        //   diaFormRef.submit().then(res => {
        //     close()
        //   })
        //   break
        // default:
        //   break
        // }
      },
    }]
  })
})

const pallets = ref([
  { icon: 'bx-selection', name: '网板', color: "#8BC34A" },
  { icon: 'bx-package', name: '料箱', color: "#0288D1" },
  { icon: 'bx-vertical-center', name: '夹具', color: "#FFA726" },
])
</script>

<template>
  <div class="d-flex justify-center gap-10 align-center h-100 text-center">
    <VCard
      v-for="(item, index) in pallets"
      :key="index"
      :color="active === index ? 'rgba(121, 134, 203, .2)' :'rgba(121, 134, 203, .0)'"
      class="px-4 py-8"
      elevation="0"
      style="max-width: 18rem;flex: 1;"
      @click="() => {active = index}"
    >
      <div
        class="w-75 d-inline-block py-6"
        style="background: #37474f;"
      >
        <VIcon
          :icon="item.icon"
          size="45"
          :color="item.color"
          rounded
          variant="tonal"
        />
        <div
          class="mt-2"
          style="color: #fff;"
        >
          {{ $t(item.name) }}
        </div>
      </div>
      <div style="width: 100%;background: #78909c; color: #fff; line-height: 2rem;">
        {{ $t('托板') }}
      </div>
    </VCard>
  </div>
</template>
