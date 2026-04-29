import { createApp } from "vue-lynx"
import { createPinia } from "pinia"
import router from "@/router"
import { createI18n } from "@/i18n"
import App from "@/App.vue"
import "@/assets/styles/main.css"

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({ defaultLocale: "en" })

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount()
