import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export class createBoard {
  constructor(options) {
    this.options = {
      container: '#box',   //容器id
      name: '800*400 1004796 料盘6号',
      status: true,
      type: 0, //0立方体 1圆柱
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
    this.renderer.forceContextLoss()
    this.renderer.dispose()
    this.renderer = null
    this.geos = []
    this.scene.clear()
  }
  updata(options) {
    this.theme = localStorage.getItem('theme')

    const axesHelper = new THREE.AxesHelper(200)

    this.scene.add(axesHelper)
    axesHelper.position.x = -this.options.exmx0 / 2 - 10
    axesHelper.position.z = -this.options.exmy0 / 2 - 10
    axesHelper.position.y = this.options.raster


    this.options = Object.assign(this.options, options)
    

    const light1 = new THREE.DirectionalLight(0xeeeeee, this.theme == 'light' ? 2 : 1)

    light1.position.set(this.options.L1X, this.options.L1Y, this.options.L1Z)
    this.scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xeeeeee, this.theme == 'light' ? 2 : 1)

    light2.position.set(this.options.L2X, this.options.L2Y, this.options.L2Z)

    this.scene.add(light2)
  
    const ambientLight = new THREE.AmbientLight(0xaaaaaa, this.theme == 'light' ? 3 : 2)

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

    const squareShape = new THREE.Shape()
      .moveTo( 0, 0 )
      .lineTo( 0, this.options.exmy0 )
      .lineTo( this.options.exmx0, this.options.exmy0 )
      .lineTo( this.options.exmx0, 0 )
      .lineTo(0, 0)

    for (let colIndex = 0; colIndex < this.options.exmy2; colIndex++) {
      for (let rowIndex = 0; rowIndex < this.options.exmx2; rowIndex++) {
        const row_ = this.options.exmx1 + (this.options.exmx3 + this.options.exmx4) * rowIndex  + this.options.exmx3 / 2
        const col_ = this.options.exmy1 + (this.options.exmy3 + this.options.exmy4) * colIndex  + this.options.exmy3 / 2

        const path = new THREE.Path()
        if (this.options.type == 0) {
          path.moveTo(row_ - this.options.exmx3 / 2, col_ - this.options.exmy3 / 2)
          path.lineTo(row_ + this.options.exmx3 / 2, col_ - this.options.exmy3 / 2)
          path.lineTo(row_ + this.options.exmx3 / 2, col_ + this.options.exmy3 / 2)
          path.lineTo(row_ - this.options.exmx3 / 2, col_ + this.options.exmy3 / 2)
          squareShape.holes.push(path)
        } else {
          

          path.absarc(row_, col_, this.options.exmx3 / 2, 0, Math.PI * 2, false)
          squareShape.holes.push(path)
        }
       
       
      }
    }


    let geometry = new THREE.ExtrudeGeometry( squareShape, { depth: this.options.raster, bevelEnabled: false, curveSegments: 50 } )

    let mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial({
      color: 0xc3d6d3,
      roughness: 0.3, // 设置粗糙度为0.3，使其表面具有一些纹理
    }) )
    mesh.position.set( -this.options.exmx0 / 2, this.options.raster, -this.options.exmy0 / 2)
    mesh.rotation.set(Math.PI/2, 0, 0)
    this.scene.add( mesh )

    // 渲染工件
    let job = null

    // 静态数据 立方体
    if (this.options.type == 0) {
      const data = [
        {
          geo: [10, 20, 60],
          pos: [this.options.exmx1 + 5 - this.options.exmx0 / 2, 10, this.options.exmy1 + 30 - this.options.exmy0 / 2],
        },
        {
          geo: [10, 20, 60],
          pos: [this.options.exmx1 + 25 - this.options.exmx0 / 2, 10, this.options.exmy1 + 30 - this.options.exmy0 / 2],
        },
        {
          geo: [10, 20, 60],
          pos: [this.options.exmx1 + 45 - this.options.exmx0 / 2, 10, this.options.exmy1 + 30 - this.options.exmy0 / 2],
        },

      ]

      data.forEach(item => {
        job = new THREE.Mesh(
          new THREE.BoxGeometry(...item.geo),
          new THREE.MeshLambertMaterial({
            color: 0x97b2c8,
          }),
        )

        job.position.set(...item.pos)

        this.scene.add(job)
      })
     
    } else {
      const data = [
        {
          geo: [20, 20, 50],
          pos: [this.options.exmx1 + this.options.exmx3 / 2 - this.options.exmx0 / 2, 25, this.options.exmy1  + this.options.exmy3 / 2 - this.options.exmy0 / 2],
        },
        {
          geo: [20, 20, 50],
          pos: [this.options.exmx1 + this.options.exmx3 / 2 - this.options.exmx0 / 2, 25, this.options.exmy1  + this.options.exmy3 / 2 - this.options.exmy0 / 2 + (this.options.exmy3 + this.options.exmy4)],
        },
        {
          geo: [20, 20, 50],
          pos: [this.options.exmx1 + this.options.exmx3 / 2 - this.options.exmx0 / 2, 25, this.options.exmy1  + this.options.exmy3 / 2 - this.options.exmy0 / 2 + (this.options.exmy3 + this.options.exmy4) * 2],
        },

      ]

      data.forEach(item => {
        job = new THREE.Mesh(
          new THREE.CylinderGeometry(...item.geo),
          new THREE.MeshLambertMaterial({
            color: 0x97b2c8,
          }),
        )

        job.position.set(...item.pos)
        this.scene.add(job)
      })
    }

   

    const animate = () => {
      this.animation = requestAnimationFrame(animate) //向浏览器发起一个执行某函数的请求， 什么时候会执行由浏览器决定，一般默认保持60FPS的频率
      this.renderer.render(this.scene, this.camera) //每次渲染出一幅图像
    }

    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    //domElement canvas对象
    this.domBox = document.querySelector('#box')
    this.renderer.domElement.setAttribute('class', 'fadeIn')
    this.domBox.appendChild(this.renderer.domElement)
    animate()
  }
}
