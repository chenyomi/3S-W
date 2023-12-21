<script setup>
const diaFormRef = ref()
const dialog = ref(false)
const selectRow = ref()

const open = row => {
  selectRow.value = row
  dialog.value = true
}

const close = () => {
  dialog.value = false
}

const dialogLoading = ref(false)
const dialogLoadingText = ref('加载中...')

const openLoading = op => {
  if(op?.text) dialogLoadingText.value = op.text
  dialogLoading.value = true
}

const closeLoading = () => {
  dialogLoading.value = false
}

defineExpose({
  open,
})
</script>

<template>
  <VDialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    :width="selectRow?.formWidth || 300"
  >
    <VCard>
      <VCardText v-if="!selectRow.slot">
        {{ selectRow.mark }}
      </VCardText>
      <Component
        :is="selectRow.slot"
        v-if="selectRow.slot"
        ref="diaFormRef"
        :data="selectRow.slotData || {}"
      />
      <VCardActions v-if="!selectRow.hideDiaCanel && !selectRow.hideDiaOk">
        <VSpacer />
        <VBtn
          v-if="!selectRow.hideDiaCanel "
          color="blue-darken-1"
          variant="text"
          @click="dialog = false"
        >
          关闭
        </VBtn>
        <VBtn
          v-if="!selectRow.hideDiaOk"
          color="blue-darken-1"
          variant="text"
          @click="() => {selectRow.fn({close, openLoading ,closeLoading, diaFormRef})}"
        >
          是的
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
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
