
<template>
  <div id="app">
    <div class="container">
      <h3>{{isAddorder.title}} <p class="closeX" id="closeX" @click="orderClose(isAddorder)"></p></h3>
      <div style="overflow-y: auto;height: 78%;">
      <div class="content">
        <div class="left_info">
          <p class="title">{{isAddorder.title}}</p>
          <ul>
            <!--输入框开始-->
            <li v-for="(item,index) in addOrder.inputs" :key="index" style="height:45px;">
              <span class="list_name"> {{item.name}} : </span>
              <el-input style="width:180px;"
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
            </li>
            <!--输入框end-->
            <li>
              <span class="list_name"> 联系地址 : </span>

              <el-cascader
                expand-trigger="hover"
                :options="options"
                :props="props"
                style="width:180px;"
                v-model="selectedOptions2"
                @change="handleChange">
              </el-cascader>
              &nbsp;

              请选择区 :
              <el-cascader id="city" style="width:180px;"
                           @change="changeSelector"
                           :options="serveAreas"
                           @active-item-change="handleItemChange"
                           :props="props2"
              ></el-cascader> &nbsp;
              &nbsp;

              <el-input  style="width:180px;"
                        placeholder="请输入内容"
                        v-model="addOrder.linkmanAddress">
              </el-input>
            </li>
            <li style="margin-top:-20px;">
              <br>
              <span class="list_name">   预约时间 :</span>
              <DatePicker v-model="addOrder.appointmentDatetime"
                          @on-ok="onOk(addOrder.appointmentDatetime)" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）"
                          style="width: 180px"></DatePicker>
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
        <p class="title" style="margin:10px 0">{{productInfo.title}}</p>
        <div class="content">
          <div class="left_info">
            <ul>
              <li style="line-height: 100px;">
                {{productInfo.title}}
                &nbsp; &nbsp; &nbsp;
                <button @click="addProduct" style="float:none;line-height:35px; width:150px">+新增产品</button>
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
                      {{item.tags}}
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
        <div>
          <ul>
            <li>上门费:{{addOrderObjData.userInfos|visitFeeShow}}元</li>
            <li>服务费:{{addOrderObjData.userInfos|serviceFeeShow}}元</li>
            <li>优惠金额:{{addOrderObjData.userInfos|discountsFeeShow}}</li>
            <li>应付款:{{addOrderObjData.userInfos|totalFeeShow}}元</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
<!--新增产品弹宽-->
    <add-product  v-if="isAddProduct.isShow" :isAddProduct="isAddProduct" :tableDataList="addOrderObjData.userInfos"></add-product>
    <!--显示个取消-->

    <div class="btn">
      <button @click="orderClose(isAddorder)">取消</button>
      <button @click="accomplishOrder(addOrder)" class="selector">完成</button>
    </div>
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
          appointmentDatetime: "",  //预约时间
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
      let url = `${this.$apidomain}/common/findprovinceandcitylist`;
      this.$http.get(url).then(r => {
        let data = r.data;
        if (data.code === '0000') {
          this.options = data.result;
          console.log(this.options);
        }
      });
      //获取区和街道
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
        let serviceInfos = [];
        this.addOrderObjData.userInfos.forEach(v => {
          serviceInfos.push({"id":v.id,"size":v.sum,"serviceTags":v.tags})
        });
        data.selectorBehindObj.serviceIdsJson = JSON.stringify(serviceInfos);
        let url=`${this.$apidomain}/order/submit`;
       if(this.$testReg(data.selectorBehindObj,this,'addOrder')){
        this.$http.post(url,data.selectorBehindObj).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success'});
            this.quiry();
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
        let flag=true,letTest= new RegExp("^((13[0-9])|(14[0-9])|(15([0-9]))|(18[0-9])|(16[0-9])|(17[0-9]))\\d{8}$");
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
        console.log(value.length);
      },
      selector(item, values, SourceTypeValue) {       //选中后的下拉列表
        var key = item.key;
        values.forEach((v, i) => {
          if (v.value === SourceTypeValue) {
            this.addOrder.selectorBehindObj[key] = v.id;
          }
        })
      },
      handleItemChange(val) {
      },
      changeSelector(value) {
        this.serveAreas.forEach((v,i)=>{
          if(v.id===value[0]) {
            v.cities.forEach((v2,i)=> {
              if (v2.id === value[value.length - 1]) {
                this.addOrder.selectorBehindObj.linkmanAreaId = value[value.length - 1];
                this.addOrder.selectorBehindObj.linkmanArea = v2.label;
              }
            })
          }
        });
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
    line-height:3.2em;
     padding-left:10px;
     letter-spacing: 0;
   }
  .content{

     width:100%;
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
     padding:4px 10px;
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
     padding:4px 10px;
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
     height:100%;
     padding-top:4px;
  i{
    width:16px;
    height:16px;
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
  }
  >.Reminded_icon{
  i{
    display: inline-block;
    background:url(../../../../static/images/del.png) center center no-repeat;
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
<style  lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 999999 !important;
  }
.left_info ul > li > .el-cascader .el-cascader__label{
  line-height: 40px !important;
}
</style>


