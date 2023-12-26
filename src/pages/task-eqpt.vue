<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'



const density = inject('density')
const router = useRouter()
const next = inject('next')

const formData = ref({
  switch1: true,
  switch2: true,
  switch3: true,
  switch4: true,
  switch5: true,
  switch6: '0',
  switch7: '0',
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
      参数设置：
    </h4>
    <VDivider />
    <div class="d-flex gap-10 pt-3 px-6 pb-4">
      <VSwitch
        v-model="formData.switch1"
        label="卸载后清洗钳口"
      />
      <VSwitch
        v-model="formData.switch2"
        label="完成后清洗工装"
      />
      <VSwitch
        v-model="formData.switch3"
        label="工装更换前清洗"
      />
    </div>
    <h4 class="mx-3 mb-1 px-3">
      CNC程序：
    </h4>
    <VDivider />
    <div class="pt-3 px-6 pb-4">
      <VSelect
        v-model="select"
        :items="program"
        :density="density"
        label="当前程序"
        class="my-3 w-25"
      />
      <p>程序同步时间：  0：00：00  （未知）</p>
    </div>
    <h4 class="mx-3 mb-1 px-3">
      工具寿命管理：
    </h4>
    <VDivider />
    <div class="pt-3 px-6 pb-4">
      <div class="d-flex align-center">
        <VSwitch
          v-model="formData.switch4"
          label="工具损坏时卸载产品"
        />
        <VRadioGroup
          v-if="formData.switch4"
          v-model="formData.switch6"
          class="mx-8"
          inline
        >
          <VRadio
            label="使用装载设置"
            value="0"
          />
          <VRadio
            label="使用卸载设置"
            value="1"
          />
        </VRadioGroup>
      </div>
      <div class="d-flex align-center">
        <VSwitch
          v-model="formData.switch5"
          label="工具损坏时卸载工装"
        />
        <VRadioGroup
          v-if="formData.switch5"
          v-model="formData.switch7"
          class="mx-8"
          inline
        >
          <VRadio
            label="使用装载设置"
            value="0"
          />
          <VRadio
            label="使用卸载设置"
            value="1"
          />
        </VRadioGroup>
      </div>
    </div>
  </VCard>
</template>

