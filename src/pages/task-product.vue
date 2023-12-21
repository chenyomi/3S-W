<script setup>
import { cloneDeep } from 'lodash'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
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
  { title: '物料-2', value: '1', data: cloneDeep(mainData) },
  { title: '物料-3', value: '2', data: cloneDeep(mainData) },
  { title: '物料-4', value: '3', data: cloneDeep(mainData) },
])

const tools = [
  { title: '夹具-1', value: '0' },
  { title: '夹具-2', value: '1' },
  { title: '夹具-3', value: '2' },
  { title: '夹具-4', value: '3' },
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



  // 获取mesh的世界坐标，你会发现mesh的世界坐标受到父对象group的.position影响
  // const worldPosition = new THREE.Vector3()
  // scene.getWorldPosition(worldPosition)

  // const axesHelper = new THREE.AxesHelper(100)

  // scene.add(axesHelper)

  const camera = new THREE.PerspectiveCamera(
    75,
    boxW / boxH,
    0.1,
    1000,
  )



  camera.position.set(formData.value.clientX, formData.value.clientY, formData.value.clientZ)

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
      color: 0x9ed2ff,
    }),
  )

  job.position.set(0, 0, 0)
  scene.add(job)

  // 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)

  composer.addPass(renderPass)

  const v2 = new THREE.Vector2(boxW, boxH)
  const outlinePass = new OutlinePass(v2, scene, camera)

  outlinePass.selectedObjects = [job]
  composer.addPass(outlinePass)

  function animate() {
    composer.render()
    animation =  requestAnimationFrame(animate) //向浏览器发起一个执行某函数的请求， 什么时候会执行由浏览器决定，一般默认保持60FPS的频率
    // renderer.render(scene, camera) //每次渲染出一幅图像
    
  }
  animate()

  const controls = new OrbitControls(camera, renderer.domElement)

  // controls.target.set(80, 80, 80)


  //domElement canvas对象
  const domBox = document.querySelector('#box')

  renderer.domElement.setAttribute('class', 'fadeIn')
  domBox.appendChild(renderer.domElement)
}



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
  setTimeout(() => {
    !mdAndDown.value && getThree()
  }, 0)
})
onUnmounted(() => {
  cancelAnimationFrame(animation)
})
</script>

<template>
  <VCard class="h-100 px-3">
    <div
      class="d-flex gap-3 align-center w-75"
      :style="!mdAndDown?'position:absolute;top: 1.25rem;left: 1.25rem;':'margin-top:1.25rem' "
    >
      <VSelect
        v-model="select"
        :items="items"
        :density="density"
        class="flex-none w-25"
        label="当前物料"
      />
      <VTextField
        v-model="formData.num"
        label="数量"
        :density="density"
        class="w-25"
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
          :density="density"
          class="mb-2"
          label="物料形状"
        />
        <VTextField
          v-model="formData.clientX"
          label="X轴长度："
          :density="density"
          class="mb-2"
          suffix="mm"
        />
        <VTextField
          v-model="formData.clientY"
          label="Y轴长度："
          :density="density"
          class="mb-2"
          suffix="mm"
        />
          
        <VTextField
          v-model="formData.clientZ"
          label="Z轴长度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.shift"
          label="机器速度限制："
          :density="density"
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
          v-model="formData.jia1"
          :items="tools"
          :density="density"
          label="当前夹具"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx1"
          label="夹指长度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx2"
          label="夹深："
          :density="density"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx3"
          label="Grip width："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx4"
          label="X轴长度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmx5"
          label="Y轴长度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
      <VCol cols="4">
        <VSelect
          v-model="formData.jia2"
          :items="tools"
          :density="density"
          label="当前夹具"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy1"
          label="夹指长度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy2"
          label="夹深："
          :density="density"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy3"
          label="Grip width："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy4"
          label="X轴长度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
        <VTextField
          v-model="formData.exmy5"
          label="Y轴长度："
          :density="density"
          suffix="mm"
          class="mb-2"
        />
      </VCol>
    </VRow>
  </VCard>
</template>
