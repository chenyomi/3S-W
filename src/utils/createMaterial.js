import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'


export class createMaterial {
  constructor(options) {
    this.options = {
      container: '#box',   //容器id
      materialTemplateShape: 0, //0立方体1圆柱
      materialTemplateLengthX: 100, //立方体X
      materialTemplateLengthY: 100, //立方体Y
      materialTemplateLengthZ: 100, //立方体Z /圆柱高Z
      L1X: 500,
      L1Y: 400,
      L1Z: -300,
      L2X: -500,
      L2Y: 400,
      L2Z: 300,
    }
    this.animation = null
    this.domBox = null
    this.cardBox = null
    this.composer = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.v2 = null
    this.renderer = null
    this.updata(options)
  }
  disWebGl() {
    cancelAnimationFrame(this.animation)
    this.animation = null
    this.domBox.innerHTML = ''
    this.scene.clear()
    this.cardBox = null
    this.renderer.forceContextLoss()
    this.renderer.dispose()
    this.renderer = null
    this.camera = null
    this.composer = null
    this.v2 = null
    this.scene = null
    this.controls = null
  }
  updata(options) {
    this.theme = localStorage.getItem('theme')
    this.options = Object.assign(this.options, options)
    this.cardBox = document.querySelector(this.options.container)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.cardBox.clientWidth, this.cardBox.clientHeight)
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.shadowMap.enabled = true
    this.scene = new THREE.Scene()

    const axesHelper = new THREE.AxesHelper(200)

    this.scene.add(axesHelper)
    axesHelper.position.x = -this.options.materialTemplateLengthX / 2 - 10
    axesHelper.position.z = -this.options.materialTemplateLengthZ / 2 - 10
    axesHelper.position.y = -this.options.materialTemplateLengthY / 2 - 10


    this.v2 = new THREE.Vector2(this.cardBox.clientWidth, this.cardBox.clientHeight)
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.cardBox.clientWidth / this.cardBox.clientHeight,
      0.1,
      1000,
    )
    this.camera.position.set(0, 1.2 * this.options.materialTemplateLengthZ, 1.2 * this.options.materialTemplateLengthZ)

    const light1 = new THREE.DirectionalLight(0xeeeeee, this.theme == 'light' ? 2 : 1)

    light1.position.set(this.options.L1X, this.options.L1Y, this.options.L1Z)
    this.scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xeeeeee, this.theme == 'light' ? 2 : 1)

    light2.position.set(this.options.L2X, this.options.L2Y, this.options.L2Z)

    this.scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xaaaaaa, this.theme == 'light' ? 3 : 2)

    this.scene.add(ambientLight)

    // 渲染工件
    let job = null
    if (this.options.materialTemplateShape == 0) {
      job = new THREE.Mesh(
        new THREE.BoxGeometry(this.options.materialTemplateLengthX, this.options.materialTemplateLengthZ, this.options.materialTemplateLengthY),
        new THREE.MeshLambertMaterial({
          color: 0x9ed2ff,
        }),
      )
    } else {
      job = new THREE.Mesh(
        new THREE.CylinderGeometry(this.options.materialTemplateLengthX / 2, this.options.materialTemplateLengthX / 2, this.options.materialTemplateLengthZ),
        new THREE.MeshLambertMaterial({
          color: 0x9ed2ff,
        }),
      )
    }
    job.position.set(0, 0, 0)

    this.scene.add(job)
    this.composer = new EffectComposer(this.renderer)

    const renderPass = new RenderPass(this.scene, this.camera)

    this.composer.addPass(renderPass)

    const outlinePass = new OutlinePass(this.v2, this.scene, this.camera)

    outlinePass.selectedObjects = [job]

    this.composer.addPass(outlinePass)

    const animate = () => {
      this.composer.render()
      this.animation = requestAnimationFrame(animate) //向浏览器发起一个执行某函数的请求， 什么时候会执行由浏览器决定，一般默认保持60FPS的频率

    }

    animate()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    //domElement canvas对象
    this.domBox = document.querySelector('#box')
    this.renderer.domElement.setAttribute('class', 'fadeIn')
    this.domBox.appendChild(this.renderer.domElement)
  }

}
