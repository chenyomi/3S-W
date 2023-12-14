<script setup>
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const propsData = defineProps({
  header: { type: Object },
})

const router = useRouter()
const { mdAndDown } = useDisplay()
const dialog = ref(false)

const items = [
  { title: '物料-1', value: '0' },
  { title: '物料-2', value: '1' },
  { title: '物料-3', value: '2' },
  { title: '物料-4', value: '3' },
]

const tools = [
  { title: '夹具-1', value: '0' },
  { title: '夹具-2', value: '1' },
  { title: '夹具-3', value: '2' },
  { title: '夹具-4', value: '3' },
]

const proType = [
  { title: '长方体', value: '0' },
  { title: '圆柱体', value: '1' },
  { title: '立方体', value: '2' },
]

const select = ref({ title: '物料-1', value: '0' })
const tool = ref({ title: '夹具-1', value: '0' })
const pro = ref({ title: '长方体', value: '0' })

const formData = ref({
  distans: 11,
  name: '128*108 1004792',
  clientX: 200,
  clientY: 80,
  clientZ: 80,
  status: true,
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
  raster: 118,
  shift: 118,
  
})


let animation = null

const list = [
  [-200, 80],
  [-200, 0],
  [-200, -80],
  [-120, 80],
  [-120, 0],
  [-120, -80],
  [-40, 80],
  [-40, 0],
  [-40, -80],
  [40, 80],
  [40, 0],
  [40, -80],
  [120, 80],
  [120, 0],
  [120, -80],
  [200, 80],
  [200, 0],
  [200, -80],
]

watch(() => [formData.value.clientX, formData.value.clientY, formData.value.clientZ], () => {
  if (!mdAndDown.value) {
    const domBox = document.querySelector('#box')

    cancelAnimationFrame(animation)
    domBox.innerHTML = ''
    getThree()
  }
  
})
watch(() => dialog.value, newVal => {
  nextTick(() => {
    if (newVal) {
      getThree()
    } else {
      const domBox = document.querySelector('#box')

      cancelAnimationFrame(animation)
      domBox.innerHTML = ''
    }
    
  })
})

const getThree = () => {
  const cardBox = document.querySelector('#box')
  const boxH = cardBox.clientHeight
  const boxW = cardBox.clientWidth

  const scene = new THREE.Scene()

  // const axesHelper = new THREE.AxesHelper(500)

  // scene.add(axesHelper)

  const camera = new THREE.PerspectiveCamera(
    75,
    boxW / boxH,
    0.1,
    1000,
  )

  camera.position.set(-formData.value.clientX, formData.value.clientY, formData.value.clientZ)

  const renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(boxW, boxH)
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(window.devicePixelRatio)

  // 开启阴影渲染
  renderer.shadowMap.enabled = true

  const light1 = new THREE.DirectionalLight(0xeeeeee, 1)


  // 设置光源位置
  light1.position.set(300, 300, 300)
  scene.add(light1)

  const light2 = new THREE.DirectionalLight(0xeeeeee, 1)


  // 设置光源位置
  light2.position.set(-300, 300, 400)
  scene.add(light2)
  
  const ambientLight = new THREE.AmbientLight(0xaaaaaa, 2)

  scene.add(ambientLight)

  // 渲染工件
  const job = new THREE.Mesh(
    new THREE.BoxGeometry(formData.value.clientX, formData.value.clientY, formData.value.clientZ),
    new THREE.MeshLambertMaterial({
      color: 0x1E88E5,
    }),
  )


  job.position.set(0, 0, 0)
  scene.add(job)


  function animate() {
    animation =  requestAnimationFrame(animate) //向浏览器发起一个执行某函数的请求， 什么时候会执行由浏览器决定，一般默认保持60FPS的频率
    renderer.render(scene, camera) //每次渲染出一幅图像
  }
  animate()
  new OrbitControls(camera, renderer.domElement)
  
  //domElement canvas对象
  const domBox = document.querySelector('#box')

  renderer.domElement.setAttribute('class', 'fadeIn')
  domBox.appendChild(renderer.domElement)
}



onMounted(() => {
  nextTick(() => {
    propsData.header.setHeaderData([{
      name: '下一步',
      color: '#D32F2F',
      icon: 'bxs-zap',
      size: 'large',
      width: 220,
      mark: '是否完成进入下一步？',
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading({
          text: '正在保存中',
        })
        close()
        setTimeout(() => {
          closeLoading()
          router.push({ path: '/process/eqpt' })
        }, 2000)
      },
    }])
  })
  setTimeout(() => {
    !mdAndDown.value && getThree()
  }, 0)
})
onUnmounted(() => {
  cancelAnimationFrame(animation)
  propsData.header.setHeaderData([])
})
</script>

<template>
  <VCard class="h-100 px-3">
    <div
      class="d-flex gap-3 align-center"
      :style="!mdAndDown?'position:absolute;top: 1.25rem;left: 1.25rem;':'margin-top:1.25rem' "
    >
      <VSelect
        v-model="select"
        :items="items"
        density="compact"
        style="width: 12.5rem;"
        label="当前物料"
      />
      <VDialog
        v-if="mdAndDown"
        v-model="dialog"
        width="500"
      >
        <template #activator="{ props }">
          <VBtn
            color="primary"
            v-bind="props"
            variant="tonal"
          >
            <VIcon icon="bxs-cube-alt" />
          </VBtn>
        </template>
        <VCard>
          <VCardText>
            <div
              id="box"
              class="w-100"
              style="height: 300px;"
            />
          </VCardText>
        </VCard>
      </VDialog>
    </div>
   
    <div
      v-if="!mdAndDown"
      class="d-flex h-50"
    >
      <div style="flex: 1;" />
      <div
        id="box"
        class="h-100"
        style="flex: 1;"
      />
    </div>
    <VRow>
      <VCol
        cols="4"
        class="text-center pb-0"
      >
        <VChip
          class="mt-3 mb-1"
          color="#00897B"
        >
          物料
        </VChip>
      </VCol>
      <VCol
        cols="4"
        class="text-center pb-0"
      >
        <VChip
          class="mt-3 mb-1"
          color="#00897B"
        >
          装载
        </VChip>
      </VCol>
      <VCol
        cols="4"
        class="text-center pb-0"
      >
        <VChip
          class="mt-3 mb-1"
          color="#00897B"
        >
          卸载
        </VChip>
      </VCol>
      <VCol cols="4">
        <VSelect
          v-model="pro"
          :items="proType"
          density="compact"
          class="mb-2"
          label="物料形状"
        />
        <VTextField
          v-model="formData.clientX"
          label="X轴长度："
          density="compact"
          class="mb-2"
          suffix="mm"
        />
        <VTextField
          v-model="formData.clientY"
          label="Y轴长度："
          density="compact"
          class="mb-2"
          suffix="mm"
        />
          
        <VTextField
          v-model="formData.clientZ"
          label="Z轴长度："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.shift"
          label="机器速度限制："
          density="compact"
          class="mb-2"
        />
        <!--
          <VSwitch
          v-model="formData.status"
          color="primary"
          class="mt-6"
          label="启用/禁用"
          /> 
        -->
      </VCol>
      <VCol cols="4">
        <VSelect
          v-model="tool"
          :items="tools"
          density="compact"
          label="当前夹具"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx1"
          label="夹指长度："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx2"
          label="夹深："
          density="compact"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx3"
          label="Grip width："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx4"
          label="X轴长度："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx5"
          label="Y轴长度："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VSelect
          v-model="tool"
          :items="tools"
          density="compact"
          label="当前夹具"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy1"
          label="夹指长度："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy2"
          label="夹深："
          density="compact"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy3"
          label="Grip width："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy4"
          label="X轴长度："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy5"
          label="Y轴长度："
          density="compact"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VCard>
</template>
