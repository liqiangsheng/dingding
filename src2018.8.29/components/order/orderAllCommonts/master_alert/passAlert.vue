<template>
  <div id="app">
    <div class="addAlert"></div>
    <div class="addAlert_box">
      <div class="header">
         {{childrenInfo.title}}
        <span @click="close"></span>
      </div>
      <textarea :placeholder="wenan" v-model="remark">
         </textarea>
      <div class="bottom_box">
        <el-button style="width: 140px;"  @click="quit">取消</el-button>
        <el-button  style="width: 140px" type="primary" @click="reset">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['childrenInfo','query'],
    data(){
      return{
        remark:'',
        wenan :'请填写备注（必填）',
      }
    },
    created(){
      if(this.childrenInfo.name === '处理'){
        this.wenan = "请填写解决原因（必填）"
      }else  if(this.childrenInfo.name === '通过'){
        this.wenan = "请必须填写以下信息：产品名称、配件信息、实收金额、回单信息（必填）"
      }else{
        this.wenan = "请填写备注（必填）"
      }
    },
    methods:{
      close(){
        this.$emit('isClose',false);
      },
      quit(){
        this.close();
      },
      reset() {
          if (this.remark.length === 0) {
            return this.$queryFun.successAlert.call(this, '请输入备注信息')
          }
         if (this.childrenInfo.name === '通过') {
          let url = `${this.$apidomain}/manage/order/examineOrder`,
            params = {
              id: this.childrenInfo.orderId,
              examineState: '1',
              examineRemark: this.remark
            };
          this.$http.post(url, params).then(res => {
            let data = res.data;

            if (data.code === '0000') {
              this.$queryFun.successAlert.call(this, '通过成功')
              this.close();
              this.query();
            } else {
              this.$queryFun.successAlert.call(this, data.error);
            }
          })
        }else if(this.childrenInfo.name === '处理'){
           let url = `${this.$apidomain}/exceptionrecord/replyAsk`,
             params = {
               mainOrderId: this.childrenInfo.data.id,
               relationId: this.childrenInfo.data.exceptionRecordID,
               remark: this.remark
             };
           this.$http.post(url, params).then(res => {
             let data = res.data;
             if (data.code === '0000') {
               this.$queryFun.successAlert.call(this, '解决成功')
               this.close();
               this.query();
             } else {
               this.$queryFun.successAlert.call(this, data.error);
             }
           })
        }else{
          this.$queryFun.successAlert.call(this,'问题求助后台暂无接口');
          this.close();
        }
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
      padding-left: 150px;
    }
  }
</style>
