<template>
  <VerticalNavLink
    :item="{
      title: '监控',
      icon: 'bxl-deezer',
      to: '/monitor',
    }"
  />
  <VerticalNavLink
    :item="{
      title: '任务列表',
      icon: 'bx-sidebar',
      to: '/tasklist',
    }"
  />
  <VerticalNavLink
    :item="{
      title: '任务',
      icon: 'bxs-zap',
      to: '/task',
    }"
  />
  <VerticalNavLink
    :item="{
      title: '储位',
      icon: 'bx-shape-square',
      to: '/drawer',
    }"
  />
  <VerticalNavLink
    :item="{
      title: '托盘',
      icon: 'bxs-hard-hat',
      to: '/pallet',
    }"
  />
</template>

<script setup>
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue"
</script>
