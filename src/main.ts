import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import {createApp} from "vue";
import Notifications from '@kyvg/vue3-notification'

const pinia = createPinia()
const app = createApp(App)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)
library.add(faMagnifyingGlass)
library.add(faCartShopping)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)
app.use(Notifications)
app.mount('#app')
