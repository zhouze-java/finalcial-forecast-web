import './assets/main.css'
import 'ant-design-vue/dist/reset.css'

import { createApp } from 'vue'
import Antd, { message } from 'ant-design-vue'

import App from './App.vue'
import router from './router/index.js'


const app = createApp(App)

app.use(router).use(Antd).mount('#app')
