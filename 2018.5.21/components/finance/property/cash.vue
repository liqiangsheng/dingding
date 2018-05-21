<template>
    <div id="app">
      <el-dialog style="z-index:999999;text-align: center;top:15%;"  :visible.sync="isCash.isShow" size="tiny">
        <h3>{{isCash.title}}</h3>
        <ul class="alert_forbidden_text" style="margin-bottom: 30px">
          <li style="text-align: left">
            金额：
            <el-input style="width:auto"
                      size="small"
                      type="number"
                      placeholder="请输入提现金额"
                      v-model.number="objData.refund">
            </el-input>
          </li>
        </ul>
        <el-button style="" @click="withdrawals(objData.refund)" type="primary">确定提现</el-button>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      props:["isCash"],
      data(){
        return {
          objData:{
            refund:''
          }
        }
      },
      methods:{
        withdrawals(nowcash){
          var _this=this;
          console.log(nowcash);

          let obj={
            'opAmount':nowcash,
            'businessType':'WithdrawOperatingExpenses',
            'accountAmount':this.isCash.yyf,
          };
          let url=this.$apidomain+"/faWalletJournalAccount/saveFaWalletJournalAccounts";
          this.$http.post(url,obj).then(r=>{
            let data=r.data;
            console.log(data);
            if(data.code=="0000"){
              this.$message({
                message: "提现成功",
                type: 'success'
              });
              _this.isCash.isShow=false;
            }else{
              this.$message({
                message: data.error,
                type: 'warning'
              });
            }
          })
        },
//        numchange(){
////          console.log(this.objData.refund);
//          if((this.objData.refund>0&&this.objData.refund<=this.isCash.yyf)||this.objData.refund==""){
//          }else{
////            alert("请输入1-1000的数值");
//            this.$message({
//              message: '请输入'+this.isCash.yyf+'以内的数值',
//              type: 'warning'
//            });
//            this.objData.refund=""
//          }
//        }
      },
      created(){
        console.log(this.isCash);
      }
    }
</script>

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

</style>
