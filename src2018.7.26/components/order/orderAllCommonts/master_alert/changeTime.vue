<template>
    <div id="app">
        <h3>{{time.title}} <img src="/static/images/del.png" @click="close"></h3>
        <ul class="alert_forbidden_text">
          <li>
          原预约时间：{{time.time | moment('YYYY-MM-DD HH:mm:ss')}}
        </li>
          <li>
            新预约时间：
            <DatePicker v-model.trim="changeTime.newTime" type="datetime" format="yyyy-MM-dd HH:mm"
                        placeholder="选择日期和时间"></DatePicker>
          </li>
        </ul>
      <div class="bottom">
        <el-button @click="close">取消</el-button>
        <el-button  @click="masterImposeOperate(time1,changeTime.newTime)" type="primary">确定修改</el-button>
      </div>
    </div>
</template>
<script>
    export default {
      props:["time","quiry"],
        data() {
            return {
              changeTime: {
                masterImpose: false,
                amount: "",
                newTime: "",
              }
            }
        },
        methods: {
          close(){
            this.time.isShow = false;
            this.quiry();
          },
          masterImposeOperate(time,newTIme){
            if(newTIme == ""){
              return this.$queryFun.successAlert.call(this,"请填写预约时间")
            }
            let date=this.$moment(newTIme).format('YYYY-MM-DD HH:mm:ss');
            let urlR=this.$apidomain+"/order/changetime";
            this.$http.post(urlR,{"timestr":date,"orderid":time.orderId}).then(r=>{
              let data=r.data;
              if(data.code==='0000'){
                time.isShow=false;
                this.quiry();
              }else{
                this.$queryFun.successAlert.call(this,data.error)
              }
            });
//        发送请求完成后清空参数
//        关闭弹窗
          },

        },
        created() {
          this.changeTime.newTime=''
        }
    }
</script>
<style>
  .el-dialog__body{
    padding-top:0 ;
  }
</style>
<style scoped lang="scss">
  #app{
    position:relative;
    width: 600px;
    height: 300px;
    background: #fff;
    margin: 15% 0 0  35%;
    border-radius:8px;
    border:1px solid rgba(151,151,151,1);
    h3{
      position: relative;
      border-bottom:2px solid rgba(151,151,151,1);
      width:100%;
      height: 48px;
      text-align: center;
      line-height: 48px;
      img{
        position: absolute;
        top:15px;
        right: 30px;
      }
    }
    .bottom{
      width: 100%;
      height: 40px;
      button{
        width: 200px;
        margin-left: 13%;
      }
    }
  }
  .alert_forbidden_text{
    list-style: none;
    width: 100%;
    height: 168px;
    padding: 36px 70px 0 70px;
    >li{
      line-height: 3em;
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
</style>


