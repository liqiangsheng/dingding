import Vue from 'vue'
import Router from 'vue-router'
import storage from "@/assets/js/storage"
const Home = resolve => require(["@/components/Home"], resolve);
const order = resolve => require(["@/components/order/order"], resolve);
const login = resolve => require(["@/components/login"], resolve);
const masterPosition = resolve => require(["@/components/order/components/materPosition"], resolve);
const orderDetail = resolve => require(["@/components/order/components/orderDetail"], resolve);
const master = resolve => require(["@/components/masterManagement/masterManagement"],resolve);
const masterOrder = resolve => require(["@/components/masterManagement/masterOrder"],resolve);
const masterDetail = resolve => require(["@/components/masterManagement/masterDetail"],resolve);
const addMaster = resolve => require(["@/components/masterManagement/addMaster"], resolve)
const setting = resolve => require(["@/components/setting/setting"], resolve);
const dotInformation = resolve => require(["@/components/setting/components/dotInformation"], resolve);
const messageCenter = resolve => require(["@/components/messageCenter/messageCenter"], resolve);
 Vue.use(Router);
 let router = new Router({
  routes: [
        {
            path: '/',
            redirect: '/order',
             isShow:false,
        },
        {
            path: '/home',
            component: Home,
            name:"121212",
             isShow:false,
        },
         {
            path: '/order',
            isShow:true,
            component: order,
            name:"工单管理",
            iconName:"order_icon"
        },
      {
        path: '/orderDetail',
        isShow:false,
        component: orderDetail,
        name:"工单详情",
      },
        {
          path: '/masterPosition',
          isShow:false,
          component: masterPosition,
          name:"师傅位置",
        },
        {
          path: '/master',
          isShow:true,
          component: master,
          name:"师傅管理",
          iconName:"master_icon"
        },
      {
        path: '/masterOrder',
        isShow:false,
        component: masterOrder,
        name:"师傅订单",
       },
    {
      path: '/masterDetail',
      isShow:false,
      component: masterDetail,
      name:"师傅详情",
    },
    {
      path: '/setting',
      isShow:true,
      component: setting,
      name:"设置",
      iconName:"setting_icon"
    },
    {
      path: '/dotInformation',
      isShow:false,
      component:dotInformation,
      name:"网点详情",
    },
    {
      path: '/messageCenter',
      isShow:false,
      component: messageCenter,
      name:"消息中心",
    },
        {
            path: '/login',
            isShow:false,
            component: login,
            name:"登陆",
        },
    {
      path: '/addMaster',
      component: addMaster,
      name: '新建师傅'
    }
      ]
})
import axios from "axios"
router.beforeEach((to, from, next) => {


    if(!!to.name)document.title=to.name;
    if(!!storage.getLocalStorage("userInfo")&&to.path==='/login'){
            next({path:"/order"})
    } else{
        if (to.path.startsWith('/login')) {
               storage.getLocalStorage("userInfo","")
                next()
            } else {
                if (!storage.getLocalStorage("userInfo")) {
                    next({ path: '/login'})
                } else {
                  Vue.prototype.$http=axios.create({
                    headers: { 'content-type': 'application/json',"token": storage.getLocalStorage("userInfo").token}
                  });
                    next()
                }
            }
    }
})
export default router;
