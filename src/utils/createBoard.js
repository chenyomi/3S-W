import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { OctreeCSG } from "../three/OctreeCSG/OctreeCSG"

export class createBoard {
  constructor(options) {
    this.options = {
      container: '#box',   //容器id
      pro: '0', //0立方体1圆柱
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
      L1X: 500,
      L1Y: 400,
      L1Z: -300,
      L2X: -500,
      L2Y: 400,
      L2Z: -300,
    }
    this.animation = null
    this.domBox = null
    this.cardBox = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.renderer = null
    this.geos = []
    this.init()
    this.updata(options)
  }
  init() {
    this.cardBox = document.querySelector(this.options.container)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.cardBox.clientWidth / this.cardBox.clientHeight,
      0.1,
      1000,
    )
    
  }
  disWebGl() {
    cancelAnimationFrame(this.animation)
    this.animation = null
    this.domBox.innerHTML = ''
    this.controls = null
    this.renderer.dispose()

    // this.renderer.forceContextLoss()
    this.renderer = null
    this.geos = []
    this.scene.clear()
  }
  updata(options) {
    const axesHelper = new THREE.AxesHelper(500)

    this.scene.add(axesHelper)
    this.options = Object.assign(this.options, options)
    

    const light1 = new THREE.DirectionalLight(0xeeeeee, 1)

    light1.position.set(this.options.L1X, this.options.L1Y, this.options.L1Z)
    this.scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xeeeeee, 1)

    light2.position.set(this.options.L2X, this.options.L2Y, this.options.L2Z)

    this.scene.add(light2)
  
    const ambientLight = new THREE.AmbientLight(0xaaaaaa, 2)

    this.scene.add(ambientLight)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.cardBox.clientWidth, this.cardBox.clientHeight)
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.shadowMap.enabled = true

    this.camera.position.set(0, this.options.exmy0, this.options.exmy0)

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(this.options.exmx0, this.options.raster, this.options.exmy0),
      new THREE.MeshStandardMaterial({
        color: 0xc3d6d3,
        roughness: 0.3, // 设置粗糙度为0.3，使其表面具有一些纹理
      }),
    )

    cube.position.y = this.options.raster / 2

    const cube_ = new THREE.Mesh(
      new THREE.BoxGeometry(this.options.tuobanx, this.options.tuobanz, this.options.tuobany),
      new THREE.MeshLambertMaterial({
        color: 0xccdbdd,
      }),
    )

    cube_.position.y = -this.options.tuobanz/2

    this.scene.add(cube_)

    // 动态插入物体
    const mat = new THREE.MeshLambertMaterial({
      color: 0x333333,
    })

    let box = null
    
    if (this.options.type == 0) {
      box = new THREE.InstancedMesh(new THREE.BoxGeometry(this.options.exmx3, this.options.raster, this.options.exmy3), mat, this.options.exmy2 * this.options.exmx2)
    } else {
      box = new THREE.InstancedMesh(new THREE.CylinderGeometry(this.options.exmx3 / 2, this.options.exmx3 / 2, this.options.raster), mat, this.options.exmy2 * this.options.exmx2)
    }
    const matrix = new THREE.Matrix4()
    let index = 0
    for (let colIndex = 0; colIndex < this.options.exmy2; colIndex++) {
      for (let rowIndex = 0; rowIndex < this.options.exmx2; rowIndex++) {
        const row = this.options.exmx1 + (this.options.exmx3 + this.options.exmx4) * rowIndex - this.options.exmx0 / 2 + this.options.exmx3 / 2
        const col = this.options.exmy1 + (this.options.exmy3 + this.options.exmy4) * colIndex - this.options.exmy0 / 2 + this.options.exmy3 / 2

        // if (this.options.type == 0) {
        //   box = new THREE.Mesh(new THREE.BoxGeometry(this.options.exmx3, this.options.raster, this.options.exmy3), mat)
        // } else {
        //   box = new THREE.Mesh(new THREE.CylinderGeometry(this.options.exmx3 / 2, this.options.exmx3 / 2, this.options.raster), mat)
        // }
        // box.position.set(row, this.options.raster / 2, col)
        // box.updateMatrix()
        matrix.setPosition(row, (this.options.raster / 2) + 0.5, col)
        box.setMatrixAt(index, matrix)
        index = index + 1

        // this.geos.push(box.geometry.applyMatrix4(box.matrix))
      }
    }
    console.log(box, cube)
    this.scene.add(box)
    this.scene.add(cube)

    // 合并模型
    // let merged = mergeGeometries(this.geos)


    // let mergeMesh = new THREE.Mesh(merged, mat)
    // const resultGeom1 = this.getOctreeCSG(cube, mergeMesh)
    const resultGeom1 = this.getOctreeCSG(cube, box)


    const subtract = new THREE.Mesh(
      resultGeom1,
      new THREE.MeshStandardMaterial({
        color: 0xc3d6d3,
        roughness: 0.3, // 设置粗糙度为0.3，使其表面具有一些纹理
      }),
    )

    // this.scene.add(subtract)

    // 渲染工件
    let job = null

    // 渲染工件
    job = new THREE.Mesh(
      new THREE.BoxGeometry(10, 25, 60),
      new THREE.MeshLambertMaterial({
        color: 0x97b2c8,
      }),
    )

    job.position.set(-220, 92.5, 30)

    // this.scene.add(job)
    const animate = () => {
      this.animation =  requestAnimationFrame(animate) //向浏览器发起一个执行某函数的请求， 什么时候会执行由浏览器决定，一般默认保持60FPS的频率
      this.renderer.render(this.scene, this.camera) //每次渲染出一幅图像
    }

    animate()
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    //domElement canvas对象
    this.domBox = document.querySelector('#box')
    this.renderer.domElement.setAttribute('class', 'fadeIn')
    this.domBox.appendChild(this.renderer.domElement)


  }
  getOctreeCSG  (cube, cube1)  {
    const octree1 = OctreeCSG.fromMesh(cube)
    const octree2 = OctreeCSG.fromMesh(cube1)

    const resultOctree = OctreeCSG["subtract"](
      octree1.clone(),
      octree2.clone(),
      false,
    )
  
    return OctreeCSG.toGeometry(resultOctree)
  }
}
