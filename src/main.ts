import './assets/main.css'

import { createApp } from 'vue'
import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router/index.js'


createApp(App).use(router).use(Antd).mount('#app')
