<template>
  <div class="WechatScavengingCater">
    <header>
      <p @click="tel">支付遇到问题？<img src="/static/images/wenhao.png" alt=""></p>
      <p v-show="clickShow">致电客服热线：400-999-1891</p>
    </header>
    <content>
      <p>推荐微信扫码支付</p>
      <p><img :src="imgUrl" alt=""></p>
    </content>
    <footer>
      <el-button type="primary" @click="success">我已成功支付</el-button>
    </footer>
    <!--<WorkOrderSubmission v-if="zhifuShow"  @isClose="isClose"></WorkOrderSubmission>-->
  </div>
</template>
<script>
//  import WorkOrderSubmission from "./WorkOrderSubmission.vue" //支付成功
  export default {
    props:["zhifubao","clearTimeOnem"],
    components:{
//      WorkOrderSubmission
    },
    data() {
      return {
        imgUrl:"",
        clickShow:false, //支付问题电话
        num:1, //3秒请求一次数据
        id:"",
        zhifuShow:false,
        temp:"",
        payState:"",
      }
    },
    watch:{
      clearTimeOnem:function(newDATA,oldTime){
        console.log(newDATA,"888")
        console.log(oldTime,"oldTime")
         if(newTime == 0){
           clearInterval(this.temp);
         }
      }
    },
    methods: {
      isClose(v){
        this.zhifuShow =v;
        location.reload();
      },
      tel(){ //支付问题电话
        this.clickShow =!this.clickShow
      },
      success(){//成功支付
//            this.$emit("success",false)
        if(this.payState == "2"){
          this.$emit("success",false);
          location.reload();
        }else if(this.payState == "1"){
          alert("你还没支付成功，请支付")
        }
      },
      query(){
        let obj = {};
        obj.id = this.id
        //      http://admin.test.dingdingkuaixiu.com/officialpartnercostflowController/findOne
        let url = this.$apidomain+"/officialpartnercostflowController/findOne";
        this.$http.post(url,obj).then(res=>{

          if(res.data.code =="0000"){
            this.payState = res.data.result.payState;
            if(res.data.result.payState == "2"){
              let mainOrderIdObj={};
              mainOrderIdObj.mainOrderId = JSON.parse(sessionStorage.getItem("mainOrderId"));
              mainOrderIdObj.officialPartnerId = JSON.parse(sessionStorage.getItem("userInfo"))[0].channelId;
              let mainOrderIdUrl=this.$apidomain+"/order/payCallback";
              this.$http.post(mainOrderIdUrl,mainOrderIdObj).then(res1=>{
                if(res1.data.code=="0000"){
                  alert("支付成功")
                  clearInterval(this.temp);
                  this.$router.push({path:"./orderPage/alertInfos/WorkOrderSubmission"})
                }else if(res1.data.code=="0902"){
                  this.success();    //充值显示
                }else{
                  return this.$queryFun.successAlert.call(this,res1.data.error)
                }
              })

            }else if(res.data.result.payState == "1"){
              console.log("我还没支付")
            }
          }else{
            this.$queryFun.successAlert.call(this,res.data.error)
          }
        })
      },
    },
    mounted() {

    },
    created(){
      setTimeout(()=>{
        this.imgUrl = JSON.parse(sessionStorage.getItem('zhifubao')).createCodeUrl;
        this.id = JSON.parse(sessionStorage.getItem('zhifubao')).officialPartnerCostFlowId;
      },500);
        setTimeout(()=>{
            let that = this;
            this.temp=setInterval(()=>{
              that.num++;
              if(that.num%5==0){
                that.query();
              }
            },1000);
       },1000)



    }
  }
</script>

<style scoped lang="scss">
  .WechatScavengingCater{
    width: 100%;
    overflow: hidden;
    header{
      width: 100%;
      height: 70px;
      position: relative;
      p:nth-child(1){
        position: absolute;
        right:80px;
        top:20px;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(32,160,255,1);
        line-height:20px;
        cursor: pointer;
      }
      p:nth-child(2){
        position: absolute;
        right:40px;
        top:50px;
        height:59px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        background:rgba(255,247,204,1);
        line-height:59px;
      }
    }
    content{
      width:100%;
      p:nth-child(1){
        width: 100%;
        text-align: center;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
        line-height:22px;
      }
      p:nth-child(2){
        margin: 20px 0;
        width: 100%;
        text-align: center;
        img{
          display: inline-block;
          width: 162px;
          height: 162px;
          border: 1px solid rgba(216,216,216,1);
          background:rgba(216,216,216,1) ;
        }

      }
    }
    footer{
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
  }
</style>
