<template>
  <div id="app">
    <div class="container">
      <h3>修改服务费用</h3>
      <div class="content">
        <ul class="alert_forbidden_text">
          <li>
            服务数量：<el-input v-model="dataObj.serviceSize" placeholder="请输入内容"></el-input>
          </li>
          <li>
            上门费：{{dataObj.price1}}
          </li>
          <li>
            服务费：
            <el-input type="number" v-model="dataObj.price2" placeholder="请输入内容"></el-input>
          </li>
          <li>
            配件费：
            <el-input v-model="dataObj.price3" type="number" placeholder="请输入内容"></el-input>
          </li>
          <li>
            高空费：
            <el-input type="number" v-model="dataObj.price4" placeholder="请输入内容"></el-input>
          </li>
          <li>
            总计：{{dataObj.price1+(dataObj.price2*dataObj.serviceSize)+(dataObj.price3*dataObj.serviceSize)+(dataObj.price4*dataObj.serviceSize)}}
          </li>
          <li>
            备注：
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="dataObj.remarks">
            </el-input>

          </li>
        </ul>
      </div>
    </div>
    <p class="closeX" @click="close"></p>
    <div class="btn">
      <button @click="close">关闭</button>
      <button @click="changeDate">确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    props:["isCharge","findOne"],
    data(){
      return{
        dataObj:{}
      }
    },
    created(){

      this.dataObj = JSON.parse(JSON.stringify(this.isCharge.item));
    },
    methods: {
      changeDate(){
           if(!this.dataObj.serviceSize||this.dataObj.serviceSize<1){
             this.$queryFun.successAlert.call("请输入服务数量...");
             return ;
           }
           if(!this.dataObj.remarks){
             this.$queryFun.successAlert.call(this,"请输入备注内容...");
             return ;
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
          o.price2 = this.dataObj.price2;
          o.price3 = this.dataObj.price3;
          o.price4 = this.dataObj.price4;
          o.remark = this.dataObj.remarks;
          let urlR=this.$apidomain+"/orderquery/changeOrderService";
          this.$http.post(urlR,o).then(r=>{
            let data=r.data;
            if(data.code=='0000'){
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
  button{
    width:200px;
    cursor:pointer;
    line-height:44px;
    border:none;
    padding:0;
    margin:0;
    color:#fff;
    transform: rotate(-360deg);
    border: 1px solid #979797;
    border-radius: 4px;
    float:left;
    background:green;
    outline:none;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{

      width:100%;
      overflow-x: auto;
      display:flex;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            margin-top:20px;
            .files{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                height:auto;
                margin-bottom:30px;
                >input{

                }
                >img{
                  display: block;
                  width:270px;
                  height: 130px;
                }
              }
            }
          }
        }
      }
      >.left_info{
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
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
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
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


