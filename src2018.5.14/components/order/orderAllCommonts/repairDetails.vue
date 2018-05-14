<template>
  <div id="app">
    <div v-if="orderDetailed.show">
      <h2>{{replacedata.title}}</h2>
      <ul class="alert_forbidden_text">
        <li>
          <span style="cursor: pointer"  @click="showorder(replacedata.data.mainOrderId)">工单号: {{replacedata.data.mainOrderId}}</span>
        </li>
        <li>
          返修工单号:  {{replacedata.data.id}}
        </li>
        <li>
          服务产品:  {{replacedata.data.fLabelBusiness|FLabelBusiness}}
        </li>
        <li>
          服务时间:  <span v-show="!show">{{replacedata.data.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
          <span class="time" v-show="show">
            <DatePicker v-model="pricetime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px"></DatePicker>
          </span>
        </li>
        <li>
          服务师傅:  {{replacedata.data.masterName}}
        </li>
        <li>
          服务手机号:  {{replacedata.data.masterPhoneNum}}
        </li>
        <li>
          师傅工号:  {{replacedata.data.masterId}}
        </li>
        <li>
          返修状态:  {{replacedata.data.state|BackOrderStatus}}
        </li>
        <li>
          备注:  {{replacedata.data.remark|placeholder}}
        </li>
        <li v-show="show">
          <el-input
            style="width:30%"
            class="alert_forbidden_area"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="Obj.remark"
            >
          </el-input>
        </li>
        <li class="trlist">
          <table cellSpacing="0" cellpadding="0" v-if="content.length">
            <thead>
            <tr class="theads">
              <th v-for="(item,index) in message" :key="index">{{item}}</th>
            </tr>
            </thead>
            <tr v-for="(item,index) in content">
              <td>
                {{index+1}}
              </td>
              <td>
                {{item.operateTime|moment('YYYY-MM-DD HH:mm:ss')}}
              </td>
              <td>
                {{item.reasonOfComplaint}}
              </td>
              <td>
                {{item.remark}}
              </td>
            </tr>
          </table>
        </li>
        <div style="text-align: center">
        <el-button v-show="!show" type="primary" @click="edit">编辑</el-button>
        <el-button v-show="show" type="primary" @click="sbmit">完成</el-button>
        <el-button @click="cance">关闭</el-button>
        </div>
      </ul>
    </div>

    <!--订单详情-->
    <order-details-two
      @myevent="getevent"
    :orderDetailed="orderDetailed"
    :quiry="quiry"
    v-if="!orderDetailed.show"
    :replacedata="replacedata">
    </order-details-two>

  </div>
</template>

<script>
import orderDetailsTwo from './orderDetails.vue'
  export default {
    props:["replacedata","orderDetailed","quiry"],
    data() {
      return {
        pricetime:'',
        show:false,
        content:[],
        message:[
          "序号",
          "时间",
          "动作",
          "备注说明"
        ],
        //传到后台  刷新列表
        Obj:{
          orderId:'',
          appointmentDatetime:'',
          remark:''
        }
      }
    },
    methods: {
      showorder(id){
        this.orderDetailed.show=!this.orderDetailed.show;
        console.log(this.orderDetailed.show,"2222");
        this.orderDetailed.orderId=id;
      },
      getevent(aaa){
        this.detail();
//        console.log(aaa);
//        this.orderDetailed.show=aaa;
      },
      cance(replacedata){
        this.orderDetailed.isShow=true;
      },
      sbmit(){
        this.Obj.orderId=this.replacedata.data.id;
        this.Obj.appointmentDatetime=this.$moment(this.pricetime).format('YYYY-MM-DD HH:mm:ss');
//        console.log(this.Obj);
        let urlpost =this.$apidomain+"/orderquery/changeInfoNew";
        if(this.Obj.appointmentDatetime!="Invalid date"&&this.Obj.remark!=""){
          console.log(this.Obj);
          this.$http.post(urlpost,this.Obj).then((r)=>{
            console.log(r);
//            console.log(this.orderDetailed.show);
            if(r.data.code=="0000"){
              this.replacedata.data.appointmentDatetime=this.Obj.appointmentDatetime;
              this.show=false;
              this.detail();
            }else{
              alert(r.data.error)
            }
          }).catch((e)=>{

          })
        }else if(this.Obj.appointmentDatetime=="Invalid date"){
            alert("请选择时间")
        }else if(this.Obj.remark==""){
            alert("请填写备注信息")
        }
      },
      edit(){
        this.show=true;
      },
      detail(){
        let url=this.$apidomain+"/orderquery/findOneDetails?id="+this.replacedata.data.id;
//      console.log(url);
        this.$http.get(url).then((r)=>{
          if(r.data.code=="0000"){
            this.content=r.data.result.coreMainOrderExceptionRecords;
//          console.log(this.content);
          }else{
            alert(r.data.error)
          }
        }).catch((e)=>{

        })
      }
    },
    created() {
      this.detail();
      console.log(this.orderDetailed,"888888");
    },
    components:{
      orderDetailsTwo
    }
  }
</script>
<style>
  tr {
    border-top: 1px solid #ccc;
  }
  td {
    border-bottom: 1px solid #ccc;
    padding: 10px 10px;
    text-align: center;
  }
  td:last-of-type {
  / / display: flex;
    padding-top: 0;
    padding-bottom: 0;
  }
  .theads th{
    padding:10px 10px;
    text-align:center;
    background: #E5E9F2;
    /*border:1px solid #999999;*/
    box-shadow: inset 0 1px 0 0 #E0E6ED,
    inset 0 -1px 0 0 #E0E6ED;
  }
  .el-dialog__body{
    padding-top:0 ;
  }
</style>
<style scoped lang="scss">
  #app{
    position:relative;

  }
  h2{
    text-align: left;
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


