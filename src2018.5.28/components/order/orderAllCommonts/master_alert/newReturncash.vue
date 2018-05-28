<template>
  <div id="app">
    <el-dialog style="z-index:999"  :visible.sync="isRepair.isShow">
      <h3 class="alert_title">{{isRepair.title}}</h3>
      <ul class="alert_forbidden_text">
        <li>
          工单号： {{isRepair.data.orderNumber}}
        </li>
        <li>
          服务产品:  {{isRepair.data1.serviceFullName}}
        </li>
        <li>
          师傅工号:  {{isRepair.data.masterId}}
        </li>
        <li>
          师傅姓名:  {{isRepair.data.masterName}}
        </li>
        <li>
          师傅手机号:  {{isRepair.data.masterPhoneNum}}
        </li>
        <li>
          服务时间:
          <DatePicker v-model="newtime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px"></DatePicker>
        </li>
        <li>
          <span>备注信息:</span>
          <el-input
            class="alert_forbidden_area"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="newObj.remark">
          </el-input>
        </li>
        <el-button style="float:right;"  @click="refer(isRepair)" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button style="float:right;"  @click="cancel(isRepair)">取消</el-button>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:["isRepair","findOne"],
    data() {
      return {
        newtime:'',
        objData:{alertForbiddenList:[]},
        newObj:{
          appointmentDatetime:'',
          //最新预约时间
          masterId:'',
          //师傅编号
          orderId:'',
          //工单编号
          orderServiceId:'',
          //订单服务编号
          remark:'',
          //备注
          type:''
          //工单类型(0:正常工单 1:返修工单)
        }
      }
    },
    methods: {
      cancel(isShow){
        //取消
        isShow.isShow=false;
      },
      refer(isShow){
        let url=this.$apidomain+'/order/submitRework';
        let time=this.$moment(this.newtime).format('YYYY-MM-DD HH:mm:ss');
        this.newObj.appointmentDatetime=time;
        if(this.isRepair.data.masterId){
          this.newObj.masterId=this.isRepair.data.masterId;
        }else{
          this.newObj.masterId="";
        }
        this.newObj.orderId=this.isRepair.data.orderNumber;
        this.newObj.orderServiceId=this.isRepair.data1.id;
        this.newObj.type="1";
        if(this.newObj.appointmentDatetime!='Invalid date'&&this.newObj.remark!=''){
          console.log(this.newObj);
          this.$http.post(url,this.newObj).then((r)=>{
            if(r.data.code=="0000"){
              alert("添加成功");
              isShow.isShow=false;
              console.log(r);
            }else{
              alert(r.data.error)
            }
          })
        }else if(this.newObj.appointmentDatetime=='Invalid date'){
          alert("请选择时间");

        }else if(this.newObj.remark==''){
          alert("请备注");
        }
//        console.log(this.newObj.appointmentDatetime)

      },
//      masterImposeSelector(item,index,textareaContent){
//        this.drawback.alertForbiddenList.forEach(v=>{
//          v.selector=false;
//        });
//        item.selector=true;
//      },
    },
    created() {
//      console.log(this.data)
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
      line-height: 3em;
      /*border-top:1px solid rgba(0,0,0,.1);*/
      >.order_number{
        float:right;
        padding-right:30px;
      }
    }
    >li:first-of-type{
      border:none;
    }
    span{
      display: inline-block;
    }
  }
</style>


