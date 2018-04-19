<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{dataObj.title}}</h3>
      <div class="content">
        <div class="left_info">
          <p class="title">{{orderDetailed.title}}</p>
          <p class="position_icon" @click="isPosition" v-show="this.mapData.masterId">
            <i></i>
            查看师傅位置
          </p>
          <ul>
            <li>
              <el-button type="primary" @click="edit" v-if="!isEdit()">
                {{btnName}}
              </el-button>
              <el-button type="primary"
                         @click="enter()"
                         v-if="isEdit()"
              >
                保存
              </el-button>
              <el-button type="primary" @click="cancelEdit" v-if="isEdit()">
                 取消
              </el-button>
            </li>
            <li>工单编号：{{dataObj.orderNumber ||placeholder}}</li>
            <li>服务城市: {{dataObj.city||placeholder}}</li>
            <li>绑定手机号: {{dataObj.userNumber ||placeholder}}</li>
            <li>联系人:                     <!--可编辑-->
              <span  v-if="!this.isEdit()">
                {{dataObj.contactsName||placeholder}}
              </span>
              <span v-else>
                  <el-input
                    placeholder="请输入内容"
                    v-model="dataObj.contactsName">
                 </el-input>
              </span>
              </li>
            <li>服务地址:
              <span  v-if="!this.isEdit()">
               {{dataObj.serveAddress||placeholder}}
              </span>
              <span v-else>
                  {{splieCity(dataObj.serveAddress)}}
                  <el-cascader id="city"style="width:160px;"
                               @change="changeSelector"
                               :options="dataObj.serveAreas"
                               change-on-select
                               @active-item-change="handleItemChange"
                               :props="dataObj.props"
                               :placeholder="splieStreet(dataObj.serveAddress)"
                  ></el-cascader>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                 <el-input
                   :placeholder="splieAddress(dataObj.serveAddress)"
                   v-model="dataObj.position">
                 </el-input>
              </span>
            </li>
            <li>
              预约时间:
              <span >
                     {{dataObj.makeTime||placeholder}}
              </span>
              <span v-if="isEdit()">
                 <el-button type="primary" @click="changeTimeIsShow(dataObj.makeTime,dataObj.orderNumber)" >
                 修改预约时间
              </el-button>
              </span>
            </li>
            <li>联系手机号:
              <span v-if="!this.isEdit()">
                  {{dataObj.tel||placeholder}}
              </span>
              <span v-else>
                  <el-input
                    placeholder="请输入内容"
                    v-model="dataObj.tel">
                 </el-input>
              </span>
            </li>
            <li>
              工号:{{dataObj.masterId||placeholder}} 师傅:{{dataObj.masterName|placeholder}} 手机号:{{dataObj.masterPhoneNum|placeholder}}
              <el-button  type="primary" @click="expediteOrder" v-if="isEdit()&&dataObj.masterId">
                重新派单
              </el-button>
            </li>
            <li>工单渠道:{{dataObj.officialPartnerSubsetName|placeholder}}</li>
            <li>工单来源:{{dataObj.orderSource| orderSourceShow|placeholder}}</li>
            <li v-if="2==dataObj.orderSource">推荐人手机号:{{dataObj.orderSourceId|placeholder}}</li>
            <li>工单状态:{{dataObj.orderStatus | orderStateShow|placeholder}}</li>
            <li>
              <textarea class="text_area" placeholder="编辑基本信息备注"  v-if="this.isEdit()" v-model="dataObj.remarks">
              </textarea>
            </li>
            <li class="option_list" v-show="refuse()">
              拒绝原因：  {{refuse().refuseContent||placeholder|placeholder}} <br>
              其他： {{refuse().refuseContentText||placeholder}}
            </li>
          </ul>
        </div>
        <div class="left_info">
          <p class="title">工单额外信息</p>
          <ul>
            <li>
              <el-button type="primary" @click="orderDaily">
               查看订单日志
              </el-button>
            </li>
            <li>
              <ul v-for="(item,index) in orderExtraInfo" class="orderExtraInfo">
                <li> 时间：{{item.operateTime|moment('YYYY-MM-DD HH:mm:ss')}}</li>
                <li> 操作人：{{item.operator|placeholder}}</li>
                <li> 类型：{{item.reasonOfComplaint|placeholder}}</li>
                <li> 内容：{{item.remark|placeholder}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div style="padding-bottom:0px" class="consume_info" >
        <p class="title" >产品信息</p>
        <ul>
          <li style="float:right">
            <ul class="statistics">
              <li>上门费：{{productList.tableListData|visitFeeShow}}</li>
              <li>服务费：{{productList.tableListData|serviceFeeShow2}}</li>
              <li>配件费：{{productList.tableListData|price3Show2}}</li>
              <li>高空费：{{productList.tableListData|price4Show2}}</li>
              <li>优惠金额：{{productList.tableListData|discountsFeeShow2}}</li>
              <li>应付款：{{productList.tableListData|totalFeeShow2}}</li>
            </ul>
          </li>
          <li class="table" >
            <table cellSpacing="0px" cellpadding="0">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in productList.theadsName" :key="index">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in productList.tableListData">
                <td>
                  {{item.serviceFullName}}
                </td>
                <td>
                  {{item.serviceName}}
                </td>
                <td>
                  {{item.serviceTags|isnull}}
                </td>
                <td>
                  {{item.serviceSize |placeholder}}
                </td>
                <td>
                  {{item.price1|placeholder}}
                </td>
                <td>
                  {{item.price2Original|placeholder}}
                </td>
                <td>
                  {{item.price3|placeholder}}
                </td>
                <td>
                  {{item.price4|placeholder}}
                </td>
                <!--<td>-->
                  <!--{{item|getServiceTotel}}-->
                <!--</td>-->
                <td>
                  <!--<span-->
                  <!--class="details_icon"><el-button type="text" @click="repair(item,index)"><i></i>返修</el-button></span>-->
                  <span
                    v-if="(dataObj.orderStatus==='03'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='04'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='05'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='06'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='07'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='08'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='09'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='10'&&'0'===item.isSecondPayment)||(dataObj.orderStatus==='11'&&'0'===item.isSecondPayment)||dataObj.orderStatus==='12'||dataObj.orderStatus==='15'"
                    class="details_icon"><el-button type="text" @click="returncash(item)"><i></i>返现</el-button></span>
                  <span
                    v-if="(dataObj.orderStatus==='01'&&'0'===item.isSecondPayment)||dataObj.orderStatus==='11'"
                    class="details_icon"><el-button type="text" @click="charge(item,index)"><i></i>编辑</el-button></span>
                </td>
              </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
      <div style="padding-bottom:0px" class="consume_info" >
        <p class="title" >交易信息</p>
        <ul>
          <li class="table">
            <table cellSpacing="0px" cellpadding="0">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in payRecordList.theadsName" :key="index">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in payRecordList.tableListData" v-if="payRecordList.tableListData.length">
                <td>
                  {{item.paySource|paySourceShow}}
                </td>
                <td>
                  {{item.id}}
                </td>
                <td>
                  {{item.payType|payTypeShow}}
                </td>
                <td>
                  {{item.payTime|moment('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td>
                  <tr v-for="(item2,index2) in item.coreMainOrderFees" v-show="'Pay'==item.payType">{{item2.type|feeTypeShow}}:{{item2.operationFee}}(元)</tr>
                  <tr v-show="'Refund'==item.payType">退款金额:{{item.refundFee}}(元)</tr>
                </td>
                <td>
                  {{item.reducedPrice}}
                </td>
                <td>
                  {{item.payAmount}}
                </td>
                <td>
                  {{item.payState|payStateShow}}
                </td>
              </tr>
              <tr v-if="!payRecordList.tableListData.length" style="text-align: center">
                <td style="border:none;position:absolute;top:125px;left:0;transform:translateX(-0%); width:100%">无</td>
              </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
      <div style="padding-bottom:0px" class="consume_info" >
        <p class="title" style="margin-bottom:20px" >工单评价</p>
        <ul>
          <li class="table" style="width:50%">
            <table cellSpacing="0px" cellpadding="0">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in orderAppraise.theadsName" :key="index">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in orderAppraise.tableListData" v-if="orderAppraise.tableListData.length">
              <td v-show="false"></td>
                <td>
                  {{item.masterId}}
                </td>
                <td>
                  {{item.masterName}}
                </td>
                <td style="color:#b3ce0d">
                    <i class="comment_icon" v-for="(items,index) in item.level"></i>
                </td>
                <td>
                   {{item.evaluateLabels}}
                </td>
                <td>
                   {{item.content}}
                </td>
              </tr>
              <tr v-if="!orderAppraise.tableListData.length" style="text-align: center">
                <td style="border:none;position:absolute;top:135px;left:0;transform:translateX(-25%); width:100%">无</td>
              </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </div>

    <!--弹框-->
    <div class="alert" v-if="dailyIsShow.isShow">
      <alert-info :dailyIsShow="dailyIsShow">
      </alert-info>
    </div>
    <!--弹框end-->
    <p class="el-icon-close close" @click="isalerShow"></p>
    <!--改约时间 start-->
    <changTime :time="time" :findOne="findOne"></changTime>
    <!--改约时间 end-->

    <!--弹框-->
    <div class="alert" v-if="isCharge.isShow">
      <charge :isCharge="isCharge" :findOne="findOne">
      </charge>
    </div>

    <!--返现-->
    <div class="alert" v-if="isDrawback.isShow">
      <returncash :isDrawback="isDrawback" :findOne="findOne"></returncash>
    </div>
    <!--返现end-->

    <!--返修-->
    <div class="alert" v-if="isRepair.isShow">
      <newreturncash :isRepair="isRepair" :findOne="findOne"></newreturncash>
    </div>


    <!--替换师傅弹框-->
    <div class="alert" v-if="isReplaceAlert.isShow">
      <replace-master :isReplaceAlert="isReplaceAlert" :quiry="findOne"></replace-master>
    </div>
    <!--替换师傅弹框end-->
    <div class="alert" v-if="mapData.isShow">

      <position-map style="z-index: 999999;width:50%;height:70%;margin:0 auto;transform:translateY(20%);"  :mapData="mapData"></position-map>
    </div>
  </div>
</template>
<script>
  import changTime from "../orderAllCommonts/master_alert/changeTime"
  import alertInfo from "./alertInfo";
  import charge from "./charge.vue";
  import replaceMaster from "./replaceMaster_alert"
  import positionMap from "./position"
  import returncash from "./master_alert/returncash"
  import newreturncash from './master_alert/newReturncash'
  export default {
    props:["orderDetailed","quiry","show",'replacedata'],
    components:{
      alertInfo,
      changTime,
      charge,
      replaceMaster,
      positionMap,
      returncash,
      newreturncash
    },
    data(){
      return{
        mapData:{
          isShow:false,
          masterId:""
        },
        placeholder:"无",
        //改约时间 start
        time:{
          isShow:false,
          title:"改约时间",
        },
        //改约时间 end
        //替换师傅
        isReplaceAlert:{
          isShow:false
        },
        //替换师傅end
        //工单额外信息
        orderExtraInfo:[],
        //日志
        dailyIsShow:{
          isShow:false,
          orderId:this.orderDetailed.orderId
        },
        isCharge:{
          isShow:false
        },
        //工单额外信息end
        //工单详情
        dataObj: {       //alertinfo
          title: "工单详情",
          makeTime:"",
          remindedSet: "提点设置",
          orderSource: "自建工单", //工单来源
          selectorBehindObj: {   //参数
            serveCityId: "",
            tel: "",
            position:"",
            contactsName: ""
          },
          props: {
            value: 'label',
            children: 'cities',
          },
          serveAreas: [],  //区域
        },
        //工单详情数据end
        //产品信息
        productList:{
          theadsName: [
            '产品全称',
            '产品名称',
            '标签',
            '数量',
            '上门费（元）',
            '服务费（元）',
            '高空费（元）',
            '配件费（元）',
//            '合计（元）',
            '操作',
          ],
          tableListData: [],          //表格数据
        },
        payRecordList:{
          theadsName: [
            '支付方式',
            '交易流水号',
            '交易类型',
            '支付时间',
            '支付费用详情',
            '优惠金额',
            '应付款',
            '支付状态',
          ],
          tableListData: [],          //表格数据
        },
        //产品信息end;
        //编辑的产品信息；
        productTableData: {   //子组件的表格数据
          remarks: "",
          theadsName: [
            '序号',
            '用户编号',
            '区域',
            '分类',
            '手机号',
            '状态',
            '下单时间',
            '预约时间',
            '操作'
          ],
          tableListData: [],          //表格数据
        },
        //编辑的产品信息；end
        //评价table
        orderAppraise:{
          theadsName:[
            '师傅编号',
            '师傅名称',
            '工单评分',
            '评论标签',
            '评论内容',
          ],
          tableListData: []
        },
        //评价table End
        isAlert:false,
        btnTableName:"编辑基本信息",
        isPreserve:false,
        onValueId:'',
        btnName:"编辑基本信息",
        orderData:{},
        isRepair:{
          isShow:false,
          title:'新建返修工单'
        },
        isDrawback:{
          isShow:false ,
          title:"返现"
        },
      }
    },
    created(){
      this.findOne();
//      console.log(this.orderDetailed,":==");
    },
    methods: {
      findOne(){
        let url=`${this.$apidomain}/orderquery/findOneDetails`;

        this.orderDetailed.orderId=this.replacedata.data.id;

//        console.log(this.orderDetailed.orderId);
        let params={params:{"id":this.orderDetailed.orderId}};
        this.$http.get(url,params).then(r=>{
          let data=r.data;
//          console.log(data);
          if(data.code==='0000') {
            let res = data.result.coreMainOrder;
            this.orderData = data.result.coreMainOrder;
            this.dataObj.orderNumber = res.id;
            this.dataObj.city=res.linkmanArea;
            this.dataObj.userNumber=res.userPhoneNum;
            this.dataObj.contactsName=res.linkmanName;
            this.dataObj.serveAddress=res.linkmanDetails;
            this.dataObj.linkmanAddress=res.linkmanAddress;
            this.dataObj.linkmanAreaId=res.linkmanAreaId;
            this.dataObj.linkmanArea=res.linkmanArea;
            this.dataObj.makeTime=this.$moment(res.appointmentDatetime).format('YYYY-MM-DD HH:mm:ss');
            this.dataObj.tel= res.linkmanPhoneNum;
            this.dataObj.irrigation=res.officialPartnerName;
            this.dataObj.orderSource=res.source;
            this.dataObj.orderSourceId=res.sourceId;
            this.dataObj.orderStatus=res.state;
            this.dataObj.masterId=res.masterId;
            this.dataObj.masterName=res.masterName;
            this.dataObj.masterPhoneNum=res.masterPhoneNum;
            this.dataObj.sum=res.total;
            this.orderExtraInfo = data.result.coreMainOrderExceptionRecords;
            this.productList.tableListData = data.result.coreMainOrderServices;

            this.payRecordList.tableListData = data.result.faPayJournalAccounts;
            this.orderAppraise.tableListData = data.result.coreMainOrderEvaluates;
            this.mapData.masterId = this.dataObj.masterId;
            console.log(this.orderAppraise);
            let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+res.linkmanAreaId.substring(0,4);//获取区域
            this.$http.get(url).then(r=>{
              let data=r.data;
              this.dataObj.serveAreas = data.result;
            })
          }
        });
      },
      //修改预约时间 start
      changeTimeIsShow(time,id){
        this.time.time=time;
//        this.time.sum=sum;
        this.time.orderId=id;
        this.time.isShow=true;
      },
      //修改预约时间 end
      //关闭工单详情；
      isalerShow(){
        this.quiry()
        this.orderDetailed.show=true;
        this.$emit('myevent',this.orderDetailed.show)
      },
      //新建返修工单
      repair(item,index){
        console.log(this.dataObj);
        console.log(item);
//        console.log(index);
        this.isRepair.data=this.dataObj;
        this.isRepair.data1=item;
        this.isRepair.isShow=true;

      },
      charge(item){
        this.isCharge.item = item;
        this.isCharge.isShow=true;
      },
      returncash(data){
        console.log(data);
        this.isDrawback.data=data;
        this.isDrawback.isShow=true;
      },
      //关闭工单详情；end
      expediteOrder(){
        this.isReplaceAlert.appointmentDatetime=this.orderData.appointmentDatetime;
        this.isReplaceAlert.skills=this.orderData.skills;
        this.isReplaceAlert.areaId=this.orderData.linkmanAreaId;
        this.isReplaceAlert.orderIds=this.orderData.id;
        this.isReplaceAlert.isShow=true;
        this.isReplaceAlert.isSiteShow=true;
      },
      orderDaily(){
        this.dailyIsShow.isShow=true
      },
      close(){
        this.isAlert=false
      },
      cancelEdit(){   //取消编辑
        this.$store.commit("edit",!this.isEdit());
        this.btnName="编辑基本信息";
      },
      //保存
      enter(){
        let isChangeAreaId = false;
        let o = {};
        o.orderId = this.dataObj.orderNumber;
        o.linkmanName = this.dataObj.contactsName;
        o.linkmanPhoneNum = this.dataObj.tel;
        o.linkmanAddress = this.dataObj.position;
        o.linkmanAreaId = this.dataObj.serveCityId;
        o.linkmanArea = this.dataObj.serveCity;
        if(!o.linkmanAddress){
          o.linkmanAddress=this.dataObj.linkmanAddress;
        }
        if(!o.linkmanAreaId){
          o.linkmanAreaId=this.dataObj.linkmanAreaId;
        }else{
          isChangeAreaId = true;
        }
        if(!o.linkmanArea){
          o.linkmanArea=this.dataObj.linkmanArea;
        }
        o.remark = this.dataObj.remarks;
        console.log(this.dataObj);
        console.log(o);
        if(!o.linkmanName){
          alert("请输入联系人...");
          return;
        }
        if(!o.linkmanPhoneNum){
          alert("请输入联系手机号...");
          return;
        }
        if(!o.linkmanAreaId){
          alert("请选择服务街道...");
          return;
        }
        if(!o.linkmanAddress){
          alert("请输入地址详情...");
          return;
        }
        if(!o.remark){
          alert("请输入修改备注...");
          return;
        }
        let url=this.$apidomain+"/orderquery/changeInfo";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          if(isChangeAreaId){
            alert("地址已发生修改，请注意是否需要更换师傅!!!");
          }
          this.findOne();
          this.quiry();
          this.cancelEdit();
        })
      },
      edit(){  //编辑
        this.$store.commit("edit",!this.isEdit());
      },
      isPosition(){
        console.log(this.mapData);
        this.mapData.isShow=true;
      },
      splieCity(data){
        if(data){
          let index= data.indexOf("市");
          return data.substring(0,index+1)
        }
      },
      splieStreet(data){
        if(data){
          let index= data.indexOf("市");
          let index2= data.indexOf("街道");
          return data.substring(index+1,index2+2);
        }
      },
      splieAddress(data){
        if(data){
          let index= data.indexOf("街道");
          return data.substring(index+2,data.length);
        }
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.dataObj.selectorBehindObj[key]=v.id;
          }
        })
      },
      handleItemChange(val) {
      },
      changeSelector(value){           //服务区域
        this.dataObj.serveAreas.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.dataObj.serveCityId=e.id  //选择街道
                this.dataObj.serveCity = value[1];
              }
            })
          }
        });
      },
      isEdit(){
        return this.$store.state.isEdit;
      },
      isEditTable(){     //is编辑表格数据
        return this.$store.state.isEditTable;
      },
      editTable(){          //编辑表格数据

        this.$store.commit("editTable",!this.isEditTable());
        let remarks=this.productTableData.remarks;//必填项备注
        if(this.isEditTable()){
          this.btnTableName="保存";
        }else if(remarks!=""){
          this.btnTableName="编辑基本信息";
          this.productTableData.tableListData.userInfos.forEach((v,i)=>{
            console.log(v.selectorBehindObj);   //得到参数
          })
          this.productTableData.remarks=''
//          alert("发请求")
        }else if(remarks==""){
          this.$store.commit("editTable",false);
          this.btnTableName="编辑基本信息";
          return alert("请填写备注")
        }
      },
      cancelTable(){ //取消操作
        this.$store.commit("editTable",!this.isEditTable());
        this.btnTableName="编辑基本信息";
      },
      refuse(){
        return this.$store.state.refuse
      }
    },
    mounted() {
//      console.log(this.dataObj);
     this.refuse()
      setTimeout(()=>{
//        console.log(this.productList.tableListData);
        console.log(this.dataObj)
      },2000)
    },
    destroyed(){
      this.$store.commit("edit",false);
    },
      watch:{

    },
  }
</script>
<style lang="scss">
  .el-select-dropdown, .el-cascader-menus, .el-dialog__wrapper{
    z-index: 99999 !important;
  }
  .content ul > li .el-cascader__label{
    line-height: 40px !important;
  }
</style>
<style scoped lang="scss">

  #app{
    width:100%;
    height:100%;
    .number{
      width:55px;
      height: 20px;
    }
    .position_icon{
      float:right;
      transform: translateY(-120%);
      margin-right:20px;
    }
    >.close{
        position:fixed;
        right:3%;
        cursor: pointer;
        font-size: 20px;
        top:160px;
    }
  }
  .el-input, .el-input__inner{
    width:auto;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:100%;
    border-radius: 10px;
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
      display:flex;
      >div{

        flex:1;

        >ul{
          >li{
            >ul{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                margin-bottom:30px;
                >img{
                  display: block;
                  width:270px;
                  height: 130px;
                }
              }
            }
            .orderExtraInfo{
              border-bottom:1px solid #ccc;
              >li{
                width:100%;
                margin:0;
                line-height: 2.9em;
              }

            }
            .text_area{
              width:40%;
              outline: none;
              border:1px solid #ccc;
              overflow-y: auto;
              height:80px;
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
      margin-top:30px;
      position:relative;
      >.title{
        margin:15px 0;
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .consume_info:last-of-type{
      padding-bottom:300px !important;
    }
    .col{
      padding-bottom:0px;
    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
      .text_area_table{
        width:600px;
        float:left;
      }

    }
    >.table{

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
              }
            }
          }
          >tr:nth-of-type(even){
            background: #F9FAFC;
          }
        }
      }
    }
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
  .alert{
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.6);
    position:absolute;
    top:0;
    z-index:9999;
    right:0;
    .btn{
      position:absolute;
      bottom:17%;
      left:50%;
      transform:translateX(-50%);
      text-align:center;
      overflow: hidden;
      button{
        width:200px;
        cursor:pointer;
        line-height:44px;
        border:none;
        padding:0;
        margin:0;
        transform: rotate(-360deg);
        border: 1px solid #979797;
        border-radius: 4px;
        float:left;
        background:#fff;
        outline:none;
      }
      .selector{
        color:#fff;
        background: #279447;
      }
      .forbidden_btn{
        background: #ff5351;
        color:#fff;
      }
    }
  }
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    position:absolute;
    top:16%;
    background-size:100% 100%;
    background-origin: content-box;
    width:16px;
    height: 16px;
    cursor: pointer;
    right:22%;
    font-size: 35px;
  }
  .statistics{
    float:left;
    display: flex;
    flex-wrap:wrap;
    >li{
      line-height:2em;
      flex:50%;
    }

    >li:last-of-type{
      font-weight: 900;
    }
  }
  .comment_icon{
    background:url(../../../../static/images/Group.png) center center no-repeat;
    background-size:100% 100%;
    display: inline-block;
    width: 20px;
    height: 20px;
  }
</style>




