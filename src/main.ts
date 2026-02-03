import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import '../node_modules/reset-css/sass/_reset.scss'

const app=createApp(App)
app.use(router)
app.mount('#app')

