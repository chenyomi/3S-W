<script setup>
const propsData = defineProps({
  header: { type: Object },
})

onMounted(() => {
  nextTick(() => {
    propsData.header.setHeaderData([{
      name: '保存',
      color: '#66BB6A',
      icon: 'bx-cloud-upload',
      size: 'large',
      width: 220,
      mark: '是否保存并上传更新数据？',
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading({
          text: '正在上传更新',
        })
        close()
        setTimeout(() => {
          closeLoading()
        }, 2000)
      },
    }])
  })
})
onUnmounted(() => {
  propsData.header.setHeaderData([])
})
</script>

<template>
  <VCard height="100%" />
</template>
