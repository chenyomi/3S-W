import { en, zhHans } from 'vuetify/locale'
import en_es from './en'
import zhHans_es from './zh-Hans'

export const messages = {
  'en': {
    ...en,
    ...en_es,
    $vuetify: {
      badge: 'badge',
      open: 'open',
    },
  },
  'zh-Hans': {
    ...zhHans,
    ...zhHans_es,
    $vuetify: {
      badge: '徽章',
      open: '打开',
    },
  },
}
