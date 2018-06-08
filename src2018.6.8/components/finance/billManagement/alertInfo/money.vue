<template>
  <div>
      <div class="detailAlert"></div>   <!--背阴-->
      <div class="detailAlert_box">
            <div class="el-message-box__title">
              <span>确认结款</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
            </div>
            <!-- 输入框 -->
            <div class="details-list">
              <table border="0" cellspacing="0">
                 <tr>
                     <td>渠道名称</td>
                     <td>{{accountList.officialPartnerName}}</td>
                     <td>渠道编号</td>
                     <td>{{accountList.officialPartnerId}}</td>
                 </tr>
                 <tr>
                     <td>记账周期</td>
                     <td>{{accountList.bookkeepingTime}}</td>
                     <td>账单金额</td>
                     <td>{{accountList.operationFee}}</td>
                 </tr>
                 <tr>
                     <td>可用余额</td>
                     <td>{{availableBalance}}</td>
                     <td>待结金额</td>
                     <td>{{accountList.pendingFee}}</td>
                 </tr>
              </table>
              <!-- 支付方式 -->
              <div>
                <label>支付方式<span>*</span></label>
                <el-select v-model="payType" clearable placeholder="请选择" >
                            <el-option
                            v-for="(item,index) in payList"
                            :key="index"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                </el-select>
            </div>
            <!-- 备注or上传凭证 -->
            <div class="voucher" v-if="isPay">
                <label>凭证<span>*</span></label>
                <p >
                    <img src="../../../../assets/images/camera.png">
                    <span @click="uploadImg">
                        点击上传 
                        <input type="file" ref="file"  id="file"  v-on:change="traditional_file($event)" 
                        accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="display: none">
                    </span>
                </p>
                <div class="photos" v-if="isNetImg">
                    <span class="img_show_for_close" @click="uploadClose">×</span>
                    <img :src="netImg" alt="">
                </div>
                <span>选择线下转账方式的请上传转账凭证</span>
            </div>

            
            <div class="remark">
                <label>备注<span>*</span></label>
                <textarea placeholder="请填写结算备注" v-model="text"></textarea>
            </div>
            </div>
            <!-- 底部按钮 -->
            <div class="btn">
                  <el-button @click="close">取消</el-button>
                  <el-button type="success" @click="submit">确定</el-button>
            </div>
     </div>
  </div>
</template>
<script>
    export default{
      components:{

      },
      props:['accountList','query'],
      data(){
          return{
           isShow:true,
           isNetImg:false,
           netImg:"",        //后台返回的图片地址
           availableBalance:"",  
           tableList:{},
           text:"" ,     //备注
           payType:"",    //选中的支付方式
           isPay:true,
           payList:[
               {"id":"1","name":"可用余额扣款"},
               {"id":"1","name":"线下转账"},
           ]
          }

      },
      created(){
        let url = this.$common.apidomain + "/faWallet/getCanFee"
        this.$http.post(url,{"userId":this.accountList.officialPartnerId}).then(res=>{
            let data = res.data
            if(data.code==="0000"){
                this.availableBalance=data.result;
            }
        })
       // this.getDataList(this.params());
      },
      watch:{
         payType(newVal,oldVal){
             this.isPay = newVal==="线下转账"?true:false;
         }
      },
      methods:{
        //上传图片
        uploadImg(){
           if(this.payType==="线下转账"){
              document.getElementById('file').click();
           }else{
               this.$queryFun.successAlert.call(this,"支付方式为线下转账时才能上传图片")
           }
           
        },
        traditional_file(el){
            let _this=this;
            let filesObj=event.target.files[0];
            let filesName=event.target.files[0].name;
            let param = new FormData(); // 创建form对象
            param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
              //console.log(param,'图片')
            let dataReq=param;
            let url = _this.$common.apidomain +"/upload/kindeditorjson"
            _this.$http.post(url,dataReq).then(res=>{
                let data = res.data;
                _this.netImg= data.url
                _this.isNetImg=true;
                //console.log(_this.netImg,"图片地址")
            })
        },
        uploadClose(){
           this.isNetImg=false;
        },
        params(){
          let billPayType = "";
          if(this.payType==="可用余额扣款"){
              billPayType="1"
          }else if(this.payType==="线下转账"){
               billPayType="2"
          }else{
              billPayType=""
          }
          //billPayType =  this.payType==="可用余额扣款"?"1":"2";
          return{
            "junctionsType":billPayType,
            "idPhotos":this.netImg,                //凭证
            "remark":this.text,           //备注
            "id":this.accountList.id
          }
        },
        getDataList(params){
          let url = this.$common.apidomain + '/billManageController/confirmation'
          if(this.payType===""){
            this.$queryFun.successAlert.call(this,'请选择支付方式')
          }else if(this.payType==="线下转账"&&this.netImg===""){
            this.$queryFun.successAlert.call(this,'请上传凭证')
          }else{
                this.$http.post(url,params).then(res=>{
                let data = res.data;
                if(data.code==="0000"){
                // console.log(data,'确认结款数据')
                this.query();
                this.close()
                }else{
                    this.$queryFun.successAlert.call(this,data.error)
                    this.close()
                }
            })
          }        
        },
         submit(){
           this.getDataList(this.params())
         },
         close(){
             let isbool =false;
             this.$emit("isClose",isbool)
         }
      },
    }
</script>
<style scoped lang="scss">
  .detailAlert{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .detailAlert_box{
    position: relative;
    width: 906px;
    height: 698px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top: -349px;
    margin-left:-453px;
    z-index:10000;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:44px;
    position: relative;
    background:#FFFFFF;
    .el-message-box__close{
      position: absolute;
      right: 14px;
      top:14px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:44px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:#333333;
      line-height:44px;
      text-align: center;
    }
  }
  .details-list{
      margin:39px 100px 0px 17px;
      width:806px;
      height:500px;
     // background:lightblue;
      table{
           border-left:1px solid #D8D8D8;
           border-top:1px solid #D8D8D8;
           font-size: 14px;
           margin-bottom: 41px;
          tr{
              height:38px;
              line-height: 38px;
              td{
                border-right:1px solid #D8D8D8;
                border-bottom:1px solid #D8D8D8;
              }
              td:nth-of-type(1),td:nth-of-type(3){
                  width:122px;
                  text-align: center;
              }
              td:nth-of-type(2),td:nth-of-type(4){
                  width:280px;
                  text-indent: 5px;
              }
          }
      }
      label{
              margin-right:14px;
              font-size:14px;
              span{
                  color:#EA5413;
                  display: inline-block;
                  transform: translateY(3px);;
              }
          }
    .photos{
        position: relative;
        margin-left:83px;
        border: 1px solid gray;
        width: 280px;
        height: 131px;
         .img_show_for_close{
            display: inline-block;
            width:20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #fff;
            position: absolute;
            right: -5px;
            top: -5px;
            z-index: 3;
            border-radius:50%;
            font-size: 14px;
            background-color:green;
          }
        img{
            width:100%;
            height:100%;
        }
        
    }
    .voucher{
        margin-top:16px;
        position:relative;
        height:131px;
        width:100%;
        label{
           position: absolute;
           left: 26px;
           top:58px;
         }
        >span{
            position:absolute;
            color:#E65831;
            font-size:14px;
            left:398px;
            top:54px;
        }      
        p{
            //height:131px;
            width:280px;
            height:100%;
            background:#EEEDEF;
            position: absolute;
            left: 83px;
            border-radius:4px;
             img{
             position:absolute;
             top:32px;
             left:112px;
            }
            span{
                position:absolute;
                bottom:25px;
                left:108px;
                font-size:16px;
                color:#23A1FE;
            }
             span:hover{
            cursor: pointer;
          }
        }
    }
     .remark{
         margin-top:16px;
         position: relative;
         label{
           position: absolute;
           left: 26px;
           top:58px;
         }
        textarea{
            width: 703px;
            height: 131px;
            resize: none;
            overflow-y: auto;
            text-indent: 10px;
            position: absolute;
            left: 83px;
            border-radius:4px;
        }
  }
  }

  .btn{
          margin-left:266px;
          bottom:40px;
          position:absolute;
          //transform: translateY(180px);
          //margin-top:100px;
          .el-button{
              width: 140px;
              margin-right: 10px;
          }
      }
</style>

