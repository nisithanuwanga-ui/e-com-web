import { createApp } from 'vue'

// 1. Point to the correct CSS file for your setup
import './assets/main.css' 

import App from './App.vue'

// 2. Be explicit by pointing directly to the index.ts file
import router from './router/index' 

const app = createApp(App)

app.use(router)
app.mount('#app')