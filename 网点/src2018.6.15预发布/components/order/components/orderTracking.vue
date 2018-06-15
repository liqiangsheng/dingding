<template>
  <!--订单跟踪-->
    <div class="OrderTracking">
        <div id="OrderTrackingShow"></div>
        <div id="OrderTrackingCenter">
             <div class="OrderTrackingtop">
               <ul>
                 <li v-for="(item,index) in userInformation">
                   <img :src="item.img">
                   <div><p>{{item.operateAction}}</p><br><p class="p1">{{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</p><br><p class="p2" v-show="isShow">备注:{{item.operateRemark}}</p></div>
                 </li>

               </ul>
             </div>
             <div class="OrderTrackingbot">
               <img src="/static/images/close.png" @click="close">
             </div>
        </div>
    </div>
</template>
<script>

  export default {
    props:["trackAlterId"],
    components:{
    },
    data () {
      return {
        userInformation:[],
        isShow:false,
      }
    },
    methods:{
      close(){
        this.$emit("isClose",false)
      }
    },
    created() {
      let url = `${this.$common.apidomain}/orderquery/findOrderTracking?mainOrderId=${this.trackAlterId}`;
      this.$http.get(url).then(res=>{
        res.data.result.coreMainOrderRecords.forEach(v=>{
          v.img = "/static/images/wancheng.png";
          if(!v.operateRemark){
            this.isShow = false;
          }else{
            this.isShow =true;
          }
        })
        this.userInformation = res.data.result.coreMainOrderRecords;
      })

    },
   mounted(){

   },
  }
</script>
<style scoped lang="less">
  .OrderTracking{
    position: absolute;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    overflow-y: auto;
    z-index: 12001;
    #OrderTrackingShow{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: #000000;
      overflow-y: auto;
      opacity: 0.5;
    }
    #OrderTrackingCenter{
      width: 88%;
      height: 8.86rem;
      position: absolute;
      left: 6%;
      top:2.34rem;
      z-index: 1;
      .OrderTrackingbot{
        width: 100%;
        height: 1.2rem;
        img{
          display: inline-block;
          height: 0.8rem;
          width: 0.8rem;
          margin: 0.39rem 0 0 45%;
        }
      }
      .OrderTrackingtop{
        width: 100%;
        height: 7.96rem;
        overflow-y:auto ;
        background: #ffffff;
        border-radius:0.08rem;
        padding:0.56rem 0;
        border:1px solid rgba(151,151,151,1);
        ul{
          width:100%;
          li:last-child{
            border-left:0 ;
          }
          li{
            border-left:0.04rem solid #536BD2;
            width: 90%;
            min-height: 1.17rem;
            margin-left: 10%;
            position: relative;
            img{
              width: 0.42rem;
              height: 0.42rem;
              display: inline-block;
              position: absolute;
              left: -0.2rem;
              top:0rem;
            }
            div{
              p{
                display: inline-block;
                height:0.4rem;
                font-size:0.28rem;
                font-family:PingFangSC-Regular;
                color:rgba(57,57,57,1);
                line-height:0.4rem;
                margin-left: 0.4rem;
              }
              .p1{
                height:0.33rem;
                font-size:0.24rem;
                font-family:PingFangSC-Regular;
                color:rgba(136,136,136,1);
                line-height:0.33rem;
              }
              .p2{
                height:0.56rem;
                font-size:0.24rem;
                font-family:PingFangSC-Regular;
                color:#393939;
                text-indent: 0.11rem;
                line-height:0.56rem;
                background:#D8D8D8;
                padding-right: .11rem;
                padding-bottom: 0.1rem;
              }

            }
          }
        }
      }
    }
  }
</style>

