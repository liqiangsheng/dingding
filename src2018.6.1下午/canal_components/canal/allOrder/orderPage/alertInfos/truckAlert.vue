<template>
  <div>
      <div class="trackAlert"><!--背阴--> </div>
      <div class="trackAlert_box">
        <div class="el-message-box__title">
           <span>订单跟踪</span>
           <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <div class="trackAlertCenter">
             <div class="trackAlertLeft">
                   <ul>
                     <li v-for="(item,index) in userInformation">
                       <div><img src="/static/images/wancheng.png"></div>
                       <div><p>{{item.operateAction}}</p><br><p class="p1">{{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</p><br><p class="p2" v-show="isShow">备注:{{item.operateRemark}}</p></div>
                     </li>

                   </ul>
             </div>
              <div class="trackAlertRight">
                      <div class="trackAlertTop">
                           <div class="box1"><span></span><span>用户信息</span></div>
                            <ul>
                                <li>联系人：<span>{{detailInformation.linkmanName}}</span></li>
                                <li>联系人手机：<span>{{detailInformation.linkmanPhoneNum}}</span></li>
                                <li>地址：<span>{{detailInformation.linkmanDetails}}</span></li>
                                <li>分类：<span>{{detailInformation.fLabelBusiness|FLabelBusiness}}</span></li>
                                <li>预约时间：<span>{{detailInformation.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span></li>
                            </ul>
                      </div>
                      <div class="trackAlertBottom">
                            <div class="box"><span></span><span>师傅定位跟踪</span></div>
                            <div class="mapbox">
                              <img src="/static/images/map.png">
                              <p>暂无定位跟踪</p>
                            </div>
                      </div>
              </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    props:["trackAlterId"],
    components:{
    },
    data() {
      return {
        userInformation:[],//用户信息
        detailInformation:{},//详情信息
        createTimeInformation:[],//时间信息
        isShow:false,  //备注显示消失
      }
    },
    watch:{
    },
    created(){
//      console.log(this.$store.state.trackAlterId)
        let url = this.$apidomain+"/orderquery/findOrderTracking?mainOrderId="+this.trackAlterId;
        this.$http.get(url).then(res=>{
             this.detailInformation = res.data.result.order;
             this.userInformation = res.data.result.coreMainOrderRecords;
             this.userInformation.forEach(v=>{
                if(!v.operateRemark){
                          this.isShow = false;
                }else{
                   this.isShow =true;
                }
             })
        })
    },
    methods: {
      close(){ //传值给父亲组件
        let isbool = false;
         this.$emit("isClose",isbool)
      }
    },
    mounted() {
    },
    updated(){

    }
  }
</script>
<style scoped lang="scss">
  .trackAlert{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .trackAlert_box{
    width: 550px;
    height: 600px;
    background-color: #fff;
    position: absolute;
    left: 30%;
    top:14%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:10%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 14px;
      top:14px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:60px;
      text-align: center;
    }
  }
  .trackAlertCenter{
    margin-top: 3%;
    padding: 5px 5px 10px 5px;
    width:100%;
    height: 87%;
    overflow: hidden;
    display: flex;
    .trackAlertLeft,{
      overflow-y: auto;
      flex: 1;
    }
    .trackAlertRight{
      flex: 1;
      .trackAlertTop{
        width:100%;
        height: 232px;
        ul{
          width: 100%;
          margin-top: 20px;
          li{
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:rgba(57,57,57,1);
            line-height:30px;
          }
        }
        .box1{
          width:100%;
          span:nth-child(1){
            display: inline-block;
            width:4px;
            height:18px;
            background:rgba(230,88,49,1);
            transform: translateY(3px);
          }
          span:nth-child(2){
            margin-left: 10px;
            display: inline-block;
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Regular;
            color:rgba(136,136,136,1);
            line-height:22px;
          }
        }
      }
      .trackAlertBottom{
        width:100%;
        height: 256px;
        overflow: hidden;
        background: #FFFFFF;
        .mapbox{
          width: 100%;
          height:214px;
          background:rgba(243,243,243,1);
          margin-top: 20px;
          position: relative;
          img{
            width: 128px;
            height: 128px;
            position: absolute;
            left: 32%;
            top: 10%;
          }
          p{
            width: 100%;
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:rgba(136,136,136,1);
            line-height:20px;
            position: absolute;
            left: 38%;
            top:77%;
          }
        }
        .box{
          width: 100%;
          span:nth-child(1){
            display: inline-block;
            width:4px;
            height:18px;
            background:rgba(230,88,49,1);
            transform: translateY(3px);
          }
          span:nth-child(2){
            margin-left: 10px;
            display: inline-block;
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Regular;
            color:rgba(136,136,136,1);
            line-height:22px;
          }
        }
      }
    }
    .trackAlertLeft{
      ul{
        width:100%;
        li:last-child{
          border-left:0 ;
        }
        li{
          border-left:1px solid rgba(32,160,255,1);
           width: 90%;
          height: 70px;
          margin-left: 10%;
          position: relative;
          div{
            display: inline-block;
            img{
              display: inline-block;
              position: absolute;
              left: -10px;
              top:0;
              z-index:2010;
            }
            p{
              display: block;
              height:20px;
              font-size:14px;
              font-family:PingFangSC-Regular;
              color:rgba(57,57,57,1);
              line-height:20px;
              margin-left: 20px;
            }
           .p1{
              height:14px;
              font-size:10px;
              font-family:PingFangSC-Regular;
              color:rgba(136,136,136,1);
              line-height:14px;
            }
            .p2{
              height:17px;
              font-size:12px;
              font-family:PingFangSC-Regular;
              color:rgba(94,109,130,1);
              line-height:17px;
              background:rgba(243,243,243,1);
            }

          }
        }
      }
    }
  }
</style>


