import { createApp } from "vue-lynx"
import router from "@/router"
// @webstack:imports
import App from "@/App.vue"
import "@/assets/styles/main.css"

const app = createApp(App)
// @webstack:use

app.use(router)

app.mount()
