<template>
  <div id="app">
    <el-dialog style="z-index:999999"  :visible.sync="isDrawback.isShow" size="tiny">
      <h3>{{isDrawback.title}}</h3>
      <ul class="alert_forbidden_text">
        <li>
          <div class="list_name">
            类型 :
          </div>
          <el-select
            v-model="businessType.SourceTypeValue" placeholder="请选择" @change="selector(businessType,businessType.SourceType,businessType.SourceTypeValue)">
            <el-option
              v-for="items in businessType.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <div class="list_name">
            金额 :
          </div>
          <el-input style="width:200px"
            type="number"

            placeholder="输入内容"
            v-model="selectorBehindObj.operation">
          </el-input>
        </li>
        <li style="padding-top:20px;">
          <div class="list_name">
            备注 :
          </div>
          <el-input
            type="textarea"
            :rows="2"
            style="width:200px;"
            placeholder="请输入内容"
            v-model="selectorBehindObj.remark">
          </el-input>
        </li>
      </ul>
      <el-button style="float:right;"  @click="query()" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isDrawback)">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:["isDrawback","quiry"],
    data() {
      return {
        businessType:{
            name: "类型",
            key: "businessType",
            SourceTypeValue: '',
            SourceType: [
            {
              value: '提现',
              id: "WithdrawDeposit"
            }, {
              value: '充值',
              id: "TopUpRecharge"
            }, {
              value: '罚款',
              id: "Fine"
            }, {
              value: '奖励',
              id: "Award"
            }, {
              value: '保证金增资',
              id: "CashDepositCapitalIncrease"
            }, {
              value: '保证金减资',
              id: "CashDepositDecreaseOfCapital"
            }
          ]
        },
        typeId:'',
        drawback:{
          title:"退款",
          comeFee:"12",
          drawbackMoney:"",
          sumFee:"1212",
          servicingName:"电脑维修",
          masterImpose:false,            //退款ALERT
          productName:"xxxx",
          textareaContent:"",
          makeFee:"2312",
          params:[],       //参数
        },
        selectorBehindObj:{}
      }
    },
    created() {

    },
    methods: {
      //      <!--分页查询数据对象功能组合start-->
      query(){
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {
          "objectId":this.isDrawback.objectId,
          "objectName":this.isDrawback.objectName,
          "objectRole":this.isDrawback.objectRole,
          "operation":this.selectorBehindObj.operation,
          "businessType":this.selectorBehindObj.businessType,
          "remark":this.selectorBehindObj.remark,
        }
      },
      getTableList(params){
        if(!params.operation){
          alert("请输入有效的操作金额...");
          return;
        }
        if(!params.businessType){
          alert("请选择操作行为...");
          return;
        }
        if(this.isDrawback.objectccountAmount-params.operation<0&&"WithdrawDeposit"==params.businessType){
          alert("提现操作不能使该账户金额为负...");
          return;
        }
        let url=this.$apidomain+"/faWallet/walletOperationFees";
        this.$http.post(url,params).then(r=>{
          let data=r.data;
          if('0000'==data.code){
            this.$message({
              type: 'success',
              message: '执行成功!'
            });
            this.quiry();
            this.cancel(this.isDrawback);
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
//      <!--分页查询数据对象功能组合end-->
      cancel(isShow){
        //取消
        isShow.isShow=false;
      },
      masterImposeOperate(item,isDrawback){

      },
      masterImposeSelector(item,index,textareaContent){
        this.drawback.alertForbiddenList.forEach(v=>{
          v.selector=false;
        });
        item.selector=true;
      },
      selector(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
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
    margin-bottom:15px;
    >li{
      line-height: 4em;
      border-top:1px solid rgba(0,0,0,.1);
      >.order_number{
        float:right;
        padding-right:30px;
      }
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


