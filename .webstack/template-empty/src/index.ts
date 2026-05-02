import { createApp } from "vue-lynx"
import router from "@/router"
// @webstack:import
import App from "@/App.vue"
import "@/assets/styles/main.css"

const app = createApp(App)
app.use(router)
// @webstack:use

app.mount()
