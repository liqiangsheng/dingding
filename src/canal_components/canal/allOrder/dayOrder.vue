<template>
<div class="dayOrder">
   <div class="header">
        <ul>
          <li v-show="isShow">
            <p>本月完工数</p>
            <b>50</b>
          </li>
          <li v-show="isShow">
            <p>上月完工数</p>
          <b>80</b>
          </li>
          <li v-show="isShow">
            <p>今年完工数</p>
            <b>130</b>
          </li>
          <li>
            <p>{{wenzi}}<img :src="jiantou" @click="jiantouClick"></p>
          </li>
        </ul>
   </div>
  <div class="tab">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
      <el-menu-item  :class="{active:tabIndex==index}" v-for="(item,index) in tabList" index="index" :key="index" @click="tabClick(item,index)" >
        {{item}}
      </el-menu-item>
    </el-menu>
  </div>
  <AllPage v-if="tabIndex == 0"></AllPage>
  <Completed v-if="tabIndex == 1"></Completed>
  <HaveBeenCancelled v-if="tabIndex == 2"></HaveBeenCancelled>
  <ServiceIng v-if="tabIndex == 3"></ServiceIng>
  <ToBeAllocated v-if="tabIndex == 4"></ToBeAllocated>
  <WaitForService v-if="tabIndex == 5"></WaitForService>
</div>
</template>
<script>
import AllPage from "./orderPage/allPage.vue"
import Completed from "./orderPage/completed.vue"
import HaveBeenCancelled from "./orderPage/haveBeenCancelled.vue"
import ServiceIng from "./orderPage/ServiceIng.vue"
import ToBeAllocated from "./orderPage/toBeAllocated.vue"
import WaitForService from "./orderPage/waitForService.vue"
  export default {
    components:{
      AllPage,Completed,HaveBeenCancelled,ServiceIng,ToBeAllocated,WaitForService
    },
    data() {
      return {
        tabList:["所有","待分配","待服务","服务中","已完成","已取消"],
        jiantou:"./static/images/xia.png",   //箭头向下
        num : 1, //用来改变箭头的方向
        isShow:true,//完工list显示消失
        tabIndex:0, // 点击显示的页面
        wenzi :"收起数据展示",
      }
    },

    created(){

    },
    methods: {
      jiantouClick(){   //完工的消失显示
        this.num++;
        if(this.num%2== 0){
          this.jiantou = "./static/images/shang.png";
          this.wenzi = "展开数据展示";
          this.isShow = false;
        }else{
          this.jiantou = "./static/images/xia.png";
          this.isShow = true;
          this.wenzi = "收起数据展示";
        }
      },
      tabClick(v,i){ //切换显示的页面
           this.tabIndex = i;
      },
    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
 .dayOrder,.header{
   width:100%;
   background:rgba(229,233,242,1);
 }
 .header{
   background: #FFFFFF;
 }
 .header ul{

   width:90%;
   display: flex;
   margin: 0 5%;
   li:nth-child(1){
     background:rgba(253,177,70,1);
     height: 80px;
   }
   li:nth-child(2){
     background:rgba(108,201,204,1);
     height: 80px;
   }
   li:nth-child(3){
     background:rgba(87,201,242,1);
     height: 80px;
   }
   li:nth-child(4){
     p{
       width: 100%;
       height:20px;
       text-align: left;
       font-size:14px;
       font-family:PingFangSC-Regular;
       color:rgba(32,160,255,1);
       line-height:20px;
       img{
         margin-left: 10px;
       }
     }
   }
   li{
     flex: 1;
     margin:25px 30px 25px 0;
     border-radius: 4px;
     text-align: center;
     p{
       margin: 6px;
       width: 100%;
       height:20px;
       font-size:16px;
       font-family:PingFangSC-Regular;
       color:rgba(255,255,255,1);
       line-height:22px;
     }
     b{
       font-weight: 100;
       width:81px;
       height:36px;
       font-size:30px;
       font-family:PingFangSC-Regular;
       color:rgba(255,255,255,1);
       line-height:42px;
     }
   }
  }
 .el-menu-demo{
   background: #FFFFFF;
   margin-bottom: 2px;
   .el-menu-item{
     background: #FFFFFF;
     font-size:14px;
     font-family:PingFangSC-Regular;
     color:rgba(136,136,136,1);
     border-bottom: 5px solid transparent;
   }
   .el-menu-item.active{
     background: #FFFFFF;
     font-size:14px;
     font-family:PingFangSC-Medium;
     color:rgba(230,88,49,1);
     border-bottom: 5px solid rgba(230,88,49,1);
   }
   .el-menu-item:hover {
     background: #FFFFFF;
     font-size: 14px;
     font-family: PingFangSC-Medium;
     color: rgba(230, 88, 49, 1);
     border-bottom: 5px solid rgba(230, 88, 49, 1);
   }
 }
</style>

<style>
  /*body{*/
    /*background:transparent !important;*/
  /*}*/
</style>
