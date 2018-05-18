<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{dataObj.title}}</h3>
      <div class="content">
        <div class="left_info">
          <p class="title">{{orderDetailed.title}}</p>
          <p class="position_icon" @click="isPosition(dataObj.orderNumber,dataObj.masterId)" v-show="this.mapData.masterId">
            <i></i>
            <el-button type="primary">
              查看师傅位置
          </el-button>
          </p>
          <ul>
            <li class="left_info_edit">
              <el-button type="primary" @click="edit" v-if="!isEdit()">
                {{btnName}}
              </el-button>
              <el-button type="primary" @click="enter()" v-if="isEdit()">
                保存
              </el-button>
              <!--<el-button type="primary" @click="cancelEdit" v-if="isEdit()">-->
                <!--取消-->
              <!--</el-button>-->
            </li>
            <!--<li class="left_info_edit"  v-if="orderDetailsState=='06'&& repair_work_btn">-->
            <li class="left_info_edit"  v-if="(dataObj.orderStatus=='05' || dataObj.orderStatus=='06' || dataObj.orderStatus=='08') && repair_work_btn">
              <el-button type="primary" @click="have_arrived(dataObj.orderNumber)">
                师傅已抵达
              </el-button>
            </li>
            <li class="left_info_edit"   v-if="(dataObj.orderStatus=='04' || dataObj.orderStatus=='05' || dataObj.orderStatus=='06'||
             dataObj.orderStatus=='07'|| dataObj.orderStatus=='08'|| dataObj.orderStatus=='10'|| dataObj.orderStatus=='11')  && repair_work_btn">
              <el-button type="primary" @click="completed(dataObj.orderNumber)">
                工单已完成
              </el-button>
            </li>
            <li>工单号：{{dataObj.orderNumber ||placeholder}}</li>
            <li>

            </li>
            <li>工单类型：{{dataObj.type|orderType}}</li>
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
            <li>联系人手机号:
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
            <li>
              师傅工号:{{dataObj.masterId||placeholder}} 师傅姓名:{{dataObj.masterName|placeholder}} 师傅手机号:{{dataObj.masterPhoneNum|placeholder}}
              <el-button  type="primary" @click="expediteOrder" v-if="isEdit()&&dataObj.masterId">
                重新派单
              </el-button>
            </li>
            <li>工单渠道:{{dataObj.officialPartnerSubsetName|placeholder}}</li>
            <li>工单来源:{{dataObj.orderSource | orderSourceShow|placeholder}}</li>
            <li>状态:{{dataObj.orderStatus | orderStateShow|placeholder}}</li>
            <li>网点名称:{{orderData.site||"无"}}</li>
            <li>完成时间:{{orderData.serviceTimeComplete|moment('YYYY-MM-DD HH:mm:ss')}}</li>
            <!--四期新增字段 start -->
              <li>
                  准时偏差值:{{orderData.deviation}}
              </li>
              <li>
                  工单耗时:{{orderData.completeTimeLimit}}
              </li>
              <li>
                  服务时长:{{orderData.workTimeLimit}}
              </li>
               <li>
                  返修次数:{{orderData.reworkSize}}
              </li>
              <li>
                  异常次数:{{orderData.abnormalHangSize}}
              </li>
              <li>
                  挂起次数:{{orderData.hangSize}}
              </li>
              <li>
                  下单时间:{{orderData.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
              </li>
            <!--四期新增字段 end -->
            <li >师傅类型: <span v-if="!!masterInfos"> {{masterInfos.type|masterType}}</span> <span v-else>无</span></li>
            <li v-if="2==dataObj.orderSource">推荐人手机号:{{dataObj.orderSourceId|placeholder}}</li>
            <li>
              渠道质保:{{orderData.channelWarranty|qudaozhibao}}
            </li>
            <li>
              紧急度:{{orderData.emergencyDegree|jinjidu}}
            </li>
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
              <!--<ul v-for="(item,index) in orderExtraInfo" class="orderExtraInfo">-->
              <!--<li> 时间：{{item.operateTime|moment('YYYY-MM-DD HH:mm:ss')}}</li>-->
              <!--<li> 操作人：{{item.operator|placeholder}}</li>-->
              <!--<li> 类型：{{item.reasonOfComplaint|placeholder}}</li>-->
              <!--<li> 内容：{{item.remark|placeholder}}</li>-->
              <!--</ul>-->
              <table class="extra" cellSpacing="0px" cellpadding="0" v-if="tableListData.orderExceptionRecords.length">
                <thead>
                <tr>
                  <th v-for="(item,index) in extralist" :key="index">{{item}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tableListData.orderExceptionRecords">
                  <td>
                    {{item.operateTime|moment('YYYY-MM-DD HH:mm:ss')}}
                  </td>
                  <td>
                    {{item.operator|placeholder}}
                  </td>
                  <td>
                    {{item.reasonOfComplaint|placeholder}}
                  </td>
                  <td>
                    {{item.remark|placeholder}}
                  </td>
                </tr>
                </tbody>
              </table>
            </li>
          </ul>
          <!--分页组件-->
          <div class="paging" v-if="tableListData.orderExceptionRecords.length">
            <p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes='[5,10,15,20]'
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="showPages"
              :total="total"
              :page-size="currentPageSize"
              :page-count="pageTotal"
            >
            </el-pagination>
            <p class="home last_page" @click="lasePage">尾页</p>
            <p class="home" @click="firstPage">首页</p>
          </div>
          <!--分页组件结束-->
        </div>
      </div>
      <div style="padding-bottom:0px" class="consume_info" >
        <p class="title" >产品信息</p>
        <ul>
          <!--<li style="float:right">-->
            <!--<ul class="statistics">-->
              <!--<li>上门费：{{productList.tableListData|visitFeeShow}}</li>-->
              <!--<li>服务费：{{productList.tableListData|serviceFeeShow2}}</li>-->
              <!--<li>配件费：{{productList.tableListData|price3Show2}}</li>-->
              <!--<li>高空费：{{productList.tableListData|price4Show2}}</li>-->
              <!--<li>优惠金额：{{productList.tableListData|discountsFeeShow2}}</li>-->
              <!--&lt;!&ndash;<li>返现：{{orderData.cashbackAmount}}</li>&ndash;&gt;-->
              <!--<li>已付款：{{orderData.paidAmount?orderData.paidAmount:0}}</li>-->
              <!--<li>应付款：{{productList.tableListData|totalFeeShow2(dataObj.refundAmount)}}</li>-->
              <!--&lt;!&ndash;<li>应付款：{{productList.tableListData|totalFeeShow2}}</li>&ndash;&gt;-->
              <!--<li v-show="dataObj.cashbackAmount&&0!=dataObj.cashbackAmount">工单返现：{{dataObj.cashbackAmount}}</li>-->
              <!--<li v-show="dataObj.refundAmount&&0!=dataObj.refundAmount">工单退款：{{dataObj.refundAmount}}</li>-->
            <!--</ul>-->
          <!--</li>-->
          <li class="table" >
            <table cellSpacing="0px" cellpadding="0">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in productList.theadsName" :key="index">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in productList.tableListData">
                <td class="tdtd" >
                  {{item.serviceFullName}}
                  <i class="remaktip" v-if="item.remarks" @mouseenter="enterto" @mouseleave="leaveto">
                    <div class="trigont" v-if="tip"><i></i>师傅备注:{{item.remarks}}</div>
                  </i>
                </td>

                <td>
                  {{item.serviceName}}
                </td>
                <td>
                  {{item.serviceTags|isnull}}
                </td>
                <!--'品牌',-->
                <td>{{item.serviceBrand?item.serviceBrand:"无"}}</td>
                <!--'型号',-->
                <td>{{item.serviceModel?item.serviceModel:"无"}}</td>
                <td>
                  {{item.price1|placeholder_one}}
                </td>
                <td>
                  {{item.price2Original|placeholder_one}}
                </td>
                <!--<td>-->
                  <!--{{item.price3|placeholder}}-->
                <!--</td>-->
                <!--<td>-->
                  <!--{{item.cashbackAmount|placeholder}}-->
                <!--</td>-->
                <td>
                  {{item.price2Sale|placeholder_one}}
                </td>
                <td>
                  {{item.price2Voucher|placeholder_one}}
                </td>
                <td>
                  {{item.serviceSize|placeholder_one}}
                </td>
                <td>
                  {{item.costPayableTotal|placeholder_one}}
                </td>
                <td>
                  {{item.totalServiceChargeTotal|placeholder_one}}
                </td>
                <td>
                  {{item.price4|placeholder_one}}
                </td>
                <td>
                  <div v-for="ite in item.mountings">{{ite.serviceMountingsName}}: {{ite.serviceMountingsPrice}}元 X{{ite.serviceMountingsCount}}</div>
                </td>
                <td>
                  {{item.realCollectionTotal|placeholder_one}}
                </td>
                <td>
                  {{item.warrantyDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td style="color: red">
                  {{item.status==1?"失效":" "}}
                </td>
                <!--<td>-->
                <!--{{item|getServiceTotel}}-->
                <!--</td>-->
                <td>
                  <!--暂时隐藏-->
                  <!--v-if="$queryFun.isRepairButton(dataObj.orderStatus)&&item.status!=1"       之前的判断条件-->
                  <span
                    v-if="item.warrantyDatetime"
                    class="details_icon"><el-button type="text" @click="repair(item,index)"><i></i>返修</el-button></span>
                  <span
                    v-if="$queryFun.isReturnCurrentButton(dataObj.orderStatus,item.isSecondPayment)&&item.status!=1"
                    class="details_icon"><el-button type="text" @click="returncash(item)"><i></i>返现</el-button></span>
                  <!--暂时隐藏-->
                  <span
                    v-if="$queryFun.isChangeSaverButton(dataObj.orderStatus)&&item.status!=1"
                    class="details_icon"><el-button type="text" @click="modify(item,index)"><i></i>改服务</el-button></span>

                  <span
                    v-if="$queryFun.isPreferentialButton(dataObj.orderStatus,item.isSecondPayment)&&item.status!=1"
                    class="details_icon"><el-button type="text" @click="charge(item,index)"><i></i>优惠</el-button></span>
                </td>
              </tr>
              </tbody>
            </table>
          </li>
          <li style="float: right;">
            <ul class="statistics">
              <li>上门费小计: {{orderData.price1Subtotal}}</li>
              <li>服务费小计: {{orderData.price2Subtotal}}</li>
              <li>高空费小计: {{orderData.price4Subtotal}}</li>
              <li>配件费小计: {{orderData.price3Subtotal}}</li>
              <li>工单合计: {{orderData.orderTotal}}</li>
            </ul>
            <ul class="statistics">
              <li></li>
              <li>折扣金额: {{orderData.amountDiscount}}</li>
              <li>积分抵扣: {{orderData.pointsDiscount}}</li>
              <li>用券抵扣: {{orderData.voucherDiscount}}</li>
              <li>优惠小计: {{orderData.subtotalTotal}}</li>
            </ul>
            <ul class="statistics">
              <li>已退款: {{orderData.refundAmount}}</li>
              <li>已返现: {{orderData.cashbackAmount}}</li>
              <li>实际已收款: {{orderData.paidAmount}}</li>
              <li>待收款: {{orderData.waitAmount}}</li>
              <li>应付合计: {{orderData.handleTotal}}</li>
            </ul>
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
                  {{item.id}}
                </td>
                <td>
                  {{item.payTime|moment('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td>
                  {{item.payType|payTypeShow}}
                </td>
                <td>
                  {{item.paySource|paySourceShow}}
                </td>
                <!--<td>-->
                <!--<tr v-for="(item2,index2) in item.coreMainOrderFees" v-show="'Pay'==item.payType">{{item2.type|feeTypeShow}}:{{item2.operationFee}}(元)</tr>-->
                <!--<tr v-show="'Refund'==item.payType">退款金额:{{item.refundFee}}(元)</tr>-->
                <!--</td>-->
                <!--<td>-->
                <!--{{item.reducedPrice}}-->
                <!--</td>-->
                <td>
                  <span v-if="'Pay'==item.payType">{{item.payAmount}}</span>
                  <span v-if="'Refund'==item.payType">{{item.refundFee}}</span>
                </td>
                <td>
                  <span v-if="'Pay'==item.payType">{{item.payState|payStateShow}}</span>
                  <span v-if="'Refund'==item.payType">{{item.payState|refundStateShow}}</span>
                </td>
              </tr>
              <tr v-if="!payRecordList.tableListData.length" style="text-align: center">
                <td style="border:none;position:absolute;left:0;transform:translateX(-0%); width:100%">无</td>
              </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
      <div style="padding-bottom:0px;z-index: 999" class="consume_info" >
        <p class="title" style="margin-bottom:20px" >工单凭证信息</p>
          <ul>
            <li id="lists">
              <div class="imgs" v-for=" (item,index) in isPotos.potosimg" v-if="isPotos.potosimg.length">
                <img :src="item" alt=" " @click="potos">
                <div class="divbox">
                  <p>拍照时间:
                    <span v-if="isPotos.idPhonesTime[index]">{{isPotos.idPhonesTime[index] == "null" ? "无" : isPotos.idPhonesTime[index]}}</span>
                    <span v-else>无</span>
                  </p>
                  <p>拍照地点:
                    <span v-if="isPotos.idPhonesAddress">{{isPotos.idPhonesAddress}}</span>
                    <span v-else>无</span>
                  </p>
                </div>
              </div>
              <div v-if="!isPotos.potosimg.length" style="text-align: center">无</div>
            </li>
          </ul>
      </div>
      <div style="padding-bottom:0px" class="consume_info">
        <p class="title" style="margin-bottom:20px" >维保信息</p>
        <ul>
          <li class="table" style="width:50%">
            <table cellSpacing="0px" cellpadding="0">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in repaireorder.orderlist" :key="index">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in repaireorder.list" v-if="repaireorder.list.length">
                <td v-show="false"></td>
                <td>
                  {{index+1}}
                </td>
                <td>
                  {{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td>
                  {{item.mainOrderId}}
                </td>
                <td>
                  {{item.state|BackOrderStatus}}
                </td>
              </tr>
              <tr v-if="!repaireorder.list.length" style="text-align: center">
                <td style="border:none;position:absolute;left:0;transform:translateX(-25%); width:100%">无</td>
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
                <td style="border:none;position:absolute;left:0;transform:translateX(-25%); width:100%">无</td>
              </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </div>

    <!-- 查看订单日志 弹框-->
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

    <!--修改服务-->
      <div class="alert" v-if="isNewservice.isShow">
        <modify-service :isNewservice="isNewservice" :findOne="findOne" @updata="updata"></modify-service>
      </div>

    <!--替换师傅弹框-->
    <div class="alert" v-if="isReplaceAlert.isShow">
      <replace-master :isReplaceAlert="isReplaceAlert" :quiry="findOne"></replace-master>
    </div>
    <!--替换师傅弹框end-->

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
  import modifyService from './modifyService.vue'
  import potosPotos from './alertPotos.vue'

  const dd_master_test3=common.masterTest;//请求全部师傅  http://master.test.dingdingkuaixiu.com
  export default {
    props:["orderDetailed","quiry"],
    components:{
      alertInfo,
      changTime,
      charge,
      replaceMaster,
      positionMap,
      returncash,
      newreturncash,
      modifyService,
      potosPotos
    },
    data(){
      return{
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
          "内容"
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
        //替换师傅
        isReplaceAlert:{
          isShow:false
        },
        //替换师傅end

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
            '服务名称',
            '产品标签',
            '品牌',
            '型号',
            '上门费（元）',
            '服务单价（元）',
//            '配件费（元）',
//            '返现金额（元）',
//            '合计（元）',
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
//            '支付费用详情',
//            '优惠金额',
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
        isNewservice:{
          isShow:false,
          title:"替换服务产品",
        },
        repair_work_show:false, //2017-12-29 弹出框
        repair_work_text:'', //师傅已抵达文字
        repair_work_id:'', //点击当前的ID
        repair_work_btn:true, //请求成功后就隐藏按钮
        repair_work_request_again:false,  //在工单已完成做回调请求
        repair_work_cancel:"取消",
        repair_work_determine:"确定",

      }
    },
    created(){
      console.log(this.orderDetailed)
      this.findOne();
      this.getTableList();
    },
    computed:{
      orderDetailsState(){  //师傅已抵达和工单已完成的按钮是06和07就显示，否则隐藏
          return this.$store.state.orderDetailsState
      }
    },
    methods: {
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
        let url2=this.$apidomain+"/orderquery/findnewpage?id="+this.orderDetailed.orderId+"&type=1";
        this.$http.get(url2).then(r=>{
          if(r.data.code=="0000"){

            this.repaireorder.list=r.data.result.orders;
          }else{
            alert(r.data.error)
          }
        }).catch(e=>{

        });

        let params1={params:{"id":this.orderDetailed.orderId}};
        let url=`${this.$apidomain}/orderquery/findOneDetails`;
        this.$http.get(url,params1).then(r=>{
          let data=r.data;
          if(data.code==='0000') {
//            this.isNewservice.data1=data.result.coreMainOrderServices;
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

            this.orderData = data.result.coreMainOrder;
            this.dataObj.orderNumber = res.id;
            this.dataObj.type = res.type;
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
            this.dataObj.officialPartnerSubsetName=res.officialPartnerSubsetName?res.officialPartnerSubsetName:res.officialPartnerName;
            this.dataObj.orderSource=res.source;
            this.dataObj.orderSourceId=res.sourceId;
            this.dataObj.orderStatus=res.state;
            this.dataObj.masterId=res.masterId;
            this.dataObj.masterName=res.masterName;
            this.dataObj.masterPhoneNum=res.masterPhoneNum;
            this.dataObj.sum=res.total;
            this.dataObj.cashbackAmount=res.cashbackAmount;
            this.dataObj.refundAmount=res.refundAmount;
            this.productList.tableListData = data.result.coreMainOrderServices;
            this.payRecordList.tableListData = data.result.faPayJournalAccounts;
            this.orderAppraise.tableListData = data.result.coreMainOrderEvaluates;
            this.mapData.masterId = this.dataObj.masterId;
            let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+res.linkmanAreaId.substring(0,4);//获取区域
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
        this.quiry()
        if(this.orderDetailed.show){
          this.orderDetailed.isShow=true;
        }else{
          this.orderDetailed.show=true;
        }

        this.$emit('myevent',this.orderDetailed.show);
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
//        this.isNewservice.data=this.orderDetailed.data;
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
      have_arrived(id){ //师傅已抵达
        this.repair_work_id=id; //当前的ID
        this.repair_work_text='请确定修改工单到师傅已抵达'; //显示内容
        this.repair_work_show=true;
      },
      completed(id){ //工单已完成
        this.repair_work_id=id; //当前的ID
        this.repair_work_text='请确定修改工单到已完成'; //显示内容
        this.repair_work_show=true;
      },
      repair_work_close(){ //弹出框取消
        this.repair_work_show=false;
      },
      repair_work_determine_click(){ //弹出框确定
        this.repair_work_show=false;
        if(this.repair_work_text=='请确定修改工单到师傅已抵达'){
            this.have_arrived_request();//师傅已抵达的请求
        }
        if(this.repair_work_text=='请确定修改工单到已完成'){
            this.completed_request();//师傅已完成的请求
        }
        if(this.repair_work_request_again){ //是否继续改变已完成
            this.completed_request_again();
        }
      },
      have_arrived_request(){ //师傅已抵达的请求
        let url=`${this.$apidomain}/order/updateWaitForWorkByKefu`;
//        let url=`http://192.168.20.66:801/order/updateWaitForWorkByKefu`;
        let  _this=this;
        let parmas={
          id:_this.repair_work_id,//state:"06",masterId:'01019980005',masterName:'杨冬仪'
        };
        _this.$http.post(url,parmas).then(data=>{
          if(data.data.code=='0000' && data.data.result.state=='07'){
            _this.$message({
              message: '师傅已抵达修改成功',
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
      completed_request(){ //师傅已完成的请求
        let url=`${this.$apidomain}/order/updateInServiceByKefu`;
        let _this=this;
        let parmas={id:_this.repair_work_id};
        _this.$http.post(url,parmas).then(data=>{
          if(data.data.code=='0000'){
            _this.$message({
              message: '师傅已完成修改成功',
              type: 'success'
            });
            _this.repair_work_btn=false;  //隐藏按钮
          }else if(data.data.code!='0000'){ //如果返回结果没有成功就在调用此接口
            _this.repair_work_cancel='不修改';
            _this.repair_work_determine='师傅已收现金';
            _this.repair_work_request_again=true;
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
              message: '师傅已完成修改成功',
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
      isPosition(orderNumber,masterId){//'订单'mainOrderId,'师傅'masterId
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
            if(res.result == null){
              _this.$message({
                message: '该师傅'+res.error,
                type: 'warning'
              });
            }
            let formatted_location='http://restapi.amap.com/v3/geocode/regeo?key=6f7abd3e0d62ca6affa0e32b55138d1a&location='+ res.result.lon +','+ res.result.lat;//经纬度地址
            //师傅经纬度的文字地址
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
          error:function(xhr,textStatus){}
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
      img{
        float: left;
        width:200px;
        height:120px;
        cursor: pointer;
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
</style>
<style scoped lang="scss">
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
</style>




