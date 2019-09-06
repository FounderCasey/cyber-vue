import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  firestorePlugin
} from 'vuefire'
import firebase from 'firebase'
import Clipboard from "v-clipboard";
import Notifications from 'vue-notification'
import VueMoment from 'vue-moment';
import moment from 'moment';
import VueStripeCheckout from 'vue-stripe-checkout';

Vue.use(firestorePlugin)
Vue.use(Clipboard)
Vue.use(Notifications)
Vue.use(VueMoment, {
  moment,
});
Vue.use(VueStripeCheckout, {
  publishableKey: 'pk_test_2bQCHjLC9ayiIBuTycUQOjkc006EL3oHwL'
});

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