// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import "mint-ui/lib/style.min.css"
import "../static/js/rem.js"
import "@/assets/js/filter"
import "@/assets/fonts/iconfont.css"
import mintui, {Indicator, Toast} from 'mint-ui'
import Vuex from "vuex"
import {mutations} from "@/vuex/mutations"
import {state} from "@/vuex/state";
import {actions} from "@/vuex/actions";
import {getters} from "@/vuex/getters";
import "@/assets/js/extendVue";
// import {setCookie,getCookie} from "@/js/cookie"
import VueCookie from "vue-cookie"
import MuseUI from 'muse-ui'
import storage from "@/assets/js/storage"
import 'muse-ui/dist/muse-ui.css'

import C_header from "./components/masterManagement/addMasterCom/C_header.vue";
import "@/assets/style/common.css"

Vue.component('C_header', C_header); //头部全局注册
Vue.use(MuseUI)

Vue.prototype.$Toast = Toast;
Vue.prototype.$ToastMessage=v=>Toast( {message: v, iconClass: 'mintui mintui-success' });
Vue.use(VueCookie);
Vue.use(Vuex);
const userInfo=storage.getLocalStorage("userInfo"),
      currentDate=new Date().getTime()
if(userInfo && currentDate >= userInfo.targetTime) storage.setLocalStorage("userInfo","");

const store = new Vuex.Store({
    state,
  mutations,
  actions,
  getters
});

Vue.use(mintui);
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,

    store,
    template: '<App/>',
    components: { App }
  });
