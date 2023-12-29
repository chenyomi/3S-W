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
    }]
  })
})
</script>

<template>
  <div
    class="h-100"
    style="overflow-y: scroll;"
  >
    <VItemGroup selected-class="bg-primary">
      <div class="d-flex w-100 gap-3">
        <VItem
          v-for="(n, i) in list"
          :key="n"
        >
          <VCard
            class="d-flex align-center"
            :color="active == i ? 'primary':''"
            height="60"
            style="flex: 1;"
            @click="active = i"
          >
            <div class="flex-grow-1 text-center">
              {{ $t(n) }}
            </div>
          </VCard>
        </VItem>
      </div>
    </VItemGroup>
    <VCard class="mt-3 w-50">
      <VContainer>
        <VSelect
          v-model="select"
          :items="items"
          :label="$t('语言')"
        />
      </VContainer>
    </VCard>
  </div>
</template>
