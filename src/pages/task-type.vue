<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  header: { type: Object },
})

const active = ref(0)
const router = useRouter()

onMounted(() => {
  nextTick(() => {
    props.header.setHeaderData([{
      name: '创建',
      color: '#7986CB',
      size: 'large',
      width: 220,
      mark: `是否创建任务？`,
      fn: ({ close }) => {
        close()
        router.push({ path: '/process/product' })
      },
    }])
  })
})
onUnmounted(() => {
  props.header.setHeaderData([])
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
