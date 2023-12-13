<script setup>
const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})

import { useRoute } from 'vue-router'

const route = ref(useRoute())

console.log(props.item.to, route.value.matched[1].path)
</script>

<template>
  <li
    class="nav-link"
    :class="{ disabled: item.disable }"
  >
    <Component
      :is="item.to ? 'RouterLink' : 'a'"
      :to="item.to"
      :href="item.href"
      :class="props.item.to == route.matched[1].path ? 'router-link-exact-active':''"   
    >
      <VIcon
        :icon="item.icon"
        class="nav-item-icon"
      />
      <!-- 👉 Title -->
      <span class="nav-item-title">
        {{ item.title }}
      </span>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
