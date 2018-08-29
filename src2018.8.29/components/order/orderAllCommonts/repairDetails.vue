<template>
  <div id="app" v-cloak @touchmove.prevent>
    <!--悬浮按钮-->
    <!--<div class="headerBtn" style="position: fixed;z-index: 9999;background: #FFFFFF">-->
    <div class="headerBtn bottom">
      <p class="close" @click="isalerShow">
        关闭
        <span>
          <img src="../../../../static/images/closeIcon.png" alt="">
        </span>
      </p>
      <div>
        <p class="left_info_edit cursor"  v-if="(dataObj.orderStatus=='05' || dataObj.orderStatus=='06' || dataObj.orderStatus=='08') && repair_work_btn"
           @click="have_arrived(dataObj.orderNumber)">
          工程师已抵达
        </p>
        <p class="cursor" v-if="(dataObj.orderStatus=='04' || dataObj.orderStatus=='05' || dataObj.orderStatus=='06'||dataObj.orderStatus=='07'|| dataObj.orderStatus=='08'|| dataObj.orderStatus=='10'||
        dataObj.orderStatus=='11') && repair_work_btn" @click="completed(dataObj.orderNumber)" >
          工单已完成
        </p>
        <p class="cursor" @click="isPosition(dataObj.orderNumber,dataObj.masterId)" v-show="this.mapData.masterId">
          <i></i>
            工程师位置
        </p>
        <p  class="cursor" @click="orderDaily">订单日志</p>
      </div>
      <div>
        <p class="cursor"
           v-if="orderData.state=='21'||orderData.state=='20'||orderData.state=='21'||orderData.state=='05'||orderData.state=='08'"
           @click="replaceMaster(orderData,'1',orderData.id,true)"
        >派单</p>
        <p class="cursor"
           v-if="orderData.state=='21'||orderData.state=='20'||orderData.state=='05'||orderData.state=='06'||orderData.state=='07'||orderData.state=='08'||orderData.state=='10'"
           @click="drawbackIsShow(orderData)"
        >取消工单</p>
        <p class="cursor"
           v-if="orderData.state=='21'||orderData.state=='20'||orderData.state=='05'||orderData.state=='06'||orderData.state=='07'||orderData.state=='08'||orderData.state=='10'||orderData.state=='12'||orderData.state=='16'||orderData.state=='17'||orderData.state=='18'"
           @click="addRemarksIsShow(orderData)"
        >添加备注</p>
        <p class="cursor"
           v-if="orderData.state=='21'||orderData.state=='20'||orderData.state=='05'||orderData.state=='06'||orderData.state=='07'||orderData.state=='08'||orderData.state=='10'||orderData.state=='12'||orderData.state=='16'||orderData.state=='17'||orderData.state=='18'"
           @click="complainFn(orderData.id)"
        >投诉工单</p>
        <p class="cursor"
           v-if="orderData.state=='21'||orderData.state=='20'||orderData.state=='05'||orderData.state=='06'||orderData.state=='07'||orderData.state=='10'||orderData.state=='12'"
           @click="unusual(orderData.id)"
        >工单报备</p>
        <p class="cursor"
           v-if="orderData.state=='06'||orderData.state=='05'||orderData.state=='07'"
           @click="masterImposeIsShow(orderData)"
        >罚款工程师</p>
        <p class="cursor"
           v-if="timeIsIf&&orderData.state=='20'||orderData.state=='05'||orderData.state=='06'||orderData.state=='07'||orderData.state=='08'"
           @click="changeTimeIsShows(orderData.appointmentDatetime,orderData.total,orderData.id)"
        >改约时间</p>
        <!--预约时间-->
        <p class="cursor"
           v-if="!timeIsIf&&changeTime(orderData.state)"
           @click="yuYueTimeIsShow(orderData.id)">
          预约时间
        </p>
        <!--@click="addSaverProduct(orderData,isAddProduct)"-->
        <!--<p class="cursor"-->
           <!--v-if="addSaverProduvtFilter(orderData.state)"-->
           <!--@click="addProduct(orderData)"-->
        <!--&gt;新增服务产品</p>-->
        <p class="cursor" @click="disposeOrder(orderData.id,orderData,orderData.appointmentDatetime)" v-if="orderData.state=='08'">
          处理
        </p>
        <p class="cursor"
           v-if="orderData.state=='21'||orderData.state=='05'||orderData.state=='06'||orderData.state=='07'"
           @click="reminder(orderData)"
        >催单</p>

      </div>
    </div>
    <!--列表信息-->
    <div class="tableList">

      <!--基本信息-->
      <div class="essentialInfo">
        <div class="left">
          <p>
            <span @click="takeUp(data='基本信息')" class="cursor">
              <img :src="jiantou1" alt="">
            </span>
            基本信息
          </p>
          <div v-if="telescopic1">

          <table :class="{edit:this.isEdit()}">
            <tr>
              <td class="fontWidth">工单号</td><td  @click="showorder(replacedata.data.mainOrderId)"><span style="cursor: pointer" class="orderLine">{{replacedata.data.mainOrderId}}</span></td>
              <td class="fontWidth">状态</td><td><span style="color:rgba(230,88,49,1);">{{orderData.state | orderStateShow|placeholder}}</span></td>
            </tr>
            <tr>
              <td class="fontWidth">返修工单号</td><td> {{replacedata.data.id}}</td>
              <td class="fontWidth">创建时间</td><td>{{orderData.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</td>
            </tr>
            <tr>
              <td class="fontWidth">分类</td><td>{{orderData.fLabelBusiness|FLabelBusinessShow}}</td>
              <td class="fontWidth">预约时间</td><td>{{orderData.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')||placeholder}}</td>
            </tr>
            <tr>
              <td class="fontWidth">产品名称</td><td>{{serviceFullName.serviceFullName}}</td>
              <td class="fontWidth">完成时间</td><td>{{orderData.serviceTimeComplete|moment('YYYY-MM-DD HH:mm:ss')}}</td>
            </tr>
            <tr>
              <td class="fontWidth">联系人</td><td> {{orderData.linkmanName||placeholder}}</td>
              <td class="fontWidth">工单耗时</td><td>{{orderData.completeTimeLimit}}</td>
            </tr>
            <tr>
              <td class="fontWidth">联系人手机号</td><td>{{orderData.linkmanPhoneNum||placeholder}}</td>
              <td class="fontWidth">准时偏差值</td><td>{{orderData.deviation}}</td>
            </tr>
            <tr>
              <td rowspan="2" class="fontWidth">服务城市</td> <td rowspan="2">{{orderData.linkmanArea||placeholder}}</td>
              <td  class="fontWidth">服务时长</td><td>{{orderData.workTimeLimit}}</td>
            </tr>
            <tr>
              <td class="fontWidth">改约次数</td><td>{{orderData.appointmentSize}}</td>
            </tr>
            <tr>
              <td rowspan="2" class="fontWidth">服务地址</td><td rowspan="2">{{orderData.linkmanDetails||placeholder}} </td>
              <td class="fontWidth">催单次数</td><td>{{orderData.reminderSize}}</td>
            </tr>
            <tr>
              <td class="fontWidth">挂起次数</td><td>{{orderData.hangSize}}</td>
            </tr>
            <tr>
              <td class="fontWidth">网点名称</td><td>{{orderData.site||"无"}}</td>
              <td class="fontWidth">异常次数</td><td>{{orderData.abnormalHangSize}}</td>
            </tr>
            <tr>
              <td class="fontWidth">工程师姓名</td><td colspan="3">{{orderData.masterName|placeholder}}</td>
            </tr>
            <tr>
              <td class="fontWidth">工程师手机号</td><td colspan="3">{{orderData.masterPhoneNum|placeholder}}</td>
            </tr>
            <tr>
              <td class="fontWidth">工程师类型</td><td colspan="3"><span v-if="!!masterInfos"> {{orderData.masterType|masterType}}</span> <span v-else>无</span></td>
            </tr>
            <tr>
              <td class="fontWidth">工程师工号</td><td colspan="3">{{orderData.masterId||placeholder}}</td>
            </tr>

          </table>
          </div>
        </div>
        <!--scrollbar-->
        <div class="right  ">
          <p>
            <span @click="takeUp(data='工单额外信息')" class="cursor">
              <img :src="jiantou2" alt="">
            </span>
            工单额外信息
          </p>
          <div v-if="telescopic2">
          <table>
            <thead>
              <tr>
                <td>操作人</td><td>备注</td><td>图片</td>
              </tr>
            </thead>
            <tbody class="scrollbar">
              <tr v-for="(item,index) in tableListData.orderExceptionRecords" :key="index">
                <td colspan="3">
                  <p>{{item.operateTime|moment('YYYY-MM-DD HH:mm:ss')}}</p>
                   <p> {{item.operator|placeholder}}</p>
                   <p style="text-align: center">
                     【{{item.reasonOfComplaint|placeholder}}】{{item.remark|placeholder}}
                   </p>
                   <p>
                     <span style="color:blue;cursor:pointer;" v-if="!!item.idPhotos"  @click="openImage(item)"> 查看图片</span>
                     <span v-if="!item.idPhotos">无</span>
                   </p>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <!--工单凭证-->
      <div class="orderProof">
        <p>
            <span @click="takeUp(data='工单凭证信息')" class="cursor">
              <img :src="jiantou4" alt="">
            </span>
          工单凭证信息
        </p>
        <div v-if="telescopic4">
            <div class="photoes" v-for=" (item,index) in isPotos.potosimg" v-if="isPotos.potosimg.length" >
             <div class="top">
               <img :src="item" alt=" " @click="potos">
             </div>
             <div class="bottom">
               <p>拍照时间:<span v-if="isPotos.idPhonesTime[index]">{{isPotos.idPhonesTime[index] == "null"?"无":isPotos.idPhonesTime[index]}}</span>
                 <span v-else>无</span>
               </p>
               <p>
                 拍照地点:<span v-if="isPotos.idPhonesAddress">{{isPotos.idPhonesAddress}}</span><span v-else>无</span>
               </p>
             </div>
            </div>
          <div v-if="!isPotos.potosimg.length" style="text-align: center;margin-bottom: 10px">无</div>
        </div>

      </div>

      <!--配件申领信息-->
      <div class="parseInfo">
        <p>
          <span @click="takeUp(data='配件申领信息')" class="cursor">
              <img :src="jiantouThree" alt="">
            </span>
          配件申领信息
        </p>
        <table v-if="telescopicThree">
          <thead>
          <tr style="background: #F0F0F0;color: #5E6D82">
            <td v-for="(item,index) in parseHeadList" :key="index">{{item}}</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in mountingsApplies">
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.partsBarCode}}
            </td>
            <td>
              {{item.serviceMountings.serviceName}}
            </td>
            <td>
              {{item.serviceMountings.brand}}
            </td>
            <td>
              {{item.serviceMountings.model}}
            </td>
            <td>
              {{item.remark}}
            </td>
            <td>
              {{item.createTime| moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.state|parseState}}
            </td>
            <td>
              <span class="cursor cursorColor" @click="parseDetail(item.id)">详情</span>
            </td>
          </tr>
          <tr v-if="!mountingsApplies.length" style="text-align: center">
            <td  colspan="9">无</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--工单评价-->
      <div class="orderEvaluate">
        <p>
          <span @click="takeUp(data='工单评价')" class="cursor">
              <img :src="jiantou6" alt="">
            </span>
          工单评价
        </p>
        <table v-if="telescopic6">
          <tr style=" color:rgba(94,109,130,1);">
            <td>工程师工号</td><td>工程师名称</td><td>工单评分</td><td>评论标签</td><td>评论内容</td>
          </tr>
          <tr v-for="(item,index) in orderAppraise.tableListData" :key="index" v-if="orderAppraise.tableListData.length">
            <td>{{item.masterId}}</td>
            <td>{{item.masterName}}</td>
            <td><i class="comment_icon" v-for="(items,index) in item.level"></i></td>
            <td>{{item.evaluateLabels}}</td>
            <td>{{item.content}}</td>
          </tr>
          <tr v-if="!orderAppraise.tableListData.length" style="text-align: center">
            <td colspan="5">无</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 查看订单日志 弹框-->
    <div class="alert" v-if="dailyIsShow.isShow">
      <alert-info :dailyIsShow="dailyIsShow">
      </alert-info>
    </div>
    <!--弹框end-->

    <!--//改约时间-->
    <div class="alert" v-if="time.isShow" >
      <changTime :time="time" :quiry="quiry"  style="z-index: 10000;"></changTime>
    </div>
    <!--//改约时间den-->

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

    <!--修改服务-->
      <div class="alert" v-if="isNewservice.isShow">
        <modify-service :isNewservice="isNewservice" :findOne="findOne" @updata="updata"></modify-service>
      </div>

    <!--替换工程师弹框-->
    <div class="alert" v-if="isReplaceAlert.isShow">
      <replace-master :isReplaceAlert="isReplaceAlert" :quiry="findOne"></replace-master>
    </div>
    <!--替换工程师弹框end-->

    <!--图片放大-->
    <div class="alert" v-if="isPotos.isShow">
      <potos-potos :isPotos="isPotos" :quiry="findOne"></potos-potos>
    </div>
    <!--图片放大end-->

    <div class="alert" v-if="mapData.isShow">
      <position-map style="z-index: 999999;width:50%;height:70%;margin:0 auto;transform:translateY(20%);"  :mapData="mapData"></position-map>
    </div>

    <div class="repair_work"  v-if="repair_work_show">
      <div class="repair_work_content">
        <div class="repair_work_text">
          {{repair_work_text}}
        </div>

        <div class="repair_work_button">
          <div @click="repair_work_close">{{repair_work_cancel}}</div>
          <div  @click="repair_work_determine_click">{{repair_work_determine}}</div>
        </div>
      </div>
    </div>
    <carousel-images :data="imagesData" v-if="imagesData.isShow"></carousel-images>
    <!--新增服务产品 start-->
    <addseve-product :isAddProduct="isAddProduct" v-if="isAddProduct.isShow" :quiry="findOne"></addseve-product>

  </div>
</template>
<script>
  import {
    sendOrderFilter,
    cancelOrderFilter,
    changeTimeFilter,
    masterFilter,
    ubsualButton,
    buttonStatus,
    getTableListData,
    selectorAll,
    addProductFilter,
    getThis,
    sizeChange,
    currentChange,
    firsPages,
    lastPages,
    inputData,
    masterOper,
    selectorCheck,
    addDialingMaster
  } from "../../order/js/pagingPages"
  import changTime from "../orderAllCommonts/master_alert/changeTime"
  import alertInfo from "./alertInfo";
  import charge from "./charge.vue";
  import replaceMaster from "./replaceMaster_alert"
  import positionMap from "./position"
  import returncash from "./master_alert/returncash"
  import newreturncash from './master_alert/newReturncash'
  import modifyService from './modifyService.vue'
  import potosPotos from './alertPotos.vue'
  import tableComponent from "@/components/commInfo/tableComponent";
  import carouselImages from '@/components/commInfo/carouselImages';
  import addseveProduct from "@/components/order/orderAllCommonts/addSaverProduct"
  const dd_master_test3=common.masterTest;//请求全部工程师  http://master.test.dingdingkuaixiu.com
  export default {
    //                                 取消工单        添加备注             派单           投诉工单
    props:["orderDetailed","quiry",'drawbackIsShow','addRemarksIsShow','replaceMaster','complainFn',
     //工单报备     罚款工程师             改约时间         新增服务产品addSaverProduct        催单
      'unusual','masterImposeIsShow','changeTimeIsShows',                             'reminder',   'yuYueTimeIsShow','replacedata','disposeOrder'
    ],
    components:{
      alertInfo,
      changTime,
      charge,
      tableComponent,
      replaceMaster,
      positionMap,
      returncash,
      newreturncash,
      modifyService,
      carouselImages,
      potosPotos,
      addseveProduct,
    },
    data(){
      return{
        tabPathList:this.$store.state.tabPathList, //页签列表
        serviceFullName:"", //详情的产品名称
        timeIsIf:true, //预约时间
        count:'',
        isAddProduct:{
          isShow:false,
          data:"",
          title:"新增服务产品"
        },
        mountingsApplies:[], //配件详情
        isAddProduct:{
          isShow:false,
          data:"",
          title:"新增服务产品"
        },
        telescopic:true,
        telescopic1:true,
        telescopic2:true,
        telescopic3:true,
        telescopicThree:true,
        telescopic4:true,
        telescopic5:true,
        telescopic6:true,
        jiantou:"./static/images/topDetl.png",
        jiantou1:"./static/images/topDetl.png",
        jiantou2:"./static/images/topDetl.png",
        jiantou3:"./static/images/topDetl.png",
        jiantouThree:"./static/images/topDetl.png",
        jiantou4:"./static/images/topDetl.png",
        jiantou5:"./static/images/topDetl.png",
        jiantou6:"./static/images/topDetl.png",
        btnList:[
          {name:'工程师已抵达',id:'0'}, {name:'工单已完成',id:'1'}, {name:'工程师位置',id:'2'},{name:'订单日志',id:'3'}
        ],
        operationList:[
          {name:'工单报备',id:'0'},{name:'改派',id:'1'},{name:'新增产品',id:'2'},
          {name:'备注',id:'3'},{name:'投诉工单',id:'4'},{name:'取消工单',id:'5'},
          {name:'催单',id:'6'},{name:'罚款工程师',id:'7'},{name:'工单报备',id:'8'},
        ],

        theadList:['序号','产品名称','服务名称','品牌型号','折后服务费(元)','券后服务费(元)',
          '产品数量','应付总服务费','实收总服务费','上门费(元)','高空费(元)','实收合计','质保截止','操作'],
        tradeTheadList:['交易流水号','交易时间','交易类型','支付方式','交易金额','支付状态'],
        parseHeadList:['配件名称','配件条码','产品全称','品牌','型号','配件描述','申领时间','申领状态','操作'],
        imagesData:{
          title:"查看报备",
          isShow:false,
        },
        flag:'',
        isShowCity:false,
        isChannel:false,
        addressData:{value:"",city:""},
        options:[
          {
            value: '1',
            label: '质保内'
          }, {
            value: '0',
            label: '质保外'
          }, {
            value: '2',
            label: '无'
          }
        ],
        tip:false,
        masterInfos:{},
        isPotos:{
          isShow:false,
          potosimg:[],
          idPhonesTime:[],
          newarr:[],
        },                           //图片放大
        tableListData: {
          orderExceptionRecords:[]
        },                               //表格数据
        repaireorder:{
          orderlist:[
            "序号",
            "时间",
            "返修工单号",
            "返修状态"
          ],
          list:[]
        },
        showPages: 1,
        pic:"",
        currentPageSize: 5,
        total: 0,
        pageTotal: 0,
        //工单额外信息列表
        extralist:[
          "时间",
          "操作人",
          "类型",
          "内容",
          "图片"
        ],
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
        //替换工程师
        isReplaceAlert:{
          isShow:false
        },
        //替换工程师end

        //日志
        dailyIsShow:{
          isShow:false,
          orderId:this.orderDetailed.orderId?this.orderDetailed.orderId:this.$store.state.orderDetailiD.mainOrderId
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
          channelWarranty:"",     //渠道质保
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
            '产品名称',
            '服务名称',
            '产品标签',
            '品牌',
            '型号',
            '上门费（元）',
            '服务单价（元）',
            "折后服务费(元)",
            "券后服务费(元)",
            '产品数量',
            '应付总服务费',
            '实收总服务费',
            '高空费（元）',
            "配件信息",
            '实收合计',
            "质保截止",
            "产品状态",
            '操作',
          ],
          tableListData: [],          //表格数据
        },
        payRecordList:{
          theadsName: [
            '交易流水号',
            '交易时间',
            '交易类型',
            '支付方式',
            '交易金额',
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
            '工程师编号',
            '工程师名称',
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
        isNewservice:{
          isShow:false,
          title:"替换服务产品",
        },
        repair_work_show:false, //2017-12-29 弹出框
        repair_work_text:'', //工程师已抵达文字
        repair_work_id:'', //点击当前的ID
        repair_work_btn:true, //请求成功后就隐藏按钮
        repair_work_request_again:false,  //在工单已完成做回调请求
        repair_work_cancel:"取消",
        repair_work_determine:"确定",
        tabPathList:this.$store.state.tabPathList, //页签列表
      }
    },
    created(){
      console.log(this.replacedata,"sads")
      let a =this.$store.state.orderDetailiD.mainOrderId?this.$store.state.orderDetailiD.mainOrderId:this.orderDetailed.orderId;
      this.orderDetailed.orderId = a;
      this.findOne();
      this.getTableList();
    },
    computed:{

      orderDetailsState(){  //工程师已抵达和工单已完成的按钮是06和07就显示，否则隐藏
          return this.$store.state.orderDetailsState
      },
      editPayedPrice(){
        switch (this.orderData.state)
        {
          case "03":return true;
          case "04":return true;
          case "05":return true;
          case "06":return true;
          case "07":return true;
          case "08":return true;
          case "09":return true;
          case "10":return true;
          case "11":return true;
          case "20":return true;
          case "21":return true;

        }
        return false;
      }
    },
    methods: {

      showorder(id){
        let obj={name: "全部工单", path: "/order/list5"}
        this.$router.push({path: "/order/list5"});
        this.$store.dispatch("orderDetailiD",{mainOrderId:id,isBool:false,title:"全部工单"})
        if(this.tabPathList.length>7){         //新开页签
          this.$store.commit("spliceTabPathList",0)
        }
        let isAddPath=true, o={};
        this.tabPathList.forEach(v=>{
          if(obj.path===v.path){
            isAddPath=false;
          }
        });
        if(isAddPath){
          o.name=obj.name;
          o.path=obj.path;
          this.$store.commit("pushTabPathList",o)
        }
      },
      parseDetail(v){
        let obj={name: "申领列表", path: "/sparePartsManagement/addAccessories"}
        this.$router.push({path: "/sparePartsManagement/addAccessories"});
        this.$store.dispatch("parseDetailiD",{id:v,isBool:false,name:"申领详情"})
        if(this.tabPathList.length>7){         //新开页签
          this.$store.commit("spliceTabPathList",0)
        }
        let isAddPath=true, o={};
        this.tabPathList.forEach(v=>{
          if(obj.path===v.path){
            isAddPath=false;
          }
        });
        if(isAddPath){
          o.name=obj.name;
          o.path=obj.path;
          this.$store.commit("pushTabPathList",o)
        }

      },
      //工单操作菜单显示和隐藏
      addSaverProduvtFilter(state){
        return addProductFilter(state);
      },
      comlainbuttonStatus(state){
        return buttonStatus(state)
      },
      unusualStatusButton(state){
        return ubsualButton(state)
      },
      sendOrder(state){
        return sendOrderFilter(state)
      },
      masterStatus(state){
        return masterFilter(state);
      },
      changeTime(state){
        return changeTimeFilter(state);
      },
      cancelOrder(state){
        return cancelOrderFilter(state)
      },
      //新增服务产品传给父级
//      addSaverProduct(item){
//
//        this.$emit('addProduct',item)
//      },
      //工单详情页面添加服务产品
      addProduct(childData){
        this.isAddProduct.id = childData.id;
        this.isAddProduct.data = childData;
        this.isAddProduct.isShow=true;
      },
      takeUp(data){
        if(data==='产品信息'){
          this.telescopic = !this.telescopic
          if(this.telescopic){
            this.jiantou="./static/images/topDetl.png";
          }else{
            this.jiantou="./static/images/bottomDetl.png";
          }
        }
        if(data==='基本信息'){
          this.telescopic1 = !this.telescopic1;
          if(this.telescopic1){
            this.jiantou1="./static/images/topDetl.png";
          }else{
            this.jiantou1="./static/images/bottomDetl.png";
          }
        }
        if(data==='工单额外信息'){
          this.telescopic2 = !this.telescopic2;
          if(this.telescopic2){
            this.jiantou2="./static/images/topDetl.png";
          }else{
            this.jiantou2="./static/images/bottomDetl.png";
          }
        }
        if(data==='交易信息'){
          this.telescopic3 = !this.telescopic3;
          if(this.telescopic3){
            this.jiantou3="./static/images/topDetl.png";
          }else{
            this.jiantou3="./static/images/bottomDetl.png";
          }
        }
        if(data==='配件申领信息'){
          this.telescopicThree = !this.telescopicThree;
          if(this.telescopicThree){
            this.jiantouThree="./static/images/topDetl.png";
          }else{
            this.jiantouThree="./static/images/bottomDetl.png";
          }
        }
        if(data==='工单凭证信息'){
          this.telescopic4 = !this.telescopic4;
          if(this.telescopic4){
            this.jiantou4="./static/images/topDetl.png";
          }else{
            this.jiantou4="./static/images/bottomDetl.png";
          }
        }
        if(data==='维保信息'){
          this.telescopic5 = !this.telescopic5;
          if(this.telescopic5){
            this.jiantou5="./static/images/topDetl.png";
          }else{
            this.jiantou5="./static/images/bottomDetl.png";
          }
        }
        if(data==='工单评价'){
          this.telescopic6 = !this.telescopic6;
          if(this.telescopic6){
            this.jiantou6="./static/images/topDetl.png";
          }else{
            this.jiantou6="./static/images/bottomDetl.png";
          }
        }
      },

      openImage(e){
        if(!e.idPhotos)return;
        this.imagesData.isShow=!this.imagesData.isShow;
        this.imagesData.images=e.idPhotos.split(",");
      },
      getAddress(){
        this.addressData.city= this.dataObj.serveAddress.substring(3,this.dataObj.serveAddress.indexOf("市"))
        this.$queryFun.getAddress.call(this,this.addressData);
      },
      correct(){
        this.addressData={value:"",city:""};
        this.isShowCity=true;
      },
      leaveto(){
        this.tip=false;
      },
      enterto(){
        this.tip=true;
      },
      potos(){
        this.isPotos.isShow=true;
      },
      updata(){
        this.findOne();
        this.getTableList();
      },
      paramsData(){
        return {
          params:{
            "pageNo":JSON.stringify(this.showPages),
            "pageSize":JSON.stringify(this.currentPageSize)
          }
        }
      },
      handleSizeChange(val) {
        this.currentPageSize=val;
        this.getTableList(this.paramsData());
      },
      handleCurrentChange(val) {
        this.showPages=val;
        this.getTableList(this.paramsData());
      },
      firstPage(){
        if(this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;
        this.getTableList(this.paramsData());
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal;
        this.getTableList(this.paramsData());
      },
      findOne(){
        //let url2=this.$apidomain+"/orderquery/findnewpage?id="+this.orderDetailed.orderId+"&type=1";
        let url2 = this.$apidomain + "/orderquery/findReworkOrderRecord"
        this.$http.post(url2,{'id':this.orderDetailed.orderId}).then(r=>{
          if(r.data.code=="0000"){
            this.repaireorder.list=r.data.result[0]?r.data.result:[];
          }else{
            alert(r.data.error)
          }
        }).catch(e=>{
        });
        let params1={params:{"id":this.orderDetailed.orderId}};
        let url=`${this.$apidomain}/orderquery/findOneDetails`;
        this.$http.get(url,params1).then(r=>{
          let data=r.data;
          console.log(data,"jiushio")
          if(data.code==='0000') {
            if(data.result.mountingsApplies){
              this.mountingsApplies = data.result.mountingsApplies;
            }else{
              this.mountingsApplies = [];
            }
            this.isNewservice.data=data.result.coreMainOrder;
            this.orderData = data.result.coreMainOrder;
            if(data.result.masterInfo)this.masterInfos=data.result.masterInfo;

            let potosobj=data.result.coreMainOrderSubsidiary;  //图片的对象
            let res = data.result.coreMainOrder;
            if(data.result.coreMainOrderSubsidiary){
              if(data.result.coreMainOrderSubsidiary.idPhotos){
                var astr="";
                var arrss="";
                  if(potosobj.idPhotos){
                    astr=potosobj.idPhotos
                    this.isPotos.potosimg=astr.split(",");
                  }else{
                    this.isPotos.potosimg=[];
                  }
                  if(potosobj.idPhonesTime){
                    arrss=potosobj.idPhonesTime;
                    this.isPotos.idPhonesTime=arrss.split(",");
                  }else{
                    this.isPotos.idPhonesTime=[];
                  }

                this.isPotos.idPhonesAddress=potosobj.idPhonesAddress;

                  if(this.isPotos.potosimg.length != 0){
                    let objjj={};
                    for(var i= 0;i<this.isPotos.potosimg.length;i++){
                      objjj.potosimg=this.isPotos.potosimg[i];
                      objjj.idPhonesTime=this.isPotos.idPhonesTime[i];
                    }
                  }else{

                  }
                }

            }
            if(res.state==='03'||res.state==='04'||res.state==='05'||res.state==='06'||res.state==='07'||res.state==='08'||res.state==='21'||res.state==='20'){
              this.isChannel=true;
            }
            this.orderData = data.result.coreMainOrder;
            this.dataObj.channelWarranty = data.result.coreMainOrder.channelWarranty
            this.dataObj.orderNumber = res.id;
            this.dataObj.type = res.type;
            this.dataObj.city = res.linkmanArea;
            this.dataObj.userNumber = res.userPhoneNum;
            this.dataObj.thirdOrderId = res.thirdOrderId;  //渠道商订单号
            this.dataObj.contactsName = res.linkmanName;
            this.dataObj.serveAddress = res.linkmanDetails;
            this.dataObj.linkmanAddress = res.linkmanAddress;
            this.dataObj.linkmanAreaId=res.linkmanAreaId;
            this.dataObj.linkmanArea=res.linkmanArea;
            this.dataObj.makeTime=res.appointmentDatetime?this.$moment(res.appointmentDatetime).format('YYYY-MM-DD HH:mm:ss'):"";
            this.dataObj.tel= res.linkmanPhoneNum;
            this.dataObj.irrigation=res.officialPartnerName;
            if(res.officialPartnerSubsetName&&res.officialPartnerName){
              this.dataObj.officialPartnerSubsetName=res.officialPartnerName+'-'+res.officialPartnerSubsetName;
            }else if(!res.officialPartnerSubsetName&&res.officialPartnerName){
              this.dataObj.officialPartnerSubsetName=res.officialPartnerName;
            }else{
              this.dataObj.officialPartnerSubsetName='';
            }
            this.dataObj.orderSource=res.source;
            this.dataObj.orderSourceId=res.sourceId;
            if(res.state == 21){
              this.timeIsIf = false;
            }else{
              this.timeIsIf = true;
            }
            this.dataObj.orderStatus=res.state;
            this.dataObj.masterId=res.masterId;
            this.dataObj.masterName=res.masterName;
            this.dataObj.masterPhoneNum=res.masterPhoneNum;
            this.dataObj.sum=res.total;
            this.dataObj.cashbackAmount=res.cashbackAmount;
            this.dataObj.refundAmount=res.refundAmount;
            this.productList.tableListData = data.result.coreMainOrderServices;
            this.serviceFullName = data.result.coreMainOrderServices[0];

            this.payRecordList.tableListData = data.result.faPayJournalAccounts;
            this.orderAppraise.tableListData = data.result.coreMainOrderEvaluates;
            this.mapData.masterId = this.dataObj.masterId;
            this.addressData.city=res.linkmanDetails.substring(3,res.linkmanDetails.indexOf("市"));
            let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+res.linkmanAreaId.substring(0,4);        //获取区域
            this.$http.get(url).then(r=>{
              let data=r.data;
              this.dataObj.serveAreas = data.result;
            })
          }
        });

      },
      getTableList(params){
        var _this=this;
        let url2=`${this.$apidomain}/orderquery/findPageExceptionRecord?mainOrderId=`+this.orderDetailed.orderId;
        this.$http.get(url2,params).then(r=>{
          let data=r.data;
          if(data.code=="0000"){
            this.tableListData = data.result;
            this.showPages = data.result.pageNo;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;
          }else{
            alert(data.error)
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
        //this.quiry()
        if(this.orderDetailed.show){
          this.orderDetailed.isShow=true;
        }else{
          this.orderDetailed.show=true;
        }
        this.$emit("styleShowOne",this.orderDetailed.data)
        this.$emit('myevent',this.orderDetailed.show);
        this.$store.dispatch("orderDetailiD",{mainOrderId:"",isBool:true,title:"全部工单"})
      },
      charge(item){
        this.isCharge.item = item;
        this.isCharge.isShow=true;
      },
      returncash(data){
        this.isDrawback.data=data;
        this.isDrawback.isShow=true;
      },
      //新建返修工单
      repair(item,index){
        this.isRepair.data=this.dataObj;
        this.isRepair.data1=item;
        this.isRepair.isShow=true;
      },
      //修改服务产品
      modify(item,index){
        this.isNewservice.index=index;
        this.isNewservice.orderServiceId=item.id;
        this.isNewservice.id=this.orderDetailed.orderId;
        this.isNewservice.isShow=true;
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
        if(this.dataObj.channelWarranty==='质保外'){
          this.dataObj.channelWarranty='0';
        }else if(this.dataObj.channelWarranty==='质保内'){
          this.dataObj.channelWarranty='1';
        }else if(this.dataObj.channelWarranty==='无'){
          this.dataObj.channelWarranty='2';
        }
        let isChangeAreaId = false;
        let o = {};

        o.orderId = this.dataObj.orderNumber;
        o.linkmanName = this.dataObj.contactsName;
        o.linkmanPhoneNum = this.dataObj.tel;
        o.linkmanAddress = this.dataObj.position;
        o.linkmanAreaId = this.dataObj.serveCityId;
        o.linkmanArea = this.dataObj.serveCity;
        o.channelWarranty=this.dataObj.channelWarranty;
        o.payedPrice = Number(this.orderData.payedPrice) || '';
        if(!o.linkmanAddress){
          o.linkmanAddress=this.dataObj.linkmanAddress;
        }
        if(!o.linkmanAreaId){
          o.linkmanAreaId=this.dataObj.linkmanAreaId;
        }else{
          isChangeAreaId = true;
        }
        if(!o.linkmanArea){
          o.linkmanArea=!!this.dataObj.linkmanArea?this.dataObj.linkmanArea.split("-")[1]:"";
        }
        o.remark = this.dataObj.remarks;
        if(!o.linkmanName){
          alert("请填写联系人...");
          return;
        }
        if(!o.linkmanPhoneNum){
          alert("请填写联系手机号...");
          return;
        }
        if(!o.linkmanAreaId&&!Object.keys(this.addressCode(this.addressData.addressComponent).length)){
          alert("请选择服务街道...");
          return;
        }
        if(!o.linkmanAddress){
          alert("请填写地址详情...");
          return;
        }
        if(!o.remark){
          alert("请填写修改备注...");
          return;
        }
        let url=this.$apidomain+"/orderquery/changeInfo";
        if(Object.keys(this.addressCode(this.addressData.addressComponent)).length){
          o.linkmanArea=""
          o.linkmanAreaId=""
        }

        this.$http.post(url,Object.assign(o,this.addressCode(this.addressData.addressComponent))).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            if(isChangeAreaId){
              alert("地址已发生修改，请注意是否需要更换工程师!!!");
            }
            this.findOne();
            this.quiry();
            this.cancelEdit();
          }else if(data.code === '1001'){
            this.$message({
              type:'warning',
              message:'未能有效登陆,请重新登录'
            })
          }else{
            this.$message({
              type:'error',
              message:data.error
            })
          }

        })
      },
      edit(){  //编辑
          this.dataObj.position= this.splieAddress(this.dataObj.serveAddress)
        if(this.dataObj.channelWarranty==='0'){
          this.dataObj.channelWarranty='质保外';
        }else if(this.dataObj.channelWarranty==='1'){
          this.dataObj.channelWarranty='质保内';
        }else{
          this.dataObj.channelWarranty='无';
        }
        this.$store.commit("edit",!this.isEdit());
      },
      addressCode(data=null){
        let cityData={};
        if(data){
          cityData.townCode=typeof data.towncode === "object"?'': data.towncode;
          cityData.adCode = data.adcode;
          cityData.linkmanBuilding = this.addressData.value;
          cityData.cityCode = data.citycode;
        }
        return cityData;
      },
      have_arrived(id){ //工程师已抵达
        this.repair_work_id=id; //当前的ID
        this.repair_work_text='请确定修改工单到工程师已抵达'; //显示内容
        this.repair_work_show=true;
      },
      completed(id){ //工单已完成
        this.repair_work_id=id; //当前的ID
        this.repair_work_text='请确定修改工单到已完成'; //显示内容
        this.repair_work_show=true;
      },
      repair_work_close(){ //弹出框取消
        if(this.repair_work_cancel==='不修改'){
          this.repair_work_cancel='取消';
          this.repair_work_determine='确定';
        }
        this.repair_work_show=false;
      },
      repair_work_determine_click(){      //弹出框确定
        this.repair_work_show=false;
        if(this.repair_work_text=='请确定修改工单到工程师已抵达'){
            this.have_arrived_request();//工程师已抵达的请求
        }
        if(this.repair_work_text=='请确定修改工单到已完成'){
            this.completed_request();//工程师已完成的请求
        }
        if(this.repair_work_determine==='工程师已收现金'){ //是否继续改变已完成
          this.completed_request_again();
        }
        if(this.repair_work_request_again){ //是否继续改变已完成
            this.completed_request_again();
        }
      },
      have_arrived_request(){             //工程师已抵达的请求
        let url=`${this.$apidomain}/order/updateWaitForWorkByKefu`;
//        let url=`http://192.168.20.66:801/order/updateWaitForWorkByKefu`;
        let  _this=this;
        let parmas={
          id:_this.repair_work_id,//state:"06",masterId:'01019980005',masterName:'杨冬仪'
        };
        _this.$http.post(url,parmas).then(data=>{
          if(data.data.code=='0000' && data.data.result.state=='07'){
            _this.$message({
              message: '工程师已抵达修改成功',
              type: 'success'
            });
            _this.repair_work_btn=false;  //隐藏按钮
          }else{
            _this.$message({
              message: '修改失败,请稍后再试',
              type: 'warning'
            });
          }
        });
      },
      completed_request(){ //工程师已完成的请求
        let url=`${this.$apidomain}/order/updateInServiceByKefu`;
        let _this=this;
        let parmas={id:_this.repair_work_id};
        _this.$http.post(url,parmas).then(data=>{
          if(data.data.code=='0000'){
            _this.$message({
              message: '工程师已完成修改成功',
              type: 'success'
            });
            _this.repair_work_btn=false;  //隐藏按钮
          }else if(data.data.code!='0000'){ //如果返回结果没有成功就在调用此接口
            _this.repair_work_cancel='不修改';
            _this.repair_work_determine='工程师已收现金';
            //_this.repair_work_request_again=true;
            _this.repair_work_text=data.data.error;
            _this.repair_work_show=true;  //显示弹出框
          }
        });
      },
      completed_request_again(){
        let url1=`${this.$apidomain}/order/updateInServicesByKefu`,
          _this=this;
        let parmas={id:_this.repair_work_id};
        _this.$http.post(url1,parmas).then(data=>{
          if(data.data.code=='0000'){
            _this.$message({
              message: '工程师已完成修改成功',
              type: 'success'
            });
            _this.repair_work_btn=false;  //隐藏按钮
          }else{
            _this.$message({
              message: '修改失败,请稍后再试',
              type: 'warning'
            });
          }
        });
      },
      isPosition(orderNumber,masterId){//'订单'mainOrderId,'工程师'masterId
          let _this=this;
          let masterId1=masterId;
          this.mapData.isShow=true;
//        let dd_amap_url= `http://master.test.dingdingkuaixiu.com/mastergps/querymastergps?masterId=${masterId1}`;
        let dd_amap_url= `${dd_master_test3}/mastergps/querymastergps?masterId=${masterId1}`;
        $.ajax({
          type: "get",
          url: dd_amap_url,
          data: "",
          success: function(res){
              _this.$message({
                message: '该工程师位置定位中',
                type: 'success'
              });
            let formatted_location='http://restapi.amap.com/v3/geocode/regeo?key=6f7abd3e0d62ca6affa0e32b55138d1a&location='+ res.result.lon +','+ res.result.lat;//经纬度地址
            //工程师经纬度的文字地址
            $.ajax({
              type: "GET",
              url: formatted_location,
              data: '',
              success: function(data){
                var formatted_location1=data.regeocode.formatted_address;
                  sessionStorage.setItem("formatted_location1",JSON.stringify(formatted_location1));
              }
            });
            let linkmanDetails1;
            res.result.order ? linkmanDetails1=res.result.order.linkmanDetails : linkmanDetails1=res.result.masterInfo.city;

            let formatted_address='http://restapi.amap.com/v3/geocode/geo?key=6f7abd3e0d62ca6affa0e32b55138d1a&address=' + linkmanDetails1;//逆向地址
            //用户的文字逆向地理拿经纬度
            $.ajax({
              type: "GET",
              url: formatted_address,
              data: '',
              success: function(data){
                let dd_distance1_str=data.geocodes[0].location;
                sessionStorage.setItem("dd_distance1",JSON.stringify(dd_distance1_str));
              }
            });

            //订单和经纬度存起来
            let lat_lon1=[res.result.lon * 1,res.result.lat * 1],lat_lon1_order;
            if(res.result.order){
              lat_lon1_order=res.result.order;
              sessionStorage.setItem("dd_lon_lat_order",JSON.stringify(lat_lon1_order));
              sessionStorage.setItem("dd_lon_lat",JSON.stringify(lat_lon1));
            }else{
              sessionStorage.setItem("dd_lon_lat_order_masterInfo",JSON.stringify(res.result.masterInfo));
            }
              sessionStorage.setItem("dd_lon_lat",JSON.stringify(lat_lon1));

          },
          beforeSend:function(xhr){},
          error:function(xhr,textStatus){
            _this.$message({
                message: '该工程师'+xhr.error,
                type: 'warning'
            })
          }
        });

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
      },

    },
    mounted() {
      this.refuse()

    },
    destroyed(){
      this.$store.commit("edit",false);
    },
    watch:{
      "$store.state.orderDetailiD.mainOrderId":function(newl,oldl){ //监听配件详情配件列表传过来的id
        this.orderDetailed.orderId = newl;
        this.findOne();
        this.getTableList();
      },
      "dataObj":{
        handler:function(a,b) {
        },
        deep:true,
      }
    },
  }
</script>
<style scoped lang="scss">

  .repair_work{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color:rgba(41,41,41,.8);

    .repair_work_content{
      border: 1px solid #fff;
      width: 400px;
      height: 210px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -100px;
      margin-left: -200px;
      background-color:#fff;
      border-radius: .2rem;

      .repair_work_text{
        width: 400px;
        max-height: 210px;
        overflow: auto;
        font-size: 18px;
        padding:8% 8%;
      }

      .repair_work_button{
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;

        >div{
            width: 50%;
         }
         >div:nth-of-type(1){
            border-radius:0 0 0 .2rem;
            background-color:rgba(41,41,41,.8);
            /*color: #1387F4;*/
            color: #fff;
          }
         >div:nth-of-type(2){
            border-radius:0 0 .2rem 0 ;
            background-color:#1387F4;
            color: #fff;
          }
      }
    }
  }

  #lists{
    >.imgs{
      float: left;
      margin-top: 20px;
      >span{
        float: left;
        width:200px;
        height:120px;
        cursor: pointer;
        display: inline-block;
        >img{
          max-width: 100%;
          max-height: 100%;
        }
      }

      .divbox{
        float: left;
        width:400px;
        margin-left: 10px;
        padding-top:30px;
        box-sizing: border-box;
        >p{
          width:400px;
        }
      }
    }
  }
  .el-select-dropdown, .el-cascader-menus, .el-dialog__wrapper{
    z-index: 99999 !important;
  }
  .content ul > li .el-cascader__label{
    line-height: 40px !important;
  }

</style>
<style scoped lang="scss">
  [v-cloak]{
    display: none;
  }
  #app{
    width:100%;
    height:100%;
    .bottom{
      box-shadow:0px 2px 4px 0px rgba(185,185,185,0.5);
      border-top: none;
    }
    .headerBtn{

      .close{
        position:fixed;
        display: inline-block;
        right:3%;
        cursor: pointer;
        font-size: 13px;
        top:110px;
        color: #D0021B;
        background: #FFFFFF;
        span{
          transform: translateY(2px);
          display: inline-block;
          width: 16px;
          height: 16px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      width:100%;
      height: 96px;
      position: fixed;
      background: #FFFFFF;
      z-index: 9999;
      margin-top: -140px;
      //margin-left:29px;
      //padding-left:29px;
      padding-top:10px;
      //background: red;
      p:hover{
        background:rgba(9,148,255,1);
        border: none;
        color:rgba(255,255,255,1);
      }
      >div:nth-of-type(1){
        height: 40px;
      }
      >div{
        margin-left:29px;
        >p{
          display: inline-block;
          margin-right: 6px;
          width:86px;
          height:30px;
          font-size: 13px;
          font-family:PingFangSC-Regular;
          border-radius:4px;
          text-align: center;
          line-height: 30px;
          color:rgba(94,109,130,1);
          background:rgba(255,255,255,1);
          border:1px solid rgba(192,204,218,1);
        }
      }
    }
    >.tableList{
      //overflow-y:auto;
      margin-top: 125px;
      width:100%;
      min-height: 200px;
      //background:#F4F4F4;
      table{
        width: 100%;
        border-collapse: collapse;
        border:1px #C0CCDA solid;
        tr,td{
          margin: 0;padding: 0;
        }
        td{
          border-right: 1px #C0CCDA solid ;
        }
      }
      p{
        background:rgba(224,230,237,1);
        height:36px;
        width: 100%;
        line-height: 36px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        margin-bottom: 11px;
        span{
          margin-left: 20px;
          width: 13px;
          height: 8px;
          display: inline-block;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      >.productInfo{

        .tableProduct{
          border-bottom: none;
          margin-bottom: 22px;
          td,tr{margin: 0;padding: 0;}
          tr{
            border: none;
            border-bottom: 1px #C0CCDA solid;
            height: 56px;
            color:rgba(51,51,51,1);
            td:nth-of-type(1){width:3%;}
            td:nth-of-type(2){width:12%;}
            td:nth-of-type(3),td:nth-of-type(7),td:nth-of-type(10),td:nth-of-type(11),td:nth-of-type(12){width:4.8%;}
            td:nth-of-type(4), td:nth-of-type(5),td:nth-of-type(6),td:nth-of-type(8),td:nth-of-type(9){width:7%;}
            td:nth-of-type(13){ width:12%; }
          }
          thead{
            tr{
              border: none;
              background: #F0F0F0;
              height: 60px;
              font-size: 13px;
              color:rgba(94,109,130,1);
              border-bottom: 1px #C0CCDA solid;
            }
          }
        }
        .otherTable{
          border-top: none;
        }
        .lastTable{
          tr{

          }
        }
        .tablePrice{
          border-top: none;
          tr{
            background: #FFFDE9;
            height: 30px;
            border-top: 1px #C0CCDA solid;
            td{
              text-align: left!important;
              text-indent: 5px;
              color:rgba(94,109,130,1);
              border-right: 1px #C0CCDA solid ;
              position: relative;
              >span{
                color: #393939;
                position: absolute;
                left:75%;
              }
            }
            td:last-of-type{
              color: #393939;
            }

          }
          tr:nth-of-type(1){
            border: none;
          }
          tr:nth-of-type(2){
            background: #FFEFD5;
          }
        }
      }
      >.essentialInfo{
        margin-top:27px;
        width:100%;
        overflow: hidden;
        //min-height: 200px;
       // background:#F4F4F4;
        >.left{
          width:65%;
          //min-height: 200px;
          float: left;
          margin-right: 1%;
          >div>div{
            width: 100%;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(35,161,254,1);
            span{
              display: inline-block;
              height: 35px;
              transform: translateX(50px);
              line-height: 35px;
              margin-left: 80%;
            }
            span:hover{
              cursor: pointer;
            }
          }
          table{
            tr{
              height: 30px;
              border-top: 1px #C0CCDA solid;
              .fontWidth{
                width: 96px;
                text-align: center;
                text-indent: 0px;
                font-size:13px;
                font-family:PingFangSC-Regular;
                color:rgba(94,109,130,1);
                background:rgba(240,240,240,1);
              }
              td{
                text-align: left;
                text-indent: 10px;
                font-size:13px;
                font-family:PingFangSC-Regular;
                color:rgba(51,51,51,1);
              }
            }

          }

        }
        >.right{
          width: 34%;
          float: left;
          padding-top:0;
          p{
           // margin: 0;
            padding: 0;
          }
          >div{
            margin-top: 9px;
            height: 490px;
          }
          table{
            border: none;
            tr{
              display: table;
              width: 100%;
              table-layout: fixed;
              margin: 0;
              padding: 0;
              td{
                border: none;
              }
            }
            thead{
              tr:nth-of-type(1){
                width: 100%;
                height: 44px;
                background:rgba(240,240,240,1);
                border-top:1px solid rgba(192,204,218,1);
                //border-bottom:1px solid rgba(192,204,218,1);
                td{
                  border: 1px #C0CCDA solid;
                }
                td:nth-of-type(1){
                  width: 21%;
                }
                td:nth-of-type(2){
                  width: 58%;
                }
                td:nth-of-type(3){
                  width: 21%;
                }
              }
            }
            tbody{
              border:1px #C0CCDA solid;
              overflow-y:auto;
              width: 100%;
              display:block;
              height: 405px;
              td{
                >p{
                  background: none;
                }
                >p:nth-of-type(1){
                  color:rgba(151,151,151,1);
                  height: 20px;
                  line-height: 20px;
                  margin: 6px 0 10px 0;
                  background: #F0F0F0;
                }
                >p:nth-of-type(2){
                  width: 21%;
                }
                >p:nth-of-type(3){
                  width: 58%;
                  text-align: left;
                  line-height: 19px;
                  //overflow: auto;
                  height: auto;
                }
                >p:nth-of-type(4){
                  width: 21%;
                  text-align: center;
                  >span{
                    width: 100%;
                    display: inline;
                  }
                }
              }
              tr{
                margin-top: 9px;
                min-height: auto;
              }
            }
          }
        }

      }
      >.tradeInfo{
        margin-bottom: 30px;
        clear: both;
        >p{
          margin-top: 31px;
        }
       // background: red;
        >table{
          thead{
            tr{
              background: #F0F0F0;
              color: #5E6D82;
            }
          }
          td,tr{
            margin: 0;padding:0;
          }
          width: 100%;
          border-collapse: collapse;
          border:1px #C0CCDA solid;
          tr{
            height: 30px;
            border-top: 1px #C0CCDA solid;
            td{
              border-right: 1px #C0CCDA solid;
            }
          }
          tr:nth-of-type(1){
            height: 44px;
            line-height: 44px;
            td:nth-of-type(1){
              width: 300px;
            }
          }

        }
      }
      >.parseInfo{
        margin-bottom: 30px;
        clear: both;
        >p{
          margin-top: 0px;
        }
        >table{
          td,tr{
            margin: 0;padding:0;
          }
          width: 100%;
          border-collapse: collapse;
          border:1px #C0CCDA solid;
          tr{
            height: 30px;
            border-top: 1px #C0CCDA solid;
            td{
              border-right: 1px #C0CCDA solid;
            }
          }
          tr:nth-of-type(1){
            height: 44px;
            line-height: 44px;
            td:nth-of-type(1){
              width: 300px;
            }
          }

        }
      }
      >.orderProof{
         margin-top: 26px;
        .photoes{
          float: left;
          margin-right: 43px;
          margin-bottom: 47px;
          width:206px;
          min-height:113px;
          >.top{
            width: 100%;
            height: 100%;
            img{
              width: 100%;
              height:113px;
            }
          }
          >.bottom{
            background:red;
            width: 100%;
            //height: 100%;
            p{
              margin: 0;
              height: 19px;
              margin-bottom: 20px;
              line-height: 19px;
              background: none;
              span{
                width: 100%;
                display: inline;
              }
            }
          }
        }

      }
      >.maintenanceInfo,>.orderEvaluate{
        margin-bottom: 35px;
        table{
          tr{
            height: 30px;
            border-bottom:1px #C0CCDA solid ;
          }
         tr:nth-of-type(1){
           background: #F0F0F0;
           height: 44px;
         }
        }
      }
      >.maintenanceInfo{
        table{
          tr{
            td:nth-of-type(1){width:260px;}
            td:nth-of-type(2){width:180px;}
            td:nth-of-type(3){width:300px;}
          }
        }
      }
      >.orderEvaluate{
        table{
          tr{
            td:nth-of-type(1){width:160px;}
            td:nth-of-type(2){width:100px;}
            td:nth-of-type(3){width:180px;}
            td:nth-of-type(4){width:300px;}
          }
        }
      }
    }






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
          >li.left_info_edit{
            display: inline-block;
             width:25%;
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
      bottom:15%;
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
    top:-24px;
    background-size:100% 100%;
    background-origin: content-box;
    width:16px;
    height: 16px;
    cursor: pointer;
    right:1%;
    font-size: 35px;
  }
  .statistics{
    box-sizing: border-box;
    margin-right: 50px;
    display: flex;
    justify-content:flex-end;
    >li{
      width: 10rem;
      text-align: center;
      line-height:2em;
      /*padding-right:20px;*/
      border: 1px solid #E5E9F2;
      border-left: none;
      border-top:none;
      flex-wrap: nowrap;
    }
    >li:first-child{
      border-left: 1px solid #E5E9F2;
    }
    >li:last-of-type{
      font-weight: 600;
    }
  }
  .comment_icon{
    background:url(../../../../static/images/Group.png) center center no-repeat;
    background-size:100% 100%;
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .extra th,td{
    text-align: center;
    padding:5px 10px;
  }
  .el-pagination{
    float:right;
    padding-top:12px;
  }
  .home{
    float:right;
    padding-top: 17px;
  }
  .last_page{
    color:blue;
    margin-left:10px;
  }
  .cursorColor{
    color: #23A1FE;
  }
  .active{
    background: #F0F0F0;
    //color: #979797;
    color: #979797 !important;
  }
  .onlyClass{
    //background: blue;
    border: none !important;
    height: 20px !important;
    td{
      border: none !important;
    text-align: left;
    text-indent: 10px;
     // margin: 10px 0;
        position: relative;
        //line-height: 30px;
        //height: 30px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        margin-top: 3px;
        span:nth-of-type(2){
           position: absolute;
           left:310px;
    }
    }
  }
  .firstClass{
    td{
      padding-top: 10px !important;
    }
  }
  .lastClass{
    td{
      padding-bottom: 11px !important;
      border-bottom: 1px #C0CCDA solid !important;
    }
  }
</style>
<style scoped lang="scss">
  .orderLine{
    color: #23A1FE;
    cursor: pointer;
    text-decoration:underline;
  }
  .remaktip{
    display: inline-block;
    width:14px;
    height: 14px;
    background: url("../../../../static/images/detail.png") no-repeat;
    font-style: normal;
    position: relative;
  }
  .tdtd{
    position: relative;
    max-width:230px;
  }
  .trigont{
    width: 280px;
    height: auto;
    position: absolute;
    left:100%;
    margin-left: -40px;
    margin-top:-60px;
    bottom:160%;
    background: url("../../../../static/images/background.png")no-repeat center center;
    background-size: cover;
    color: #fff;
    text-align: left;
    padding:0 5px;
    word-wrap: break-word;
    z-index: 999;
    font-size: 12px;
    border-radius: 4px;
    >i{
      display: block;
      width: 11px;
      height: 6px;
      background: url("../../../../static/images/tip.png") no-repeat center center;
      position: absolute;
      /*background: red;*/
      left:27px;
      bottom: -6px;
      z-index: 999;
    }
  }
  #addressText{
    color:rgb(234, 84, 19);
  }
</style>



