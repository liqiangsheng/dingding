<template>
  <div id="app">
    <div class="container">
      <h3>改价 <i @click="close"></i></h3>
      <div class="content">
        <ul>
          <li>
            <span>服务数量 </span><b style="font-weight: 100;margin-left: 10px;color:rgba(57,57,57,1);">{{dataObj.serviceSize}}</b>
            <!--<el-input v-model.trim="dataObj.serviceSize" placeholder="请填写内容"></el-input>-->
          </li>
          <li>
            <span>上门费 </span>
            <!--{{dataObj.price1}}-->
            <el-input type="number" v-model.trim="dataObj.price1" :disabled="this.dataObj.coreMainOrderFees[0].isDis" placeholder="请填写上门费"></el-input>
            <b>原上门费：{{dataObj.price1Original}}</b>
          </li>
          <li>
            <span>服务费 </span>
            <el-input type="number" v-model.trim="dataObj.price2" :disabled="this.dataObj.coreMainOrderFees[1].isDis" placeholder="请填写服务费"></el-input>
            <b>原服务费：{{dataObj.price2Original}}</b>
          </li>
          <li>
            <span>配件费 </span>
            <el-input v-model.trim="dataObj.price3" :disabled="this.dataObj.coreMainOrderFees[2].isDis" type="number" placeholder="请填写配件费"></el-input>
            <b>原配件费：{{dataObj.price3Original}}</b>
          </li>
          <li>
            <span>高空费 </span>
            <el-input type="number" v-model.trim="dataObj.price4" :disabled="this.dataObj.coreMainOrderFees[3].isDis" placeholder="请填写高空费"></el-input>
            <b>原高空费：{{dataObj.price4Original}}</b>
          </li>
          <!--<li>-->
            <!--总计：{{dataObj.price1+(dataObj.price2*dataObj.serviceSize)+(dataObj.price3*dataObj.serviceSize)+(dataObj.price4*dataObj.serviceSize)}}-->
          <!--</li>-->
          <li>
            <span style="transform: translateY(-80px)">备注 <i style="color: #EA5413;font-style:normal">*</i> </span>
            <el-input
              type="textarea"
              style="width: 724px"
              :rows="5"
              placeholder="请填写备注（必填）"
              v-model.trim="remarks">
            </el-input>

          </li>
        </ul>
      </div>
      <div class="button">
        <el-button @click="close">关闭</el-button>
        <el-button  type="primary" @click="changeDate">确定</el-button>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    props:["isCharge","findOne"],
    data(){
      return{
        dataObj:{},
        remarks:"",
      }
    },
    created(){
       console.log(this.isCharge,"sdasd")
      this.dataObj = JSON.parse(JSON.stringify(this.isCharge.item));
      this.dataObj.coreMainOrderFees.forEach((item,index)=>{
        item.isDis = false;
        if(item.state === "1"){
          item.isDis = true;
        }else if(item.state === "0"){
          item.isDis = false;
        }
      })

    },
    methods: {
      changeDate(){
//           if(!this.dataObj.serviceSize||this.dataObj.serviceSize<1){
//             this.$queryFun.successAlert.call("请填写服务数量...");
//             return ;
//           }
           if(this.remarks==""){
             this.$queryFun.successAlert.call(this,"请填写备注内容...");
             return ;
           }
        if(!this.dataObj.price1){
          this.dataObj.price1 = 0;
        }
          if(!this.dataObj.price2){
            this.dataObj.price2 = 0;
          }
          if(!this.dataObj.price3){
            this.dataObj.price3 = 0;
          }
          if(!this.dataObj.price4){
            this.dataObj.price4 = 0;
          }
          let o ={};
          o.orderId = this.dataObj.mainOrderId;
          o.orderServiceId = this.dataObj.id;
          o.serviceSize = this.dataObj.serviceSize;
          o.price1= this.dataObj.price1;
          o.price2 = this.dataObj.price2;
          o.price3 = this.dataObj.price3;
          o.price4 = this.dataObj.price4;
          o.remark = this.remarks;
          let urlR=this.$apidomain+"/orderquery/changeOrderService";
          this.$http.post(urlR,o).then(r=>{
            let data=r.data;
            if(data.code=='0000'){
              this.$queryFun.successAlert.call(this,"改价成功");
              this.findOne();
              this.close();
            }else{
             this.$queryFun.successAlert.call(this,data.error);
            }
          });

      },
      close(){
        this.isCharge.isShow=false
      }
    },
    mounted() {

    },
    watch:{

    },

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
    h3{
      text-align: center;
      line-height: 5em;
    }
  .el-input{
   width:217px;
  }
  .button{
    width: 100%;
    padding-left: 30%;
    .el-button{
       width: 200px;
      height: 40px;
    }

  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:960px;
    height: 620px;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    >h3{
      font-family: MicrosoftYaHei;
      font-size:18px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(57,57,57,1);
      line-height:48px;
      height: 48px;
      position: relative;
      border-bottom: 2px solid rgba(215,215,215,1);;
      i{
        display: inline-block;
        background:url(../../../../static/images/pruductclose.png) center center no-repeat;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 30px;
        top: 10px;
      }
      i:hover{
        background:url(../../../../static/images/pruduct1close.png) center center no-repeat;
        width: 30px;
        height: 30px;
      }
    }
    >.content{
      width:100%;
      height: 500px;
      padding: 54px;
      ul{
        width: 100%;
        li{
          width: 100%;
          margin-bottom: 12px;
          span{
            width: 52px;
            display: inline-block;
            text-align: right;
            font-size: 13px;
            color:rgba(57,57,57,1);
            margin-right: 14px;
          }
          .el-input__inner{
            width: 260px;
            height: 36px;
          }
          b{
            font-size:13px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(151,151,151,1);
            line-height:18px;
            margin-left: 19px;
          }
        }
      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }

    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
    }
    >.edit_open{
      background: #E8D7F6;
      border-radius: 4px;
      padding-left:10px;
      >span{
        height:100%;
        padding:0 10px;
        color:blue;
        cursor: pointer;
        display: inline-block;
      }
      >input{
        width:50px;
        border:none;
        outline:none;
      }
    }
  }
  .file {
    position: relative;
    display: block;

    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    width:280px;
    height: 140px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    width:100%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
  table{
    width:100vW;
    .theads{
      >th{
        padding:10px 10px;
        text-align:center;
        background: #E5E9F2;
        box-shadow: inset 0 1px 0 0 #E0E6ED,
        inset 0 -1px 0 0 #E0E6ED;

      }
      >.multiple{
        width:30px;
        cursor:pointer;
        box-size:border-box;
      }
    }
    >tbody{
      >tr{
        border-top:1px solid #ccc;
        >td{
          border-bottom:1px solid #ccc;
          padding:10px 10px;
          text-align:center;
        }
        >td:first-of-type{
          border-right:1px solid #ccc;
        }
        >td:last-of-type{
          //display: flex;
          padding-top:0;
          padding-bottom:0;
          >span{
            flex:1;
            height:100%;
            /*float:left;*/
            padding-top:4px;
            /*padding-left:30px;*/
            i{
              width:16px;
              height:16px;
              background:url(../../../../static/images/ban.png) center center no-repeat;
              background-size:100% 100%;
              float:left;
              margin-right:3px;
              vertical-align: middle;
            }
          }
          >.details_icon{
            flex:1;
            /*float:right;*/
            padding-left:0px;
            /*padding-top:8px;*/
            text-align: center;
            /*padding-right:20px;*/
            cursor:pointer;
            i{
              width:16px;
              height:16px;
              margin-right:0;
              /*margin-top:3px;*/
              background:url(../../../../static/images/detailed.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
          >.Reminded_icon{
            i{
              background:url(../../../../static/images/Reminded.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
          >.recover{
            i{
              background:url(../../../../static/images/recover.png) center center no-repeat;
              background-size:100% 100%;
            }
          }
        }
      }
      >tr:nth-of-type(even){
        background: #F9FAFC;
      }
    }
  }

</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 99999 !important;
  }
</style>


