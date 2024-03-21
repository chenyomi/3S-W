<script setup>
import { useStore } from "@/pinia/index";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()

const density = inject('density')
const router = useRouter()
const next = inject('next')
const formData = ref({
  unloadClean: false,
  finishClean: false,
  switchClean: false,
  breakUnloadFixture: 0,
  breakUnloadMaterial: 0,
})

watch(formData.value, (newVal) => {
  store.setProcess(formData.value)
})

const program = [
  { title: '程序-1', value: '0' },
  { title: '程序-2', value: '1' },
  { title: '程序-3', value: '2' },
  { title: '程序-4', value: '3' },
]

const select = ref({ title: '程序-1', value: '0' })
const btnList = inject('btnList')

onMounted(() => {
  const { process } = storeToRefs(store)
  if (process.value) {
    formData.value.unloadClean = process.value.unloadClean || false
    formData.value.finishClean = process.value.finishClean || false
    formData.value.switchClean = process.value.switchClean || false
    formData.value.breakUnloadFixture = process.value.breakUnloadFixture || 0
    formData.value.breakUnloadMaterial = process.value.breakUnloadMaterial || 0
  }
  nextTick(() => {
    btnList.value = [{
      name: '上一步',
      color: '#90A4AE',
      size: 'large',
      width: 120,
      mark: '是否返回上一步',
      fn: ({ close, openLoading, closeLoading }) => {
        close()
        router.push({ path: '/process/product' })
      },
    }, {
      name: next.value.name,
      color: '#D32F2F',
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
  <VCard class="pt-2 pb-2 h-100" style="overflow-y: scroll;">
    <h4 class="mx-3 mb-1 px-3">
      参数设置：
    </h4>
    <VDivider />
    <div class="d-flex gap-10 pt-3 px-6 pb-4">
      <VSwitch v-model="formData.unloadClean" label="卸载后清洗钳口" />
      <VSwitch v-model="formData.finishClean" label="完成后清洗夹具" />
      <VSwitch v-model="formData.switchClean" label="夹具更换前清洗" />
    </div>
    <h4 class="mx-3 mb-1 px-3">
      CNC程序：
    </h4>
    <VDivider />
    <div class="pt-3 px-6 pb-4">
      <VSelect v-model="select" :items="program" :density="density" label="当前程序" class="my-3 w-25" />
      <p>程序同步时间： 0：00：00 （未知）</p>
    </div>
    <h4 class="mx-3 mb-1 px-3">
      刀具寿命管理：
    </h4>
    <VDivider />
    <div class="pt-3 px-6 pb-4">
      <div class="d-flex align-center">
        <h4>刀具损坏时卸载产品</h4>
        <VRadioGroup v-model="formData.breakUnloadFixture" class="mx-8" inline>
          <VRadio label="不使用" :value="0" />
          <VRadio label="使用装载设置" :value="1" />
          <VRadio label="使用卸载设置" :value="2" />
        </VRadioGroup>
      </div>
      <div class="d-flex align-center">
        <h4>刀具损坏时卸载夹具</h4>
        <VRadioGroup v-model="formData.breakUnloadMaterial" class="mx-8" inline>
          <VRadio label="不使用" :value="0" />
          <VRadio label="使用装载设置" :value="1" />
          <VRadio label="使用卸载设置" :value="2" />
        </VRadioGroup>
      </div>
    </div>
  </VCard>
</template>

