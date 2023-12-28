<script setup>
const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})

import { useRoute } from 'vue-router'

const route = ref(useRoute())
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
      :class="(props.item.to == route.matched[1].path || props.item.title == route.matched[1].meta.menuActiveName) ? 'router-link-exact-active':''"   
    >
      <VIcon
        :icon="item.icon"
        class="nav-item-icon"
      />
      <!-- 👉 Title -->
      <span class="nav-item-title">
        {{ $t(item.title) }}
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
