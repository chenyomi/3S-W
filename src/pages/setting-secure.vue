<script setup>
import safeApi from '@/api/safe'
import { getDictStr } from '@/utils/utils'
import { useLocale } from 'vuetify'

const btnList = inject('btnList')

const active = ref()
const select = ref(0)
const lang = localStorage.getItem('lang')
if (lang == 'en') {
  select.value = 1
} else {
  select.value = 0
}

const items = [
  { title: '简体中文', value: 0 },
  { title: 'English', value: 1 },
]

const { current } = useLocale()

const list = getDictStr('sss_system_model')

onMounted(() => {
  safeApi.safe().then(res => {
    const index = list.findIndex(e => e.value == res.data[0].configValue)
    if (index !== -1) {
      active.value = index
    }
  })
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
          if (select.value === 0) {
            localStorage.setItem('lang', 'zh-Hans')
            current.value = 'zh-Hans'
          } else {
            localStorage.setItem('lang', 'en')
            current.value = 'en'
          }
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
              {{ $t(n.title) }}
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
