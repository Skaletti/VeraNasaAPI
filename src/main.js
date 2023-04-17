import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue'

import router from '@/routers/index'

import 'element-plus/theme-chalk/dark/css-vars.css'

import '../src/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus)

app.use(router)

app.mount('#app')