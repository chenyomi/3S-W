<template>
  <div class="d-flex align-center pa-4 gap-3 justify-space-between">
    <UserProfile />
    <div>
      <VBtn
        size="40"
        rounded
        class="pa-2 mx-3"
        color="none"
        @click="changeLoc"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          class="v-icon__svg"
        ><path
          fill="currentColor"
          d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z"
        /></svg>
      </VBtn>
      <NavbarThemeSwitcher />
    </div>
  </div>
</template>

<script setup>
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue"
import UserProfile from "@/layouts/components/UserProfile.vue"
import { useStore } from "@/pinia"
import { useLocale } from 'vuetify'

const store = useStore()
const { current } = useLocale()


const changeLoc = () => {
  if (current.value === 'en') {
    localStorage.setItem('lang', 'zh-Hans')
    current.value = 'zh-Hans'
  } else {
    localStorage.setItem('lang', 'en')
    current.value = 'en'
  }
  store.$patch(state=> {
    state.view = !state.view
    setTimeout(() => {
      state.view = !state.view
    }, 0)
  })
}
</script>

