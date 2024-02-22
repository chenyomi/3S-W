<script setup>
import gripApi from '@/api/grip'
import { getDict } from '@/utils/utils'
import { cloneDeep } from 'lodash'

const propsData = defineProps({
  data: { type: Object },
})

const density = inject('density')

const formData = ref(cloneDeep(propsData.data))
const types = getDict('sss_hand_type')

const submit = () => {
  return new Promise(resolve => {
    gripApi.handEdit(formData.value).finally(() => {
      resolve()
    })
  })
  
}

defineExpose({
  submit,
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.handName"
          label="名称："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.handCode"
          label="编号："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VSelect
          v-model="formData.handType"
          :density="density"
          :items="types"
          label="类型："
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.fingerNumber"
          label="指数量："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.fingerLength"
          label="指长："
          :density="density"
        />
      </VCol>
      
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.fingerWidth"
          label="指宽："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      >
        <VTextField
          v-model="formData.fingerDepth"
          label="夹深："
          :density="density"
        />
      </VCol>
      <VCol
        cols="6"
        class="text-center"
      />
      <VCol
        cols="6"
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
        cols="6"
        class="text-center"
      >
        <VChip
          class="ma-1"
          color="#4CAF50"
        >
          Y轴方向
        </VChip>
      </VCol>
        
      <VCol cols="6">
        <VTextField
          v-model="formData.handSizeX"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.handLocateX"
          label="定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="6">
        <VTextField
          v-model="formData.handSizeY"
          label="尺寸："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.handLocateY"
          label="定位："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
