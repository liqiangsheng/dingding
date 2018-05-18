import Vue from "vue"
import axios from "axios"
import moment from "moment"
import commonJs from "@/assets/js/commonJs"

import {getCookie,setCookie} from "@/assets/js/cookie"
Vue.prototype.$moment=moment;
Vue.prototype.$commonJs=commonJs;
Vue.prototype.$httpFilter=commonJs.httpFilter;
Vue.prototype.$common=window.common;
Vue.prototype.$http = axios;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$common=window.common
