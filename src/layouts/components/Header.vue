<template>
  <div class="d-flex h-100 align-center justify-space-between">
    <IconBtn
      class="ms-n3 d-md-none"
      @click="propsData.fn(true)"
    >
      <VIcon icon="bx-menu" />
    </IconBtn>
    
    
    <div
      class="d-flex align-center justify-space-between"
      style="flex: 1;"
    >
      <VBreadcrumbs
        class="d-none d-sm-block"
        :items="matched"
      >
        <template #divider>
          <VIcon icon="mdi-chevron-right" />
        </template>
      </VBreadcrumbs> 
      <div class="d-flex justify-end gap-2">
        <VBtn
          v-for="item in propsData.list"
          :key="item"
          :width="item.width"
          :color="item.color"
          :size="item.size"
          @click="openModal(item)"
        >
          <VIcon
            v-if="item.icon"
            :icon="item.icon"
          />
          <span
            class="d-none d-sm-block"
            style="padding-left: 8px;letter-spacing: 8px;"
          >{{ item.name }}</span>
        </VBtn>
      </div>
    </div>
   
    <Modal ref="modal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './modal.vue'

const propsData = defineProps({
  fn: {
    type: Function,
    default: () => {},
  },
  matched: {
    type: Array,
    default: e => {
      return []
    },
  },
  list: {
    type: Array,
    default: e => {
      return []
    },
  },
})

const modal = ref()

const openModal = item => {
  modal.value.open(item)
}
</script>
