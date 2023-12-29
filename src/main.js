import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import { i18n, vuetify } from '@/plugins/vuetify'
import { router } from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import 'default-passive-events'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

//icon https://boxicons.com 


const pinia = createPinia()

const app = createApp(App)

app.use(vuetify)
app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app')
