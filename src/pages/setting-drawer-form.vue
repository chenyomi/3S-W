<script setup>
import drawerApi from '@/api/drawer'
import { getDict } from '@/utils/utils'
import { cloneDeep } from 'lodash'

const propsData = defineProps({
  data: { type: Object },
})

const density = inject('density')
const formData = ref(cloneDeep(propsData.data))

const submit = () => {
  return new Promise(resolve => {
    drawerApi.drawerEdit(formData.value).finally(() => {
      resolve()
    })
  })
}


const shaps = getDict('sss_trawl_board_shape')

const items = getDict('sss_trawl_board_state')

defineExpose({
  submit,
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="4" />
      <VCol
        cols="4"
        class="text-center"
      >
        <VChip
          class="ma-1"
          color="#FF9800"
        >
          X轴方向
        </VChip>
      </VCol>
      <VCol
        cols="4"
        class="text-center"
      >
        <VChip
          class="ma-1"
          color="#4CAF50"
        >
          Y轴方向
        </VChip>
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.trawlBoardSafeDistance"
          label="安全距离："
          :density="density"
          class="mb-2"
          suffix="mm"
        />
        <VTextField
          v-model="formData.trawlBoardName"
          label="网板名称："
          :density="density"
          class="mb-2"
        />
          
        <VTextField
          v-model="formData.trawlBoardThickness"
          label="厚度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VSelect
          v-model="formData.trawlBoardShape"
          :density="density"
          :items="shaps"
          class="mb-2"
          label="形状"
        />
        <VSelect
          v-model="formData.trawlBoardState"
          :density="density"
          :items="items"
          label="是否开启"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.trawlBoardLengthX"
          label="板："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardOffsetX"
          label="原点偏移："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardSiteX"
          label="占位："
          :density="density"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardSiteLengthX"
          label="单元尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardSiteSpaceX"
          label="单元间距："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VTextField
          v-model="formData.trawlBoardLengthY"
          label="板："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardOffsetY"
          label="原点偏移："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardSiteY"
          label="占位："
          :density="density"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardSiteLengthY"
          label="单元尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.trawlBoardSiteSpaceY"
          label="单元间距："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
