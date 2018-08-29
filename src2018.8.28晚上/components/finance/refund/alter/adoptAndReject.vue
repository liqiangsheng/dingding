<template>
    <div id="app">
       <div class="addAlert"></div>
       <div class="addAlert_box">
          <div class="header">
            {{childrenInfo.name}}
            <span @click="close"></span>
          </div>
         <textarea placeholder="请输入备注内容(选填)" v-model="text">
         </textarea>
         <div class="bottom_box">
           <el-button  style="width: 200px;"  @click="quit">取消</el-button>
           <el-button  style="width: 200px" @click="confirm()" type="primary">确定</el-button>
         </div>
       </div>
    </div>
</template>

<script>
    export default {
      props:['childrenInfo','query'],
      data(){
        return{
          text:''
        }
      },
      methods:{
        close(){
          this.$emit('isClose',false);
        },
        quit(){
          this.close();
        },
        confirm(){
          let params = {
            orderId:this.childrenInfo.orderInfo.mainOrderNum,
            refundType:this.childrenInfo.orderInfo.refundType,
            refundDesc:this.text,
            refundFee:this.childrenInfo.orderInfo.refundFee,
            faPayJournalAccountId:this.childrenInfo.orderInfo.id,              //流水号
            approvalState:this.childrenInfo.name==='通过'?"1":"2"
          },url=`${this.$apidomain}/faPayJournalAccount/approval`

          this.$http.post(url,params).then(res=>{
            console.log(res,'通过')
            let data = res.data;
            if(data.code==="0000"){
              this.query();
              this.close();
            }else{
              this.$queryFun.successAlert.call(data.error)
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
  .addAlert_box{
    width: 600px;
    height: 300px;
    background:rgba(255,255,255,1);
    z-index: 2008;
    position: absolute;
    top:50%;
    left: 50%;
    margin:-150px 0 0 -300px;
    //border:1px solid rgba(151,151,151,1);
    border-radius:8px;
    .header{
      margin-bottom: 30px;
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
      width: 540px;
      height: 100px;
      margin-left: 30px;
      resize: none;
      border-radius:4px;
      outline: none;
      padding: 10px;
    }
    .bottom_box{
      margin-top: 50px;
      width: 100%;
      padding-left: 100px;
    }
  }
</style>
