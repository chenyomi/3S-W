<script setup>
import pos from '@images/svg/pos.svg';
import { onMounted } from 'vue';

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

      const mainData = Object.assign({
        trawlBoardOffsetX: 20,
        trawlBoardSiteX: 10,
        trawlBoardSiteLengthX: 65,
        trawlBoardSiteSpaceX: 10,
        trawlBoardOffsetY: 20,
        trawlBoardSiteY: 5,
        trawlBoardSiteLengthY: 65,
        trawlBoardSiteSpaceY: 10,
      }, formData.value)


      const svg = svgEmbed.value.getElementById('svg')
      const box = svgEmbed.value.getElementById('box')

      // if (theme.name.value == 'dark') {
      //   svg.style.background = 'rgb(43,44,64)'
      // } else {
      //   svg.style.background = 'rgb(255,255,255)'
      // }
      const baseItemW = baseW - baseOffsetX * 2 //工件宽度缩放后参考值  默认800 等比例缩放用于计算
      const baseItemH = baseItemW * mainData.trawlBoardLengthY / mainData.trawlBoardLengthX

      svg.setAttribute('width', baseW)
      svg.setAttribute('height', baseItemH + baseOffsetY * 2)
      box.setAttribute('width', baseItemW)
      box.setAttribute('height', baseItemH)

      const numX = new Array(mainData.trawlBoardSiteX).fill()
      const numY = new Array(mainData.trawlBoardSiteY).fill()
      if (mainData.trawlBoardShape == 0) {
        numY.forEach((c, ny) => {
          numX.forEach((e, nx) => {
            let element = document.createElementNS("http://www.w3.org/2000/svg", "rect") // 这里以 rect 为例子
            element.setAttribute('x', baseOffsetX + mainData.trawlBoardOffsetX + (mainData.trawlBoardSiteLengthX + mainData.trawlBoardSiteSpaceX) * nx)
            element.setAttribute('y', baseOffsetY + mainData.trawlBoardOffsetY + (mainData.trawlBoardSiteLengthY + mainData.trawlBoardSiteSpaceY) * ny)
            element.setAttribute('width', mainData.trawlBoardSiteLengthX)
            element.setAttribute('height', mainData.trawlBoardSiteLengthY)
            element.style.fill = '#aaaaaa'
            svg.appendChild(element)
          })
        })
      }
      if (mainData.trawlBoardShape == 1) {
        const r = mainData.trawlBoardSiteLengthX / 2

        numY.forEach((c, ny) => {
          numX.forEach((e, nx) => {
            let element = document.createElementNS("http://www.w3.org/2000/svg", "circle") // 这里以 rect 为例子
            element.setAttribute('cx', baseOffsetX + mainData.trawlBoardOffsetX + r + (mainData.trawlBoardSiteLengthX + mainData.trawlBoardSiteSpaceX) * nx)
            element.setAttribute('cy', baseOffsetY + mainData.trawlBoardOffsetY + r + (mainData.trawlBoardSiteLengthY + mainData.trawlBoardSiteSpaceY) * ny)
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
  <embed id="embed" :src="pos" width="100%" height="auto" type="image/svg+xml">
  <div class="w-100 pa-1" style="background: #000;color: #fff;font-size: 0.75rem;">
    <div class="d-flex flex-wrap gap-x-10 justify-center">
      <span>板（X）：{{ formData.trawlBoardLengthX }}mm</span>
      <span>原点偏移（X）：{{ formData.trawlBoardOffsetX }}mm</span>
      <span>占位（X）：{{ formData.trawlBoardSiteX }}个</span>
      <span>单元尺寸（X）：{{ formData.trawlBoardSiteLengthX }}mm</span>
      <span>间距（X）：{{ formData.trawlBoardSiteSpaceX }}mm</span>
    </div>
    <div class="d-flex flex-wrap gap-x-10 justify-center">
      <span>板（Y）：{{ formData.trawlBoardLengthY }}mm</span>
      <span>原点偏移（Y）：{{ formData.trawlBoardOffsetY }}mm</span>
      <span>占位（Y）：{{ formData.trawlBoardSiteY }}个</span>
      <span>单元尺寸（Y）：{{ formData.trawlBoardSiteLengthY }}mm</span>
      <span>间距（Y）：{{ formData.trawlBoardSiteSpaceY }}mm</span>
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

