<template>
  <div id="app">
    <el-dialog style="z-index:999999"  :visible.sync="isDrawback.isShow" size="tiny">
      <h3>{{isDrawback.title}}</h3>
      <ul class="alert_forbidden_text">
        <li class="bor">
          <span>产品全称</span>{{isDrawback.data.serviceFullName}}
        </li>
        <li class="bor">
          <span>服务费原价(元)</span>{{isDrawback.data.price2Original}}
        </li>
        <li class="bor">
          <span>产品数量</span>{{isDrawback.data.serviceSize}}
        </li >
        <li class="bor">
          <span>应付总服务费</span>{{isDrawback.data.costPayableTotal}}
        </li>
        <li class="bor">
          <span>已返现金额</span>{{isDrawback.data.cashbackAmount|placeholder_one}}
        </li>
        <li class="bor">
          <span>实收总服务费</span>{{isDrawback.data.totalServiceChargeTotal }}
        </li>
        <li class="borone">
          <span style="border: none">返现金额：</span>
          <el-input style="width:auto"
            size="small"
            type="number"
            placeholder="请输入返现金额"
            v-model="objData.refund">
          </el-input>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最高返现金额: {{isDrawback.data.totalServiceChargeTotal }}元
        </li>
        <!--<li style="cursor: pointer" v-for="(item,index) in objData.alertForbiddenList" :key="index" @click="masterImposeSelector(item)">-->
          <!--{{item.name}} <span v-show="item.selector!='0'"></span>-->
        <!--</li>-->
      </ul>
      备注:
      <textarea class="alert_forbidden_area" v-model="objData.textareaContent">
        </textarea>
      <el-button style="float:right;" :disabled="isConfirm"  @click="masterImposeOperate(objData,isDrawback)" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isDrawback)">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:["isDrawback","findOne"],
    data() {
      return {
        objData:{alertForbiddenList:[]},
        isConfirm:false
      }
    },
    methods: {
      cancel(isShow){
        //取消
        isShow.isShow=false;
      },
      masterImposeOperate(item,isDrawback){
        if(!item.refund){
          this.$queryFun.successAlert.call(this,"返现金额不能为空");
          return;
        }
        if(!item.textareaContent){
          this.$queryFun.successAlert.call(this,"请填写返现备注");
          return;
        }
        this.isConfirm=!this.isConfirm;
        let order=isDrawback.data.mainOrderId,
            orderServiceId=isDrawback.data.id,
            selector= "",
            content=item.textareaContent,
            urlR=this.$apidomain+"/order/returncash",
            params={"orderId":order,"orderServiceId":orderServiceId,"refund":item.refund,"refundReason":`${selector}`,"remark":`${content}`};
        this.$http.post(urlR,params).then(r=>{
          this.isConfirm=!this.isConfirm;
          let data=r.data;
          if(data.code==='0000'){
              this.$notify({
                title: '成功',
                message: '工单服务返现成功',
                type: 'success'});
              this.findOne();
              this.isDrawback.isShow=false;
            }else{
              this.$queryFun.successAlert.call(this,data.error);
            }
          });
        item.params=[];
      },
//      masterImposeSelector(item,index,textareaContent){
//        this.drawback.alertForbiddenList.forEach(v=>{
//          v.selector=false;
//        });
//        item.selector=true;
//      },
    },
    created() {
    },
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
    >.bor{
      border:1px solid #ccc;
      border-top: none;
    }
    >li{
      line-height: 2.5em;
      /*border-top:1px solid rgba(0,0,0,.1);*/
      >span{
        border-right:1px solid #ccc ;
      }
      >.order_number{
        float:right;
        padding-right:30px;
      }
    }
    >li:first-of-type{
      border-top:1px solid #ccc;
    }
    span{
      display: inline-block;
      width: 120px;
      /*text-align: center;*/
      /*border-right: 1px solid #ccc;*/
    }
  }

  .alert_forbidden_area{
    width: 560px;
    height: 100px;
    margin-left: 30px;
    resize: none;
    border: 1px solid #ccc;
  }
</style>
<style>
  #app .el-dialog__wrapper .el-dialog.el-dialog--tiny{
    width: 640px !important;
  }
</style>


