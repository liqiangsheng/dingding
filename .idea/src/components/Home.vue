<template>
  <el-row class="container">
    <!--头部-->
    <div class="info_box" v-if="isInfoAlert">
        <div id="title_Tab">
          消息盒 {{size}}
          <i class="el-icon-close clone" @click="infoLink"></i>
        </div>
       <div id="left_Tab">
        <ul>
          <li  v-for="(item,index) in list" @click="isSelector(item,index)" :key="index" :class="{active:inde==index}">
            {{item.name}}({{item.size}})
          </li>
        </ul>
       </div>
      <div id="right_Tab">
        <ul v-if="inde!=1">
          <li @click="pathNewOrder(item,index)" v-for="(item,index) in newOrderDataList" :key="index" :class="{read:item.state==='1'}">
            {{item.content}}
            <span>
              {{item.createTime | moment('YYYY-DD-MM HH:mm:ss')}}
            </span>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item,index) in OrderDataList" :key="index" @click="orderSta(item,index)" :class="{read:item.state==='1'}">
            {{item.content}}
            <span>
              {{item.createTime | moment('YYYY-DD-MM HH:mm:ss')}}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="info" @click="infoLink" v-if="!isChannel">
      <b :class="{unread:isUnread===true}"></b>
      <b class="unread secede" @click="secede">退出</b>
    </div>

    <div class="info" @click="channelInfoLink" v-else>
      <!--fhannelInfo-->
      <b style="left:-130px;cursor: pointer"></b>
      <b class="unread secede channel_nav_text" style="text-align: left;" @click="secede">退出</b>
    </div>
<!--后台网点 nav start-->
    <div class="hader" v-if="!isChannel">
      <nav v-show="false" style="z-index: 99999"><span></span></nav>
    </div>
<!--后台网点 nav end-->

<!--渠道 nav start-->
    <div class="hader_channel" v-else>
      <img src="../assets/images/chaun_logo.png" alt="" style="margin-top:14px;margin-left:20px;">
      <nav v-show="false" style="z-index: 99999"><span></span></nav>
      <p  class="amend_pass channel_nav_text" @click="$store.commit('isChannelPass')">修改密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| </p>
    </div>
<!--渠道 nav end-->

    <!--中间-->
    <el-col :span="24" class="main" :class="{'channl_aside':isChannel}">
      <!--左侧导航-->
      <aside :class="!collapsed?'showSidebar':'shrink'"  class="left_nav" :style="isChannel?'margin-top:80px;background:#fff':''">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse" v-if="!isChannel">
          <span class="user_name">{{userName}}</span>
          <i class="iconfont icon-menufold cursor" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold cursor" v-show="collapsed"></i>
        </div>

        <div class="menu-toggle_channel"  v-else>
          <span class="user_name" style="font-size: 16px;position:relative" v-if="!collapsed">{{userName}}<b @click="$store.commit('isChannelMsg')" class="after_icon"></b></span>
          <i class="iconfont icon-menufold cursor" v-show="!collapsed" @click.prevent="collapse"></i>
          <i class="iconfont icon-menuunfold cursor" v-show="collapsed" @click.prevent="collapse"></i>
        </div>

        <!--导航菜单-->

<!--左侧导航 start-->
        <el-menu default-active="0" router :collapse="collapsed" v-if="!isChannel" >
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
              <span style="display:block"  @click="Path(term.name,term.path)" slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
             <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''">
            <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
          <!--<li class="el-submenu" style="color:#fff;"   v-if="$router.options.routes[1].menuShow">-->
          <li class="el-submenu" style="color:#fff;"   v-if="isTooltip_show">
            <div class="el-submenu__title">
              <a  :href="click_link" target="_blank" style="color: #fff;display:inline-block;width:100%;height:100%;">
                <i class="iconfont detailed_icons im_icon"></i><span>客服系统</span>
              </a>
            </div>
          </li>
        </el-menu>
<!--左侧导航 end-->

 <!--左侧导航 渠道端 start-->
        <el-menu default-active="0" router :collapse="collapsed" v-else id="menu">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title" style="color: #1F2D3D">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <span style="display:block;"  @click="Path(term.name,term.path)" :style="term.path===$route.path?'color: #e44b01;':'color: #1F2D3D'" slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''"  @click="Path(item.children[0].name,item.children[0].path)">
              <i :class="item.iconCls"></i>
              <span slot="title" :style="item.children[0].path===$route.path?'color: #e44b01;':'color: #1F2D3D'">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
          <!--<li class="el-submenu" style="color:#fff;"   v-if="$router.options.routes[1].menuShow">-->

        </el-menu>
 <!--左侧导航 渠道端 end-->
      </aside>
      <!--右侧内容区-->
      <section class="content-container" :class="{'content-container_channel':isChannel}">
<!--tab 网点后台标签栏start-->
       <div class="top_nav" v-if="!isChannel">
         <el-breadcrumb-item v-for="(item,index) in tabPathList" :key="index">
                  <i class="el-icon-circle-cross path_icon" @click="delTabNav(item,index,item.path)"></i>
                <router-link tag="div" :to="{path:item.path}" class="nav_name" :class="$route.path==item.path?'selector':''">{{item.name}}</router-link>
         </el-breadcrumb-item>
      </div>
 <!--网点后台标签栏end-->


        <!--tab 渠道start-->
         <div class="top_nav_channel" v-else>
           <el-breadcrumb-item v-for="(item,index) in tabPathList" :key="index" style="height:40px;">
                    <i class="path_icon" @click="delTabNav(item,index,item.path)"></i>
                  <router-link tag="div" :to="{path:item.path}" class="nav_name" :class="$route.path==item.path?'selector':''">{{item.name}}</router-link>
           </el-breadcrumb-item>

        </div>
        <Dropdown style="margin-left: 20px;position:absolute;right:0px;top:64px;z-index: 999" v-if="isChannel">
          <Button>
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list" style="width:300px;">
            <DropdownItem  v-for="(item,index) in $store.state.channelDropDownMenuList" :key="index"><p @click="channelDeop(item.clickType)" class="channel_drop-down_menu" :class="item.className" style="float:none;">{{item.name}}</p></DropdownItem>
          </DropdownMenu>
        </Dropdown>
 <!-- 渠道end-->

        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>


      </section>
      <!--渠道信息 start -->
              <!--<div class="alert">-->
              <div class="channel_alert_info" v-if="$store.state.isChannelAlert">
                <channel-info ></channel-info>
              </div>
              <!--</div>-->
      <!--渠道信息 end -->

    </el-col>
  </el-row>
</template>
<script>
  import {bus} from '../bus.js'
  import { setSession, removerSession,getSession,removerStorage} from "../../static/js/session";
  import channelInfo from "@/canal_components/setting/canalInfo/canalCensus"
  import amendPassword from "@/canal_components/channerPass/amendPassword";
  var data_link=null;
  export default {
    components:{
      channelInfo,

      amendPassword
    },
    name: 'home',
    created(){
        this.customer_service_link();  //进来就请求客服免登录链接给a标签
      getSession("access-user");
      setSession("flag",false);
      bus.$on('setUserName', (text) => {
        this.sysUserName = text;
      });
    },
    mounted() {
      this.$nextTick(function(){
        this.isTooltip();
      });
      let url =`${this.$apidomain}/sysMessage/findredismessage`,_this=this,
        setMission=()=> {
          _this.$http.get(url).then(res => {
            let data = res.data;
            if (data.code === '0000'&&data.result) {
              _this.alertData=data.result.sysMseeageOrder;
              _this.$notify(
                {
                  title: '消息提醒',
                  message:_this.alertData
                }
              );
            }
          });
        };
      setInterval(setMission,30000);
      setTimeout(()=>{
        this.OrderDataList.forEach(v=>{
          if(v.state==='0'){
            this.isUnread= true;
            return;
          }
        });
        this.newOrderDataList.forEach(v=>{
          if(v.state==='0'){
            this.isUnread=true;
            return;
          }
        })
      },5000);
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }

    },
    data () {
      return {

        isChannel:getSession("KEY")[0]==="3",   //判断是否是渠道端
        tabPathList:[
          {
            name:this.$route.name,
            path:this.$route.path
          },
        ],

        userName:getSession("access-user").fullName,
        size:0,
        OrderDataList:[],
        inde:0,
        isUnread:true,
        isInfoAlert:false,
       list:[
         {name:"新建工单",
           selector:true,
         },
         {name:"待处理",
           selector:false,
         }
         ],
        newOrderDataList:[],
        activeName2: 'first',
        sysUserName: '',
        sysUserAvatar: '',
        isActive:true,
        collapsed: false,
        click_link:'',//点击客服系统
        isTooltip_show:false,  //是否显示非客服权限的导航
      }
    },

    methods: {
        channelDeop(state) {
          if(state){
            this.tabPathList=this.tabPathList.filter((v,i)=>{
                if(this.$route.path===v.path)return v;
              });
          }else{
            history.go(0)
          }
        },
          delTabNav(item,index,path){
            if(this.tabPathList.length<=1)return;
            if(path===this.$route.path){
              let i=index===0?2:index;
              this.$router.push(this.tabPathList[i-1].path)
               }
            this.tabPathList.splice(index,1);
          },
          Path(name,path){
            if(this.tabPathList.length>7){
              this.tabPathList.splice(0,1);
            }
            let isAddPath=true, o={};
            this.tabPathList.forEach(v=>{
              if(path===v.path){
                isAddPath=false;
              }
            });
            if(isAddPath){
                  o.name=name;
                  o.path=path;
                  this.tabPathList.push(o)
            }
          },
        //退出登录
          secede(){
            removerStorage("title");
            removerSession("enrolleeinfo");
            removerSession("access-user");
            history.go(0);
          },
      infoLink(){
        this.$router.push({path:"/yunYing_busines/standInfo"});
      },
      channelInfoLink(){
        this.$router.push({path:"/canal_components/standInfo"});
      },
      getState(id,msg,path){
        let url = `${this.$apidomain}/sysMessage/updateRelationState?sysMessageId=${id}&state=1`;
        this.$http.get(url).then(res=>{
          let data=res.data;
          msg.state=data.result.state;
          this.$router.push({path:path})
        });
      },
      pathNewOrder(item,index){
        this.getState(item.id, this.newOrderDataList[index],"/order/list2");
      },
      orderSta(item,index){
        this.getState(item.id, this.OrderDataList[index],"/order/list4");
      },

      isSelector(item,index){
        this.list[0].selector=false;
        this.list[1].selector=false;
        this.list[index].selector=true;
        this.inde=index;
      },
      i(){
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      customer_service_link(){  //给token去请求免登录的客服系统
        let _this=this;
        _this.$http.get(`${_this.$apidomain}/udesk/usersAuthJwtCallback?token=`+_this.$getLocalStorage("enrolleeinfo")[0].token).then(function(res){
          if(res.data.code==='0000'){
            _this.click_link=res.data.result; //动态添加:href
          }else{
          }
        });
      },
      isTooltip(){//如果是客服经理或者客服专员或者管理员就显示
        let _this=this,
          enrolleeinfo_json=JSON.parse(sessionStorage.getItem("enrolleeinfo")),
          enrolleeinfo = enrolleeinfo_json[0].userRoleId;
        if(sessionStorage.getItem("enrolleeinfo") && ( enrolleeinfo=="SupportManager" || enrolleeinfo=="SupportStaff" || enrolleeinfo=="Admin")){
              _this.isTooltip_show=true;
        }
      },
    },
  }

</script>
<style scoped lang="scss">
  .ivu-dropdown{
    transform:translateY(-3px);
    .channel_drop-down_menu{
      float:none;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #76838F;
      letter-spacing: 0;
      &::before{
        content: "";
        display: inline-block;
        vertical-align: middle;
        width:14px;
        margin-right:13px;
        height: 14px;
        background:url(../assets/images/renovate.png) center center no-repeat;
        background-size:100% 100%;
      }
    }
    .chennel_close_icon{
      &::before{
        background:url(../assets/images/cloos_alert.png) center center no-repeat;
        background-size:100% 100%;
      }
    }
    .chennel_close_all_icon{
      &::before{
        background:url(../assets/images/cloos_all.png) center center no-repeat;
        background-size:100% 100%;
      }
    }
  }
.ivu-btn{
  border:none;
 border-radius: 0;
  height:42px;
  background: #e5e5e5;
}
.channel_alert_info{
  background:rgba(0,0,0,.5);
  width:100vw;
  height: 100vh;
  z-index: 9999999;
  position:absolute;
}
  .tab,.tab_container{
    position:absolute;
    top:0;
    z-index: 99999;
  }
  .tab_container{
    top:40px;
    background:#fff;
    color:#fff;
  }
  .info_box{
    z-index: 9999;
    width:800px;
    height: 300px;
    position:absolute;
    right:15%;
    top:5%;
    background:#fff;
    >#right_Tab{
      float:right;
      width:80%;
      height: 100%;
      padding:0 10px;
      >ul{
        background:#fff;
        height:100%;
        overflow: auto;
        li{
          font-size: 14px;
          line-height:2.5em;
          cursor: pointer;
          font-weight: bold;
          color:#000;
          border-bottom:1px solid #ccc;
          >span{
            text-align: right;
            float:right;
          }
        }
        >.read{
          font-weight: normal;
          color:#ccc;
        }
      }
    }
    >#left_Tab{

      width: 20%;
      background: #e0e0e0;
      height:100%;
      float:left;
      >ul{
        li{
          cursor: pointer;
          background:#fff;
          text-align:center;
          line-height: 4em;
        }
        .active{
          background:#ccc;
        }
      }
    }
    >#title_Tab{
        width:100%;
      font-size: 14px;
        text-align: center;
        line-height: 4em;
        background: #e0e0e0;
      >.clone{
        cursor: pointer;
        float:right;
        transform:translate(-30px,15px);
        width:30px;
        height:30px;
        line-height: 30px;
      }

    }
  }
  .info{
    position:absolute;
    right:140px;
    top:20px;
    z-index: 9999;
    >b{
      position:absolute;
      left:0;
      top:0;
      width:16px;
      height: 16px;
      background:url(../../static/images/read.png) center center no-repeat;
      background-size:100%;
    }
    >.unread{
      background:url(../../static/images/Notifications.png) center center no-repeat;
      background-size:100%;
    }
    >.secede{
      background:none;
      left:30px;
      color:#fff;
      cursor: pointer;
      text-align: right;
      width:40px;
      height: 30px;
    }
  }
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .hader{
      height:140px;
       position:absolute;
       width:100%;
      background:#A470CD;
      nav {
          width:50%;
          // height:100%;
          float:right;
          padding-top:20px;
          color:#fff;
          padding-right:30px;
          text-align:right;
       }
    }
    /*渠道样式 nav start*/
    .hader_channel{
      height:61px;
      background-image: linear-gradient(-180deg, #F68E2D 0%, #EA5514 100%);
      position:absolute;
      width:100%;
      nav {
        width:50%;
        // height:100%;
        float:right;
        padding-top:20px;
        color:#fff;
        padding-right:30px;
        text-align:right;
      }
    }
    /*渠道样式 nav end*/
    .topbar-wrap {
      height: 200px;
      line-height: 200px;
      background: #373d41;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 0px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 20px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      &.channelShrink{
        width:auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
      }
      .el-submenu .el-menu-item {
        min-width: 200px;
        text-align:center;
      }
      .el-menu {
        width: 240px;
          background: #393857;
      }
      .el-menu--collapse {
        width: 100px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
      #menu{
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #fff;
        li{
          background: #F7F8FA;
        }
        .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
          background-color: #bfbfbf ;
        }
      }
    }
    .channl_aside{
      &.shrink{
        width:60px;
      }
    }
    .menu-toggle {
      background: #393857;
      text-align: right;
      padding-right:20px;
      color: white;
      height: 156px;
      line-height: 136px;
      .user_name{
        float:left;
        padding-left:10%;
      }
    }
    .menu-toggle_channel{
      background: #fff;

      text-align: right;
      padding-right:20px;
      color: #000;
      height: 100px;
      line-height: 100px;
      .user_name{
        float:left;
        height: 100%;
        padding-left:10%;
        .after_icon{
          width:14px;
          height: 14px;
          content: "";
          background:url(../assets/images/Shape.png) center center no-repeat;
          background-size:100% 100%;
          position:absolute;
          top:50%;
          cursor: pointer;
          transform:translateY(-50%);
          right:-19px;
        }
      }
        .icon-menufold, .icon-menuunfold{
          &::before{
            color:#ccc;
            font-size:20px;
            font-weight: 900;
          }
        }
    }
    .content-container {

      flex: 1;
      overflow-y: auto;
      padding: 10px;
      margin-top:150px;
      padding-bottom: 1px;
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
      .top_nav{
        width:100%;
        position:fixed;
        top:121px;
        height:auto;
        margin-top:-20px;
        // height:30px;
        z-index:9999;
        .nav_name{
           cursor:pointer;
          padding:10px 30px;
          border-radius: 4px 4px 0 0;
          background:#fff;
          margin-right:10px;
          margin-left:10px;
        }
        .path_icon{
         float:right;
         font-size:17px;
         margin-right:3px;
         cursor:pointer;
          z-index:999999;
         color:#FFEBDDF6;
         transform:translateY(-40%);
        }
        .selector{
          color: #000000;
          background: #EBDDF6;
        }
       }
/*渠道端 tabs start*/
      .top_nav_channel{
        width:100%;
        position:fixed;
        top:84px;
        height:auto;
        margin-top:-20px;
        color:red;
        // height:30px;
        z-index:999;
        .nav_name{
          cursor:pointer;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #76838F;
          letter-spacing: 0;
          padding:8.5px 30px;
          border-radius: 4px 4px 0 0;
          background:#fff;
          margin-right:10px;
          margin-left:10px;
        }
        .path_icon{
          float:right;
          font-size:17px;
          margin-right:15px;
          cursor:pointer;
          width:8px;
          height: 8px;
          margin-top:12px;
          z-index:999999;
          background:url(../assets/images/cloos.png) center center no-repeat;
          background-size:52% 52%;
          padding:8px;
          line-height: 40px;
        }
        .path_icon:hover{
          padding:7px;
          margin-top:14px;
          background:url(../assets/images/cloos_hover.png) center center no-repeat;
          background-size:100% 100%;
        }
        .selector{
          color: #20A0FF;
          background: #F1F4F5;
        }
      }

 /*渠道端 tabs start*/

    }
    .content-container_channel{
      margin-top:102px;
      background: #F1F4F5;
    }
    .container {

    }
     .left_nav{
      z-index:999;

     }
  }
  .detailed_icons{
    transform: translateY(30%);
  }
  .user_icon{
    background:url(../../static/images/user.png)center center no-repeat;
    background-size:100% 100%;
  }
  .iconfont{
    width:17px;
    display: inline-block;
    height: 17px;
  }
  .canal_icon{
    background:url(../../static/images/canal.png)center center no-repeat;
    background-size:100% 100%;
  }
  .home_icon{
    background:url(../../static/images/home.png)center center no-repeat;
    background-size:100% 100%;
  }
  .order_icon{
    background:url(../../static/images/order.png)center center no-repeat;
    background-size:100% 100%;
  }
  .yunying_icon{
    background:url(../../static/images/yunying.png)center center no-repeat;
    background-size:100% 100%;
  }
  .product_icon{
    background:url(../../static/images/product.png)center center no-repeat;
    background-size:100% 100%;
  }
 .set_icon{
    background:url(../../static/images/set.png)center center no-repeat;
    background-size:100% 100%;
  }
 .network_icon{
    background:url(../../static/images/network.png)center center no-repeat;
    background-size:100% 100%;
  }
  .biaobiao_icon{
    background:url(../../static/images/biaobiao.png)center center no-repeat;
    background-size:100% 100%;
  }
.master_icon{
    background:url(../../static/images/master.png)center center no-repeat;
    background-size:100% 100%;
  }

.im_icon{
    background:url(../../static/images/kefu.png)center center no-repeat;
    background-size:100% 100%;
  }
/*渠道icon*/
  .channel_order_icon{
      background:url(../assets/images/order_icon_ch.png)center center no-repeat;
      background-size:100% 100%;
  }
  .channel_biaobiao_icon{
    background:url(../assets/images/ch_biaobiao.png)center center no-repeat;
    background-size:100% 100%;

  }
  .childer_channel_icon{
    background:url(../assets/images/childer_icon_ch.png)center center no-repeat;
    background-size:100% 100%;
  }
  .amend_pass{
    position:absolute;
    right:8em;
    padding:0 20px;
    cursor: pointer;
    z-index: 999;
    line-height: 60px;
    top:0;
    color:#fff;
    font-size:14px;
  }
  .channel_nav_text{
    font-family: MicrosoftYaHei ;
    font-size: 14px;
    color: #FFFFFF;
    font-weight: normal;
  }
</style>
<style lang="scss">
  .menu-toggle{
    z-index: 999999 !important;
  }
  #menu{
    .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
      background-color: #bfbfbf ;
    }
    .el-icon-arrow-down{
      &::before{
        color:#97A3AA;
        font-weight: bold;
      }
    }
  }
  #menu.el-menu--collapse {
    width: 60px;
  }


</style>
