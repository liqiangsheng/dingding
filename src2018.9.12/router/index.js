import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import {isShowFunObj} from '@/components/commonJs/nav_ishow'
import {getSession, setSession} from "../../static/js/session";
import UserList from '@/components/user/list'
import UserUnusual from '@/components/user/unusual'
/*
* 1.后台
* 2.网点
* 3.渠道
* */
const locationUrl= window.location.href;

if(locationUrl.includes('manage.')){

  setSession("KEY", "1");

}else if(locationUrl.includes('site.')){

  setSession("KEY", "2");
}else if(locationUrl.includes('channel.')){

  setSession("KEY", "3");

}else{
  setSession("KEY", "1");
}
if(getSession("KEY")[0]==="2"&&window.outerWidth < 800){
  window.location.href= window.common.siteAppDomain;
}

function backstage() {
    if(getSession("KEY")[0] === "1") {
      document.title="叮叮快修后台管理系统";
      return true;
    }
    return false
}
function canal() {
    if (getSession("KEY")[0] === "3") {
      document.title="叮叮快修渠道端";
        return true;
    }
        return false
}
function site() {
    if (getSession("KEY")[0] === "2") {
      document.title="叮叮快修网点端";
        return true;
    }

    return false
}

//工程师管理；
const accountList = resolve => require(['@/components/master/accountList'], resolve);
const attestation = resolve => require(['@/components/master/attestation'], resolve);
const attestation1 = resolve => require(['@/components/master/attestation1'], resolve);
const RemindedList = resolve => require(['@/components/master/RemindedList'], resolve);
const master_vocational_work = resolve => require(['@/components/master/master_vocational_work'], resolve);
const map = resolve => require(['@/components/sitemaster/map'], resolve);
const leave = resolve => require(['@/components/master/leave'], resolve);
const amap = resolve => require(['@/components/master/amap_distribution'], resolve); //lee 工程师分布图

//订单管理；
const OrderList0 = resolve => require(['@/components/order/newWorkList'], resolve); //新建订单
const OrderList1 = resolve => require(['@/components/order/monitoring'], resolve); //订单监控
const OrderList2 = resolve => require(['@/components/order/distribution'], resolve);//待分配
const OrderList3 = resolve => require(['@/components/order/ongoing'], resolve);//进行中
const OrderList4 = resolve => require(['@/components/order/handdown'], resolve);//待处理
const OrderList5 = resolve => require(['@/components/order/orderAll'], resolve);//全部订单
const OrderList7 = resolve => require(['@/components/order/repair'], resolve);//返修订单
const OrderList10 = resolve => require(['@/components/order/underLine'], resolve);//线下结款
const OrderList11 = resolve => require(['@/components/order/sparePartsWaiting'], resolve);//配件申领
const OrderList8 = resolve => require(['@/components/order/assess'], resolve);//订单评价
const OrderList6 = resolve => require(['@/components/order/complete'], resolve);//完成订单
const askForHelp = resolve =>require(['@/components/order/askForHelp'],resolve);//问题求助
const unAudited = resolve =>require(['@/components/order/unAudited'],resolve);  //审核订单

//配件管理
const addAccessories = resolve => require(['@/components/sparePartsManagement/addAccessories'], resolve);

//渠道管理
const canalList = resolve => require(['@/components/channel/canalList/canalList'], resolve);
const channelList = resolve => require(['@/components/channel/channelList'], resolve);
const canaChildren = resolve => require(['@/components/channel/canaChildren/canaChildren'], resolve);


//网点管理
const networkGlance = resolve => require(['@/components/network/networkGlance/networkGlance'], resolve);
const networkNumber = resolve => require(['@/components/network/networkNumber/networkNumberList'], resolve);
const networkUnusulaNumber = resolve => require(['@/components/network/networkUnusulaNumber/RemindedList'], resolve);
const networkList = resolve => require(['@/components/network/networkReminded_list/networkList'], resolve);

//财务报表
const property = resolve => require(['@/components/finance/property/property'], resolve);
const businessKeep = resolve => require(['@/components/finance/business/businessKeep'], resolve);
const financeList = resolve => require(['@/components/finance/financeList/financeList'], resolve);
const account = resolve => require(['@/components/finance/account/account'], resolve);
const unusualAccount = resolve => require(['@/components/finance/unusualAccount/unusualAccount'], resolve);
const abstract = resolve => require(['@/components/finance/abstract/abstract'], resolve);
const billManagement = resolve =>require(['@/components/finance/billManagement/billManagement'],resolve);  //账单管理
const billingDetails = resolve =>require(['@/components/finance/billManagement/billingDetails'],resolve) ; //账单明细
const recharge = resolve => require(['@/components/finance/recharge/recharge'], resolve);
const refund = resolve => require(['@/components/finance/refund/refund'],resolve);                         //退款审批
// console.log(recharge);

//运营管理
const dataVisualization = resolve => require(['@/components/yunYing_busines/Data_display/DataPlay'], resolve);
const advertisement = resolve => require(['@/components/yunYing_busines/advertisement/advertisement'], resolve);
const standInfo = resolve => require(['@/components/yunYing_busines/standInfo/standInfo'], resolve);
const feedback = resolve => require(['@/components/yunYing_busines/feedback/feedback'], resolve);
const integral = resolve => require(['@/components/yunYing_busines/integral/integral'], resolve);
const commission = resolve => require(['@/components/yunYing_busines/commission/commission'], resolve);
const share  = resolve => require(['@/components/yunYing_busines/share/share'], resolve);
const settingList  = resolve => require(['@/components/yunYing_busines/discount/settingList'], resolve);
const rebate  = resolve => require(['@/components/yunYing_busines/rebate/rebate'], resolve);

//产品管理
// const addproduct = resolve => require(['@/components/product/addoredit'], resolve);
const category = resolve => require(['@/components/product/category'], resolve);
const channelProducts = resolve => require(['@/components/product/channelProducts'], resolve);
const channelParts = resolve => require(['@/components/product/channelParts'], resolve);
const partsList = resolve => require(['@/components/product/partsList'], resolve);
const charge = resolve => require(['@/components/product/charge'], resolve);
const detail = resolve => require(['@/components/product/detail'], resolve);
const service = resolve => require(['@/components/product/service'], resolve);
const productManage = resolve => require(['@/components/product/productManage'], resolve); //产品管理


//客服管理 start
const singleManage = resolve => require(['@/components/customerService/singleManage'], resolve);
const callCenter = resolve => require(['@/components/customerService/callCenter'], resolve);
const imediate = resolve => require(['@/components/customerService/imediate'], resolve);
//客服管理 end

//后台设置  start
const userSeting = resolve => require(['@/components/seting/userSeting'], resolve);
const workLog = resolve => require(['@/components/seting/workLog'], resolve);
//后台设置  end





//渠道端模块start
const orderManage = resolve => require(['@/canal_components/order/details/orderManage'], resolve);

//财务
const finance = resolve => require(['@/canal_components/finance/finance'], resolve);
const financeBill = resolve =>require(['@/canal_components/finance/finance_bill'],resolve);                   //账单结算
const financeCommission =resolve =>require(['@/canal_components/finance/finance_commission'],resolve)         //提成结算
const billSettlementDetails = resolve =>require(['@/canal_components/finance/billSettlementDetails'],resolve);//账单结算明细
const commissionSettlementDetails = resolve =>require(['@/canal_components/finance/commissionSettlementDetails'],resolve) //提成结算明细
const accountOverview =resolve =>require(['@/canal_components/finance/accountOverview'],resolve)
const accountRecharge =resolve =>require(['@/canal_components/finance/accountRecharge'],resolve)             //账号充值 /提现
const transactionDetail =resolve =>require(['@/canal_components/finance/transactionDetail'],resolve)               //账号提现


//首页  渠道统计 start
const canalCensus = resolve => require(['@/canal_components/canal/canalCensus'], resolve);
//每日订单   //新建订单
const dayOrder = resolve => require(['@/canal_components/canal/allOrder/dayOrder'], resolve);
const newOrder = resolve => require(['@/canal_components/canal/allOrder/newOrder'], resolve);
const WorkOrderSubmission = resolve => require(['@/canal_components/canal/allOrder/orderPage/alertInfos/WorkOrderSubmission'], resolve);
//订单统计
const orderCensus = resolve => require(['@/canal_components/canal/childChannelCount'], resolve);
//消息详情
const newsInfo = resolve => require(['@/canal_components/canal/newInfo'], resolve);

//首页  渠道统计 end

//设置  渠道信息 start

const canalInfo = resolve => require(['@/canal_components/setting/canalInfo/canalCensus'], resolve);
const channelInfo = resolve => require(['@/canal_components/standInfo/standInfo'], resolve);

//设置  渠道信息 end

//子渠道信息
const childrenCensus = resolve => require(['@/canal_components/canal/childrenCanal/children'], resolve);
const childrenAccount = resolve => require(['@/canal_components/canal/childrenCanal/childrenAccount'], resolve);
const accountManagement = resolve =>require(['@/canal_components/canal/childrenCanal/accountManagement'],resolve); //账号管理

//渠道端模块end

//产品管理
const product = resolve => require(['@/canal_components/product/product'], resolve);

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve);
const Login1 = resolve => require(['@/components/Login1'], resolve);
//网点端路由start
const site_home = resolve => require(['@/components/networksite/mainpage'], resolve);

const SiteOrderList1 = resolve => require(['@/components/networksite/order/monitoring'], resolve);
const SiteOrderList2 = resolve => require(['@/components/networksite/order/distribution'], resolve);
const SiteOrderList3 = resolve => require(['@/components/networksite/order/ongoing'], resolve);
const SiteOrderList4 = resolve => require(['@/components/networksite/order/handdown'], resolve);
const SiteOrderList5 = resolve => require(['@/components/networksite/order/complete'], resolve);
const SiteOrderList6 = resolve => require(['@/components/networksite/order/all'], resolve);

const SiteMasterList1 = resolve => require(['@/components/networksite/master/page1'], resolve);
const SiteMasterList2 = resolve => require(['@/components/networksite/master/page2'], resolve);
const SiteMasterList3 = resolve => require(['@/components/networksite/master/page3'], resolve);

const SiteStatisticsList1 = resolve => require(['@/components/networksite/statistics/page1'], resolve);
const SiteStatisticsList2 = resolve => require(['@/components/networksite/statistics/page2'], resolve);

const SiteFinanceList1 = resolve => require(['@/components/networksite/finance/page1'], resolve);
const SiteFinanceList2 = resolve => require(['@/components/networksite/finance/page2'], resolve);
const SiteFinanceList3 = resolve => require(['@/components/networksite/finance/page3'], resolve);

const SiteSystemList1 = resolve => require(['@/components/networksite/system/page1'], resolve);
const SiteSystemList2 = resolve => require(['@/components/networksite/system/page2'], resolve);
//网点端路由end

//消息盒子
const infoBox = resolve => require(['@/components/commInfo/info'], resolve);
Vue.use(Router);
let router = new Router({
     //mode: 'history',
    // history: true,
    scrollBehavior:()=>({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
      y:0
    }),
    routes: [
      {
            path: '/login',
            name: '登录',
            component: Login
        },
      {
        path: '/login1',
        name: '登录',
        component: Login1
      },
      // {
      //   path:"/user",

      //   component:UserList
      // },
        //后台  start
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect:getSession("KEY")[0]==="3"?'/census/canalCensus':'/dashboard',
            // redirect: '/dashboard',
            leaf: true, // 只有一个节点
            menuShow: backstage(),
            iconCls: 'iconfont detailed_icons home_icon', // 图标样式class
            children: [
                { path: '/dashboard', component: Dashboard, name: '首页', menuShow: true }
            ]
        },
        {
            path: '/',
            name:"",
            component: Home,
            redirect: '/dashboard',
            leaf: true, // 只有一个节点
            menuShow:false ,
            children: [
                { path: '/infoBox', component: infoBox, name: '消息盒子',menuShow: true }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '用户管理',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-user-manage"),
            // leaf: true, // 只有一个节点
            iconCls: 'iconfont detailed_icons user_icon', // 图标样式class
            children: [
                { path: '/user/list', component: UserList, name: '用户列表', menuShow: isShowFunObj.isUserNavChild("sn-user-list") },
                { path: '/user/unusual', component: UserUnusual, name: '异常用户', menuShow: isShowFunObj.isUserNavChild("sn-user-abnormal") }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '工程师管理',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-master-manage"),
            iconCls: 'iconfont detailed_icons master_icon',
            children: [
               { path: '/sitemaster/amap', component: amap, name: '工程师分布图',menuShow: true },
                { path: '/master/accountList', component: accountList, name: '工程师账号列表', menuShow: isShowFunObj.isUserNavChild("sn-master-account") },
                { path: '/master/attestation', component: attestation, name: '工程师认证申请', menuShow: isShowFunObj.isUserNavChild("sn-master-authentication") },
              {
                path: '/master/attestation1',
                component: attestation1,
                name: '工程师未认证',
                menuShow: isShowFunObj.isUserNavChild("sn-master-authentication")
              },
                { path: '/master/RemindedList', component: RemindedList, name: '工程师提点列表', menuShow: isShowFunObj.isUserNavChild("sn-master-remind") },
                { path: '/master/master_vocational_work', component: master_vocational_work, name: '工程师业务一览', menuShow: isShowFunObj.isUserNavChild("sn-master-business") },
                // { path: '/sitemaster/map', component: map, name: '地图',menuShow: true },
                { path: '/sitemaster/leave', component: leave, name: '工程师请假',menuShow: isShowFunObj.isUserNavChild("sn-master-leave") },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '网点管理',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-site-manage"),
            iconCls: 'iconfont detailed_icons network_icon',
            children: [
                { path: '/network/networkGlance', component: networkGlance, name: '网点一览', menuShow: isShowFunObj.isUserNavChild("sn-site-list") },
                { path: '/network/networkNumber', component: networkNumber, name: '网点账号管理', menuShow: isShowFunObj.isUserNavChild("sn-site-account") },
                { path: '/network/RemindedList', component: networkUnusulaNumber, name: '网点异常账号', menuShow: isShowFunObj.isUserNavChild("sn-site-abnormal") },
                { path: '/network/networkReminded_list', component: networkList, name: '网点提点列表', menuShow: isShowFunObj.isUserNavChild("sn-site-remind") },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '渠道管理',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-channel-manage"),
            iconCls: 'iconfont detailed_icons canal_icon',
            children: [
              { path: '/channel/canalList/canalList', component: canalList, name: '渠道列表', menuShow: isShowFunObj.isUserNavChild("sn-channel-list") },
              { path: '/channel/channelList', component: channelList, name: '渠道提点管理', menuShow: isShowFunObj.isUserNavChild("sn-channel-remind") },
                { path: '/master/canaChildren/canaChildren', component: canaChildren, name: '渠道子类列表', menuShow: isShowFunObj.isUserNavChild("sn-channel-subset") },
                //     {path: '/master/RemindedList', component: RemindedList, name: '工程师提点列表', menuShow: true},
                //     {path: '/master/master_vocational_work', component: master_vocational_work, name: '工程师业务一览', menuShow: true},
            ]
        },
        {
            path: '/',
            component: Home,
            name: '运营管理',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-operation-manage"),
            iconCls: 'iconfont detailed_icons yunying_icon',
            children: [
                { path: '/yunYing_busines/Data_display', component: dataVisualization, name: '数据可视化', menuShow: isShowFunObj.isUserNavChild("sn-operation-data") },
                { path: '/yunYing_busines/advertisement', component: advertisement, name: '广告管理', menuShow: isShowFunObj.isUserNavChild("sn-operation-advertising") },
                { path: '/yunYing_busines/standInfo', component: standInfo, name: '站内消息', menuShow: isShowFunObj.isUserNavChild("sn-operation-msg") },
                {path: '/yunYing_busines/feedback', component: feedback, name: '意见反馈', menuShow: isShowFunObj.isUserNavChild("sn-operation-feedback")},
                {path: '/yunYing_busines/share', component: share, name: '好友分享', menuShow:isShowFunObj.isUserNavChild("sn-operation-feedback")},
                {path: '/yunYing_busines/commission', component: commission, name: '用户佣金流水', menuShow: isShowFunObj.isUserNavChild("sn-operation-feedback")},
                {path: '/yunYing_busines/integral', component: integral, name: '用户积分流水', menuShow: isShowFunObj.isUserNavChild("sn-operation-feedback")},
                {path: '/yunYing_busines/settingList', component: settingList, name: '优惠券', menuShow: isShowFunObj.isUserNavChild("sn-operation-feedback")},
                {path: '/yunYing_busines/rebate', component: rebate, name: '打折管理', menuShow: isShowFunObj.isUserNavChild("sn-operation-feedback")},
            ]
        },
        {
            path: '/',
            component: Home,
            name: '订单管理',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-order-manage"),
            iconCls: 'iconfont detailed_icons order_icon',
            children: [
                    { path: '/order/list0', component: OrderList0, name: '新建订单', menuShow:true },
                    { path: '/order/monitoring', component: OrderList1, name: '订单监控', menuShow: isShowFunObj.isUserNavChild("sn-order-monitoring") },
                    { path: '/order/list2', component: OrderList2, name: '待分配订单', menuShow: isShowFunObj.isUserNavChild("sn-order-waitfordistribution") },
                    { path: '/order/list3', component: OrderList3, name: '进行中', menuShow: isShowFunObj.isUserNavChild("sn-order-underway") },
                    { path: '/order/list4',component: OrderList4,name: '订单报备',menuShow: isShowFunObj.isUserNavChild("sn-order-pending")},
                    {path: '/order/askForHelp',component: askForHelp,name:'问题求助',menuShow:isShowFunObj.isUserNavChild('sn-order-pending') },
                    { path: '/order/sparePartsWaiting', component: OrderList11, name: '配件申领', menuShow:true },
                    { path: '/order/list10', component: OrderList10, name: '线下结款订单', menuShow:true },
                    { path: '/order/list6', component: OrderList6, name: '完成订单', menuShow:true },
                    { path: '/order/unAudited', component: unAudited, name: '审核订单', menuShow:true },
                    { path: '/order/list5', component: OrderList5, name: '全部订单', menuShow: isShowFunObj.isUserNavChild("sn-order-all") },
                    { path: '/order/list7', component: OrderList7, name: '返修订单', menuShow:true },
                    { path: '/order/list8', component: OrderList8, name: '订单评价', menuShow:true },

                // { path: '/order/list6', component: OrderList6, name: '订单评价', menuShow: true },
            ]
        },
        {
          path:"/",
          component:Home,
          name:"配件管理",
          menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-spare-manage"),
          iconCls: 'iconfont detailed_icons spare_icon',
          children:[
            {path:"/sparePartsManagement/addAccessories",component:addAccessories,name:"申领列表",menuShow:true }
          ]
        },
        {
            path: '/',
            component: Home,
            name: '财务报表',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-finance-manage"),
            iconCls: 'iconfont detailed_icons biaobiao_icon',
            children: [
                {path: '/finance/property', component: property, name: '平台资产', menuShow: isShowFunObj.isUserNavChild("sn-finance-property")},
                { path: '/finance/businessKeep', component: businessKeep, name: '交易记录', menuShow: isShowFunObj.isUserNavChild("sn-finance-record") },
                { path: '/finance/financeList', component: financeList, name: '交易对账单', menuShow: isShowFunObj.isUserNavChild("sn-finance-reconciliation") },
                {path: '/finance/account', component: account, name: '资金账户管理', menuShow: isShowFunObj.isUserNavChild("sn-finance-account")},
                {path: '/finance/unusualAccount', component: unusualAccount, name: '异常结算', menuShow: isShowFunObj.isUserNavChild("sn-finance-abnormalsettlement")},
                {path:'/finance/billManagement',component:billManagement,name:"账单管理",menuShow:isShowFunObj.isUserNavChild('sn-finance-abnormalsettlement')}, //账单管理
                {path:"/finance/billingDetails",component:billingDetails,name:"账单明细",menuShow:false}, //账单明细
                {path: '/finance/abstract', component: abstract, name: '提成审批', menuShow: isShowFunObj.isUserNavChild("sn-finance-abnormalsettlement")},
                {path: '/finance/recharge', component: recharge, name: '充值审批', menuShow: isShowFunObj.isUserNavChild("sn-finance-abnormalsettlement")},
                {path: '/finance/refund', component: refund, name: '退款审批', menuShow: isShowFunObj.isUserNavChild("sn-finance-abnormalsettlement")},
                // {path: '/canvas/list3', component: CanvasList3, name: '订单评价', menuShow: true},
            ]
        },

        {
            path: '/',
            component: Home,
            name: '产品管理',
            menuShow: backstage()&&isShowFunObj.isUserNavChild("fn-product-manage"),
            iconCls: 'iconfont detailed_icons product_icon',
            children: [
                { path: '/product/productManage', component: productManage, name: '产品列表', menuShow: isShowFunObj.isUserNavChild("sn-product-list") },
                // { path: '/product/edit/:id', component: addproduct, name: '新建/编辑产品' ,menuShow:true},
                { path: '/product/category', component: category, name: '产品分类', menuShow: isShowFunObj.isUserNavChild("sn-product-classify") },
                { path: '/product/channelProducts', component: channelProducts, name: '渠道产品', menuShow: true},
                { path: '/product/channelParts', component: channelParts, name: '渠道配件', menuShow: true},
                { path: '/product/partsList', component: partsList, name: '配件列表', menuShow: true},
                { path: '/product/charge', component: charge, name: '高空费管理', menuShow: isShowFunObj.isUserNavChild("sn-product-high") },
                { path: '/product/detail', component: detail, name: '详情管理', menuShow: isShowFunObj.isUserNavChild("sn-product-details") }
            ]
        },
        // {
        //     path: '/',
        //     component: Home,
        //     name: '客服系统',
        //     menuShow: true,//是否显示
        //     // menuShow: backstage()&&false,//只在后台显示
        //     // leaf: true,//只有一个节点
        //     iconCls: 'iconfont detailed_icons im_icon',
        //     children: [
        //         { path: '/speak/singleManage', component: singleManage, name: '进入客服系统',menuShow:true},
        //         // { path: '/speak/imediate', component: imediate, name: 'IM即时聊天', menuShow: true },
        //     ]
        // },
        //后台  end


        //渠道 start
        {
          path: '/',
          component: Home,
          name: '订单管理',
          menuShow: canal(), //true显示 false
          // leaf: true, // 只有一个节点
          iconCls: 'iconfont detailed_icons order_icon channel_order_icon', // 图标样式class
          children: [
            // { path: '/census/canalCensus', component: canalCensus, name: '每日统计', menuShow: true },
            // { path: '/canal_components/order/orderManage', component: orderManage, name: '渠道订单', menuShow: true },
            // {path: '/user/unusual', component: UserUnusual, name: '异常用户', menuShow: true}
            { path: '/census/canalCensus', component: dayOrder, name: '全部订单', menuShow: true },
            { path: '/canal_components/canal/allOrder/newOrder', component: newOrder, name: '新建订单', menuShow: true },
            { path: '/canal_components/canal/allOrder/orderPage/alertInfos/WorkOrderSubmission', component: WorkOrderSubmission, name: '支付', menuShow: false },
          ]
        },
      {
        path: '/',
            component: Home,
            name: '子渠道管理',
            menuShow: canal(),
            leaf: false, // 只有一个节点
            iconCls: 'iconfont detailed_icons network_icon childer_channel_icon', // 图标样式class
            children: [
                { path: '/childrenCanal/children', component: childrenCensus, name: '子渠道一览', menuShow: true },
                { path: '/childrenAccount', component: childrenAccount, name: '子渠道账号', menuShow: false },    //功能未开发完，暂时隐藏；
                { path: '/census/childChannelCount', component: orderCensus, name: '子渠道统计', menuShow: true },
                {path:"/childrenCanal/accountManagement",component:accountManagement,name:"账号管理",menuShow:true}, //账号管理
                { path: '/canal_components/standInfo', component: channelInfo, name: '消息盒', menuShow: false },
            ]
        },

      {
        path: '/',
        component: Home,
        name: '财务管理',
        menuShow: canal(),
        leaf: false, // 只有一个节点
        iconCls: 'iconfont detailed_icons biaobiao_icon channel_biaobiao_icon', // 图标样式class
        children: [
          {path:'/finance/accountOverview',component:accountOverview,name:'账号概览',menuShow:true},
          {path:'/finance/transactionDetail',component:transactionDetail,name:'交易明细',menuShow:true},
          {path:'/finance/bill',component:financeBill,name:"账单结算",menuShow:true},
          {path:'/finance/commission',component:financeCommission,name:'提成结算',menuShow:true},
          {path:'/finance/bill/billSettlementDetails',component:billSettlementDetails,name:"账单结算明细",menuShow:false},
          {path:'/finance/commission/commissionSettlementDetails',component:commissionSettlementDetails,name:"提成结算明细",menuShow:false},
          {path:'/finance/accountRecharge/:state',component:accountRecharge ,name:'充值',menuShow:false},
          //{ path: '/canal_components/finance/finance', component: finance, name: '财务管理', menuShow: true },
        ]
      },
      //carter--------------
      {
        path: '/',
        component: Home,
        name: '产品管理',
        menuShow: canal(), //渠道
        leaf: true, // 只有一个节点
        iconCls: 'iconfont detailed_icons network_icon childer_channel_icon1', // 图标样式class
        children: [
          { path: '/product/product', component: product, name: '产品管理', menuShow: true },

        ]
      },
      //carter--------------
        {
            path: '/',
            component: Home,
            name: '设置',
            menuShow: backstage(),
            iconCls: 'iconfont detailed_icons set_icon childer_channel_icon',
            children: [
                // { path: '/canalInfo', component: canalInfo, name: '渠道信息', menuShow: canal() },
                { path: '/userId', component: userSeting, name: '账号设置', menuShow: backstage() },
                { path: '/workLog', component: workLog, name: '工作日志', menuShow: backstage() },
            ]
        },
        //渠道 end
        //网点端 start
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/dashboard',
      // leaf: true, // 只有一个节点
      menuShow: site(),
      iconCls: 'iconfont detailed_icons home_icon', // 图标样式class
      children: [
        {path: '/site/home', component: site_home, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '订单管理',
      menuShow: site(),
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont detailed_icons order_icon', // 图标样式class
      children: [
        {path: '/site/order1', component: SiteOrderList1, name: '订单监控', menuShow: true},
        {path: '/site/order2', component: SiteOrderList2, name: '待分配', menuShow: true},
        {path: '/site/order3', component: SiteOrderList3, name: '进行中', menuShow: true},
        {path: '/site/order4', component: SiteOrderList4, name: '遗留订单', menuShow: true},
        {path: '/site/order5', component: SiteOrderList5, name: '完工订单', menuShow: true},
        {path: '/site/order6', component: SiteOrderList6, name: '全部订单', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '工程师管理',
      menuShow: site(),
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont detailed_icons master_icon', // 图标样式class
      children: [
        {path: '/site/master1', component: SiteMasterList1, name: '工程师列表', menuShow: true},
        {path: '/site/master2', component: SiteMasterList2, name: '业务信息', menuShow: true},
        {path: '/site/master3', component: SiteMasterList3, name: '请假申请', menuShow: true},
      ]
    },
      {
      path: '/',
      component: Home,
      name: '报表',
      menuShow: site(),
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont detailed_icons biaobiao_icon', // 图标样式class
      children: [
        {path: '/site/statistics1', component: SiteStatisticsList1, name: '订单统计', menuShow: true},
        // {path: '/site/statistics2', component: SiteStatisticsList2, name: '接单统计', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '财务',
      menuShow: site(),
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont detailed_icons biaobiao_icon', // 图标样式class
      children: [
        {path: '/site/finance1', component: SiteFinanceList1, name: '交易流水', menuShow: true},
        {path: '/site/finance2', component: SiteFinanceList2, name: '结算流水', menuShow: true},
        {path: '/site/finance3', component: SiteFinanceList3, name: '线下流水', menuShow: true},
      ]
    },
      {
      path: '/',
      component: Home,
      name: '系统设置',
      menuShow: site(),
      iconCls: 'iconfont detailed_icons set_icon',
      children: [
        {path: '/site/system1', component: SiteSystemList1, name: '网点信息', menuShow: true},
        // {path: '/site/system2', component: SiteSystemList2, name: '修改密码', menuShow: true},
      ]
    },
        //网点端 end
    ]

});

router.beforeEach((to, from, next) => { // 路由跳转前认证
    if (to.path.startsWith('/login')) {  // 判断是不是登录页面 是
        window.localStorage.removeItem('enrolleeinfo');  // 是登录页面删除信息
        next() //下一步
    } else { // 不是登录页面
        let user = JSON.parse(window.localStorage.getItem('enrolleeinfo'))   //查看本地存储有没有信息
        if (!user) { //没有信息 跳转到登录页面
            next({ path: '/login' })
        } else { //有就下一步
            next()
        }
    }
})
//1.后台 2.渠道  3.网点
// export {backstage,canal,site}
export default router

