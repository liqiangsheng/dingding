<template>
  <div id="app">
    <el-dialog style="z-index:999999"  :visible.sync="isDrawback.isShow" size="tiny">
      <h3>{{isDrawback.title}}</h3>
      <ul class="alert_forbidden_text">
        <li>
          维修：{{data.fLabelBusiness}}
          <p class="order_number"> 工单号：{{isDrawback.orderId}}</p>
        </li>

        <li>
          上门费：￥{{data.price1}}
        </li>
        <li>
          合计：￥{{data.total}}
        </li>  <li>
          已收款：￥{{data.actualPayment}}
        </li>
        <li>
          退款上门费 ： <el-checkbox v-model="drawback.refund"></el-checkbox>
        </li>
        <li style="cursor: pointer" v-for="(item,index) in drawback.alertForbiddenList" :key="index" @click="masterImposeSelector(item)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>

      </ul>
      <textarea class="alert_forbidden_area" v-model="drawback.textareaContent">
        </textarea>
      <el-button style="float:right;"  @click="masterImposeOperate(drawback,isDrawback)" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isDrawback)">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:["isDrawback","data"],
    data() {
      return {
        drawback:{
          title:"退款",
          comeFee:"12",
          refund:false,
          sumFee:"1212",
          servicingName:"电脑维修",
          masterImpose:false,            //退款ALERT
          productName:"xxxx",
          textareaContent:"",
          makeFee:"2312",
          params:[],       //参数
          alertForbiddenList:this.$store.state.alertForbiddenList
        },
      }
    },
    methods: {
      cancel(isShow){
        //取消
        isShow.isShow=false;
      },
      masterImposeOperate(item,isDrawback){
        var o={},arr=[];
        console.log(item);
        console.log(isDrawback);
        item.alertForbiddenList.forEach((v,i)=>{
          if(v.selector===true){
            arr.push(v.name)
          }
        });
        if(arr.length>0){
         o.refuseContentText=arr;
        }else{
          alert("请选择工单取消原因");
          return ;
        }
        if(item.textareaContent){
          o.textareaContent=item.textareaContent
        }
        item.params.push(o);
        let order=isDrawback.orderId;
        let selector= item.params[0].refuseContentText[0];
        let content=item.params[0].textareaContent;
        let sum=item.refund?0:1;
        let urlR=this.$apidomain+"/order/cancel";
        let params={"orderId":order,"refund":sum,"refundReason":`${selector}-${content}`};
        this.$http.post(urlR,params).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
              this.$notify({
                title: '成功',
                message: '取消工单成功',
                type: 'success'});
              this.isDrawback.isShow=false;
            }else{
              alert(data.error);
            }
          });
        item.params=[];
      },
      masterImposeSelector(item,index,textareaContent){
        this.drawback.alertForbiddenList.forEach(v=>{
          v.selector=false;
        });
        item.selector=true;
      },
    },
    created() {
//      console.log(this.data)
    },
    watch:{
      "isDrawback.isShow":function(e,f){
        console.log(this.data);
        this.drawback.drawbackMoney='';
        this.drawback.textareaContent='';
        this.drawback.alertForbiddenList.forEach(v=>{
          v.selector='0'
        });
      }
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


