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
      :items="items"
      :density="density"
      label="当前料盘"
    />
    <div id="box" />
  </VCard>
</template>

<script setup>
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils"
import { onMounted, ref } from "vue"
import { OctreeCSG } from "../three/OctreeCSG/OctreeCSG"

const props = defineProps({
  header: { type: Object },
})

const density = inject('density')

const items = [
  { title: '料盘-1', value: '0' },
  { title: '料盘-2', value: '1' },
  { title: '料盘-3', value: '2' },
  { title: '料盘-4', value: '3' },
]

const select = ref({ title: '料盘-1', value: '0' })

const getOctreeCSG = (cube, cube1) => {
  const octree1 = OctreeCSG.fromMesh(cube)
  const octree2 = OctreeCSG.fromMesh(cube1)

  const resultOctree = OctreeCSG["subtract"](
    octree1.clone(),
    octree2.clone(),
    false,
  )

  return OctreeCSG.toGeometry(resultOctree)
}

const mergeGeo = (geos, mat, x, y, z, xPos, yPos, zPos) => {
  const box = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), mat)

  box.position.set(xPos, yPos, zPos)
  box.updateMatrix()
  geos.push(box.geometry.applyMatrix4(box.matrix))
  
  return geos
}

const tab = ref(0)
let animation = null



let geos = []

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

const btnList = inject('btnList')

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '开始',
      color: '#D32F2F',
      icon: 'bxs-zap',
      size: 'large',
      width: 220,
      mark: '是否开始任务？',
      fn: ({ close, openLoading, closeLoading }) => {
        openLoading({
          text: '正在启动中',
        })
        close()
        setTimeout(() => {
          closeLoading()
        }, 2000)
      },
    }]
  })
  setTimeout(() => {
    const cardBox = document.querySelector('#card-box')
    
    const boxH = cardBox.clientHeight
    const boxW = cardBox.clientWidth


    const boardHeight = 5
    const depth = 2
    const scene = new THREE.Scene()

    // const axesHelper = new THREE.AxesHelper(500)

    // scene.add(axesHelper)
  
    const camera = new THREE.PerspectiveCamera(
      75,
      boxW / boxH,
      0.1,
      1000,
    )

    camera.position.set(0, -180, 280)

    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(boxW, boxH)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)

    // 开启阴影渲染
    renderer.shadowMap.enabled = true

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(500, 250, depth),
      new THREE.MeshLambertMaterial({
        color: 0xccdbdd,
      }),
    )

    cube.position.z = depth / 2

    const cube_ = new THREE.Mesh(
      new THREE.BoxGeometry(500, 250, boardHeight - depth),
      new THREE.MeshLambertMaterial({
        color: 0xccdbdd,
      }),
    )

    cube_.position.z = -(boardHeight - depth) / 2
    scene.add(cube_)

    // 动态插入物体
    const mat = new THREE.MeshLambertMaterial({
      color: 0x333333,
    })

    list.map(e => {
      geos = mergeGeo(geos, mat, 50, 50, depth, e[0], e[1], depth / 2)
    })

    // 合并模型
    let merged = mergeGeometries(geos)
    let mergeMesh = new THREE.Mesh(merged, mat)

    // scene.add(mergeMesh);
    const resultGeom1 = getOctreeCSG(cube, mergeMesh)

    const subtract = new THREE.Mesh(
      resultGeom1,
      new THREE.MeshStandardMaterial({
        color: 0xc3d6d3,
        roughness: 0.3, // 设置粗糙度为0.3，使其表面具有一些纹理
      }),
    )

    scene.add(subtract)

    const light1 = new THREE.DirectionalLight(0xeeeeee, 1)


    // 设置光源位置
    light1.position.set(300, 300, 400)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xeeeeee, 1)


    // 设置光源位置
    light2.position.set(-300, 300, 400)
    scene.add(light2)
  
    const ambientLight = new THREE.AmbientLight(0xaaaaaa, 2)

    scene.add(ambientLight)

    // 渲染工件
    const job = new THREE.Mesh(
      new THREE.BoxGeometry(10, 25, 60),
      new THREE.MeshLambertMaterial({
        color: 0x97b2c8,
      }),
    )

    job.position.set(-220, 92.5, 30)
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
   
  }, 0)
})

onUnmounted(() => {
  cancelAnimationFrame(animation)
})
</script>


