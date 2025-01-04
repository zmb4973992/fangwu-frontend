import { createApp } from "vue"
import "@/style/index.css"
import App from "@/app.vue"
import store from "@/store/index.ts"
import router from "@/router/index.ts"


createApp(App).use(store).use(router).mount("#app")
