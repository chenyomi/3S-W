<script setup>
import taskApi from '@/api/task';
import { useStore } from "@/pinia/index";
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const density = inject('density')
const message = inject('message')
const router = useRouter()
const next = inject('next')
const store = useStore()

const frocks = ref([])

const select = ref()
watch(select, () => {
  store.setProcess({
    palletFixtureId: select.value
  })
})
const btnList = inject('btnList')
const getSelector = () => {
  taskApi.taskProcessSelector().then(res => {
    frocks.value = res.data.fixturePalletList
  })
}
onMounted(() => {
  const { process } = storeToRefs(store)
  select.value = process.value.palletFixtureId || null
  getSelector()
  nextTick(() => {
    btnList.value = [{
      name: '上一步',
      color: '#90A4AE',
      size: 'large',
      width: 120,
      mark: '是否返回上一步',
      fn: ({ close, openLoading, closeLoading }) => {
        close()
        router.push({ path: '/process/eqpt' })
      },
    }, {
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
        taskApi.taskProcess(process.value).then(() => {
          if (next.value.type == 'next') {
            router.push({ path: next.value.nextPath })
          } else if (next.value.type == 'last') {
            router.push({ path: '/tasklist' })
          }
        }).finally(() => {
          closeLoading()
        })
      },
      before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
        if (!select.value) {
          message.value.open({
            text: '请选择夹具',
          })
        } else {
          dialog.value = true
        }
      },
    }]
  })
})
</script>

<template>
  <VCard class="pt-2 pb-2 h-100" style="overflow-y: scroll;">
    <h4 class="mx-3 mb-1 px-3">
      夹具：
    </h4>
    <VDivider />
    <div class="pt-3 px-6 pb-4">
      <VSelect v-model="select" :items="frocks" :density="density" label="当前夹具" class="mt-3 mb-5 w-25" item-title="label"
        item-value="id" />
      <p>夹深：30.000mm</p>
      <p>钳高：46.500mm</p>
      <p>X：0mm</p>
      <p>Y：0mm</p>
    </div>
  </VCard>
</template>
