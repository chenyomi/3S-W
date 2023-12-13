<template>
  <div class="d-flex h-100 align-center justify-space-between">
    <IconBtn
      class="ms-n3 d-md-none"
      @click="propsData.fn(true)"
    >
      <VIcon icon="bx-menu" />
    </IconBtn>
    
    
    <VBreadcrumbs
      class="d-none d-sm-block"
      :items="matched"
    >
      <template #divider>
        <VIcon icon="mdi-chevron-right" />
      </template>
    </VBreadcrumbs>  
    <div class="d-flex justify-end gap-2">
      <VBtn
        v-for="item in btnList"
        :key="item"
        :width="item.width"
        :color="item.color"
        :size="item.size"
        @click="open(item)"
      >
        <VIcon
          v-if="item.icon"
          :icon="item.icon"
        />
        <span
          class="d-none d-sm-block"
          style="padding-left: 8px;letter-spacing: 8px;"
        >{{ item.name }}</span>
      </VBtn>
    </div>
   
    
    <VDialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="300"
    >
      <VCard title="提示">
        <VCardText>
          {{ selectRow.mark }}
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            我拒绝
          </VBtn>
          <VBtn
            color="blue-darken-1"
            variant="text"
            @click="() => {selectRow.fn({close, openLoading ,closeLoading})}"
          >
            是的
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
  <VDialog
    v-model="dialogLoading"
    :scrim="false"
    persistent
    width="auto"
  >
    <VCard color="#000000">
      <VCardText>
        {{ dialogLoadingText }}
        <VProgressLinear
          indeterminate
          color="white"
          class="mb-0"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup>
import { ref } from 'vue'

const propsData = defineProps({
  fn: {
    type: Function,
    default: () => {},
  },
  matched: {
    type: Array,
    default: e => {
      return []
    },
  },
})

const selectRow = ref()
const dialog = ref(false)
const dialogLoading = ref(false)
const dialogLoadingText = ref('加载中...')

const close = () => {
  dialog.value = false
}

const open = row => {
  selectRow.value = row
  dialog.value = true
}

const openLoading = op => {
  if(op?.text) dialogLoadingText.value = op.text
  dialogLoading.value = true
}

const closeLoading = () => {
  dialogLoading.value = false
}

const btnList = ref([])

const setHeaderData = op => {
  btnList.value = op
}


defineExpose({
  setHeaderData,
})
</script>
