<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  header: { type: Object },
})

const density = inject('density')
const router = useRouter()
const next = inject('next')

const frocks = [
  { title: '工装-1', value: '0' },
  { title: '工装-2', value: '1' },
  { title: '工装-3', value: '2' },
  { title: '工装-4', value: '3' },
]

const select = ref({ title: '工装-1', value: '0' })
const btnList = inject('btnList')

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: next.value.name,
      color: '#D32F2F',
      icon: 'bxs-zap',
      size: 'large',
      width: 220,
      mark: next.value.intro,
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading({
          text: next.value.loadtext,
        })
        close()
        setTimeout(() => {
          closeLoading()
          if (next.value.type == 'next') {
            router.push({ path: next.value.nextPath })
          } else if (next.value.type == 'last') {
            router.push({ path: '/tasklist' })
          }
        }, 1000)
      },
    }]
  })
})
</script>

<template>
  <VCard class="pt-2 pb-2">
    <h4 class="mx-3 mb-1 px-3">
      工装：
    </h4>
    <VDivider />
    <div class="pt-3 px-6 pb-4">
      <VSelect
        v-model="select"
        :items="frocks"
        :density="density"
        label="当前工装"
        class="mt-3 mb-5 w-25"
      />
      <p>列高：46.500mm</p>
      <p>钳高：46.500mm</p>
      <p>X：0mm</p>
      <p>Y：0mm</p>
      <p>Z：0mm</p>
    </div>
  </VCard>
</template>
