<script setup>
const btnList = inject('btnList')

const list = ['操作模式', '设置模式', '管理模式']
const active = ref(0)
const select = ref({ title: '简体中文', value: '0' })

const items = [
  { title: '简体中文', value: '0' },
  { title: 'English', value: '1' },
]

onMounted(() => {
  nextTick(() => {
    btnList.value =  [{
      name: '保存',
      color: '#66BB6A',
      icon: 'bx-cloud-upload',
      size: 'large',
      width: 220,
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading()
        close()
        setTimeout(() => {
          closeLoading()
        }, 2000)
      },
    }]
  })
})
</script>

<template>
  <VItemGroup selected-class="bg-primary">
    <VRow>
      <VCol
        v-for="(n, i) in list"
        :key="n"
        cols="12"
        md="4"
      >
        <VItem>
          <VCard
            class="d-flex align-center"
            :color="active == i ? 'primary':''"
            height="60"
            @click="active = i"
          >
            <div class="flex-grow-1 text-center">
              {{ n }}
            </div>
          </VCard>
        </VItem>
      </VCol>
    </VRow>
  </VItemGroup>
  <VCard class="mt-3 w-50">
    <VContainer>
      <VSelect
        v-model="select"
        :items="items"
        label="请选择语言"
      />
    </VContainer>
  </VCard>
</template>
