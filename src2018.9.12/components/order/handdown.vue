<template>
  <div id="app">
    <!--导航栏-->
    <!--导航栏结束-->
    <div>                                 <!--待处理订单转变成为订单报备订单-->
    <!--content内容区域-->
    <div v-show="orderDetailed.isShow"  class="container">
      <!--下拉列表-->
      <div class="selector_list">
        <div class="selector_listLeft">
        <div class="list">
          订单号 :
          <el-input
            placeholder="请填写订单号"
            v-model.trim="inputParams.orderNumber">
          </el-input>
        </div>
        <div class="list">
          工程师姓名:
          <el-input
            placeholder="请填写工程师姓名容"
            v-model.trim="masterName">
          </el-input>
        </div>
        <div class="list">
          工程师手机号:
          <el-input
            placeholder="请填写工程师手机号"
            v-model.trim="masterPhone">
          </el-input>
        </div>
        <div class="list">
          联系人手机号 :
          <el-input
            placeholder="请填写联系人手机号"
            v-model.trim="inputParams.userPhoneNum">
          </el-input>
        </div>
          <!--联系人姓名-->
          <div class="list">
            联系人姓名:
            <el-input
              placeholder="请填写联系人"
              v-model.trim="phoneName">
            </el-input>
            </div>
          <!--分类-->
          <div class="list">
            分类 :
            <!--
            <el-select v-model.trim="orderLabel" placeholder="请选择分类" @change="selectorOne(orderLabel)">
              <el-option
                v-for="item in labeloptions2"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
             -->
            <el-input placeholder="请选择分类                       ▼"
                      @focus="showChannel" v-if="channelShow"></el-input>
            <el-cascader ref="fuwugongzhong" id="labelId"
                         @change="changeSelectorTwo"
                         :options="labeloptions3"
                         change-on-select
                         @active-item-change="handleItemChange"
                         :props="props1"
                         placeholder = "请选择分类"
                         v-if="!channelShow"
            ></el-cascader>
          </div>

        </div>

          <div class="selector_listLeft" v-show="seachShow">
            <div class="list">
              订单渠道:
              <el-input placeholder="请选择订单渠道                ▼"
                        @focus="showChannel" v-if="channelShow"></el-input>
              <el-cascader id="labelId"
                           placeholder="请选择订单渠道"
                           @change="changeSelector2"
                           change-on-select
                           :options="labeloptions"
                           v-if="!channelShow"
                           :props="prop" ></el-cascader>
            </div>
            <!--订单类型-->
            <div class="list">
              订单类型 :
              <el-select v-model.trim="orderTypeOne" placeholder="请选择订单类型" @change="orderTypeOneClick(orderTypeOne)">
                <el-option
                  v-for="item in orderType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>

            <div class="list">
              预约时间 :
              <el-date-picker
                v-model.trim="timeQuantum"
                type="daterange"
                align="right"
                placeholder="请选择预约时间"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="list">
              未预约时间 :
              <el-select v-model.trim="isAppointment1" placeholder="请选择有无预约时间" @change="isAppointmentClick(isAppointment1)">
                <el-option
                  v-for="(item,index) in isAppointmentArray"
                  :key="index"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

        <div class="list">
          下单时间 :
          <el-date-picker
            v-model.trim="timeQuantum2"
            type="daterange"
            align="right"
            placeholder="请选择下单时间"
            :picker-options="pickerOptions2">
          </el-date-picker >
        </div>
            <!--渠道质保-->
            <div class="list">
              渠道质保 :
              <el-select v-model.trim="quality" placeholder="请选择渠道质保" @change="qualityClick(quality)">
                <el-option
                  v-for="(item,index) in channelQuality"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>

        <!--城市-->

        <div class="list" v-for="(item,index) in city">
          城市 :
          <el-select
            v-model.trim="item.SourceTypeValue" placeholder="请选择城市"
            @change="selectorArea(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value">
            </el-option>
          </el-select>
        </div>
        <div class="list">
          服务区域 :
          <el-cascader id="city"
                       placeholder="请选择服务区域"
                       @change="changeSelector"
                       :options="areaoptions1"
                       change-on-select
                       @active-item-change="handleItemChange"
                       :props="props"></el-cascader>
        </div>
            <!--绑定手机号-->
            <div class="list">
              绑定手机号 :
              <el-input
                placeholder="请填写绑定手机号"
                v-model.trim="inputParams.orderTel">
              </el-input>
            </div>
            <!--订单来源-->
            <div class="list">
              订单来源 :
              <el-select v-model.trim="orderLabe3" placeholder="请选择订单来源" @change="selectorThree(orderLabe3)">
                <el-option
                  v-for="item in orderSourceShowOne"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <!--网点名称siteArr-->
            <div class="list">
              网点名称 :
              <el-select
                v-model.trim="siteName" placeholder="请选择网点名称"
                @change="siteClick(siteName)">
                <el-option
                  v-for="(item,index) in siteArr"
                  :key="index"
                  :value="item.name" >
                </el-option>
              </el-select>
            </div>
            <div class="list">
              渠道商订单号:
              <el-input
                placeholder="请填写渠道商订单号"
                v-model.trim="inputParams.thirdOrderId">
              </el-input>
            </div>
        </div>

        <div class="selector_listRight">
          <p @click="jiantouClick">{{nameSize}}   <img :src="jiantou"></p>
        </div>
      </div>
      <!--下拉列表结束-->

      <!--查询按钮-->
      <div class="footerBnt">
        <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
        <el-button  style="width: 100px" @click="reset">重置</el-button>
        <el-button style="width:100px;float: right;margin-right: 150px" @click="exportOrder">导出</el-button>
      </div>
      <!--查询按钮结束-->

      <!--table表格-->
      <div class="dable_lsit">
        <!--表格数据-->
        <table id="table" cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.list" :class="[{activeOrder:item.styleShow==true},{ trActive:item.borderShow == true}]" >
            <!--序号-->
            <td>
              {{index+1}}
            </td >
            <!--订单号-->
            <td>
              <img v-show="item.emergencyDegree == 1" src="/static/images/jiaji.png" style="display: inline-block;width: 22px;height: 22px;transform: translateY(5px)">
              <span @click="orderDetails(item,item.id,index)" id="orderId" style="word-break: break-all;">{{item.id|placeholder}}</span>
            </td>
            <!--订单类型-->
             <td>
               <img style="display: inline-block;width: 55px;height: 26px" :src="item.type|orderType1">
             </td>
            <!--分类-->
            <td>
              {{item.fLabelBusiness|FLabelBusinessShow}}
            </td>
            <!--创建时间-->
            <td style="width: 80px">
              {{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <!--预约时间-->
            <td style="width: 120px">
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}} <span v-show="item.appointmentDatetime">~{{( Date.parse(new Date(item.appointmentDatetime))+3600000)|moment('HH:mm:ss')}}</span>
            </td>
            <!--客户信息-->
            <td>
              {{item.linkmanName | placeholder}}
              <span  @click="l_dial_contact(item.linkmanPhoneNum,item.id)" v-if="item.linkmanPhoneNum ">
              <Tooltip content="拨打联系人" placement="top-end" >
                <Icon type="ios-telephone" style="font-size: 20px;"></Icon>
              </Tooltip>
                </span>
              <br>
              <a id="telPhone">{{item.linkmanPhoneNum}}</a><br>
            </td>
           <!--服务区域-->
            <td>
              {{item.linkmanArea| placeholder}}
            </td>
            <!--工程师信息-->
            <td >
              <span :class="{noMaster:!item.masterName}">{{item.masterName|placeholder}}</span>
              <span @click="l_dial_masterWorker(item.masterPhoneNum,item.id)"  v-if="telMasterWorker(item.state,item.masterPhoneNum) ">
              <Tooltip content="拨打工程师" placement="top-end" hidden  >
                <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
              </Tooltip>
                </span>
              <br>
              <a id="telPhone1">{{item.masterPhoneNum}}</a><br>
            </td>
            <!--订单说明-->
            <td style="width:160px;">
              【{{item.abnormalHangUp | placeholder}}】{{item.abnormalHangUpRemark | placeholder}}
            </td>
            <!--状态-->
            <td >
              {{item.state| BackOrderStatus}}
            </td>
            <td>
              {{item.officialPartner|placeholder}}
            </td>
            <!--渠道质保-->
            <td>
              {{item.channelWarranty|qudaozhibao}}
            </td>
            <!--操作-->
            <td class="icon" id="iconS">
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '08'">
                <span class="iconStyle" @click="disposeOrder(item.id,item)">处理</span>
                <span  class="iconStyle"  @click="drawbackIsShow(item)">取消</span>
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
              </div>
              <div v-if="item.state == '20'">
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle" @click="drawbackIsShow(item)">取消订单</span>
                <span class="iconStyle" @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '08'">
                <li>
                  <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                </li>
                <li>
                  <span @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                </li>
                <li>
                  <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                </li>
                <li>
                  <span  @click="complainFn(item.id)">投诉订单</span>
                </li>
                <li>
                  <span @click="masterImposeIsShow(item)">罚款工程师</span>
                </li>
                <li>
                  <span  @click="orderDetails(item,item.id,index)">订单详情</span>
                </li>
              </ul>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '20'">
                <li>
                  <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                </li>
                <li>
                  <span  @click="unusual(item.id)">订单报备</span>
                </li>
                <li>
                  <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                </li>
                <li>
                  <span  @click="complainFn(item.id)">投诉订单</span>
                </li>
                <li>
                  <span @click="masterImposeIsShow(item)">罚款工程师</span>
                </li>
                <li>
                  <span  @click="orderDetails(item,item.id,index)">订单详情</span>
                </li>
              </ul>

            </td>
          </tr>
          </tbody>
        </table>
        <!--表格数据结束-->
        <!--分页组件-->
        <div class="paging">
          <p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes='[20,50,100,200]'
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
      <!--table表格结束-->

    </div>

    <!--替换工程师弹框-->
    <div class="alert" v-if="isReplaceAlert.isShow" style="z-index: 10000;">
      <replace-master :isReplaceAlert="isReplaceAlert" :quiry="quiry"></replace-master>
    </div>
      <!--处理订单-->
      <div class="alert" v-if="isDispose.isShow" >
        <dispose :addRemarksObj="isDispose" :quiry="quiry"  style="z-index: 10000;"></dispose>
      </div>
    <!--替换工程师弹框end-->
    <div class="alert" v-if="isAdd">
      <add-alert :addDataObj="addDataObj">
      </add-alert>
      <p class="closeX" @click="close"></p>
      <div class="btn">
        <button @click="close('preserve',addDataObj)" :class="{'selector':isClose}">关闭</button>
      </div>
    </div>
    <!--弹框-->
    <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->

    <el-dialog  style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">
      <ul class="alert_forbidden_text">
        <li v-for="(item,index) in alertForbiddenList" @click="selectorForbidden(item,index)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model.trim="textareaContent">
        </textarea>
      <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
    <!--新增服务产品 start-->
  	<addseve-product :isAddProduct="isAddProduct" v-if="isAddProduct.isShow"></addseve-product>
    <!--新增服务产品 end-->

      <!--订单详情-->
      <order-details
        :orderDetailed="orderDetailed"
        :quiry="quiry"
        :disposeOrder="disposeOrder"
        :drawbackIsShow="drawbackIsShow"
        :addRemarksIsShow="addRemarksIsShow"
        :complainFn="complainFn"
        :replaceMaster="replaceMaster"
        :masterImposeIsShow="masterImposeIsShow"
        :unusual="unusual"
        :changeTimeIsShows="changeTimeIsShow"
        :addSaverProduct="addSaverProduct"
        :reminder="reminder"
        @addProduct = 'addProduct'
        v-if="!orderDetailed.isShow">
      </order-details>
      <!--订单详情end-->
    <!--订单详情end-->

    <!--//改约时间-->
      <div class="alert" v-if="time.isShow" >
        <changTime :time="time" :quiry="quiry"  style="z-index: 10000;"></changTime>
      </div>
    <!--//改约时间den-->

    <!--添加备注-->
    <add-remarks :addRemarksObj="addRemarksObj"></add-remarks>
    <!--添加备注-->
      <!--投诉订单 start-->
      <div class="alert" v-if="complain.isShow" >
        <complain-order :complain="complain" ></complain-order>
      </div>
      <!--投诉订单 end-->
      <!--订单报备 start-->
      <div class="alert" v-if="unusualOrder.isShow" >
        <complain-order :complain="unusualOrder" ></complain-order>
      </div>
    <!--退款-->
      <drawback :isDrawback="isDrawback" :data="drawbackData" :quiry="quiry" v-if="isDrawback.isShow" @isClosed="isClosed">

      </drawback>
    <!--退款end-->

    <!--工程师罚款 开始-->
    <el-dialog style="z-index:999999"  :visible.sync="masterImposeData.masterImpose" size="tiny">
      <h3>{{masterImposeData.title}}</h3>
      <ul class="alert_forbidden_text">
        <li>
          订单总金额：{{masterImposeData.total}}
        </li>
        <li>
          罚款金额：
          <el-input style="width:50%"
                    size="small"
                    placeholder="请填写内容"
                    v-model.trim="masterImposeData.amount">
          </el-input>
        </li>
        <li v-for="(item,index) in masterImposeData.alertForbiddenList" @click="masterImposeSelector(item)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model.trim="masterImposeData.textareaContent">

        </textarea>
      <el-button style="position:relative; left:50%; transform:translateX(-50%)"  @click="masterImposeOperate(masterImposeData)" type="primary">确定</el-button>

    </el-dialog>
    <!--工程师罚款 end-->


    </div>

  </div>
</template>
<script>
  import {
    addDialingMaster,
    addProductFilter,
    buttonStatus,
    cancelOrderFilter,
    changeTimeFilter,
    masterFilter,
    sendOrderFilter,
    ubsualButton,
  } from "./js/pagingPages"
  import addAlert from "./orderAllCommonts/alertInfo";
  import orderNav from "./nav/nav"
  import orderDetails from "./orderAllCommonts/orderDetails"
  import replaceMaster from "./orderAllCommonts/replaceMaster_alert"
  import changTime from "./orderAllCommonts/master_alert/changeTime"
  import drawback from "./orderAllCommonts/master_alert/drawback"
  import addRemarks from "./orderAllCommonts/master_alert/addRemarks"
  import dispose from "./orderAllCommonts/master_alert/dispose.vue"
  import addOrder from "./orderAllCommonts/addOrder";
  import complainOrder from "@/components/order/orderAllCommonts/complain"
  import addseveProduct from "@/components/order/orderAllCommonts/addSaverProduct"

  export default {
    components:{
      addRemarks,
      complainOrder,
      addOrder,
      drawback,
      replaceMaster,
      orderNav,
      orderDetails,
      changTime,
      addseveProduct,
      addAlert,
      dispose
    },
    mounted() {
      this.$nextTick(function () {
        this.isTooltip();
      });
    },
    data() {
      return {
        channelShow:false,
        props1: {
          value: 'a',
          label: "b",
          children: 'beans'
        },                       //服务工种分类排序
        labeloptions3:[],       //分类
        siteName:"",//网点名字 :
        siteID:"",//网点ID :
        siteArr:[], //网点名称 :
        orderLabe3:"", //订单来源
        numId1:"",
        orderSourceShowOne:[
          {
            id:"",
            name:"--请选择--"
          },
          {
            id:"0",
            name:"正常订单"
          },
          {
            id:"1",
            name:"返修订单"
          },
          {
            id:"2",
            name:"一口价订单"
          },
          {
            id:"3",
            name:"定价订单"
          },
          {
            id:"4",
            name:"预约订单"
          },
          {
            id:"5",
            name:"企业订单"
          },

        ],
        //渠道质保
        quality:'',
        selectQuality:'',  //选中的质保状态
        channelQuality:[
          {
            id:'',
            name:'--请选择--'
          },
          {
            id:'0',
            name:'质保外'
          },
          {
            id:'1',
            name:'质保内'
          },
          {
            id:'2',
            name:'无'
          }
        ],
        phoneName:"",//联系人
        nameSize:"收起所有筛选",
        seachShow:true,
        jiantou:"./static/images/shang.png",
        officialPartner:'', //订单渠道
        labeloptions:[],
        prop: {
          value: 'id',
          label: "name",
          children: 'childChannel'
        },
        channelID:'',               //主渠道ID
        officialPartnerSubsetId:'', //子渠道ID
        masterPhone:"",//工程师电话
        masterName:"",//工程师名字
        orderName:"",
        orderTypeOne:"", //订单类型
        orderType:[
          {
            id:"",
            name:"--请选择--"
          },
          {
            id:"0",
            name:"正常订单"
          },
          {
            id:"1",
            name:"返修订单"
          },
          {
            id:"2",
            name:"一口价订单"
          },
          {
            id:"3",
            name:"定价订单"
          },
          {
            id:"4",
            name:"预约订单"
          },
          {
            id:"5",
            name:"企业订单"
          },
        ],//订单类型
        selone:'',
        labeloptions2:[
          {
            "id":"",
            "name":"--请选择--"
          }
        ],
        orderLabel:"",
        isAddProduct:{
          isShow:false,
          data:"",
          title:"新增服务产品"
        },
        //画图数据start
        drawbackData:[],
        timeQuantum:[],
        isAppointment:"", //预约时间无
        isAppointment1:"", //预约时间无
        isAppointmentArray:[
          {
            id:"",
            value:"--请选择--"
          },
          {
            id:"1",
            value:"--无--"
          }
        ],
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
        timeQuantum2:[],
        statisticsDateStartStr2:"",
        statisticsDateEndStr2:"",
        pickerOptions2: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 8);
                  end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                  picker.$emit('pick', [start, end]);
              }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        complain:{
          isShow:false,
          id:"",
          status:"1",
          url:"/order/addcomplain",
          title:"投诉订单",
        },
        unusualOrder:{
          isShow:false,
          id:"",
          status:"0",
          url:"/order/changeabnormalhangup",
          title:"订单报备",
        },
        //
        //新建订单；
        isAddorder:{
          isShow:false,
          title: "新建订单",
        },
        //区域id
        areaId:"",
        //新建订单；end
        //订单详情Data
        orderDetailed:{
          isShow:true,
        },
        //订单详情Data   End
        //处理订单
        isDispose:{
          title:"处理",
          isShow:false,
        },
        //添加备注end
        //添加备注
        addRemarksObj:{
          title:"添加备注",
          isShow:false,
        },
        //添加备注end
        //退款数据
        isDrawback:{
          isShow:false ,
          title:"退款"
        },
        //退款end
        //改约时间 start
        time:{
          isShow:false,
          title:"改约时间",
        },
        //改约时间 end
        //工程师罚款数据 start
        masterImposeData:{
          masterImpose:false,
          total:"",   //订单总金额
          title:"工程师罚款",
          amount:"",
          textareaContent:"",
          params:[],       //参数
          alertForbiddenList:this.$store.state.masterAmerceList
        },
        //工程师罚款数据 end
        isAdd: false,
        //替换工程师
        isReplaceAlert:{
          isShow:false
        },
        //替换工程师end
        makeTime: "",   //预约时间
        placeTime: "",   //下单时间
        textareaContent: "",
        inputParams: {
          orderNumber: "",//订单号
          orderTel: "",//下单手机号
          thirdOrderId:'' //渠道商订单号
        },
        isEdit: true,
        alertForbiddenList: [
          {
            name: "工程师违规操作",
            selector: "0",
          }, {
            name: " 工程师认证资料不全",
            selector: "0",
          }, {
            name: " 其他",
            selector: "0",
          }
        ],
        dialogTableVisible: false,
        text: {
          forbidden: "禁用",
          recover: "恢复"
        },
        unmber: "",//工程师编号
        currentPage4: 1,
        checked: false,
        telBind: '',   //绑定手机
        isClose: false,//控制样式
        alertInfo: {       //alertinfo
          title: "用户详情",
          selectorBehindObj: {
            serveCityId: "",
          },
          props: {
            value: 'label',
            children: 'cities',
          },
          cityPositionData: {
            name: "城市",
            key: "chengshiId",
            SourceTypeValue: '', //选中后的
            SourceType: []
          },
          serveTypePositionData: {
            name: "服务工种",
            key: "fuwugongzhong",
            SourceTypeValue: '', //选中后的
            SourceType: []
          },
          remindedDrops: {
            name: "服务工种",
            key: "tidian",
            SourceTypeValue: '', //选中后的
            SourceType: []
          },
          workStatu: {
            name: "工作状态",
            key: "gongzuoztai",
            SourceTypeValue: '', //选中后的
            SourceType: []
          },
        },
        isForbidden: false,
        cityId: "", //城市id
        isAlert: this.$store.state.isAlert,
        isActive: "0",   //选中的
        areaoptions1: [],
        props: {
          value: 'label',
          children: 'cities',
        },
        city: [{
          name: "所属",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        }],
        optionList: [       //下拉列表数据
          {
            name: "渠道",
            key: "sourceId",
            SourceTypeValue: '', //选中后的
            SourceType: []
          }, {
            name: "订单状态",
            key: "orderStatus",
            SourceTypeValue: '', //选中后的
            SourceType:this.$store.state.orderStatusOrderAll,
          }
        ],
        selectorBehindObj: {},
        theadsName: [
          '序号',
          '订单号',
          "订单类型",
          '分类',
          '创建时间',
          '预约时间',
          '客户信息',
          '服务区域',
          '工程师信息',
          '订单说明',
          '状态',
          '订单渠道',
          "渠道质保",
          '操作'
        ],
        sortData: [
          { //预约时间
            index:5,
            sortAscendingValues:[" appointment_datetime asc "],  //升序
            gradeDownValues:[" appointment_datetime desc "],     //降序
          },  {
            //下单时间
            index:4,
            sortAscendingValues:[" create_time asc "],  //升序
            gradeDownValues:[" create_time desc "],     //降序
          }
          ,
          { //工程师信息   中文需要按照A-Z排序
            index: 8,
            sortAscendingValues: [" convert (master_name using gbk) asc "],  //升序
            gradeDownValues: [" convert (master_name using gbk) desc "],     //降序
          }
        ],
        tableListData: {},          //表格数据
        showPages: 1,
        currentPageSize: 20,
        total: 0,
        pageTotal: 0,
        addDataObj: {       //添加工程师详情
          title: "工程师提点设置",
          serveId: "",
          options2: [                 //服务区域
          ],
          props: {
            value: 'label',
            children: 'cities',
          },
          inputs: [
            {
              name: "姓名",
              key: "name",
              value: ""
            }, {
              name: "手机号",
              key: "tel",
              value: ""
            }, {
              name: "身份证号码",
              key: "certificateNumber",
              value: ""
            }, {
              name: "紧急联系人",
              key: "urgentName",
              value: ""
            }, {
              name: "紧急联系人电话",
              key: "urgentTel",
              value: ""
            },
          ],
          selectorBehindObj: {},
//            添加工程师详情结束
        },
        isTooltip_show:false, //用于判断是否显示非客服的电话图标显示
      }
    },
    beforeRouteEnter(to,from,next){
      next(Vue=>{
        Vue.quiry();
      })
    },
    beforeRouterLeave(to,from,next){
      next()
    },
    watch:{
      "timeQuantum":function(new1,old1){
        if(new1.length>0){
          this.isAppointment = "";//预约时间无
          this.isAppointment1 = "";//预约时间无
        }
      }
    },
    created(){
      this.$store.commit('getSort',"");
      let siteUrl = this.$apidomain + "/common/findsite";//全部网点
      this.$http.get(siteUrl).then(res=>{
        if(res.data.code === "0000"){
          this.siteArr = [{name:"--请选择--",id:""},{name:"--全部网点--",id:"1"},...res.data.result];
        }else{
          this.$queryFun.successAlert.call(this,res.data.error)
        }
      })
      this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]

      this.labeloptions.forEach((obj,i)=>{
        this.$set(obj,'childChannel',[]);
      })

      //获取城市 start
      this.getData({optionLists:this.city,key:"cityId",data:this.getCityData(),resName:"name"});
      //获取城市 end
      //获取渠道数据 start
      this.getData({optionLists:this.optionList,key:"sourceId",data:this.$store.state.findchannel,resName:"name"})
      //获取渠道数据 end
      //初始化调用table 数据 start
      this.quiry();
      //初始化调用table 数据 start
      // 分类
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2=this.labeloptions2.concat(data.result);
      });

      //获取服务工种分类
      let urls = this.$apidomain + "/common/findflabelbusinessname";
      this.$http.get(urls).then(r => {
        console.log('请求分类')
        r.data.result.forEach((v, i) => {
          let urlTwo = this.$common.apidomain + '/articleinfo/findlabelbusinessbyflabel?id=' + v.id;
          this.$http.get(urlTwo).then(res => {
            if (res.data.code === "0000") {
              this.labeloptions3.push(res.data.result)
            }
          })
        })
        this.labeloptions3 = [{a:'',b:'--请选择--'},...this.labeloptions3];
        console.log(this.labeloptions3,'ab')
      });
    },
    methods: {
      showChannel(){
        this.channelShow = false;
      },
      isAppointmentClick(v){ //有无预约时间
        this.timeQuantum = [];
        if(v==="--无--"){
          this.isAppointment = "1";//预约时间无
        }else{
          this.isAppointment = "";//预约时间无
        }

      },
      //分类选择
      changeSelectorTwo(value) {
        this.skillsOne1 = 1;
        if (value.length === 1) {
          this.selectorBehindObj.labelId = value[0];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0]
        } else if (value.length === 2) {
          this.selectorBehindObj.labelId = value[1];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1]
        } else if (value.length === 3) {
          this.selectorBehindObj.labelId = value[2];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2]
        } else if (value.length === 4) {
          this.selectorBehindObj.labelId = value[3];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3]
        } else if (value.length === 5) {
          this.selectorBehindObj.labelId = value[4];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4]
        } else if (value.length === 6) {
          this.selectorBehindObj.labelId = value[5];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[0] + "/" + this.$refs.fuwugongzhong.currentLabels[1] + "/" + this.$refs.fuwugongzhong.currentLabels[2] + "/" + this.$refs.fuwugongzhong.currentLabels[3] + "/" + this.$refs.fuwugongzhong.currentLabels[4] + "/" + this.$refs.fuwugongzhong.currentLabels[5]
        } else if (value.length === 7) {
          this.selectorBehindObj.labelId = value[6];
          this.selectorBehindObj.labelName = this.$refs.fuwugongzhong.currentLabels[6]
        }

        console.log(this.selectorBehindObj.labelId,'this.selectorBehindObj.labelId')
      },
      exportOrder(){ //导出
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');
        }
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        let obj ={
          "state": "08",
          "isAppointment" :this.isAppointment,
          "linkmanName":this.phoneName, //联系人
          "id":this.selectorBehindObj.orderNumber, //订单号
          "thirdOrderId":this.selectorBehindObj.thirdOrderId, //渠道商订单号
          "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
          "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          "officialPartnerId":this.channelID,  //主渠道ID
          'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
          "appointmentDatetimeStartStr":this.statisticsDateStartStr, //工程师工号
          "appointmentDatetimeEndStr":this.statisticsDateEndStr, //工程师工号
          "createTimeStartStr":this.statisticsDateStartStr2, //工程师工号
          "createTimeEndStr":this.statisticsDateEndStr2, //工程师工号
          //"fLabelBusiness" : this.selone, //分类
          'fLabelBusiness':this.selectorBehindObj.labelId,         //订单分类
          "type":this.orderName, //订单类型
          "masterName":this.masterName, //工程师姓名
          "masterPhoneNum":this.masterPhone, //工程师手机
          "channelWarranty":this.selectQuality ,  //质保
          "source":this.numId1, //订单来源
          "siteId":this.siteID, //网点名称
          "orderByClause":"abnormal_hang_up_time desc"//默认排序
        }
        for(let key in obj){
          if(!obj[key]){
            obj[key] = null;
          }
        }
        //QS下载
        let strUrl = `${this.$reportdomain}/order/download?`;
//        let data = strUrl+this.$Qs.stringify(obj,{addQueryPrefix: true},{filter:this.FilterFun},{skipNulls:true});
        let data = strUrl+this.$Qs.stringify(obj,{skipNulls:true});
//        window.location.href = data;
        window.open(data, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')
      },
      //导出end
      siteClick(v){//网点选择
        this.siteArr.forEach((item,index)=>{
          if(v == item.name){
            this.siteID = item.id;
          }
        })
      },
      selectorThree(item){ // 订单来源
        this.orderSourceShowOne.forEach((v,index)=>{
          if(item == v.name){
            this.numId1 = v.id;
          }
        })
      },
      //渠道质保下拉
      qualityClick(item){
        this.channelQuality.forEach((obj,i)=>{
            if(item === obj.name){
              this.selectQuality = obj.id;
            }
          }
        )
      },
      isClosed(v){
        this.isDrawback.isShow=v;
      },
      outHide(v,i){ //鼠标离开
        this.tableListData.list.forEach((item,index)=>{
          if(i == index){
            item.iconShow = false;
          }else{
            item.iconShow = false;
          }
        })
        this.$set(this.tableListData.list,i,this.tableListData.list[i])
      },
      more(v,i){//更多显示
        this.tableListData.list.forEach((item,index)=>{
          if(i == index){
            item.iconShow = !item.iconShow;
          }else{
            item.iconShow = false;
          }
        })
        this.$set(this.tableListData.list,i,this.tableListData.list[i])

      },
      reset(){//重置
        this.channelShow = true;
        this.labeloptions = [];
        this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]
        this.labeloptions.forEach((obj,i)=>{
          this.$set(obj,'childChannel',[])
        })
        this.areaoptions1 =[];
        this.inputParams={
          orderNumber: "",//订单号
          orderTel: "",//下单手机号
          userPhoneNum:"",
          thirdOrderId:'' //渠道商订单号
        }
        this.isAppointment1 = "";
        this.isAppointment = "";
        this.siteName = "";//网点名字 :
        this.siteID = "";//网点ID :
        this.orderTypeOne ="";
        this.phoneName = "";
        this.masterPhone = "";
        this.masterName = "";
        this.orderLabel = "";
        this.quality= "";
        this.orderLabe3 = "";
        this.timeQuantum2 = [];
        this.timeQuantum = [];
        this.timeQuantum3 = [];
        this.numId1 = "";
        this.selectQuality = "";
        this.channelID='';
        this.selone = "";
        this.orderName = "";
        this.officialPartnerSubsetId ="";
        this.statisticsDateStartStr='',   //预约开始时间
          this.statisticsDateEndStr='',       //预约结束时间
          this.statisticsDateStartStr2='',       //下单开始时间
          this.statisticsDateEndStr2='',           //下单结束时间
          this.completedTimeStartStr='',     //完成开始时间
          this.completedTimeEndStr='',         //完成结束时间
          this.optionList.forEach((item,index)=>{
            item.SourceTypeValue="";
          })
        this.city.forEach((item,index)=>{
          item.SourceTypeValue="";
        })
        for(let key in this.selectorBehindObj){
          this.selectorBehindObj[key]=''
        }
        this.quiry();
      },
      jiantouClick(){ //搜索消失出现
        this.seachShow = !this.seachShow;
        if(this.seachShow == true){
          this.nameSize = "收起所有筛选 ";
          this.jiantou = "./static/images/shang.png";
        }else{
          this.nameSize = "展开所有筛选";
          this.jiantou = "./static/images/xia.png";
        }

      },
      //      催单
      reminder(item){
        let url = this.$apidomain+ '/order/reminder';
        let params = {
          mainOrderId:item.id
        }
        this.$http.post(url,params).then(res=>{
          let data =res.data;
          if(data.code==="0000"){
            this.$queryFun.successAlert.call(this,'催单成功');
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        })

      },
      changeSelector2(value){
        let urls = this.$apidomain +"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId=";

        this.$http.get(urls+value[0]).then(res =>{
          let data = res.data;
          if(data.code==='0000'){
            this.labeloptions.forEach((obj,i)=>{
              obj.childChannel=obj.id===value[0]?data.result:[]
            })
          }
        })

        if(value.length=='1'){
          this.channelID = value[0];
          this.officialPartnerSubsetId='';
        }else if(value.length=='2'){
          this.officialPartnerSubsetId=value[1];
          this.channelID=''
        }else{
          this.channelID ="";
          this.officialPartnerSubsetId='';
        }


      },
      orderTypeOneClick(item){ //订单类型
        this.orderType.forEach((v,i)=>{
          if(item === v.name){
            this.orderName = v.id;
          }
        })
      },

      selectorOne(item){       //选中后的下拉列表
        this.labeloptions2.forEach(v=>{
          if(v.name==item){
            this.selone=v.id
          }
        })

      },
//      //处理订单 start
//      handleOrder(id,isShow){
//        isShow.isShow=true;
//        isShow.id=id;
//      },
      //订单报备 start
      unusual(id){
        this.unusualOrder.isShow=true;
        this.unusualOrder.id=id;
      },
      //订单报备 end
      //处理订单 end
      //投诉订单 start
      complainFn(id){
        this.complain.isShow=true;
        this.complain.id=id;
      },
      //投诉订单 end
      //  /新增服务产品 start
      addSaverProduct(item,isAddProduct){
        isAddProduct.data = item;
        isAddProduct.isShow=true;
      },
      //订单详情页面添加服务产品
      addProduct(childData){
        this.isAddProduct.id = childData.id;
        this.isAddProduct.data = childData;
        this.isAddProduct.isShow=true;
      },
          addSaverProduvtFilter(state){
            return addProductFilter(state);
          },
      //新增服务产品 end
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

      quiry(){
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        return{params:{
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
            "state": "08",
          "isAppointment":this.isAppointment,      //预约时间选无
          "linkmanName":this.phoneName, //联系人
          "id":this.selectorBehindObj.orderNumber, //订单号
          "thirdOrderId":this.selectorBehindObj.thirdOrderId, //渠道商订单号
          "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
          "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          //"officialPartnerId":this.selectorBehindObj.sourceId,  //渠道
          "officialPartnerId":this.channelID,  //主渠道ID
          'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
          "appointmentDatetimeStartStr":this.statisticsDateStartStr, //工程师工号
          "appointmentDatetimeEndStr":this.statisticsDateEndStr, //工程师工号
          "createTimeStartStr":this.statisticsDateStartStr2, //工程师工号
          "createTimeEndStr":this.statisticsDateEndStr2, //工程师工号
          //"fLabelBusiness" : this.selone, //分类
          'fLabelBusiness':this.selectorBehindObj.labelId,         //订单分类
          "type":this.orderName, //订单类型
          "masterName":this.masterName, //工程师姓名
          "masterPhoneNum":this.masterPhone, //工程师手机
          "channelWarranty":this.selectQuality ,  //质保
          "source":this.numId1, //订单来源
          "siteId":this.siteID, //网点名称
          "orderByClause":"abnormal_hang_up_time desc"//默认排序
        }};
      },
      //显示新建订单；
      addOrderIs(){
        this.isAddorder.isShow=true;
      },
      //显示新建订单；end

      //处理订单
      disposeOrder(item,v,i){
        if(v.state=="08"){
          this.isDispose.title = "处理"
        }else if(v.state=="09"){
          this.isDispose.title = "确认完成"
        }else{
          this.isDispose.title = "处理"
        }
        this.isDispose.orderId=item;
        this.isDispose.isShow=true;
        this.isDispose.timeOut = i;
        this.isDispose.state=v.state;
      },
      //添加备注
      addRemarksIsShow(item){
        this.addRemarksObj.orderId=item.id;
        this.addRemarksObj.isShow=true;
      },
      //退款isAlert
      drawbackIsShow(data){
        this.drawbackData=data;
        this.isDrawback.isShow=true;
        this.isDrawback.orderId=data.id;
      },
      //退款isAlert   END

      //预约时间改变start
      changeTimeIsShow(time,sum,id){
        this.time.time=time;
        this.time.sum=sum;
        this.time.orderId=id;
        this.time.isShow=true;
      },
      //预约时间改变 End
      //替换工程师弹框开始


      replaceMaster(item,index,orderIds,type){
        this.isReplaceAlert.linkmanDetails = item.linkmanDetails;         //服务地址
        this.isReplaceAlert.appointmentDatetime=item.appointmentDatetime;
        this.isReplaceAlert.skills=item.skills;
        this.isReplaceAlert.areaId=item.linkmanAreaId;
        this.isReplaceAlert.orderIds=orderIds;
        this.isReplaceAlert.isShow=true;
        this.isReplaceAlert.isSiteShow=type;
      },
      //替换工程师弹框时间end

      //工程师罚款开始
      masterImposeIsShow(item){
        this.masterImposeData.masterImpose=true;
        this.masterImposeData.id=item.id;
        this.masterImposeData.total=item.total;
//        this.masterImposeData.orderAmountSum=item.
      },
      masterImposeOperate(item){
        var o={},arr=[];
        item.alertForbiddenList.forEach((v,i)=>{
          if(v.selector===true){
            arr.push(v.name);
          }
        });
        if(arr.length>0){
          o.refuseContentText=arr
        }
        if(item.amount){
          o.amount=item.amount;
        }
        if(item.textareaContent){
          o.textareaContent=item.textareaContent
        }
        item.params.push(o);
//        发送请求完成后清空参数
        let amount=item.params[0].amount; //罚款金额
        let content=item.params[0].textareaContent;   //文本内容
        let selector=item.params[0].refuseContentText[0];  //选择的选项
        let orderId=this.masterImposeData.id;
        let urlR=this.$apidomain+"/order/punishmentmaster";
        this.$http.post(urlR,{"remark":content,"reasonOfComplain":selector,"fee":amount,"orderId":orderId}).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            item.params=[];
            item.masterImpose=false;
          }else{
            alert(data.error)
          }
        });


      },
      masterImposeSelector(item,index,textareaContent){
        this.masterImposeData.alertForbiddenList.forEach(v=>{
          v.selector=false;
        });
        item.selector=!item.selector

      },

      //工程师罚款结束
      //订单详情操作

      orderDetails(item,id,i){
        this.tableListData.list.forEach((item,index)=>{
          if(i == index){
            item.styleShow = true;
          }
        })
        this.tableListData.list.forEach((item,index)=>{
          if(i == index){
            item.borderShow = !item.borderShow;
          }else{
            item.borderShow = false;
          }
        })
        this.$set(this.tableListData.list,i,this.tableListData.list[i])
        if(item.type === "1"){
          let obj={name: "返修订单", path: "/order/list7"}
          this.$router.push({path: "/order/list7"});
          this.$store.dispatch("repairOrderId",{repairId:id,isBool:false,title:"返修订单"})
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
        }else{
          this.orderDetailed.orderId=id;
          this.orderDetailed.isShow=!this.orderDetailed.isShow;
        }
      },
      //订单详情操作end

      onOk(value,type){        //时间的参数预约时间 下单时间
        if(type==='0'){   //预约时间
          this.selectorBehindObj.makeTime=JSON.stringify(value-0);
        }else if(type==='1'){ //下单时间
          this.selectorBehindObj.placeTime=JSON.stringify(value-0);
        }
      },

      confirmForbidden(item,textContent){ //确定拒绝
        var o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.refuseContent=v.name
          }
        });
        if(textContent){
          o.refuseContentText=textContent; //内容
        }
        this.dialogTableVisible=false;
        this.$store.commit("sendRefuseData",o);   //通过vux 传递数据
//        alert("禁用成功")
      },
      accomplish(prams){ //完成编辑
        this.isEdit=true;
        this.$store.commit("edit",false);
      },
      edit(){  //编辑
        this.isEdit=false;
        this.$store.commit("edit",true)
      },

      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;

      },
      selectorArea(item,values,SourceTypeValue){            //获取区域
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });
        let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.selectorBehindObj.cityId;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.areaoptions1 = data.result;
//          this.selectorBehindObj.areaId="";
        })

      },

      add(){      //新增
        this.isAdd=true
      },
      details(item,index){
        this.$store.commit("displayAlert",true); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;          //弹出对话框

      },

//分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
        let params = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      handleCurrentChange(val) {
        this.showPages=val;
        let params = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        if(this.tableListData.list.length !==0){
          this.getTableList(params);
        }
      },
      firstPage(){
        if(  this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;     //第一页
        let params = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal; //最后一页
        let params = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      handleItemChange(val) {
      },
      changeSelector(value){             //区域
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            this.areaId=v.id;    //选择区
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.areaId=e.id    //选择街道
              }
            })
          }
        });
        this.selectorBehindObj['areaId']=this.areaId
      },
//分页查询 事件 end

      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },

      isSelector(index){
        this.isActive=index;
      },

//拒绝 禁用数据 start
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
      },
//拒绝 禁用数据 end

//关闭弹窗  start
      close(pre,addDataAlert){
        if(pre==="preserve"){    //判断是否是保存
          addDataAlert.inputs.forEach(v=>{
            addDataAlert.selectorBehindObj[v.key]=v.value
          });
        }
        this.isClose=true;
        this.isForbidden=false;
        this.isAdd=false;
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
      //关闭弹窗   end

//table 数据 start;
      getTableList(params){
        let url=common.apidomain+"/manage/order/findOrderPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            this.tableListData = data.result;
            this.tableListData.list.forEach((obj,i)=>{
              obj.iconShow = false;
              obj.styleShow = false;
              obj.borderShow = false;
              if(obj.officialPartnerSubsetName&&obj.officialPartnerName){
                this.officialPartner=obj.officialPartnerName+'-'+obj.officialPartnerSubsetName;
              }else if(!obj.officialPartnerSubsetName&&obj.officialPartnerName){
                this.officialPartner=obj.officialPartnerName;
              }else{
                this.officialPartner='';
              }
              this.$set(obj,'officialPartner',this.officialPartner)
            });
            this.showPages = data.result.pageNum;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pages;
          }else{
            this.$queryFun.successAlert.call(this,data.error)
          }
        })
      },
//table 数据 end

      getData(obj){
        obj.optionLists.forEach(v=>{
          if(obj.key===v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            obj.data.forEach(v2=>{
              v.SourceType.push({"id":v2.id,"value":v2[obj.resName]});
            })
          }
        })
      },
      getCityData(){
        return this.$store.state.cityData
      },
      telMasterWorker(state,isYes){//线判断有没有号码参数，没有就不显示
        if(!isYes)return false;
        return addDialingMaster(state);
      },
      isTooltip(){//如果是客服经理或者客服专员或者管理员就显示
        let _this=this,
          enrolleeinfo_json=JSON.parse(localStorage.getItem("enrolleeinfo")),
          enrolleeinfo = enrolleeinfo_json.userRoleId;
        if(localStorage.getItem("enrolleeinfo")){
          _this.isTooltip_show=true;
        }
      },
      l_dial_contact(tel,id){//拨打联系人和工程师开始
        let _this=this;
        let reqData='?number='+tel+'&type=1&orderId='+id;
        this.$confirm('此操作将播打电话, 是否继续?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(() => {
          this.$message({
          type: 'success',
          message: '点击拨打!'
        });
        _this.$http.post(`${_this.$apidomain}/udesk/callcenterAgentCallout${reqData}`).then(function(res){
          if(res.data.code=='0000'){
            _this.$message({
              message: '正在拨打联系人',
              type: 'success'
            });
          }
        }).catch(function(err){
          _this.$message({
            message: '拨打失败,请稍后再试',
            type: 'warning'
          });
        });
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '取消拨打'
        });
      });
      },
      l_dial_masterWorker(tel,id){
        let _this=this;
        let reqData='?number='+tel+'&type=0&orderId='+id;
            this.$confirm('此操作将播打电话, 是否继续?', '', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info',
              center: true
            }).then(() => {
              this.$message({
              type: 'success',
              message: '点击拨打!'
            });
            _this.$http.post(`${_this.$apidomain}/udesk/callcenterAgentCallout${reqData}`).then(function(res){
              if(res.data.code=='0000'){
                _this.$message({
                  message: '正在拨打工程师',
                  type: 'success'
                });
              }
            }).catch(function(err){
              _this.$message({
                message: '拨打失败,请稍后再试',
                type: 'warning'
              });
            });
          }).catch(() => {
              this.$message({
              type: 'info',
              message: '取消拨打'
            });
          });
      },
      //拨打联系人和工程师结束
    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  #app{
    .container{
      overflow: hidden;
      >.selector_list{
        margin-top:0;
       // width:1700px;
        overflow: hidden;
        .selector_listLeft{
          //margin-left: 54px;
          float: left;
          width: 1280px;
          .list{
            padding-top: 5px;
            width: 200px;
            float: left;
            margin-left: 13px;
            .el-input{
              width: 200px;
            }
          }
        }
        .selector_listRight{
          margin: 32px 0 0 5px;
          float: left;
          p{
            width:100%;
            height:18px;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(35,161,254,1);
            line-height:18px;
            img{
              display: inline-block;
              width: 13px;
              margin-left: 10px;
            }
          }

        }
      }
      >.footerBnt{
        margin:20px 0 0 15px;
        width: 100%;
      }
    }
    h3{
      font-weight: normal;
      position:absolute;
      font-size: 14px;
      left:50%;
      top:15px;
      transform: translateX(-50%);
      text-align: center;
    }
  }

  .confirm_btn{
    margin-left:50%;
    transform:translateX(-50%);
  }
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3em;
      border-top:1px solid rgba(0,0,0,.1);
    }
    >li:first-of-type{
      border:none;
    }
    span{
      width:10px;
      /*float:right;*/
      margin-left:20px;
      height:10px;
      display: inline-block;
      background:green;
      border-radius: 50%;
    }
  }
  .el-icon-close{
    z-index: 9999;
    position:absolute;
    top:18%;
    right:4%;
    font-size: 25px;
  }
  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
  }


  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }

  .el-dialog__wrapper{
    z-index: 999999;
  }
  .dable_lsit{
    >tbody{

    }
  }
  #iconS{
    position: relative;
    .iconShow{
      position: absolute;
      right: 0;
      width: 108px;
      background: #fff;
      border: 1px solid #C0CCDA;
      border-radius:4px;
      z-index: 999991 !important;
      li{
        line-height: 36px;
        font-size:13px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
      }
      li:hover{
        background: #23A1FE;
        color: #FFFFFF;
      }

    }
    .iconStyle{
      margin-left:6px ;
      color: #23A1FE;
      cursor: pointer;
    }
  }
#orderId:hover{
    color: #23A1FE;
    cursor: pointer;
    text-decoration: underline;
  }
  #telPhone,#telPhone1{
    font-size:13px;
    font-family:PingFangSC-Regular;
    color:rgba(57,57,57,1);
  }
  #orderId{
    word-break: break-all;
    /*color: #393939;*/
  }
  .activeOrder{
    color:#6C6C6C ;
  }
</style>

