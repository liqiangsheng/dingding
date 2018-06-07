import Vue from 'vue'
import Router from 'vue-router'
import storage from "@/assets/js/storage"
import axios from "axios"

const Home = resolve => require(["@/components/Home"], resolve);
const order = resolve => require(["@/components/order/order"], resolve);
const login = resolve => require(["@/components/login/login"], resolve);
const revisePassword = resolve => require(["@/components/login/revisePassword"], resolve);
const masterPosition = resolve => require(["@/components/order/components/materPosition"], resolve);
const orderDetail = resolve => require(["@/components/order/components/orderDetail"], resolve);
const unusualReport = resolve => require(["@/components/order/components/unusualReport"], resolve);
const master = resolve => require(["@/components/masterManagement/masterManagement"],resolve);
const masterOrder = resolve => require(["@/components/masterManagement/masterOrder"],resolve);
const masterDetail = resolve => require(["@/components/masterManagement/masterDetail"],resolve);
const addMaster = resolve => require(["@/components/masterManagement/addMaster"], resolve)
const changeMaster = resolve => require(["@/components/changeMaster/changeMaster"], resolve)
const setting = resolve => require(["@/components/setting/setting"], resolve);
const dotInformation = resolve => require(["@/components/setting/components/dotInformation"], resolve);
const messageCenter = resolve => require(["@/components/messageCenter/messageCenter"], resolve);
const serviceWorker = resolve => require(["@/components/masterManagement/addMasterCom/serviceWorker"], resolve); //服务工种
const serviceArea = resolve => require(["@/components/masterManagement/addMasterCom/serviceArea"], resolve); //服务区域
const editDetails = resolve => require(['@/components/masterManagement/editMasterDetails'], resolve);          //编辑师傅详情
const serviceWorkerEdit = resolve => require(['@/components/masterManagement/addMasterCom/serviceWorkerEdit'], resolve);
const serviceAreaEdit = resolve => require(['@/components/masterManagement/addMasterCom/serviceAreaEdit'], resolve);
const finance = resolve => require(["@/components/finance/finance"], resolve);      //财务
const orderTotal = resolve => require(["@/components/orderTotal/orderTotal"], resolve); //工单统计
const masterDisable = resolve => require(["@/components/masterManagement/masterDisable"],resolve); //禁用账号

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
        path: '/orderDetail/:id',
        isShow:false,
        component: orderDetail,
        name:"工单详情",
      },
        {
          path: '/masterPosition/:id',
          isShow:false,
          component: masterPosition,
          name: "备注",
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
      path: '/orderTotal',
      isShow:true,
      component: orderTotal,
      name:"工单统计",
      iconName:"orderTotal"
    },
      {
      path: '/unusualReport/:id',
      isShow:false,
      component: unusualReport,
      name:"异常报备",
    },
    {
      path: '/finance',
      isShow:true,
      component: finance,
      name:"财务管理",
      iconName:"finance"
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
            name:"登录",
        },
        {
          path: '/addMaster',
          component: addMaster,
          name: '新建师傅'
        },
        {
          path: '/changeMaster/:orderId/:date/:masterId',
          component: changeMaster,
          name: '改派师傅',
          isShow:false,
        },
      {
          path: '/revisePassword',
          component: revisePassword,
          name: '修改密码',
          isShow:false,
        },
        {
          path: '/masterDisable',
          component: masterDisable,
          name: '禁用账号',
          isShow:false,
        },
    {
      path: '/serviceWorker',
      component: serviceWorker,
      name: '服务工种'
    },
    {
      path: '/serviceArea',
      component: serviceArea,
      name: '服务区域'
    },
    {
      path: '/editMasterDetails',
      name: '编辑详情',
      component: editDetails
    },
    {
      path: '/serviceWorkerEdit',
      name: '修改服务工种',
      component: serviceWorkerEdit
    },
    {
      path: '/serviceAreaEdit',
      name: '',
      component: serviceAreaEdit
    }
      ],
});
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
});

export default router;
