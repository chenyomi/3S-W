<template>
  <VerticalNavLink
    v-for="item in constRouter"
    :key="item"
    :item="{
      title: item.meta.name,
      icon: item.icon,
      to: item.path,
    }"
  />
</template>

<script setup>
import { constRouter } from "@/router"
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue"
</script>
