<template>
  <div id="app">
    <div class="detailAlert"></div>   <!--背阴-->
    <div class="detailAlert_box">
      <i @click = 'close'></i>
      <p>{{isDrawback.title}}</p>
      <div class="contenter">
        <div v-show="totalPay !==0">
        <label>退款类型</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--退款明细-->
        <div class="netList">
          <table>
            <thead>
            <tr>
              <td v-for="(item,index) in thList" :key="index">{{item}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tdList" :key="index">
              <td>{{item.name}}</td>
              <td>￥{{item.netValue}}</td>
              <td>
                <input type="text"   v-model.tirm="item.refund" placeholder="￥0" v-if="tdList == partList">
                <input type="text"   v-model.tirm="item.refund" :placeholder="'￥'+ item.netValue" disabled v-else>
              </td>
            </tr>
            </tbody>
          </table>
          <p>注:1.已收定金为外部收款,不在平台上退款  2.退款金额不可大于实际收款</p>
        </div>
        </div>
        <!--退款原因-->
        <div class="reasons">
          <p>退款原因</p>
          <p v-for="(item,index) in drawback.alertForbiddenList" :key="index" @click="masterImposeSelector(item,index)">
            <span >
              <span :class="{isSelect:true,selected:item.selector!='0'}"></span>
            </span>
            <font>{{item.name}}</font>
          </p>
          <textarea class="alert_forbidden_area" v-model.trim="drawback.textareaContent"></textarea>
        </div>
        <div class="bottomBtn">
          <p   @click="cancel(isDrawback)">取消</p>
          <p  @click="masterImposeOperate(drawback,isDrawback)" type="primary">确定</p> &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
     </div>
  </div>
</template>

<script>
  export default {
    props:["isDrawback","data",'quiry'],
    data() {
      return {
        drawback:{
          title:"退款",
          comeFee:"12",
          refund:true,
          sumFee:"1212",
          servicingName:"电脑维修",
          masterImpose:false,            //退款ALERT
          productName:"xxxx",
          textareaContent:"",
          makeFee:"2312",
          params:[],       //参数
          alertForbiddenList:this.$store.state.alertForbiddenList
        },
        totalPay:'',
        getDetails:{},
        totalPrice:0,
        flag:'',
        value:'',
        options:[
          {value: '1', label: '部分退款'},
          {value: '0', label: '全部退款'},
        ],
        thList:['费用类型','实收费用','退款金额'],
        tdList:[],
        partList:[
          {name:'实收上门费',netValue:'',refund:''},
          {name:'实收服务费',netValue:'',refund:''},
          {name:'实收配件费',netValue:'',refund:''},
          {name:'实收高空费',netValue:'',refund:''},
        ],
        wholeList:[
          {name:'实收总费用',netValue:'',refund:''}
        ]
     }
    },
    methods: {
      close(){
        let isbool =false;
        this.$emit("isClosed",isbool)
      },
      getTableList(){
        let url = this.$apidomain+"/orderquery/findOneDetails?id="+this.isDrawback.orderId;
        this.$http.get(url).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            if(data.result.orderBean){
              this.totalPay = data.result.orderBean.serviceTotalPay;
              this.getDetails = data.result.orderBean;
              this.wholeList[0].netValue = this.getDetails.serviceTotalPay;
              this.partList[0].netValue = this.getDetails.serviceTotalPayP1;
              this.partList[1].netValue = this.getDetails.serviceTotalPayP2;
              this.partList[2].netValue = this.getDetails.serviceTotalPayP3;
              this.partList[3].netValue = this.getDetails.serviceTotalPayP4;
            }else{
              this.totalPay = 0;
            }

          }
        })
      },
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
        if(!this.value&&this.totalPay !==0){
          alert("请选择退款类型")
          return;
        }
        if(arr.length>0){
         o.refuseContentText=arr;
        }else{
          alert("请选择工单取消原因");
          return ;
        }

        this.tdList.forEach(obj=>{
          this.totalPrice+=obj.refund*1;
        })
        if(item.textareaContent){
          o.textareaContent=item.textareaContent
        }
        item.params.push(o);
        if(!this.totalPay){
          this.value ='0';
        }
        let order=isDrawback.orderId;
        let selector= item.params[0].refuseContentText[0];
        let content=item.params[0].textareaContent;
        let sum=item.refund?0:1;
        let urlR=this.$apidomain+"/order/cancel";
        let a ;
        if(!content){
          a = `${selector}`
        }else{
         a = `${selector}-${content}`
        }
        let partParams={"orderId":order,"refund":this.value,"refundReason":a,'refundFee':this.totalPrice};
        let wholeParams = {"orderId":order,"refund":this.value,"refundReason":a};
        let params = this.flag=='1'?partParams:wholeParams;
        this.$http.post(urlR,params).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
             this.quiry();
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
        this.drawback.alertForbiddenList.forEach(obj=>{
          obj.selector=false;
        });
        item.selector=true;
      },
    },
    created(){
      this.getTableList();
    },
    watch:{
      "isDrawback.isShow":function(e,f){
        console.log(this.data);
        this.drawback.drawbackMoney='';
        this.drawback.textareaContent='';
        this.drawback.alertForbiddenList.forEach(v=>{
          v.selector='0'
        });
      },
      'value':function(newVal,oldVal){
        this.flag = newVal;
        this.tdList = newVal==='1'?this.partList:this.wholeList;
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
    //position:relative;
    .detailAlert{
      width: 100%;
      background: black;
      position: absolute;
      top:0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index:2007;
      opacity: 0.5;
    }
    .detailAlert_box{
      position: relative;
      width: 960px;
      height: 620px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top:50%;
      margin-top: -310px;
      margin-left:-480px;
      z-index:10000;
      border-radius: 3px;
      font-size: 16px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      i{
        display: inline-block;
        position: absolute;
        right: 32px;
        top:15px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        background: url(../../../../../static/images/pruductclose.png) no-repeat center;
      }
      i:hover{
        cursor: pointer;
        background: url(../../../../../static/images/pruduct1close.png) no-repeat center;
      }
      >p{
        width:100%;
        height:48px;
        line-height: 48px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        text-align: center;
        border-bottom: 1px #979797 solid;
        margin-bottom: 18px;
      }
      >.contenter{
        margin-left: 41px;
        label{
          font-size:13px;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
        }
        .netList{
          table{
            margin-top: 18px;
            width: 580px;
            border-collapse: collapse;
            border:1px #C0CCDA solid;
            tr{
              border-bottom:1px #C0CCDA solid ;
            }
            td{
              border-right:1px #C0CCDA solid ;
            }
            text-align: center;
            thead{
              tr{ height: 30px;background:#F0F0F0;font-size: 13px;}
              td:nth-of-type(1),td:nth-of-type(2){width: 180px;}
              td:nth-of-type(3){width: 220px;}
            }
            tbody>tr{
              font-size: 14px;
              height:40px;
              >td:nth-of-type(3){
                background: #F0F0F0;
                >input{
                  width:200px;
                  height:30px;
                  background:rgba(255,255,255,1);
                  border-radius:2px;
                  border:1px solid rgba(192,204,218,1);
                }
              }
            }
          }
          p{
            margin-top: 10px;
            height:18px;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(230,88,49,1);
            line-height:18px;
          }
        }
        .reasons{
          margin-top: 22px;
          width: 90%;
          p:nth-of-type(1){
            text-indent: 12px;
            background: #F0F0F0;
            height:30px;
            width: 100%;
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            line-height:30px;
            margin:22px 0 25px 0;
          }
          p{
            margin-bottom: 24px;
            margin-right: 50px;
            display: inline-block;
            height:20px;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            line-height:20px;
            span{
              margin-right:5px;
              width:20px;
              height:20px;
              display: inline-block;
              border: none !important;
              .isSelect{
                background: url(../../../../assets/images/isReasons.png) center center no-repeat;
                background-size: 100% 100%;
                width: 100%;
                height: 100%;
                border: 0 !important;
              }
              .selected{
                background: url(../../../../assets/images/reasons.png) center center no-repeat;
              }
            }
            font{
              display: inline-block;
              transform:translateY(-5px);
            }
          }
          p:nth-of-type(7){
            //background: red;
            margin-top: 20px;
            margin-right: 15px;
          }
          textarea{
            width:636px;
            height: 60px;
            resize: none;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(153,153,153,1);
          }
        }
      }
      .bottomBtn{
        margin: 0 auto;
        position: absolute;
        bottom: 40px;
        p{
          display: inline-block;
          width:200px;
          height:40px;
          border-radius:4px;
          line-height: 40px;
          font-size:14px;
          text-align: center;
          font-family:PingFangSC-Regular;
        }
        p:nth-of-type(1){
          border:1px solid rgba(35,161,254,1);
          color:rgba(35,161,254,1);
          margin-right:10px;
          margin-left: 200px;
        }
        p:nth-of-type(2){
          background:rgba(32,160,255,1);
          color:rgba(255,255,255,1);
        }
      }
    }

  }

  .alert_forbidden_text{
    margin-top: 50px;
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
    .preStyle{
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



