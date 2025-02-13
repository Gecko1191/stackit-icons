import 'sit-onyx/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createToastProvider, TOAST_PROVIDER_INJECTION_KEY } from 'sit-onyx'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider())
app.mount('#app')
