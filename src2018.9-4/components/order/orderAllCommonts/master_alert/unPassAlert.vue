<template>
  <div id="app">
    <div class="addAlert"></div>
    <div class="addAlert_boxs">
      <div class="header">
        {{childrenInfo.name}}
        <span @click="close"></span>
      </div>
      <p>不通过原因</p>
      <ul>
        <li v-for="(item,index) in reasonInfo" :key="index">
          <span :class="{reason:flag===index}" @click="selector(index,item)"></span>
          {{item.value}}
        </li>
      </ul>
      <p>备注信息</p>
      <textarea placeholder="请输入备注信息(必填)" v-model="examineRemark">
         </textarea>
      <div class="bottom_box">
        <el-button style="width: 140px;"  @click="quit">取消</el-button>
        <el-button  style="width: 140px" @click="reset" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['childrenInfo','query'],
    data(){
      return{
         flag:'',
         reasonInfo:[
           {value:'服务凭证不全'},
           {value:'多收费'},
           {value:'虚假结单'},
           {value:'其他'}
         ],
        examineReasons:'',   //审核原因
        examineRemark:''     //审核备注
      }
    },
    methods:{
      selector(index,item){
        this.flag = index;
        this.examineReasons = item.value;
      },
      close(){
        this.$emit('isClose',false);
      },
      quit(){
        this.close();
      },
      reset(){
        if(this.examineReasons.length===0){
          return this.$queryFun.successAlert.call(this,'请选择不通过原因');
        }
        if(this.examineRemark===""){
          return this.$queryFun.successAlert.call(this,'请输入不通过备注信息');
        }
        let url = `${this.$apidomain}/manage/order/examineOrder`,
          params={
             id:this.childrenInfo.orderId,
             examineReasons:`${this.examineReasons}`,
             examineRemark:this.examineRemark,
             examineState:'2'
          };
        this.$http.post(url,params).then(res=>{
          let data = res.data;
          console.log('0000')
          if(data.code==='0000'){
            this.$queryFun.successAlert.call(this,'不通过操作成功');
            this.query();
            this.close();
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .addAlert{
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
  .addAlert_boxs{
    width: 960px;
    height: 620px;
    background:rgba(255,255,255,1);
    z-index: 9999;
    position: absolute;
    top:50%;
    left: 50%;
    margin:-310px 0 0 -480px;
    border-radius:8px;
    p{
      width:900px;
      height:30px;
      background:rgba(240,240,240,1);
      margin: 20px 0 0 28px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(51,51,51,1);
      line-height:30px;
      text-indent: 10px;
    }
    >ul{
      margin-top: 70px;
      li{
        margin-top: 10px;
        padding: 0 40px;
       // background: red;
        height:25px;
        font-size:13px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:25px;
        span{
          display: inline-block;
          background: url("../../../../assets/images/isReasons.png") center center no-repeat;
          background-size: 100% 100%;
          width:20px;
          height: 20px;
          transform:translateY(5px);
          margin-right: 10px;
        }
        .reason{
          background: url("../../../../assets/images/reasons.png") center center no-repeat;
        }
      }
    }
    .header{
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 18px;
      position: relative;
      border:1px solid rgba(215,215,215,1);
      span{
        position: absolute;
        top:16px;
        right: 30px;
        display: inline-block;
        background: url("../../../../../static/images/adoptClose.png") center center no-repeat;
        background-size: 100% 100%;
        width:14px;
        height: 14px;
      }
    }
    textarea{
      margin-top: 15px;
      width: 900px;
      height: 100px;
      margin-left: 28px;
      resize: none;
      border-radius:4px;
      outline: none !important;
      padding: 10px;
      border-color:#979797 !important;
    }
    .bottom_box{
      margin-top: 106px;
      padding-left: 320px;
      width: 100%;
    }
  }
</style>
