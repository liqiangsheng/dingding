// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import moment from "moment"
import Vue from 'vue'
import App from './App'
import router from './router'
import "mint-ui/lib/style.min.css"
import "../static/js/rem.js"
import "@/assets/js/filter"
import "@/assets/fonts/iconfont.css"
import mintui from 'mint-ui'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import Vuex from "vuex"
import { mutations } from "@/vuex/mutations"
import { state } from "@/vuex/state";
import "@/assets/js/extendVue";
// import {setCookie,getCookie} from "@/js/cookie"
import VueCookie from "vue-cookie"
import animate from 'animate.css'
import MuseUI from 'muse-ui'
import storage from "@/assets/js/storage"
import 'muse-ui/dist/muse-ui.css'


Vue.use(MuseUI)
Vue.prototype.$Toast = Toast;
Vue.use(VueCookie);
Vue.use(Vuex);
const userInfo=storage.getLocalStorage("userInfo"),
      currentDate=new Date().getTime()
if(userInfo && currentDate >= userInfo.targetTime) storage.setLocalStorage("userInfo","");

const store = new Vuex.Store({
    state,
    mutations
});

Vue.use(mintui);
Vue.config.productionTip = false;
import "@/assets/style/common.css"
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });
