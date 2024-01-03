<template>
  <VCard
    id="card-box"
    class="h-100"
    style="flex: 1;"
  >
    <VSelect
      v-model="select"
      class="w-25"
      style="position: absolute;top: 1rem;left: 0.75rem;"
      :items="desserts"
      :density="density"
      label="当前料盘"
      item-title="name"
      item-value="id"
      @update:model-value="onChange"
    />
    <div class="pix">
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
    <div
      id="box"
      class="h-100"
    />
  </VCard>
</template>

<script setup>
import { createBoard } from '@/utils/createBoard'
import { onMounted, ref } from "vue"

import { useRouter } from 'vue-router'

const router = useRouter()
const next = inject('next')

const density = inject('density')
const btnList = inject('btnList')
const select = ref(1)

const modalData = ref()

const onChange = () => {
  setTimeout(() => {
    modalData.value =  desserts.filter(e => e.id ==select.value)[0]
    webGL.disWebGl()
    webGL.updata(modalData.value)
  }, 500)
}


let desserts = [
  {
    id: 1,
    distans: 8,
    name: '800*400 1004791 料盘1号',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 8,
    exmx3: 83,
    exmx4: 10,
    exmy1: 20,
    exmy2: 4,
    exmy3: 83,
    exmy4: 10,
    raster: 3,
    tuobanx: 800,
    tuobany: 400,
    tuobanz: 5,
  },
  {
    id: 2,
    distans: 8,
    name: '800*400 1004792 料盘2号',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
    tuobanx: 800,
    tuobany: 400,
    tuobanz: 5,
  },
  {
    id: 3,
    distans: 8,
    name: '800*400 1004793 料盘3号',
    status: true,
    type: 1,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
    tuobanx: 800,
    tuobany: 400,
    tuobanz: 5,
  },
  {
    id: 4,
    distans: 8,
    name: '800*400 1004794 料盘4号',
    status: true,
    type: 1,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 8,
    exmx3: 83,
    exmx4: 10,
    exmy1: 20,
    exmy2: 4,
    exmy3: 83,
    exmy4: 10,
    raster: 3,
    tuobanx: 800,
    tuobany: 400,
    tuobanz: 5,
  },
  {
    id: 5,
    distans: 8,
    name: '800*400 1004795 料盘5号',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
    tuobanx: 800,
    tuobany: 400,
    tuobanz: 5,
  },
  {
    id: 6,
    distans: 8,
    name: '800*400 1004796 料盘6号',
    status: true,
    type: 0,
    exmx0: 800,
    exmy0: 400,
    exmx1: 20,
    exmx2: 10,
    exmx3: 65,
    exmx4: 10,
    exmy1: 20,
    exmy2: 5,
    exmy3: 65,
    exmy4: 10,
    raster: 3,
    tuobanx: 800,
    tuobany: 400,
    tuobanz: 5,
  },
]

let webGL = null
onMounted(() => {
  nextTick(() => {
    btnList.value = [{
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
    modalData.value =  desserts.filter(e => e.id ==select.value)[0]
    webGL = new createBoard(modalData.value)
  }, 0)
})

onUnmounted(() => {
  webGL.disWebGl()
})
</script>


<style lang="scss">
.pix {
  position: absolute;
  inset-block-start: 70px;
  inset-inline-start: 20px;

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
