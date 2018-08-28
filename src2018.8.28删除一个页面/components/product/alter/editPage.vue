<template>
  <div>
      <div class="addAlert"><!--背阴-->
      </div>
    <div class="addAlert_box"  v-if="editData.name == '配件'">
      <div class="el-message-box__title">
        <span>{{editData.title}}</span>
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li><span class="name">配件名称</span><span class="value">{{objData.name}}</span></li>
        <li><span class="name">商品编号</span><span class="value">{{objData.serviceId}}</span></li>
        <li><span class="name">产品名称</span><span class="value">{{objData.fullName}}</span></li>
        <li><span class="name">服务费类型</span><span class="value">{{objData.serviceName}}</span></li>
        <li id="el-input__inner1"><span style="display:inline-block;font-size: 13px;width: 65px;text-align: right">配件费用</span><el-input min=0 style="width: 100px;margin: 0 12px 0 17px;text-align: right" type="number" v-model="priceNum" @blur="partsBlur(priceNum)"></el-input><span>元</span></li>
      </ul>

      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
    <!---------------------------------------------->
      <div class="addAlert_box"  v-if="editData.name == '渠道配件'">
          <div class="el-message-box__title">
              <span>{{editData.title}}</span>
            <i @click="close"></i>
          </div>
        <ul class="centent">
          <li><span class="name">渠道名称</span><span class="value">{{objData.channelName}}</span></li>
          <li><span class="name">配件名称</span><span class="value">{{objData.name}}</span></li>
          <li><span class="name">商品编号</span><span class="value">{{objData.serviceId}}</span></li>
          <li><span class="name">产品名称</span><span class="value">{{objData.fullName}}</span></li>
          <li><span class="name">服务费类型</span><span class="value">{{objData.serviceName}}</span></li>
          <li id="el-input__inner1"><span style="display:inline-block;font-size: 13px;width: 65px;text-align: right">配件费用</span><el-input min=0 style="width: 100px;margin: 0 12px 0 17px;text-align: right" type="number" v-model="priceNum" @blur="partsBlur(priceNum)"></el-input><span>元</span></li>
        </ul>

        <div class="li">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="yes">确定</el-button>
        </div>
      </div>
    <!---------------------------------------------->
    <div class="addAlert_box1"  v-if="editData.name == '产品'||editData.name == '产品列表编辑'">
      <div class="el-message-box__title1">
        <span>{{editData.title}}</span>
        <i @click="close"></i>
      </div>

      <ul class="centent1">
        <li  v-show="editData.name == '产品'"><span class="name">渠道名称</span><span class="value">{{objData.channelName?objData.channelName:"无"}}</span></li>
        <li><span class="name">产品名称</span><span class="value">{{objData.fullName}}</span></li>
        <li id="moneyEdit">费用编辑</li>
        <li><span class="name1">上门费</span><el-input min=0 style="width: 130px;margin: 0 12px;text-align: right" type="number" v-model="price2Num"></el-input><span>元</span></li>
        <li><span class="name1">上门费是否叠加</span>
          <el-select v-model.trim="price2Name"style="width: 130px;margin: 0 8px;text-align: right" placeholder="请选择上门费是否叠加" @change="price2NameClick(price2Name)">
            <el-option
              v-for="(item,index) in opctions"
              :key="index"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li><span class="name1">服务类型</span><span style="margin-left: 29px">{{onePrice}}</span></li>
        <li id="el-input__inner11"><span class="name1">价格</span><el-input min=0 style="width: 130px;margin: 0 12px;text-align: right" type="number" v-model="priceThreeNum"></el-input><span>元</span></li>
        <li id="el-input__inner12"><span class="name1">质保时间</span><el-input min=0 style="width: 130px;margin: 0 12px;text-align: right" type="number" v-model="dayNum"></el-input><span>天</span></li>
      </ul>

      <div class="li1">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    props:["editData","quiry"],
    components:{
    },
    data() {
      return {
        price2Id:"",//上门费是否叠加ID
        price2Name:"",//上门费是否叠加
        opctions:[{id:"",value:"--请选择--"},{id:"1",value:"是"},{id:"0",value:"否"}],//上门费是否叠加
        onePrice:"",//一口价
        price2Num:0, //上门费
        dayNum:0, //质保天数
        priceThreeNum:0, //价格
        priceNum:0, //编辑修改价格
        objData:{},//数据展示
       }

    },
    methods: {
      partsBlur(v){
        if(v<=0){
          this.priceNum = 0
        }else {
          this.priceNum = Math.floor(v * 100) / 100
        }
      },

      price2NameClick(v){ //上门费是否叠加叠加选择
          this.opctions.map((item,index)=>{
            if(v === item.value){
              this.price2Id = item.id;
            }
          })
      },
      close(){ //传值给父级
        this.$emit("isClose",false)
        this.quiry();
      },
      quxiao(){ //取消
        this. close();
      },
      yes(){ //确定
        this.quiryOne();
      },

      quiryOne(){ //数据传递
        if(this.editData.name == "产品"){
          let url = this.$apidomain +"/serviceareainfo/areaInfoRenew?id="+this.editData.data.id+"&isCollectDoorFee="+this.price2Id+"&price1="+this.price2Num+"&price2="+this.priceThreeNum+"&warrantyDatetime="+this.dayNum;
          this.$http.get(url).then(res=>{
            if(res.data.code == "0000"){
              console.log(res)
              this.close();
              this.$queryFun.successAlert.call(this,"产品编辑成功","0")
            }else{
              this.$queryFun.successAlert.call(this, res.data.error);
            }
          })

        }else if(this.editData.name == "产品列表编辑"){
          let url = this.$apidomain +"/serviceinfo/areaInfoRenew?id="+this.editData.data.id+"&isCollectDoorFee="+this.price2Id+"&price1="+this.price2Num+"&price2="+this.priceThreeNum+"&warrantyDatetime="+this.dayNum;
          this.$http.get(url).then(res=>{
            if(res.data.code == "0000"){
              console.log(res)
              this.close();
              this.$queryFun.successAlert.call(this,"产品编辑成功","0")
            }else{
              this.$queryFun.successAlert.call(this, res.data.error);
            }
          })

        }else if(this.editData.name == "配件"){

          let url = this.$apidomain +"/servicemountings/areaMountingsRenew?id="+this.editData.data.id+"&price="+this.priceNum;
          this.$http.get(url).then(res=>{
            if(res.data.code == "0000"){
              this.close();
              this.$queryFun.successAlert.call(this,"配件编辑成功","0")
            }else{
              this.$queryFun.successAlert.call(this, res.data.error);
            }
          })

        }else if(this.editData.name == "渠道配件"){

          let url = this.$apidomain +"/serviceareamountings/areaMountingsRenew?id="+this.editData.data.id+"&price="+this.priceNum;
          this.$http.get(url).then(res=>{
            if(res.data.code == "0000"){
              this.close();
              this.$queryFun.successAlert.call(this,"渠道配件编辑成功","0")
            }else{
              this.$queryFun.successAlert.call(this, res.data.error);
            }
          })

        }
      },

    },


    mounted() {
    },
    created(){

      if(this.editData.name == "渠道配件"){
        let url = this.$apidomain +"/serviceareamountings/findmountingsdetails?id="+this.editData.data.id;
        this.$http.get(url).then(res=>{
          console.log(res,"fds")
          if(res.data.code === "0000"){
            this.objData = res.data.result;
            this.priceNum = res.data.result.price;
          }else{
            this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
      }else if(this.editData.name == "产品"){
        let url = this.$apidomain +"/serviceareainfo/findservicedetails?id="+this.editData.data.id;
        this.$http.get(url).then(res=>{
          console.log(res)
          if(res.data.code === "0000"){
              this.objData = res.data.result;
              this.price2Num = res.data.result.price1;
              this.price2Id = res.data.result.isCollectDoorFee;
              this.priceThreeNum =res.data.result.price2;
              this.dayNum=res.data.result.warrantyDatetime?res.data.result.warrantyDatetime:0;
              if(this.price2Id == "0"){
                this.price2Name = "否";
              }else if(this.price2Id == "1"){
                this.price2Name = "是";
              }else{
                this.price2Name = "--请选择--";
              }
              this.onePrice = res.data.result.name;
          }else{
            this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
      }else if(this.editData.name == "配件"){
        let url = this.$apidomain +"/servicemountings/findmountingsdetails?id="+this.editData.data.id;
        this.$http.get(url).then(res=>{
          console.log(res)
          if(res.data.code === "0000"){
            this.objData = res.data.result;
            this.priceNum = res.data.result.price;
          }else{
            this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
      }else if(this.editData.name == "产品列表编辑"){
        let url = this.$apidomain +"/serviceinfo/findservicedetails?id="+this.editData.data.id;
        this.$http.get(url).then(res=>{
          console.log(res)
          if(res.data.code === "0000"){
            this.objData = res.data.result;
            this.price2Num = res.data.result.price1;
            this.price2Id = res.data.result.isCollectDoorFee;
            this.priceThreeNum =res.data.result.price2;
            this.dayNum=res.data.result.warrantyDatetime?res.data.result.warrantyDatetime:0;
            if(this.price2Id == "0"){
              this.price2Name = "否";
            }else if(this.price2Id == "1"){
              this.price2Name = "是";
            }else{
              this.price2Name = "--请选择--";
            }
            this.onePrice = res.data.result.name;
//            this.priceNum = res.data.result.price3;
          }else{
            this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
      }

    }
  }
</script>
<style>
 #el-input__inner1 .el-input__inner{
    text-align: right;
    padding: 0;
  }
 #el-input__inner11 .el-input__inner{
   text-align: right;
   padding: 0;
 }
 #el-input__inner12 .el-input__inner{
   text-align: right;
   padding: 0;
 }
</style>
<style scoped lang="scss">

  .addAlert{
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
  .addAlert_box{
    width: 600px;
    height: 360px;
    background-color: #fff;
    position: absolute;
    left: 30%;
    top:25%;
    z-index:2008;
    border-radius:8px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:48px;
    position: relative;
    border-bottom:2px solid #D7D7D7;
    font-weight: 100;
    i{
      display: inline-block;
      position: absolute;
      right: 15px;
      top:16px;
      width: 15px;
      height: 15px;
      cursor: pointer;
     background: url(../../../../static/images/pruductclose.png) no-repeat center;
    }
    i:hover{
      cursor: pointer;
      background: url(../../../../static/images/pruduct1close.png) no-repeat center;
    }
    span{
      width: 100%;
      display: inline-block;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:42px;
      text-align: center;
    }
  }
  .centent{
    padding: 14px 0px 0 62px;
    li{
      .name{
        display: inline-block;
        font-size:13px;
        width: 65px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
        text-align: right;
        line-height:30px;
      }
      .value{
        display: inline-block;
        font-size:13px;
        margin-left: 14px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:30px;
      }
      .nameMargin{
        margin-left: 100px;
      }

    }

  }
  .li{
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    text-align: center;
    .el-button{
      width: 200px;
    }
  }

  /*--------------------------*/
  .addAlert_box1{
    width: 960px;
    height: 620px;
    background-color: #fff;
    position: absolute;
    left: 20%;
    top:15%;
    z-index:2008;
    border-radius:8px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title1{
    width: 100%;
    height:48px;
    line-height:48px;
    position: relative;
    border-bottom:2px solid #D7D7D7;
    font-weight: 100;
    i{
      display: inline-block;
      position: absolute;
      right: 15px;
      top:16px;
      width: 15px;
      height: 15px;
      cursor: pointer;
      background: url(../../../../static/images/pruductclose.png) no-repeat center;
    }
    i:hover{
      cursor: pointer;
      background: url(../../../../static/images/pruduct1close.png) no-repeat center;
    }
    span{
      width: 100%;
      display: inline-block;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:42px;
      text-align: center;
    }
  }
  .centent1{
    padding: 14px 31px 0 29px;
    li{
      margin-bottom: 13px;
      .name{
        display: inline-block;
        font-size:13px;
        width: 65px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
        text-align: right;
        line-height:30px;
      }
      .name1{
        display: inline-block;
        font-size:13px;
        width: 91px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        text-align: right;
        line-height:30px;
      }
      .value{
        display: inline-block;
        font-size:13px;
        margin-left: 14px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:30px;
      }
      .nameMargin{
        margin-left: 100px;
      }



    }
    #moneyEdit{
      width: 100%;
      height: 30px;
      background:rgba(240,240,240,1);
      padding-left:12px ;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(51,51,51,1);
      line-height:30px;
    }

  }
  .li1{
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    text-align: center;
    .el-button{
      width: 200px;
    }
  }
</style>








