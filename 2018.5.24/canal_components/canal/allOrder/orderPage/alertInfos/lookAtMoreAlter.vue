<template>
  <!--查看更多-->
  <div>
      <div class="lookAtMoreAlter"><!--背阴--> </div>
      <div class="lookAtMoreAlter_box">
        <div class="el-message-box__title">
          <span>常用产品</span>
          <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <div id="lookAtMoreAlterBox">
          <ul class="lookAtMoreOne">
            <li v-for="(item,index) in fenlei" :class="{activeFenlei:FenleiIndex==index}" @click="fenleiClick(item,index)">{{item}}</li>
          </ul>
          <ul class="lookAtMoreTwo">
              <li v-for="(item,index) in fenleiList">
                <img src="/static/images/weixuanzhong.png"  @click="fenleiListClick(item,index)">
                <img :src="item.imgPath" v-if="FenleiActiveIndex==index&&item.bool">
                <span class="span1">{{item.pinpai}}　{{item.xinghao}}</span>
                <span class="span2">{{item.name}}</span>
                <span class="span3" @click="deleteHistory(item,index)" v-show="FenleiActiveIndex==index&&item.bool">删除</span>
              </li>
          </ul>
        </div>
         <div class="foot">
           <el-button style="width: 140px" @click="close">取消</el-button>
           <el-button type="primary" style="width: 140px" @click="add()">添加</el-button>
         </div>
      </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {
         fenlei:["家电维修","家电清洗","手机维修","家电维修","家电清洗","手机维修","家电维修","家电清洗"],
        fenleiList:[
          {
            bool:false,
            pinpai:"格力",
            xinghao:"A-890506",
            imgPath:"/static/images/xuanzhong.png",
            name:"多次恶意违规收费"
          },
          {
            bool:false,
            pinpai:"格力",
            xinghao:"A-890506",
            imgPath:"/static/images/xuanzhong.png",
            name:"多次被投诉"
          },
          {
            bool:false,
            pinpai:"格力",
            xinghao:"A-890506",
            imgPath:"/static/images/xuanzhong.png",
            name:"关键资料不全"
          },
          {
            bool:false,
            pinpai:"格力",
            xinghao:"A-890506",
            imgPath:"/static/images/xuanzhong.png",
            name:"引导用户线下付款"
          },
          {
            bool:false,
            pinpai:"格力",
            xinghao:"A-890506",
            imgPath:"/static/images/xuanzhong.png",
            name:"师傅离职"
          },
          {
            bool:false,
            pinpai:"格力",
            xinghao:"A-890506",
            imgPath:"/static/images/xuanzhong.png",
            name:"其他"
          }
        ],
        FenleiIndex:0,
        FenleiActiveIndex:-1,
      }
    },
    watch:{
    },
    created(){

    },
    methods: {
      close(){ //传值给父亲组件
        let isbool = false;
         this.$emit("isClose",isbool)
      },
      fenleiClick(v,i){
         this.FenleiIndex = i;
      },
      fenleiListClick(v,i){
          this.FenleiActiveIndex =i;
          v.bool = true;
      },
      deleteHistory(v,i){
        this.fenleiList.splice(i,1);
      },
      add(){//添加
       console.log("添加")
      },
    },
    mounted() {
    },
    updated(){

    }
  }
</script>
<style scoped lang="scss">
  .lookAtMoreAlter{
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
  .lookAtMoreAlter_box{
    width: 840px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    left: 18%;
    top:20%;
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
  #lookAtMoreAlterBox{
    width: 100%;
    height: 380px;
    padding: 30px;
    .lookAtMoreOne{
      width: 100%;
      height: 36px;
      overflow: hidden;
      li:nth-child(1){
        margin-left: 0;
      }
      li{
        width: 80px;
        height: 36px;
        border: 1px solid #C0CCDA;
        border-radius: 4px ;
        float: left;
        margin-left: 10px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
        line-height:36px;
        text-align: center;
      }
      li.activeFenlei{
        background:rgba(32,160,255,1);
        color: #FFFFFF;
        border-radius: 4px ;
      }
    }
    .lookAtMoreTwo{
      width: 100%;
      margin-top: 30px;
      height:240px;
      border: 1px solid #E0E6ED;
      overflow-y:auto ;
      li:last-child{
        border-bottom: none;
      }
      li{
        position: relative;
        padding: 0 12px;
        width: 100%;
        height: 44px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:44px;
        border-bottom: 1px solid #E0E6ED;
        img:nth-child(1){
          transform: translateY(2px);
          width: 16px;
          height: 16px;
          display: inline-block;
        }

        img:nth-child(2){
          position: absolute;
          left: 11px;
          top:12px;
          width: 17px;
          height: 17px;
          display: inline-block;
        }
      }
    }
    .span1{
      display: inline-block;
      width: 249px;
      margin-left: 12px;
    }
    .span2{
      display: inline-block;
      width: 350px;
    }
    .span3{
      display: inline-block;
      width: 50px;
      float: right;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(32,160,255,1)
    }
  }
  .foot{
    width: 100%;
    text-align: center;
  }
</style>


