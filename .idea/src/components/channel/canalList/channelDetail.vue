
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isDetailed.title}} <p class="closeX" id="closeX"  @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <ul>
            <li style="overflow: hidden">
              <el-button style="background:#20a0ff" type="primary" @click="edit " v-if="!isEdit()">
                {{btnName}}
              </el-button>

              <el-button style="background:#20a0ff" type="primary" @click="cancelEdit" v-if="isEdit()">
                取消
              </el-button>
              <br>
              <el-button style="background:#20a0ff" type="primary" @click="open3" v-if="isEdit()">
                修改密码
              </el-button>
              <!--<br>-->
              <!--<p class="position_icon"><i></i>查看师傅当前位置</p>-->
              <!--<p class="position_icon"><i></i>查看师傅当前位置</p>-->
            </li>
            <li>渠道名称:{{dataObj.name}}</li>
            <li>渠道编号:{{dataObj.id}}</li>
            <li>渠道类型:{{dataObj.type|channelTypeShow}}</li>
            <li>登陆账号:{{dataObj.account}}</li>
            <li>联系人:
              <span v-if="!isEdit()">
                {{dataObj.linkmanName}}
              </span>
              <span v-else>
                  <el-input  style="float:right"
                    placeholder="请输入内容"
                    v-model="dataObj.linkmanName">
                 </el-input>
              </span>
            </li>
            <li>联系手机号:
              <span v-if="!isEdit()">
                {{dataObj.linkmanTelephone}}
              </span>
              <span v-else>
                  <el-input  style="float:right"
                    placeholder="请输入内容"
                    v-model="dataObj.linkmanTelephone">
                 </el-input>
              </span>
            </li>
            <li>公司电话:
              <span v-if="!isEdit()">
                {{dataObj.companyTelephone}}
              </span>
              <span v-else>
                  <el-input  style="float:right"
                    placeholder="请输入内容"
                    v-model="dataObj.companyTelephone">
                 </el-input>
              </span>
            </li>
            <li>总部地址:
              <span v-if="!isEdit()">
                {{dataObj.headquarterAddress}}
              </span>
              <span v-else>
                  <el-input  style="float:right"
                    placeholder="请输入内容"
                    v-model="dataObj.headquarterAddress">
                 </el-input>
              </span>
            </li>
            <li>开户行:
              <span v-if="!isEdit()">
                {{dataObj.bankOfDeposit}}
              </span>
              <span v-else>
                  <el-input
                    style="float:right"
                    placeholder="请输入内容"
                    v-model="dataObj.bankOfDeposit">
                 </el-input>
              </span>
            </li>
            <li>卡号:
              <span v-if="!isEdit()">
                {{dataObj.cardNumber}}
              </span>
              <span v-else>
                  <el-input  style="float:right"
                    placeholder="请输入内容"
                    v-model="dataObj.cardNumber">
                 </el-input>
              </span>
            </li>
            <li>子类数量:{{dataObj.subclassCount}}</li>
            <li>已完成单数:{{dataObj.completeCount}}
            <li>用户数:{{dataObj.userNumber}}人</li>
            <li>总订单量:{{dataObj.totalOrders}}</li>
            <li>状态:{{dataObj.state|userState}}</li>
          </ul>

          <div class="consume_info">
            <h3>子类信息</h3>
            <el-button type="primary"  @click="add()">新增渠道子分类</el-button>
            <div class="dable_lsit" v-show="subsetInfos.length>0">
              <!--导出按钮-->
              <!--导出按钮结束-->
              <!--表格数据-->
              <table cellSpacing="0px" cellpadding="0">
                <thead>
                <tr class="theads">
                  <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in subsetInfos">
                  <td>
                    {{item.city}}
                  </td>
                  <td>
                    {{item.name}}
                  </td>
                  <td>
                    {{item.scale}}
                  </td>  <td>
                  {{item.userNumber}}
                </td>  <td>
                  {{item.totalOutput}}
                </td>
                  <td>
                    {{item.totalWater}}
                  </td>
                  <td>
                    {{item.createDate|moment('YYYY-MM-DD HH:mm:ss')}}
                  </td>
                  <td>
                    <a v-if="item.businessQrCode" style="display: inline-block;height:100%" :href="item.businessQrCode" :download="item.businessQrCode">下载二维码</a>
                    <a href="javascript:;" style="display: inline-block;height:100%" @click="handleDelete(index,item)">删除</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
          <!--<ul style="padding-top:0;">-->

          <!--</ul>-->
        </div>
      </div>

    <div class="btn">
      <el-button type="primary"
                 style="background:green;color:#fff;"
                 @click="enter()"
                 v-if="isEdit()"
      >
        保存
      </el-button>
      <button @click="closeMove()">关闭</button>
    </div>
    <!--大弹框 详情end-->
    <div class="alert" v-if="isAdd.isShow" >
      <add :isAdd="isAdd" :findOne="findOne">
      </add>
    </div>
  </div>
</template>

<script>
  import add from './addsubchannel.vue'
  export default {
    components:{
      add
    },
    props:["isDetailed","quiry"],
    data(){
      return{
        theadsName:[
          "城市",
          "子渠道",
          "规模",
          "用户量",
          "总单量",
          "总流水",
          "创建日期",
          "操作",
        ],
        isAdd:{
          title:"新增子渠道",
          isShow:false
        },
        dataObj:{},
        subsetInfos:[],
        btnName:"编辑基本信息",
      }
    },
    created(){
      this.findOne();
    },
    methods: {
      findOne(){
        let url=this.$apidomain+"/officialpartnerinfo/findonedetails?id="+this.isDetailed.id;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.dataObj = data.result.info;
          this.subsetInfos = data.result.subsetInfos;
        })
      },
      add(){
        this.isAdd.officialPartnerId = this.isDetailed.id;

        this.isAdd.isShow = true;
      },
      handleDelete(index,item){
        let url=this.$apidomain+"/officialPartnerSubsetInfo/deleteOfficialPartnerSubsetInfo";
        this.$http.post(url,item).then(res=>{
          let data = res.data;
          this.findOne();
        })
      },
      //保存
      enter(){
        if(!this.dataObj.linkmanName){
          alert("请输入联系人...");
          return;
        }
        if(!this.dataObj.linkmanTelephone){
          alert("请输入联系手机号...");
          return;
        }
        if(!this.dataObj.companyTelephone){
          alert("请输入公司电话...");
          return;
        }
        if(!this.dataObj.bankOfDeposit){
          alert("请输入开户行...");
          return;
        }
        if(!this.dataObj.cardNumber){
          alert("请输入银行卡号...");
          return;
        }
        let o = {};
        o.id = this.dataObj.id;
        o.linkmanName = this.dataObj.linkmanName;
        o.linkmanTelephone = this.dataObj.linkmanTelephone;
        o.companyTelephone = this.dataObj.companyTelephone;
        o.bankOfDeposit = this.dataObj.bankOfDeposit;
        o.cardNumber = this.dataObj.cardNumber;
        let url=this.$apidomain+"/officialpartnerinfo/updateOfficialPartnerInfo";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.quiry();
          this.cancelEdit();
        })

      },
      //初始化密码操作 start
      open3() {
        this.$prompt('请输入密码', '提示', {
        }).then(({ value }) => {
          if(value.length<6){
            alert("密码不能少于6位");
            return;
          }
          let o = {"id":this.dataObj.id,"password":md5(value)};
          let urlR=this.$apidomain+"/officialpartnerinfo/updatePassword";
          this.$http.post(urlR,o).then(r=>{
            let data=r.data;
            if(data.code=='0000'){
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.close();
            }else{
              alert(data.error);
            }
          });
          this.dataObj.password=value
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      //初始化密码操作end
      edit(){  //编辑
        this.$store.commit("edit",!this.isEdit());
      },
      isEdit(){
        return this.$store.state.isEdit;
      },
      cancelEdit(){   //取消编辑
        this.$store.commit("edit",!this.isEdit());
        this.btnName="编辑基本信息";
      },
      onchangeFile(event,keyImg){
        let filesObj=event.target.files[0];
        let filesName=event.target.files[0].name;
        let img=event.target.parentElement;
//        let url=this.$apidomain+"/upload/kindeditorjson";
        let url=this.$apiupdate+"/upload/kindeditorjson";
        let param = new FormData(); // 创建form对象
        param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
        this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
          let data=res.data;
          if(data.error==0){
            img.style.background= "url("+data.url+") center center no-repeat";
            img.style.backgroundSize= "100% 100%";
            this.selectorBehindObj[keyImg]=data.url;   //参数是ajax返回的图片地址
          }else{
            alert("上传失败");
          }

        });
      },
      handleItemChange(val) {
      },
      checkIdIn(obj,id){
        let isin = true;
        obj.forEach((e)=>{
          if(e.id==id){
            isin = false;
          }
        })
        return isin;
      },
      getIds(obj){
        let k = "";
        obj.forEach((e,i)=>{
          k += e.id+",";
        });
        k = k.substring(0,k.length-1);
        return k;
      },
      getLabel(obj,id){
        let value = "";
        obj.forEach((e,i)=>{
          if(e.id==id){
            value = e.value;
          }
        });
        return value;
      },
      closeMove(){
        this.isDetailed.isShow=false;
      },
    },
    mounted() {

    },
    watch:{

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .el-input{
    width:217px;
  }
  button{
    width:120px;
    cursor:pointer;
    line-height:40px;
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
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3,.consume_info > h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      line-height: 40px;
      letter-spacing: 0;
    }
    >.content{
      width:100%;
      height: 78%;
      display:flex;
      overflow-y: auto;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            /*margin-top:20px;*/
            width:310px;
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
      padding-left:10px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
      >h3{
        padding-left:0;
        line-height: 50px;
      }


    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:45px;
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

  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
  .dable_lsit{
    overflow-x: auto;
    margin-top:80px;
    margin-bottom:200px;
    table{
      width:100%;
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
          .icon{
            padding:0;
            i{
              cursor:pointer;
              padding:10px 0;
              font-size:18px;
              display: inline-block;
              padding-right:5px;
            }
            >i:last-of-type{
              padding-right:0;
            }
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
            }
            >.details_icon{
              flex:1;
              /*float:right;*/
              padding-left:0px;
              /*padding-top:8px;*/
              text-align: center;
              /*padding-right:20px;*/
              cursor:pointer;
            }
            >.Reminded_icon{

            }
            >.recover{
              i{

              }
            }

            .detailed_icon{

            }
          }
        }
        >tr:nth-of-type(even){
          background: #F9FAFC;
        }
      }
    }
    >.derive{
      float:right;
      >.derive_btn{
        margin-left:0;
      }
    }
  }
  /*@media screen and (max-width: 750px) {*/
    /*table{*/
      /*width:50vw !important;*/
    /*}*/
  /*}*/
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
  .el-table__body{
    /*width:1000px !important;*/
  }
  .el-table__row{
    >td:last-of-type{
      width:150px !important;
    }
  }
  .el-table_1_column_40,.cell{
    width:150px !important;
  }
  .el-message-box__wrapper{
    z-index:99999 !important;
  }
</style>


