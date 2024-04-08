<script setup>
import loginApi from "@/api/login";
import Message from "@/layouts/components/Message.vue";
import { useStore } from "@/pinia/index";
import logo from '@images/logo.jpg';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const message = ref()
const router = useRouter()
const form = ref({
  username: 'admin',
  password: '',
  remember: false,
})
const roles = ref([
  { title: '管理员', value: 'admin' },
  { title: '访客', value: 'common' },
])
onMounted(() => {
  nextTick(() => {
    store.setMessage(message)
  })
})
const onLogin = () => {
  loginApi.login(form.value).then(res => {
    localStorage.setItem("token", res.token);
    const theme = localStorage.getItem('theme')
    if (!theme) {
      localStorage.setItem('theme', 'light')
    }
    router.push('/')
  })
}
const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448" min-width="370">
      <VCardItem class="justify-center">
        <template #prepend>
          <VImg :src="logo" style="width: 2rem;height: 2rem;border-radius: 3px;" />
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          YooMi
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          欢迎访问! 👋🏻
        </h5>
        <p class="mb-0">
          请登录您的账号！
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="onLogin">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VSelect v-model="form.username" :items="roles" label="角色" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="密码" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'" autocomplete
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox v-model="form.remember" label="记住密码" />
              </div>

              <!-- login button -->
              <VBtn block type="submit">
                登录
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
  <Message ref="message" />
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

.auth-wrapper {
  background-image: url("../assets/images/bg.png");
  background-size: cover;
}
</style>
