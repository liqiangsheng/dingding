<template>
  <!--待服务-->
  <div id="waitForService">
        <ul class="waitForServiceBox" v-for="(item,index) in userList">
                <li><span class="span1">工单号:</span>{{item.id}} <span>{{item.emergencyDegree}}</span><span>{{item.state}}</span></li>
                <li><span class="span1">师傅姓名:</span>{{item.name}} </li>
                <li><span class="span1">分类:</span>{{item.classification}} </li>
                <li><span class="span1">联系人:</span>{{item.contacts}} </li>
                <li><span class="span1">服务地址:</span>{{item.serviceAddress}} </li>
                <li><span class="span1">预约时间:</span>{{item.imeOfAppointmentt}} </li>
                <p>{{item.orderState}}</p>
                <li @click="reassignment(item)"><button><img src="../../../assets/images/contact_master_icon.png">改派 </button></li>
        </ul>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          userList:[
            {
              id:"1856589030618565890306",
              name:"李大大",
              state:"待上工",
              emergencyDegree:"加急",
              classification:"手机维修",
              contacts:"陈小姐",
              serviceAddress:"广东深圳市南山区科技园A大厦B栋145",
              imeOfAppointmentt:"2018-05-08 15:00:00",
              orderState:"企业",
            },
            {
              id:"1856589030618565890306",
              name:"李大大",
              state:"待上工",
              emergencyDegree:"正常",
              classification:"电脑维修",
              contacts:"陈大哥",
              serviceAddress:"广东深圳市南山区科技园A大厦B栋145",
              imeOfAppointmentt:"2018-05-08 15:00:00",
              orderState:"企业",
            }
          ]

        }
      },
      methods: {
        reassignment(v){
          sessionStorage.removeItem("reassignmentData");
          sessionStorage.setItem("reassignmentData",JSON.stringify(v));
        }

      }

    }

</script>
<style scoped lang="less">
  #waitForService{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:1.96rem;
    background:rgba(241,241,241,1);
    overflow-y: auto;
    .waitForServiceBox{
      width: 100%;
      margin-top: 0.16rem;
      background: #ffffff;
      padding: 2.5%;
      position: relative;
      p{
        width: 0.94rem;
        height: 0.42rem;
          position: absolute;
          right: 0.16rem;
          top:1.0rem;
      }
      li:last-child{
        width: 100%;
        margin-bottom: 0.16rem;
        button{
          border: 0;
          background: none;
          float: right;
          width:1.9rem;
          height:0.7rem;
          background:rgba(83,107,210,1);
          border-radius:0.08rem ;
          font-size:0.32rem;
          font-family:PingFangSC-Regular;
          color:rgba(255,255,255,1);
          line-height:0.32rem;
          img{
            display: inline-block;
            width:.31rem;
            height: .3rem;
            margin-right: 0.16rem;
          }
        }
      }

      li{
        width: 100%;
        height: 0.58rem;
        line-height: 0.58rem;
        .span1{
          display: inline-block;
          width:1.32rem;
          text-align: right;
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          margin-right: 0.15rem;
        }
      };
      li:nth-child(1){
        width: 100%;
        height:.58rem;
        font-size:.24rem;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:.33rem;
        border-bottom: 0.01rem solid #cccccc;
        span:nth-child(2){
          display: inline-block;
          width: 0.72rem;
          height: 0.32rem;
          margin: 0 0.2rem;
        }
        span:nth-child(3){
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(230,88,49,1);
          line-height:0.4rem;
          float: right;
        }
      }
    }

  }

</style>


