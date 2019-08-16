import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  firestorePlugin
} from 'vuefire'
import firebase from 'firebase'
import Clipboard from "v-clipboard";
import Notifications from 'vue-notification'

Vue.use(firestorePlugin)
Vue.use(Clipboard)
Vue.use(Notifications)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDCiMmVbsUmhDR3ZctFX08ND87hXdUKIVM",
  authDomain: "cyber-board.firebaseapp.com",
  databaseURL: "https://cyber-board.firebaseio.com",
  projectId: "cyber-board",
  storageBucket: "",
  messagingSenderId: "701524438649",
  appId: "1:701524438649:web:7ed534841d5f745f"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const db = firestore

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')