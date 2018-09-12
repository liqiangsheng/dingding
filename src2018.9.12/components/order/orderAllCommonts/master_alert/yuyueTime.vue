<template>
    <div id="app">

        <h3>{{time1.title}} <i @click="close"></i></h3>
        <ul class="alert_forbidden_text">
          <li>
            预约时间：
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
      props:["time1","quiry"],
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
            this.time1.isShow = false;
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
                this.close();
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
      i{
        display: inline-block;
        position: absolute;
        right: 10px;
        top:10px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        background: url(../../../../../static/images/pruductclose.png) no-repeat center;
      }
      i:hover{
        cursor: pointer;
        background: url(../../../../../static/images/pruduct1close.png) no-repeat center;
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
      border-top:1px solid rgba(0,0,0,.1);
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


