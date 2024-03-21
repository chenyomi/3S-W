import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


export class createBoard {
  constructor(options) {
    this.options = {
      container: '#box',   //容器id
      upper: {
        trawlBoardLengthX: 800,
        trawlBoardLengthY: 400,
        trawlBoardOffsetX: 20,
        trawlBoardOffsetY: 20,
        trawlBoardSiteSpaceX: 10,
        trawlBoardSiteSpaceY: 10,
        trawlBoardSiteLengthX: 83,
        trawlBoardSiteLengthY: 83,
        trawlBoardSiteX: 8,
        trawlBoardSiteY: 4,
        trawlBoardShape: 1,
        trawlBoardThickness: 3,
      },
      materials: [],
      lower: {
        layerBoardLengthX: 800,
        layerBoardLengthY: 400,
        layerBoardThickness: 5,
      },
      L1X: 500,
      L1Y: 400,
      L1Z: -300,
      L2X: -500,
      L2Y: 400,
      L2Z: -300,
      materialList: []
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
    this.cardBox.addEventListener('click', (event) => {
      event.preventDefault()
      var intersects = this.getIntersects(event.layerX, event.layerY)
      if (intersects.length > 0) {
        var res = intersects.filter(function (res) {
          return res && res.object
        })[0]
        if (res && res.object && res.object.userData.id) {
          // 更改选中模型颜色
          const index = this.options.materialList.findIndex(item => item === res.object.userData.id)
          if (index == -1) {
            this.options.materialList.push(res.object.userData.id)
            res.object.material.color.set("#fde308")
          } else {
            this.options.materialList.splice(index, 1)
            res.object.material.color.set("#97b2c8")
          }
          this.onModalChange(this.options.materialList)
        }
      }
    }, false)
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
    this.options.materialList = []
    this.scene.clear()
  }
  getIntersects(x, y) {
    // x/y 是鼠标点击点距页面左/上距离 
    var raycaster = new THREE.Raycaster()
    var mouseVector = new THREE.Vector2()

    let dom = document.getElementById('box')
    let width = dom.clientWidth;
    let height = dom.clientHeight;
    // 当前容器距页面上/左的距离
    let offsetTop = dom.offsetTop
    let offsetLeft = dom.offsetLeft
    x = ((x - offsetLeft) / width) * 2 - 1
    y = -((y - offsetTop) / height) * 2 + 1
    mouseVector.set(x, y);

    raycaster.setFromCamera(mouseVector, this.camera);

    return raycaster.intersectObjects(this.scene.children, true)
  }
  // eslint-disable-next-line sonarjs/cognitive-complexity
  updata(options) {
    this.theme = localStorage.getItem('theme')

    const axesHelper = new THREE.AxesHelper(200)

    this.scene.add(axesHelper)
    axesHelper.position.x = -this.options.upper.trawlBoardLengthX / 2 - 10
    axesHelper.position.z = -this.options.upper.trawlBoardLengthY / 2 - 10
    axesHelper.position.y = this.options.upper.trawlBoardThickness


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

    this.camera.position.set(0, this.options.upper.trawlBoardLengthY, this.options.upper.trawlBoardLengthY)

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(this.options.upper.trawlBoardLengthX, this.options.upper.trawlBoardThickness, this.options.upper.trawlBoardLengthY),
      new THREE.MeshStandardMaterial({
        color: 0xc3d6d3,
        roughness: 0.3, // 设置粗糙度为0.3，使其表面具有一些纹理
      }),
    )

    cube.position.y = this.options.upper.trawlBoardThickness / 2

    const cube_ = new THREE.Mesh(
      new THREE.BoxGeometry(this.options.lower.layerBoardLengthX, this.options.lower.layerBoardThickness, this.options.lower.layerBoardLengthY),
      new THREE.MeshLambertMaterial({
        color: 0xccdbdd,
      }),
    )

    cube_.position.y = -this.options.lower.layerBoardThickness / 2

    this.scene.add(cube_)

    const squareShape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(0, this.options.upper.trawlBoardLengthY)
      .lineTo(this.options.upper.trawlBoardLengthX, this.options.upper.trawlBoardLengthY)
      .lineTo(this.options.upper.trawlBoardLengthX, 0)
      .lineTo(0, 0)

    for (let colIndex = 0; colIndex < this.options.upper.trawlBoardSiteY; colIndex++) {
      for (let rowIndex = 0; rowIndex < this.options.upper.trawlBoardSiteX; rowIndex++) {
        const row_ = this.options.upper.trawlBoardOffsetX + (this.options.upper.trawlBoardSiteLengthX + this.options.upper.trawlBoardSiteSpaceX) * rowIndex + this.options.upper.trawlBoardSiteLengthX / 2
        const col_ = this.options.upper.trawlBoardOffsetY + (this.options.upper.trawlBoardSiteLengthY + this.options.upper.trawlBoardSiteSpaceY) * colIndex + this.options.upper.trawlBoardSiteLengthY / 2

        const path = new THREE.Path()
        if (this.options.upper.trawlBoardShape == 0) {
          path.moveTo(row_ - this.options.upper.trawlBoardSiteLengthX / 2, col_ - this.options.upper.trawlBoardSiteLengthY / 2)
          path.lineTo(row_ + this.options.upper.trawlBoardSiteLengthX / 2, col_ - this.options.upper.trawlBoardSiteLengthY / 2)
          path.lineTo(row_ + this.options.upper.trawlBoardSiteLengthX / 2, col_ + this.options.upper.trawlBoardSiteLengthY / 2)
          path.lineTo(row_ - this.options.upper.trawlBoardSiteLengthX / 2, col_ + this.options.upper.trawlBoardSiteLengthY / 2)
          squareShape.holes.push(path)
        } else {


          path.absarc(row_, col_, this.options.upper.trawlBoardSiteLengthX / 2, 0, Math.PI * 2, false)
          squareShape.holes.push(path)
        }


      }
    }


    let geometry = new THREE.ExtrudeGeometry(squareShape, { depth: this.options.upper.trawlBoardThickness, bevelEnabled: false, curveSegments: 50 })

    let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      color: 0xc3d6d3,
      roughness: 0.3, // 设置粗糙度为0.3，使其表面具有一些纹理
    }))
    mesh.position.set(-this.options.upper.trawlBoardLengthX / 2, this.options.upper.trawlBoardThickness, -this.options.upper.trawlBoardLengthY / 2)
    mesh.rotation.set(Math.PI / 2, 0, 0)
    this.scene.add(mesh)

    // 渲染工件
    let job = null

    // 静态数据 立方体
    this.options.materials.forEach(e => {
      if (e.materialShape == 0) {
        e.geo = [e.materialLengthX, e.materialLengthZ, e.materialLengthY]
      } else if (e.materialShape == 1) {
        e.geo = [e.materialLengthX / 2, e.materialLengthY / 2, e.materialLengthZ]
      }

      e.pos = [e.centerPointX - this.options.upper.trawlBoardLengthX / 2, (e.materialLengthZ / 2), e.centerPointY - this.options.upper.trawlBoardLengthY / 2]
    })
    this.options.materials.forEach(e => {
      const isSelect = this.options.materialList.some(c => c == e.id)
      if (e.materialShape == 0) {
        job = new THREE.Mesh(
          new THREE.BoxGeometry(...e.geo),
          new THREE.MeshLambertMaterial({
            color: isSelect ? 0xfde308 : 0x97b2c8,
          }),
        )
      }
      else if (e.materialShape == 1) {
        job = new THREE.Mesh(
          new THREE.CylinderGeometry(...e.geo),
          new THREE.MeshLambertMaterial({
            color: isSelect ? 0xfde308 : 0x97b2c8,
          }),
        )
      }
      job.userData = {
        id: e.id
      }
      job.position.set(...e.pos)

      this.scene.add(job)
    })

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
