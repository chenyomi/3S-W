<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <Header
        ref="headerRef"
        :fn="toggleVerticalOverlayNavActive"
        :matched="matched"
      />
    </template>

    <template #vertical-nav-content>
      <LeftMenu />
    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 illustration -->
      <LeftMenuBox />
    </template>
    <div class="d-flex gap-3 h-100 w-100">
      <div
        class="slot-box  h-100 w-100"
        style="border-radius: 0.5rem;overflow-x: hidden;overflow-y: scroll;"
      >
        <RouterView :header="headerRef" />
      </div>


      <VSlideXReverseTransition hide-on-leave>
        <VCard v-if="subNavList.length">
          <div
            v-for="(item, i) in subNavList"
            :key="item"
          >
            <VBtn
              variant="text"
              rounded="0"
              block
              height="55"
              :to="`${subMain}/${item.path}`"
              :color="route.path == `${subMain}/${item.path}` ? 'primary' : ''"
            >
              {{ item.meta.name }}
            </VBtn>
            <div
              v-if="i < subNavList.length - 1"
              style="text-align: center;"
            >
              <VIcon
                icon="bxs-downvote"
                size="16"
              />
            </div>
          </div>
        </VCard>
      </VSlideXReverseTransition>
    </div>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <template #setting>
      <Setting />
    </template>
  </VerticalNavLayout>
</template>

<script setup>
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue"


// Components
import Footer from "@/layouts/components/Footer.vue"
import Header from "@/layouts/components/Header.vue"
import LeftMenu from "@/layouts/components/LeftMenu.vue"
import LeftMenuBox from "@/layouts/components/LeftMenuBox.vue"
import Setting from "@/layouts/components/Setting.vue"
import { computed, ref } from "vue"
import { useRoute } from "vue-router"

const headerRef = ref()

let route = useRoute()

const matched = computed(() => {
  const b = []

  route.matched.forEach((e, i) => {
    i !== 0 && b.push({ title: e.meta.name })
  })
  
  return b
})

const subNavList = computed(() => {
  return route.matched[1].children
})

const subMain = computed(() => {
  return route.matched[1].path
})
</script>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.slot-box {
  &::-webkit-scrollbar {
    background: rgb(var(--v-theme-surface));
    block-size: 8px;
    border-end-end-radius: 14px;
    border-start-end-radius: 14px;
    inline-size: 0;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgb(var(--v-theme-perfect-scrollbar-thumb));
    inline-size: 4;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }
}
</style>
