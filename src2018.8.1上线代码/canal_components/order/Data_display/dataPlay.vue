<template>
  <div id="app" class="channel-app-box">

    <!--渠道详情 start-->
    <canal-details :isCanalDetails="isCanalDetails" v-if="isCanalDetails.isShow"></canal-details>
    <!--渠道详情 end-->

    <!--每日下单详情 start-->
    <order-details :isEverydayOrder="isEverydayOrder" v-if="isEverydayOrder.isShow"></order-details>
    <!--每日下单详情 end-->

 <!--每日用户详情 start-->
    <user-details :isUserDetails="isUserDetails" v-if="isUserDetails.isShow"></user-details>
 <!--每日用户详情 end-->

  <!--品类下单详情 start-->
    <category-details :isCategory="isCategory" v-if="isCategory.isShow"></category-details>
 <!--品类下单详情 end-->
    <div class="container" v-if="!isShowContainer()">
      <div @click="(function(){isCanalDetails.isShow=true}())">渠道详情</div>
      <div  @click="(function(){isEverydayOrder.isShow=true}())" >每日详情</div>
      <div  @click="(function(){isUserDetails.isShow=true}())">用户详情</div>
      <div  @click="(function(){isCategory.isShow=true}())">品类详情</div>
    </div>
  </div>
</template>
<script>
  import  canalDetails from  "../details/canalDetails"    //渠道详情
  import  orderDetails from  "../details/everydayOrderDetails"    //每日下单详情
  import  userDetails from "../details/orderManage"    //用户详情
  import  categoryDetails from  "../details/categoryDetails"    //品类详情
  export default {
    components:{
      canalDetails,
      orderDetails,
      userDetails,
      categoryDetails
    },
    data() {
      return {
// 详情页面 start
        isCanalDetails:{  //渠道详情
          isShow:false
        },
        isEverydayOrder:{ //每日下单详情
          isShow:false
        },
        isUserDetails:{
          isShow:false
        },
        isCategory:{
          isShow:false
        },
 // 详情页面 end
      }
    },
    methods: {
      isShowContainer(){
          return this.$store.state.refuse;
      },
//      canal(){
//        this.isCanalDetails.isShow=true;
//      }
    },
    mounted() {
    },
    created(){
    }
  }
</script>

<style scoped lang="scss">

  @import "../../../assets/styles/comminStyle2";
  #app{
    .container{
      >div{
        height:50px;
        background: blue;
        margin-bottom:10px;
        color:#fff;
      }
      >.selector_list{
        margin-top:0;
      }
    }
    .table {

      .child_table{
        tr{
          border:none;
          >.child_table_td{
            border:none;
            padding:10px ;
          }
        }
      }
    }

  }

  .alert{
    >p{
      position:absolute;
      top:16%;
      padding:10px 15px;
      cursor: pointer;
      right:22%;
      font-size: 35px;
    }
  }
  .confirm_btn{
    margin-left:50%;
    transform:translateX(-50%);
  }
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3em;
      border-top:1px solid rgba(0,0,0,.1);
    }
    >li:first-of-type{
      border:none;
    }
    span{
      width:10px;
      /*float:right;*/
      margin-left:20px;
      height:10px;
      display: inline-block;
      background:green;
      border-radius: 50%;
    }
  }

  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
  }
  .top_nav{
    font-size:14px;
    width:100%;
    .user_type{
      padding:10px 60px;
      background: #EBDDF6;
      color:#000;
      cursor:pointer;
    }
    .selector{
      background: #A470CD;
      color:#fff;
      font-size:14px;
    }
  }

  #city{
    line-height:40px;
  }
  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }

  .el-dialog__wrapper{
    z-index: 999999;
  }
</style>



