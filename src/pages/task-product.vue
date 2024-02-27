<script setup>
import { createMaterial } from '@/utils/createMaterial'
import { cloneDeep } from 'lodash'
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const density = inject('density')
const btnList = inject('btnList')
const router = useRouter()
const next = inject('next')

const { mdAndDown } = useDisplay()
const dialog = ref(false)

const mainData = {
  clientX: 200,
  clientY: 80,
  clientZ: 80,
  exmx1: 70,
  exmx2: 70,
  exmx3: 90,
  exmx4: 0,
  exmx5: 0,
  exmy1: 70,
  exmy2: 70,
  exmy3: 90,
  exmy4: 0,
  exmy5: 0,
  shift: 118,
  num: 1,
  jia1: '0',
  jia2: '1',
}

const items = ref([
  { title: '物料-1', value: '0', data: cloneDeep(mainData) },
])

const tools = [
  { title: '手爪-1', value: '0' },
  { title: '手爪-2', value: '1' },
  { title: '手爪-3', value: '2' },
  { title: '手爪-4', value: '3' },
]

const proType = [
  { title: '立方体', value: '0' },
  { title: '圆柱体', value: '1' },
]

const select = ref('0')
const pro = ref({ title: '长方体', value: '0' })
const formData = ref({})

watch(select, newVal => {
  formData.value = items.value[newVal].data
}, { immediate: true })

watch(() => [formData.value.clientX, formData.value.clientY, formData.value.clientZ], () => {
  if (!mdAndDown.value) {
    webGL.disWebGl()
    setTimeout(() => {
      webGL.updata(formData.value)
    }, 0)
  }

})
watch(() => dialog.value, newVal => {
  nextTick(() => {
    if (newVal) {
      if (webGL) {
        webGL.updata(formData.value)
      } else {
        webGL = new createMaterial(formData.value)
      }


    } else {
      webGL.disWebGl()
    }

  })
})


let webGL = null

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '新增',
      color: '#42A5F5',
      size: 'large',
      width: 120,
      mark: '是否新增一个物料',
      fn: ({ close, openLoading, closeLoading }) => {
        close()
        setTimeout(() => {
          items.value.push({
            title: '物料-5',
            value: '4',
            data: {
              clientX: 0,
              clientY: 0,
              clientZ: 0,
              exmx1: 0,
              exmx2: 0,
              exmx3: 0,
              exmx4: 0,
              exmx5: 0,
              exmy1: 0,
              exmy2: 0,
              exmy3: 0,
              exmy4: 0,
              exmy5: 0,
              shift: 0,
              num: 1,
            },
          })
          select.value = ['4']
        }, 1000)
      },
    }, {
      name: '删除',
      color: '#EF5350',
      size: 'large',
      width: 120,
      mark: '是否删除当前选择的物料',
      fn: ({ close, openLoading, closeLoading }) => {
        close()
        setTimeout(() => {
          select.value = ['0']
        }, 1000)
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
  setTimeout(() => {
    if (!mdAndDown.value) {
      webGL = new createMaterial()
    }
  }, 0)
})
onUnmounted(() => {
  if (!mdAndDown.value) {
    webGL.disWebGl()
  }
})
</script>

<template>
  <VCard class="h-100 px-3" style="overflow-y: scroll;">
    <div class="d-flex gap-3 align-center w-75"
      :style="!mdAndDown ? 'position:absolute;top: 1rem;left: 0.75rem;' : 'margin-top:1.25rem'">
      <VSelect v-model="select" :items="items" :density="density" class="flex-none" label="当前物料" />
      <VTextField v-model="formData.num" label="数量" :density="density" />
      <VTextField v-model="formData.finallyName" label="成品名称：" :density="density" />
      <VDialog v-if="mdAndDown" v-model="dialog" width="500">
        <template #activator="{ props }">
          <VBtn color="primary" v-bind="props" variant="tonal">
            <VIcon icon="bxs-cube-alt" />
          </VBtn>
        </template>
        <VCard>
          <VCardText>
            <div id="box" class="w-100" style="height: 300px;" />
          </VCardText>
        </VCard>
      </VDialog>
    </div>

    <div v-if="!mdAndDown" class="d-flex" style="height: calc(100% / 2 - 30px);">
      <div style="flex: 1;" />
      <div id="box" class="h-100" style="flex: 1;">
        <div v-if="!mdAndDown" class="pix">
          <div>
            <span style="background: #ffa726;" />
            <span>X</span>
          </div>
          <div>
            <span style="background: #039be5;" />
            <span>Y</span>
          </div>
          <div>
            <span style="background: #b2ff59;" />
            <span>Z</span>
          </div>
        </div>
      </div>
    </div>
    <VRow>
      <VCol cols="4" class="text-center pb-0">
        <VChip class="mt-3 mb-1" color="#00897B">
          物料
        </VChip>
      </VCol>
      <VCol cols="4" class="text-center pb-0">
        <VChip class="mt-3 mb-1" color="#00897B">
          装载
        </VChip>
      </VCol>
      <VCol cols="4" class="text-center pb-0">
        <VChip class="mt-3 mb-1" color="#00897B">
          卸载
        </VChip>
      </VCol>
      <VCol cols="4">
        <VSelect v-model="pro" :items="proType" :density="density" disabled class="mb-2" label="物料形状" />
        <VTextField v-model="formData.clientX" label="X轴长度：" :density="density" disabled class="mb-2" suffix="mm" />
        <VTextField v-model="formData.clientY" label="Y轴长度：" :density="density" disabled class="mb-2" suffix="mm" />

        <VTextField v-model="formData.clientZ" label="Z轴长度：" :density="density" disabled suffix="mm" class="mb-2" />
        <!--
          <VSwitch
          v-model="formData.status"
          color="primary"
          class="mt-6"
          label="启用/禁用"
          /> 
        -->
      </VCol>
      <VCol cols="4" :style="!mdAndDown ? 'height: calc(50vh - 130px); overflow-y: scroll;' : ''">
        <VSelect v-model="formData.jia1" :items="tools" :density="density" label="手爪" class="mb-2" />
        <VTextField v-model="formData.exmx1" label="夹指长度：" :density="density" suffix="mm" class="mb-2" disabled />
        <VTextField v-model="formData.exmx2" label="夹深：" :density="density" class="mb-2" disabled />
        <VTextField v-model="formData.exmx3" label="指宽：" :density="density" suffix="mm" class="mb-2" disabled />
        <VTextField v-model="formData.exmx4" label="X轴长度：" :density="density" suffix="mm" class="mb-2" disabled />
        <VTextField v-model="formData.exmx5" label="Y轴长度：" :density="density" suffix="mm" class="mb-2" disabled />
      </VCol>
      <VCol cols="4" :style="!mdAndDown ? 'height: calc(50vh - 130px); overflow-y: scroll;' : ''">
        <VSelect v-model="formData.jia2" :items="tools" :density="density" label="手爪" class="mb-2" />
        <VTextField v-model="formData.exmy1" label="夹指长度：" :density="density" suffix="mm" class="mb-2" disabled />
        <VTextField v-model="formData.exmy2" label="夹深：" :density="density" class="mb-2" disabled />
        <VTextField v-model="formData.exmy3" label="指宽：" :density="density" suffix="mm" class="mb-2" disabled />
        <VTextField v-model="formData.exmy4" label="X轴长度：" :density="density" suffix="mm" class="mb-2" disabled />
        <VTextField v-model="formData.exmy5" label="Y轴长度：" :density="density" suffix="mm" class="mb-2" disabled />
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.pix {
  position: absolute;
  inset-block-start: 60px;
  inset-inline-end: 15px;

  div {
    margin-block-end: 5px;

    span {
      display: inline-block;
      vertical-align: middle;
    }

    span:first-child {
      border-radius: 3px;
      background: #333;
      block-size: 20px;
      inline-size: 20px;
      margin-inline-end: 10px;
    }
  }
}
</style>
