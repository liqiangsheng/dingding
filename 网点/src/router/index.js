import Vue from 'vue'
import Router from 'vue-router'
import storage from "@/assets/js/storage"
const Home = resolve => require(["@/components/Home"], resolve);
const order = resolve => require(["@/components/order/order"], resolve);
const login = resolve => require(["@/components/login"], resolve);
const master = resolve => require(["@/components/masterManagement/masterManagement"],resolve);
const masterOrder = resolve => require(["@/components/masterManagement/masterOrder"],resolve);
const masterDetail = resolve => require(["@/components/masterManagement/masterDetail"],resolve);
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
            path: '/login',
            isShow:false,
            component: login,
            name:"登陆",
        },
      ]
})

router.beforeEach((to, from, next) => {
    console.log(document.title)
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
                    next()
                }
            }
    }
})
export default router;
