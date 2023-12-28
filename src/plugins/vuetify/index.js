
import { messages } from '@/locale'
import { createI18n, useI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import defaults from './defaults'
import { icons } from './icons'
import theme from './theme'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

const lang = localStorage.getItem('lang')
export const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: lang || 'en',
  messages,
})

export const vuetify = createVuetify({
  aliases: {
    IconBtn: VBtn,
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  defaults,
  icons,
  theme,
})
