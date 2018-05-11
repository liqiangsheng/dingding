<template>
    <div id="app">
      <el-dialog style="z-index:999999"  :visible.sync="time.isShow" size="tiny">
        <h3>{{time.title}}</h3>
        <ul class="alert_forbidden_text">
          <li>
          原预约时间：{{time.time | moment('YYYY-MM-DD HH:mm:ss')}}
        </li>
          <li>
            新预约时间：
            <DatePicker v-model="changeTime.newTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" ></DatePicker>
          </li>
        </ul>
        <el-button style="position:relative; left:50%; transform:translateX(-50%)"  @click="masterImposeOperate(time,changeTime.newTime)" type="primary">确定修改</el-button>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      props:["time","findOne"],
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
          masterImposeOperate(time,newTIme){
            let date=this.$moment(newTIme).format('YYYY-MM-DD HH:mm:ss');
            let urlR=this.$apidomain+"/order/changetime";
            this.$http.post(urlR,{"timestr":date,"orderid":time.orderId}).then(r=>{
              let data=r.data;
              if(data.code==='0000'){
                console.log(data);
                time.isShow=false;
                this.findOne();
              }else{
                alert(data.error);
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

  }
  h3{
    font-weight: normal;
    position:absolute;
    font-size: 14px;
    left:50%;
    top:15px;
    transform: translateX(-50%);
    text-align: center;
  }
  .alert_forbidden_text{
    list-style: none;
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


