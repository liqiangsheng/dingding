<template>
  <div id="app" class="channel-app-box">
    <div class="content">
      <div class="title">渠道信息 <p class="closeX" id="closeX" @click="$store.commit('isChannelMsg')"><i></i></p></div>
      <div class="left_info">
        <ul style="float:left;">
          <li>
            <div class="list_name">
            渠道编号
          </div> {{dataObj.id |placeholder}}</li>
          <li>
            <div class="list_name">
              渠道名称
            </div>
            {{dataObj.name | placeholder}}</li>
          <li> <div class="list_name">
            渠道类型
          </div> {{dataObj.type|channelTypeShow}}</li>
          <li> <div class="list_name">
            联系人
          </div> {{dataObj.linkmanName|placeholder}}</li>
          <li><div class="list_name">联系电话 </div>{{dataObj.linkmanTelephone|placeholderTel}}</li>
          <li><div class="list_name">公司电话 </div>{{dataObj.companyTelephone|placeholderTel}}</li>
          <li><div class="list_name">联系电话 </div>{{dataObj.linkmanPhoneNum|placeholderTel}}</li>
          <li><div class="list_name">总部地址 </div>{{dataObj.headquarterAddress|placeholder}} </li>
          <li><div class="list_name">卡号 </div>{{dataObj.cardNumber|placeholderTel}} </li>
          <li><div class="list_name">子渠道数量 </div>{{dataObj.subclassCount}}</li>
          <li><div class="list_name">近期登陆 </div>{{dataObj.recentLogin|moment('YYYY-MM-DD HH:mm:ss')}}</li>
        </ul>
        <ul style="float:right;">
          <li><div class="list_name">已完成单 </div>{{dataObj.completeCount}}</li>
          <li><div class="list_name">总流水(元) </div>{{dataObj.totalWater}}</li>
          <li><div class="list_name">上期流水(元) </div>{{dataObj.previousPeriodWater}}</li>
          <li><div class="list_name">用户人数(人) </div>{{dataObj.userNumber}}</li>
          <li><div class="list_name">总订单数 </div>{{dataObj.totalOrders}}</li>
          <!--<li> <div class="list_name">折扣 </div> {{dataObj.discount}}%</li>-->
          <li><div class="list_name">状态 </div>{{dataObj.state|userState}}</li>
        </ul>
      </div>
      <div class="btn_box">
        <el-button class="button" @click="$store.commit('isChannelMsg')">关闭</el-button>
      </div>
    </div>
    <div >
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        dataObj:{},
      }
    },
    created(){
      let url=this.$apidomain+"/officialpartnerinfo/findonedetails?id="+this.$getLocalStorage("enrolleeinfo")[0].id;
      this.$http.get(url).then(r=>{
        let data=r.data;
        if(data.code==="0000"){
          this.dataObj = data.result.info;
        }else{
          this.$queryFun.successAlert.call(this,data.error,"0");
        }

      });
    },
    methods: {
    },
    mounted() {

    },

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/ch_alert";
  #app{
    width:60%;
    margin: 0 auto;
    position:relative;
    top:50%;
    transform:translateY(-50%);
  }
  .confirm_btn{
    width:60%;
    transform:translateX(30%);
  }
  .alert_forbidden_text{
    padding:0 50px;
  }
  .left_info {
    border:1px solid #ccc;
    overflow-y: auto;
    /*max-height:1000px;*/
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #ededed;
    }

   > ul{
        list-style:none;
        width:50%;
        padding-left:10px;
        padding-bottom:20px;
      >li{
        font-size:14px;
        line-height:40px;
      }
    }
    >ul:first-of-type{
      border-right:1px solid #ccc;
    }
  }
  @media  screen and (max-height:720px){
    .left_info{
      max-height:400px;
    }
  }
  @media  screen and (max-height:670px){
    .left_info{
      max-height:300px;
    }
  }
.title{
  display: block;
  width:100%;
  line-height: 3em;
  padding-left:10px;
  font-weight: bold;
  font-size: 16px;
}
.content{
  background:#fff;
  padding-left:20px;

  padding-right:20px;
  padding-bottom:20px;
}
  #closeX{
    >i{
      background:url(../../../assets/images/cloos_alert.png) center center no-repeat;
      background-size:100% 100%;
    }
  }
  .list_name{
    text-align: left;
    width:8em;
  }
  .btn_box{
    text-align: center;
    margin-top:40px;
    margin-bottom:20px;
  }
  .button{
    padding-left:35px;
    padding-right:35px;
  }
</style>
