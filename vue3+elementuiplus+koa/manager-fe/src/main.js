import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import axios from "axios"

import './assets/style/index.scss'
import './assets/style/reset.css'
import config from  './config'
import request from './utils/request'


const app = createApp(App)

// console.log(import.meta.env);
// console.log(config);
// axios.get(config.mockApi + '/login').then((res) => {
//   console.log(res);
// })

app.config.globalProperties.$request = request
app.use(router)

app.mount('#app')
