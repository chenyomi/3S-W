<script setup>
import pos from '@images/svg/pos.svg'
import { onMounted } from 'vue'

const propsData = defineProps({
  data: { type: Object },
})

const formData = ref(propsData.data)

const svgEmbed = ref(null)

onMounted(() => {
  setTimeout(() => {

    const embed = document.getElementById('embed')
    if (embed) {
      svgEmbed.value = document.getElementById('embed').getSVGDocument()


      const baseOffsetX = 27
      const baseOffsetY = 27
      const baseW = embed.clientWidth

      const baseH = baseW / 2

      const mainData = Object.assign({
        exmx1: 20,
        exmx2: 10,
        exmx3: 65,
        exmx4: 10,
        exmy1: 20,
        exmy2: 5,
        exmy3: 65,
        exmy4: 10,
      }, formData.value)


      const svg = svgEmbed.value.getElementById('svg')
      const box = svgEmbed.value.getElementById('box')
      const itemBox = svgEmbed.value.getElementById('itemBox')

      // if (theme.name.value == 'dark') {
      //   svg.style.background = 'rgb(43,44,64)'
      // } else {
      //   svg.style.background = 'rgb(255,255,255)'
      // }
      const baseItemW = baseW - baseOffsetX*2 //工件宽度缩放后参考值  默认800 等比例缩放用于计算
      

      svg.setAttribute('width', baseW)
      svg.setAttribute('height', 450)
      box.setAttribute('width', baseItemW)
      box.setAttribute('height', baseItemW / 2)


      const numX = new Array(mainData.exmx2).fill()
      const numY = new Array(mainData.exmy2).fill()
      if (mainData.type == 0) {
        numY.forEach((c, ny) => {
          numX.forEach((e, nx) => {
            let element = document.createElementNS("http://www.w3.org/2000/svg", "rect") // 这里以 rect 为例子
            element.setAttribute('x', baseOffsetX + mainData.exmx1 + (mainData.exmx3 + mainData.exmx4)*nx)
            element.setAttribute('y', baseOffsetY + mainData.exmy1 + (mainData.exmy3 + mainData.exmy4)*ny)
            element.setAttribute('width', mainData.exmx3)
            element.setAttribute('height', mainData.exmy3)
            element.style.fill = '#aaaaaa'
            svg.appendChild(element)
          })
        })
      }
      if (mainData.type == 1) {
        const r = mainData.exmx3 / 2

        numY.forEach((c, ny) => {
          numX.forEach((e, nx) => {
            let element = document.createElementNS("http://www.w3.org/2000/svg", "circle") // 这里以 rect 为例子
            element.setAttribute('cx', baseOffsetX + mainData.exmx1 + r + (mainData.exmx3 + mainData.exmx4)*nx)
            element.setAttribute('cy', baseOffsetY + mainData.exmy1 + r + (mainData.exmy3 + mainData.exmy4)*ny)
            element.setAttribute('r', r)
            element.style.fill = '#aaaaaa'
            svg.appendChild(element)
          })
        })
      }
    }
   
  }, 500)

})

const submit = () => {
  return new Promise(resolve => {
    resolve()
  })
}

defineExpose({
  submit,
})
</script>

<template>
  <embed
    id="embed"
    :src="pos"
    width="100%"
    height="auto"
    type="image/svg+xml"
  >
  <div
    class="w-100 pa-1"
    style="background: #000;color: #fff;font-size: 0.75rem;"
  >
    <div class="d-flex flex-wrap gap-x-10 justify-center">
      <span>板（X）：{{ formData.exmx0 }}mm</span>
      <span>原点偏移（X）：{{ formData.exmx1 }}mm</span>
      <span>占位（X）：{{ formData.exmx2 }}个</span>
      <span>单元尺寸（X）：{{ formData.exmx3 }}mm</span>
      <span>间距（X）：{{ formData.exmx4 }}mm</span>
    </div>
    <div class="d-flex flex-wrap gap-x-10 justify-center">
      <span>板（Y）：{{ formData.exmy0 }}mm</span>
      <span>原点偏移（Y）：{{ formData.exmy1 }}mm</span>
      <span>占位（Y）：{{ formData.exmy2 }}个</span>
      <span>单元尺寸（Y）：{{ formData.exmy3 }}mm</span>
      <span>间距（Y）：{{ formData.exmy4 }}mm</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
v-deep .v-card-item {
  display: none;
}

.v-card-actions {
  display: none;
}
</style>

