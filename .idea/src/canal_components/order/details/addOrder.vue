
<template>
  <div id="app" class="channel-app-box">

    <div class="container">

      <h3>{{isAddorder.title}} <p class="closeX" id="closeX" @click="orderClose(isAddorder)"><i></i></p></h3>
      <div class="container_box_scoll">
            <div class="content">
              <div class="left_info">
                <ul>
                  <li style="margin-top:0;">
                    <span class="list_name">子类渠道 : </span>
                    <el-select style="width:217px;"
                      v-model="officialPartnerSubsetId.SourceTypeValue" placeholder="请选择" @change="selector(officialPartnerSubsetId,officialPartnerSubsetId.SourceType,officialPartnerSubsetId.SourceTypeValue)">
                      <el-option
                        v-for="items in officialPartnerSubsetId.SourceType"
                        :key="items.value"
                        :value="items.value"
                      >
                      </el-option>
                    </el-select>
                  </li>
                  <!--输入框开始-->
                  <li v-for="(item,index) in addOrder.inputs" :key="index">
                    <span class="list_name">{{item.name}} : </span>
                    <el-input
                      placeholder="请输入内容"
                      v-model="item.value">
                    </el-input>
                  </li>
                  <!--输入框end-->
                  <li>
                    <span class="list_name"> 联系地址 : </span>
                    {{showAddress}}
                    <el-input
                              :placeholder="showAddress?'楼号／门牌号':'请输入地址'"
                              v-model="addOrder.linkmanAddress">
                    </el-input>
                  </li>
                  <li>
                    <span class="list_name">  预约时间 : </span>
                    <DatePicker v-model="addOrder.appointmentDatetime"
                                @on-ok="onOk(addOrder.appointmentDatetime)" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期和时间"
                                style="width: 217px"></DatePicker>
                  </li>
                </ul>
              </div>
            </div>
            <div class="consume_info">
              <div class="content">
                <div class="left_info">
                  <ul style="padding-right:10px;">
                    <li style="line-height:50px;">&nbsp;
                      {{productInfo.title}}
                      &nbsp; &nbsp; &nbsp;
                      <button @click="addProduct" style="background:#20A0FF ;float:none;line-height:35px; width:auto;padding-left:10px;padding-right:10px;">+新增产品</button>
                    </li>
                 <!--表格数据   -->
                    <li style="overflow-y: auto">
                      <table cellSpacing="0px" cellpadding="0">
                        <thead>
                        <tr class="theads">
                          <th v-for="(item,index) in addOrderObjData.theadsName" :key="index">{{item}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in addOrderObjData.userInfos">
                          <td>
                            {{index+1}}
                          </td>
                          <td>
                            {{item.fullName}}
                          </td>
                          <td>
                            {{item.tags|placeholder}}
                          </td>
                          <td>
                            {{item.sum}}
                          </td>
                          <td>
                            <span @click="del(addOrderObjData.userInfos,index)" class="details_icon Reminded_icon" style="display: block">
                               <i></i> &nbsp;删除
                            </span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="price">
                <ul>
                  <li>上门费:{{addOrderObjData.userInfos|visitFeeShow}}元</li>
                  <li>服务费:{{addOrderObjData.userInfos|serviceFeeShow}}元</li>
                  <li>优惠金额:{{addOrderObjData.userInfos|discountsFeeShow}}元</li>
                  <li>合计:{{addOrderObjData.userInfos|totalFeeShow}}元</li>
                </ul>
              </div>
            </div>
      </div>
      <div class="btn">
        <button @click="orderClose(isAddorder)">取消</button>
        <button @click="accomplishOrder(addOrder)" class="selector">完成</button>
      </div>
    </div>
<!--新增产品弹宽-->
    <add-product  v-if="isAddProduct.isShow" :isAddProduct="isAddProduct" :tableDataList="addOrderObjData.userInfos"></add-product>
    <!--显示个取消-->

  </div>
</template>

<script>
import addProduct from "./add_product"
  export default {
    props: ["isAddorder","quiry"],
    components: {
      addProduct
    },
    data() {
      return {
        showAddress:"",
        officialPartnerSubsetId: {
          key: "officialPartnerSubsetId",
          SourceTypeValue: '', //选中后的
          SourceType: [],
          keyName:"city"
        },
        //城市ID
        //区域start
        serveAreas: [],
        props2: {
          value: 'id',
          label: 'label',
          children: 'cities',
        },
        //区域end
        options: [],
        props: {
          value: 'id',
          label: 'label',
          children: 'cities'
        },
        selectedOptions2: [],
        //新建工单查询数据；
        addOrder: {
          appointmentDatetime:"",  //预约时间
          inputs: [
            {
              name: "联系人",
              key: "linkmanName",
              value: ""
            }, {
              name: "联系电话",
              key: "linkmanPhoneNum",
              value: ""
            }
          ],
          linkmanAddress: "",
          selectorBehindObj: {},
//            添加师傅详情结束
        },
        addOrderObjData: {
          theadsName: [
            '序号',
            '产品名称',
            '标签',
            '数量',
            '操作',
          ],
          userInfos: [
          ]
          //表格数据
        },
        //新建工单查询end；
        //isShow   Start
        isAddProduct: {
          isShow: false,
          title: "新增产品",
          cityId:""
        },
        productInfo: {
          title: "产品信息",
        }
        //isShow   End
      }
    },
    created() {
      let params = {params: {
        "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
      }};
      let url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo";
      this.$http.get(url,params).then(r=>{
        let data=r.data;
        data.result.forEach((v)=>{
          this.officialPartnerSubsetId.SourceType.push({"id":v.id,"value":v.name,"cityId":v.cityId,"showAddress":v.details,"linkmanAreaId":v.areaId})
        });
      })
    },
    methods: {
      //取消完成按钮操作；
      orderClose(isShow) {
        isShow.isShow = false;
      },
      //完成   操作 start
      accomplishOrder(data) {
        data.inputs.forEach(v => {
          data.selectorBehindObj[v.key] = v.value;
        });
        data.selectorBehindObj.appointmentDatetime = data.appointmentDatetime;
        data.selectorBehindObj.appointmentDatetime = this.$moment(data.selectorBehindObj.appointmentDatetime).format("YYYY-MM-DD HH:mm:ss");
        data.selectorBehindObj.linkmanAddress = data.linkmanAddress;
        data.selectorBehindObj.linkmanAddress = this.showAddress.substring(this.showAddress.indexOf("街道")+2,this.showAddress.length) + data.selectorBehindObj.linkmanAddress;
        let serviceInfos = [];
        this.addOrderObjData.userInfos.forEach(v => {
          serviceInfos.push({"id":v.id,"size":v.sum,"serviceTags":v.tags})
        });
        data.selectorBehindObj.serviceIdsJson = JSON.stringify(serviceInfos);
        let url=`${this.$apidomain}/order/submit`;

        if(this.$testReg(data.selectorBehindObj,this,'addOrder')){
        this.$http.post(url,data.selectorBehindObj).then(r=>{
          console.log(this.isAddorder.isShow);
          let data=r.data;
          if(data.code==='0000'){
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success'});
            if(this.quiry){
              this.quiry();
            }
            this.isAddorder.isShow=false;

          }else{
            this.$notify.error({
              title: '失败',
              message: data.error,
              type: 'success'});
          }
        });}
      },
      //取消完成按钮操作；end

//        新增产品 start
      addProduct() {

        var flag=true,letTest= new RegExp("^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$");
        this.addOrder.inputs.forEach(v=>{
          if(v.key==="linkmanName"){
            if(v.value===""){
              this.$message({
                message: '请输入联系人名称',
              });
              flag=false;
            }
          }else if(v.key==="linkmanPhoneNum"){
            if(v.value===""){
              this.$message({
                message: '请输入联系人电话',
              });
              flag=false;
            }
            if(!letTest.test(v.value)){
              this.$message({
                message: '请输入正确的联系人手机号',
              });
              flag=false;
            }
          }
        });

        if(!flag)return;
        if(!this.addOrder.appointmentDatetime){
          return this.$message({
            message: '请选择预约时间',
          });
        }
        if(this.isAddProduct.cityId){
          this.isAddProduct.isShow=true;
        }else{
          this.$message({
            message: '请选择订单所在城市...',
          });
        }
      },
//        新增产品end

//        table
      //删除
      del(item,index) {
       item.splice(index,1)
      },
      //        table结束
      onOk(value) {        //时间的参数预约时间 下单时间
      },
      selector(item, values, SourceTypeValue) {       //选中后的下拉列表
        var key = item.key;
        values.forEach((v, i) => {
          if (v.value === SourceTypeValue) {
            this.addOrder.selectorBehindObj[key] = v.id;
            this.isAddProduct.cityId=v.cityId;
            this.showAddress = v.showAddress;
            this.addOrder.selectorBehindObj.linkmanAreaId = v.linkmanAreaId;
          }
        })
      },
      handleItemChange(val) {

      },
      changeSelector(value) {
        this.addOrder.selectorBehindObj.linkmanAreaId = value[value.length - 1];
      },
      handleChange(value) {
        let id = value[value.length - 1];
        this.isAddProduct.cityId=id;
        this.addOrderObjData.userInfos=[];
//选择区域街道
        let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+ id;//获取区域
          this.$http.get(url).then(r=>{
            let data=r.data;
            this.serveAreas = data.result;
      })
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  @import "../../../assets/styles/ch_alert";
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
    letter-spacing: 0;
    width:60%;
    padding-left:20px;
    padding-right:20px;
    padding-bottom:100px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-48%);
    background:#fff;
    height:78%;
  >h3{
     font-family: MicrosoftYaHei;
     font-size: 14px;
     color: #333333;
      line-height:3.2em;
     padding-left:10px;
     letter-spacing: 0;
   }
    >.container_box_scoll{
      height: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #ededed;
      }
      border:1px solid #ccc;
      >.content{
        width:100%;
        border-bottom:none;
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
        border-top:none;
        position:relative;
        >.title{
          padding-left:10px;
          line-height:30px;
          width:100%;
          background: #ECECEC;
        }

      }
    }


  }
  ul{
    padding-left:10px;
    list-style:none;
  >li{
     line-height:40px;
    >.list_name{
      display: inline-block;
      width:70px;
      text-align: right;
    }
   }

   >.position{
    float:left;
    }
    >.position:first-of-type{
    float:none;
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
  .el-select{
    width: 85px;
  }
  table{
    width:100%;
  .theads{
  >th{
     padding:0px 10px;
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
  >td{
     border-bottom:1px solid #ccc;
     padding:0px 10px;
     text-align:center;
   }
  >td:last-of-type{
      color:red;
    cursor: pointer;
  }
  }
  >tr:nth-of-type(even){
     background: #F9FAFC;
   }
  }
  }
  #closeX{
   >i{
     background:url(../../../assets/images/cloos_alert.png) center center no-repeat;
     background-size:100% 100%;
   }
  }
  .btn{
    bottom:15px;
  }
  .price{
    overflow: hidden;
    >ul{
      padding-right:20px;
      float: right;
      >li{
        line-height: 2em;
        font-family: MicrosoftYaHei;
        font-size: 13px;
        color: #5E6D82;
      }
    }
  }

  .selector{
    background:rgb(32, 160, 255) !important;
  }

</style>
<style  lang="scss">

  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }

</style>


