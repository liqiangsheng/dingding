<template>
  <div id="app">
    <el-dialog style="z-index:999999"  :visible.sync="isDrawback.isShow" size="tiny">
      <h3>{{isDrawback.title}}</h3>

      <ul class="alert_forbidden_text">
        <li>
          维修：{{drawback.servicingName}}
            <p class="order_number"> 工单号：
              {{isDrawback.orderId}}
            </p>
        </li>
        <li>
         类型 :
          <el-select
            v-model="SourceTypeValue" placeholder="请选择" @change="selector">
            <el-option
              v-for="items in SourceType"
              :key="items.id"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          金额：
          <el-input style="width:auto"
            size="small"
            type="number"
            placeholder="输入内容"
            v-model="drawback.drawbackMoney">
          </el-input>
        </li>
        <li>
          备注：
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="drawback.textareaContent">
          </el-input>
        </li>
      </ul>
      <el-button style="float:right;"  @click="masterImposeOperate()" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button style="float:right;"  @click="cancel(isDrawback)">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:["isDrawback"],
    data() {
      return {
        SourceTypeValue:"",
        SourceType:[
          {
            value:"现",
            id:"1",
          }, {
            value:"提现",
            id:"2",
          }
        ],
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
      }
    },
    methods: {
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



      selector(val){
         this.SourceType.forEach(v=>{
           if(val===v.value){
             this.typeId=v.id;
             alert(v.id)
           }
         })
      },
    },
    created() {

    },
    watch:{
      "isDrawback.isShow":function(e,f){
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


