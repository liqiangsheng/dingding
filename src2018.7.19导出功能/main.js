// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.devtools = true
import "../static/fonts/style.css";
import dialog from 'hsy-vue-dialog'
import App from './App'
// import 'babel-polyfill'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import '@/assets/styles/common.css'
import '@/assets/iconfont.css'
import '@/assets/styles/main.scss'
import Mock from './mock'
import Vuex from "vuex"
import axios from 'axios'
import  qs from "qs"
import moment from 'moment'
import charts from 'v-charts'
import './filter'
import {isButtonObj} from "@/components/commonJs/nav_ishow"
import { mutations } from "@/vuex/mutations"
import { state } from "@/vuex/state"
import { actions } from "@/vuex/actions"
import {testReg,imageExp,selectorExp,selectorExpSite} from "@/components/commonJs/regExp"
import queryFun from "@/components/commonJs/queryFun"
import seqencingIcon from "@/components/commInfo/seqencingIcon"
import inputs from "@/components/commInfo/inputs"
import commAlerttext from "@/components/commInfo/commAlerttext"
import commonAlert from "@/components/commInfo/commonAlert"
import index from "@/canal_components/assets/index"
import Pagination from "@/components/commInfo/pageing"       //分页组件
import addressInput from "@/components/commInfo/addressInput"       //分页组件
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.component("seqencingIcon",seqencingIcon);
Vue.component("addressInput",addressInput);
Vue.component("commonAlert",commonAlert);
Vue.component("inputsList",inputs);
Vue.component("commAlerttext",commAlerttext);
Vue.component("Pagination",Pagination);                      //分页组件
//缓存  start
import { getLocalStorage, setLocalStorage, getSession ,getLocalStorageUserInfo} from "../static/js/session";
Vue.prototype.$getLocalStorage = getLocalStorageUserInfo;
Vue.prototype._$=index;
const common =window.common;
// Vue.prototype.$apiIM = common;  //IM客服系统
Vue.prototype.$Qs = qs;
Vue.prototype.$common = common;
Vue.prototype.$reportdomain = common.reportdomain;
Vue.prototype.$apidomain = common.apidomain;
Vue.prototype.$apiModel = common.apiModel;
Vue.prototype.$masterTest = common.masterTest;
Vue.prototype.$apiupdate = common.apiupdate;
Vue.prototype.$apiGps = common.apiGps;
Vue.prototype.$pcApi = common.pcApi;
Vue.prototype.$amap_url = common.amap_url;
Vue.prototype.$common=common;
Vue.prototype.$apiCSV = common.apiCSV;
Vue.prototype.$testReg = testReg;
Vue.prototype.$queryFun = queryFun;
Vue.prototype.$imageExp = imageExp;
Vue.prototype.$selectorExpSite = selectorExpSite;
Vue.prototype.$selectorExp = selectorExp;
Vue.prototype.$moment = moment;
Vue.prototype.$isButtonObj=isButtonObj.isButtonFun;
if (getLocalStorageUserInfo("enrolleeinfo").length > 0) {
  Vue.prototype.$http = axios.create({
        headers: { 'content-type': 'application/json',"token": getLocalStorageUserInfo("enrolleeinfo")[0].token }
        //headers: { 'content-type': 'application/json',"token": JSON.parse(Cookies.get("enrolleeinfo")).token}
    });
} else {
    Vue.prototype.$http = axios.create({
        headers: { 'content-type': 'application/json'}
    });
}
Vue.use(Vuex);
Vue.use(iView);
Vue.use(charts);
Vue.use(dialog);
Mock.init();
const store = new Vuex.Store({
    state,
    mutations,
    actions
});
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});





// import Tooltip from '@/components/commInfo/Tooltip'
// Vue.component('Tooltip',Tooltip); //电话图标全局注册
