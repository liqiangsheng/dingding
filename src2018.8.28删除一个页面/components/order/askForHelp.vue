<template>
  <div id="app" >
    <!--导航栏-->
    <!--导航栏结束-->
    <!--content内容区域-->
    <!--style="overflow-x: auto"-->
    <div v-show="orderDetailed.isShow" @touchmove.prevent>
      <div class="container">

        <!--创建回访的addComeback.vue组件-->
        <AddComeBack class="add_come_back_component"  v-if="l_addComeBack" :arrdata="l_radio_whole" @addComeBackShow="add_come_back_click_btn_hide"></AddComeBack>

        <!--下拉列表-->

        <div class="selector_list">
          <div class="selector_listLeft">
            <div class="list">
              工单号 :
              <el-input
                placeholder="请填写工单号"
                v-model.trim="inputParams.orderNumber">
              </el-input>
            </div>
            <div class="list">
              求助信息 :
              <el-input
                placeholder="请填写求助信息"
                v-model.trim="inputParams.exceptionRecordRemark">
              </el-input>
            </div>
            <div class="list">
              联系手人机号 :
              <el-input
                placeholder="请填写联系手人机号"
                v-model.trim="inputParams.orderTel">
              </el-input>
            </div>
            <div class="list">
              联系人姓名:
              <el-input
                placeholder="请填写联系人姓名"
                v-model.trim="phoneName">
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
              工程师姓名:
              <el-input
                placeholder="请填写工程师姓名"
                v-model.trim="masterName">
              </el-input>
            </div>
          </div>
          <div class="selector_listLeft" v-show="seachShow">
            <!--分类-->
            <div class="list">
              分类 :
              <!--
              <el-select v-model.trim="orderLabel" placeholder="请选择" @change="selectorOne(orderLabel)">
                <el-option
                  v-for="(item,index) in labeloptions2"
                  :key="index"
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
                           v-if="!channelShow"
                           placeholder = "请选择分类"
              ></el-cascader>

            </div>
            <!--工单状态-->
            <div  v-for="(item,index) in optionList" class="list">
              {{item.name}} :
              <el-select
                v-model.trim="item.SourceTypeValue" :placeholder="'请选择'+item.name"
                @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in item.SourceType"
                  :key="index"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <!--下拉end-->
            </div>

            <div class="list">
              工单渠道:
              <el-input placeholder="请选择工单渠道                ▼"
                        @focus="showChannel" v-if="channelShow"></el-input>
              <el-cascader id="labelId"
                           placeholder="请选择工单渠道"
                           @change="changeSelector2"
                           change-on-select
                           :options="labeloptions"
                           :props="prop"
                           v-if="!channelShow"
              ></el-cascader>
            </div>
            <div class="list">
              下单时间 :
              <el-date-picker
                style="width: 200px !important;"
                v-model.trim="timeQuantum2"
                type="daterange"
                align="right"
                placeholder="请选择下单时间"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="list">
              预约时间 :
              <el-date-picker
                v-model.trim="timeQuantum"
                style="width: 200px !important;"
                type="daterange"
                align="right"
                placeholder="请选择预约时间"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="list">
              完成时间 :
              <el-date-picker
                style="width: 200px !important;"
                type="datetimerange"
                v-model.trim="timeQuantum3"
                :picker-options="pickerOptions2"
                placeholder="请选择完成时间"
                align="right">
              </el-date-picker>
            </div>
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
                  v-for="(items,index) in item.SourceType"
                  :key="index"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="list">
              服务区域 :
              <el-cascader
                placeholder="请选择服务区域"
                @change="changeSelector"
                :options="areaoptions1"
                change-on-select
                @active-item-change="handleItemChange"
                :props="props"
              ></el-cascader>
            </div>
            <div class="list">
              绑定手机号 :
              <el-input
                placeholder="请填写绑定手机号"
                v-model.trim="inputParams.userPhoneNum">
              </el-input>
            </div>
            <div class="list">
              工单来源 :
              <el-select v-model.trim="orderLabe3" placeholder="请选择工单来源" @change="selectorThree(orderLabe3)">
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
        <div class="footerBnt">
          <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
          <el-button  style="width: 100px" @click="reset">重置</el-button>
          <el-button @click="exportOrder"  style="width: 100px;float: right;margin-right:170px" >导出</el-button>
        </div>
      </div>
      <div class="dable_lsit" style=" margin-top:10px;">
        <table  id="table" cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
            </th>
          </tr>
          </thead>
          <tbody>
             <tr v-for="(item,index) in tableList" :key="index">
               <td>{{index+1}}</td>
               <!--工单号-->
               <td>
                 <img v-show="item.emergencyDegree == 1" src="/static/images/jiaji.png" style="display: inline-block;width: 22px;height: 22px;transform: translateY(5px)">
                 <span @click="orderDetails(item,item.id,index)" id="orderId">{{item.id}}</span>
               </td>
               <td>{{item.fLabelBusiness | FLabelBusiness}}</td>
               <td>{{item.exceptionRecordRemark}}</td>
               <td>
                 <span :class="{noMaster:!item.masterName}">{{item.masterName|placeholder}}</span>
                 <span @click="l_dial_masterWorker(item.masterPhoneNum,item.id)" v-if="telMasterWorker(item.state,item.masterPhoneNum) ">
              <Tooltip content="拨打工程师" placement="top-end" hidden>
                <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
              </Tooltip>
                </span>
                 <br>
                 <a id="telPhone1">{{item.masterPhoneNum }}</a><br>
               </td>
               <td>{{item.linkmanArea | placeholder}}</td>
               <td>
                 {{item.linkmanName | placeholder}}
                 <span @click="l_dial_contact(item.userPhoneNum,item.id)" v-if="item.userPhoneNum ">
              <Tooltip content="拨打联系人" placement="top-end" >
                <Icon type="ios-telephone" style="font-size: 20px;"></Icon>
              </Tooltip>
                </span>
                 <br>
                 <span id="telPhone">{{item.userPhoneNum }}</span><br>
               </td>
               <td>{{item.officialPartner|placeholder}}</td>
               <td>{{item.state | BackOrderStatus}}</td>
               <td>{{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</td>
               <td class="icon" id="iconS">
                 <span class="iconStyle" @click="handleClick(item)">解决</span>
                 <span class="iconStyle" @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '03'||item.state == '04'">
                   <li>
                     <span  @click="drawbackIsShow(item)">取消工单</span>
                   </li>
                   <li>
                     <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                   </li>
                   <li>
                     <span  @click="complainFn(item.id)">投诉工单</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>
                 </ul>

                 <!--------------------------------------------------------------------->
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '01'">
                   <li>
                     <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                   </li>
                   <li>
                     <span @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>

                 </ul>
                 <!------------------------>
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '05'||item.state == '21'">

                   <li>
                     <span @click="yuYueTimeIsShow(item.id)">预约时间</span>
                   </li>
                   <li>
                     <span @click="reminder(item)"> 催单</span>
                   </li>
                   <li>
                     <span  @click="unusual(item.id)">工单报备</span>
                   </li>
                   <li>
                     <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                   </li>
                   <li>
                     <span  @click="complainFn(item.id)">投诉工单</span>
                   </li>
                   <li>
                     <span @click="masterImposeIsShow(item)">罚款工程师</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>
                 </ul>

                 <!--------------------------------------------------------------------->
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '06'">
                   <li>
                     <span @click="reminder(item)">催单</span>
                   </li>
                   <li>
                     <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                   </li>
                   <li>
                     <span  @click="unusual(item.id)">工单报备</span>
                   </li>
                   <li>
                     <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                   </li>
                   <li>
                     <span  @click="complainFn(item.id)">投诉工单</span>
                   </li>
                   <li>
                     <span @click="masterImposeIsShow(item)">罚款工程师</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>
                 </ul>
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '07'">
                   <li>
                     <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                   </li>
                   <li>
                     <span  @click="unusual(item.id)">工单报备</span>
                   </li>
                   <li>
                     <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                   </li>
                   <li>
                     <span  @click="complainFn(item.id)">投诉工单</span>
                   </li>

                   <li>
                     <span @click="masterImposeIsShow(item)">罚款工程师</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>
                 </ul>
                 <!--------------------------------------------------------------------->
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '12'||item.state == '11'||item.state == '09'||item.state == '13'||item.state == '14'||item.state == '15'||item.state == '16'||item.state == '17'||item.state == '18'||item.state == '19'">
                   <li>
                     <span  @click="complainFn(item.id)">投诉工单</span>
                   </li>
                   <li>
                     <span @click="masterImposeIsShow(item)">罚款工程师</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>
                 </ul>
                 <!--------------------------------------------------------------------->
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '08'||item.state == '20'">
                   <li>
                     <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                   </li>
                   <li>
                     <span  @click="unusual(item.id)">工单报备</span>
                   </li>
                   <li>
                     <span @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                   </li>
                   <li>
                     <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                   </li>
                   <li>
                     <span  @click="complainFn(item.id)">投诉工单</span>
                   </li>
                   <li>
                     <span @click="masterImposeIsShow(item)">罚款工程师</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>
                 </ul>
                 <!--------------------------------------------------------------------->
                 <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '10'">
                   <li>
                     <span @click="addSaverProduct(item,isAddProduct)">新增服务产品</span>
                   </li>
                   <li>
                     <span  @click="complainFn(item.id)">投诉工单</span>
                   </li>
                   <li>
                     <span @click="masterImposeIsShow(item)">罚款工程师</span>
                   </li>
                   <li>
                     <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                   </li>
                 </ul>

               </td>
             </tr>
          </tbody>
        </table>
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
    <div class="alert" v-if="isReplaceAlert.isShow" style="z-index: 10000">
      <replace-master :isReplaceAlert="isReplaceAlert" :quiry="quiry"></replace-master>
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
    <el-dialog  style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">
      <ul class="alert_forbidden_text">
        <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model.trim="textareaContent">
        </textarea>
      <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
    <!--工单详情-->
    <order-details
      :yuYueTimeIsShow="yuYueTimeIsShow"
      :orderDetailed="orderDetailed"
      :quiry="quiry"
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
    <!--工单详情end-->

    <!--//改约时间-->
    <div class="alert" v-if="time.isShow" >
      <changTime :time="time" :quiry="quiry"  style="z-index: 10000;"></changTime>
    </div>
    <!--//改约时间den-->
    <!--处理工单-->
    <div class="alert" v-if="isDispose.isShow" >
      <dispose :addRemarksObj="isDispose" :quiry="quiry"  style="z-index: 10000;"></dispose>
    </div>
    <!--处理工单-->
    <!--预约时间-->
    <div class="alert" v-if="time1.isShow" >
      <yuyueTime :time1="time1" :quiry="quiry"  style="z-index: 10000;"></yuyueTime>
    </div>
    <!--添加备注-->
    <add-remarks :addRemarksObj="addRemarksObj"></add-remarks>
    <!--添加备注-->

    <!--退款-->
    <drawback :isDrawback="isDrawback" :data="drawbackData" :quiry="quiry" v-if="isDrawback.isShow" @isClosed="isClosed">

    </drawback>
    <!--退款end-->

    <!--工程师罚款 开始-->
    <el-dialog style="z-index:999999" :visible.sync="masterImposeData.masterImpose" size="tiny">
      <h3>{{masterImposeData.title}}</h3>
      <ul class="alert_forbidden_text">
        <li>
          工单总金额：{{masterImposeData.total}}
        </li>
        <li>
          罚款金额：
          <el-input style="width:50%"
                    size="small"
                    placeholder="请填写内容"
                    v-model.trim="masterImposeData.amount">

          </el-input>

        </li>
        <li v-for="(item,index) in masterImposeData.alertForbiddenList"  @click="masterImposeSelector(item)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model.trim="masterImposeData.textareaContent">

        </textarea>

      <el-button style="position:absolute; width:220px; right:50%; transform:translate(50%,-50% )"  @click="masterImposeOperate(masterImposeData)" type="primary">确定</el-button>
    </el-dialog>
    <!--工程师罚款 end-->
    <!--新增服务产品 start-->
    <addseve-product :isAddProduct="isAddProduct" v-if="isAddProduct.isShow"></addseve-product>
    <!--新增服务产品 end-->
    <!--投诉工单 start-->

    <complain-order :complain="complain" ></complain-order>

    <!--投诉工单 end-->
    <!--工单报备 start-->
    <complain-order :complain="unusualOrder" ></complain-order>
    <!--工单报备 end-->
    <!--新建工单start-->
    <div class="alert" v-if="isAddorder.isShow">
      <add-order :isAddorder="isAddorder" :quiry="quiry">
      </add-order>
    </div>
    <div class="alert" v-if="isDownloadOrder.isShow">
      <download-order :isDownloadOrder="isDownloadOrder" >
      </download-order>
    </div>
    <pass-alert v-if="isShow" @isClose="isCloses" :childrenInfo="childrenInfo" :query="quiry"></pass-alert>
  </div>
</template>
<script>
  import {
    addDialingMaster,
    addProductFilter,
    buttonStatus,
    cancelOrderFilter,
    changeTimeFilter,
    getThis,           //获取this
    sizeChange,        //每页显示多少条
    currentChange,     //切换分页
    firsPages,         //首页
    lastPages,         //尾页
    getTableListData,
    inputData,
    masterFilter,
    masterOper,
    sendOrderFilter,
    ubsualButton
  } from "./js/pagingPages"
  import addAlert from "./orderAllCommonts/alertInfo";
  import passAlert from "./orderAllCommonts/master_alert/passAlert.vue"
  import orderNav from "./nav/nav"
  import orderDetails from "./orderAllCommonts/orderDetails"
  import replaceMaster from "./orderAllCommonts/replaceMaster_alert"
  import changTime from "./orderAllCommonts/master_alert/changeTime"
  import drawback from "./orderAllCommonts/master_alert/drawback"
  import addRemarks from "./orderAllCommonts/master_alert/addRemarks"
  import complainOrder from "@/components/order/orderAllCommonts/complain"
  import addseveProduct from "@/components/order/orderAllCommonts/addSaverProduct"
  import downloadOrder from "./orderAllCommonts/downloadOrder"
  import dispose from "./orderAllCommonts/master_alert/dispose.vue"
  import yuyueTime from "./orderAllCommonts/master_alert/yuyueTime.vue"
  //2017-11-29,lee添加，全部工单的创建回访弹出框组件，adComeBack.vue
  import AddComeBack from './orderAllCommonts/addComeBack.vue'
  //2017-12-22,lee添加，全部工单的通话组件
  import '../../../static/udesk/callcenter-component'
  //2017-12-25,lee添加，权限分配引入
  export default {

    components:{
      addRemarks,
      complainOrder,
      addseveProduct,
      drawback,
      replaceMaster,
      orderNav,
      orderDetails,
      changTime,
      addAlert,
      AddComeBack,
      downloadOrder,
      dispose,
      yuyueTime,
      passAlert   //处理和待审核里的通过弹窗
    },
    data() {
      return {
        isShow:false,
        childrenInfo:{},
        tableLists: [
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
        ],          //表格数据
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
        isDispose:{ //处理工单
          title:"处理",
          isShow:false,
        },
        nameSize:"收起所有筛选",
        seachShow:true,
        jiantou:"./static/images/shang.png",
        //工单来源
        orderLabe3:"",
        numId1:'',     //选中的工单来源
        orderSourceShowOne:[
          {
            id:"",
            name:"--请选择--"
          },
          {
            id:"0",
            name:"用户下单"
          },
          {
            id:"1",
            name:"渠道下单"
          },
          {
            id:"2",
            name:"推荐用户下单"
          },
          {
            id:"3",
            name:"平台自建"
          },
          {
            id:"4",
            name:"渠道自建"
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
        officialPartner:'', //工单渠道
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
        phoneName:"", //联系人
        orderName:"0,2,3,4,5,6,7",
        orderTypeOne:"", //工单类型
        orderType:[
          {
            id:"0,2,3,4,5,6,7",
            name:"--请选择--"
          },
          {
            id:"0",
            name:"正常工单"
          },
          {
            id:"2",
            name:"一口价工单"
          },
          {
            id:"3",
            name:"定价工单"
          },
          {
            id:"4",
            name:"预约工单"
          },
          {
            id:"5",
            name:"企业工单"
          },
          {
            id:"6",
            name:"工程师荐单"
          },
          {
            id:"7",
            name:"网点荐单"
          },

        ],//工单类型
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
        drawbackData:"",
        //画图数据start
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
        timeQuantum3: [],//完成时间
        completedTimeStartStr: '',//完成时间
        completedTimeEndStr: "",//完成时间
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

            }
          ]
        },
        //
        complain:{
          isShow:false,
          id:"",
          status:"0",
          url:"/order/addcomplain",
          title:"投诉工单",
        },
        unusualOrder:{
          isShow:false,
          id:"",
          status:"0",
          url:"/order/changeabnormalhangup",
          title:"工单报备",
        },
        tableList:[],
        //新建工单；
        isAddorder:{
          isShow:false,
          title: "新建工单",
        },
        //下载工单；
        isDownloadOrder:{
          isShow:false,
          title: "下载工单",
        },
        //区域id
        areaId:"",
        //新建工单；end
        //工单详情Data
        orderDetailed:{
          isShow:true,
          title:"基本信息",

        },
        //工单详情Data   End
        //添加备注
        addRemarksObj:{
          title:"添加备注",
          isShow:false,
        },
        //添加备注end
        //退款数据
        isDrawback:{
          isShow:false ,
          title:"工单取消/退款"
        },
        //退款end
        //改约时间 start
        time:{
          isShow:false,
          title:"改约时间",
        },
        time1:{
          isShow:false,
          title:"预约时间",
        },
        //改约时间 end
        //工程师罚款数据 start
        masterImposeData:{
          masterImpose:false,
          total:"",   //工单总金额
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
          exceptionRecordRemark:'',    //求助信息
          orderNumber: "",//工单号
          orderTel: "",//下单手机号
          userPhoneNum:"",
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
        alertData:"",
        isAlert: this.$store.state.isAlert,
        isActive: "0",   //选中的
        areaoptions1: [],
        props: {
          value: 'label',
          children: 'cities',
        },
        city: [
          {
            name: "所属城市",
            key: "cityId",
            SourceTypeValue: '', //选中后的
            SourceType: []
          }
        ],
        optionList: [       //下拉列表数据
          {
            name: "工单状态",
            key: "orderStatus",
            SourceTypeValue: '', //选中后的
            SourceType:this.$store.state.orderStatusOrderAll,
          }
        ],
        selectorBehindObj: {},
        theadsName: [
          '序号',
          '工单号',
          '分类',
          '求助信息',
          '工程师信息',
          '服务区域',
          '客户信息',
          '渠道信息',
          '状态',
          "创建时间",
          '操作'
        ],

        //排序start
        state:true,
        key:"orderByClause",
        flag:false,
        isS:false,
        sortData: [
          { //预约时间
            index:4,
            sortAscendingValues:[" appointment_datetime asc "],  //升序
            gradeDownValues:[" appointment_datetime desc "],     //降序
          },
          { //下单时间
            index: 8,
            sortAscendingValues:[" id asc "],  //升序
            gradeDownValues:[" id desc "],     //降序
          },
          { //工程师信息   中文需要按照A-Z排序
            index: 7,
            sortAscendingValues: [" convert (master_name using gbk) asc "],  //升序
            gradeDownValues: [" convert (master_name using gbk) desc "],     //降序
          }
        ],
        //排序end
        tableListData: {},          //表格数据
        showPages: 1,
        pic:"",
        currentPageSize: 20,
        total: 0,
        pageTotal: 0,
        addDataObj: {       //添加工程师详情
          title: "工程师提点设置",
          serveId: "",
          options2: [],
          props: {
            value: 'label',
            children: 'cities',
          },
          inputs:inputData,
          selectorBehindObj: {},
//            添加工程师详情结束
        },
        alertDataInfo:"",


        l_addComeBack:false,//给addComeBack组件的props来显示
        l_radio_whole:[],//创建回访
        isCheckboxList:[], //存储多选的false

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
      },
      "$store.state.orderDetailiD.isBool":function(newl,oldl){ //监听配件详情配件列表传过来的id
        this.orderDetailed.isShow = newl;
      },
    },
    created(){
      if(this.$store.state.orderDetailiD.mainOrderId){
        this.orderDetailed.orderId = this.$store.state.orderDetailiD.mainOrderId;
        this.orderDetailed.isShow = this.$store.state.orderDetailiD.isBool;
      }else{
        this.orderDetailed.orderId = "";
        this.orderDetailed.isShow = true;
      }
      this.$store.commit('getSort',"");   //排序状态清空
      let siteUrl = this.$apidomain + "/common/findsite"; //全部网点
      this.$http.get(siteUrl).then(res=>{
        if(res.data.code === "0000"){
          this.siteArr = [{name:"--请选择--",id:""},{name:"--全部网点--",id:"1"},...res.data.result];
        }else{
          this.$queryFun.successAlert.call(this,res.data.error)
        }
      })
      this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]
      this.labeloptions.forEach((obj,i)=>{
        this.$set(obj,'childChannel',[])
      })
      getThis(this);

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
        r.data.result.forEach((v, i) => {
          let urlTwo = this.$common.apidomain + '/articleinfo/findlabelbusinessbyflabel?id=' + v.id;
          this.$http.get(urlTwo).then(res => {
            if (res.data.code === "0000") {
              this.labeloptions3.push(res.data.result)
            }
          })
        })
        this.labeloptions3 = [{a:'',b:'--请选择--'},...this.labeloptions3];
      });
    },
    mounted() {
      this.$nextTick(function () {
        this.isTooltip();
      });
    },
    destroyed(){

    },
    methods: {
      more(v,i){//更多显示
        this.tableList.forEach((item,index)=>{
          if(i == index){
            item.iconShow = !item.iconShow;
          }else{
            item.iconShow = false;
          }
        })
        this.$set(this.tableList,i,this.tableList[i])

      },
      handleClick(v){ //处理显示
        this.isShow = true;
        this.childrenInfo = {
          name:'处理',
          id:'帮助处理',
          data:v,
        }
      },
      isCloses(v){
        this.isShow = v;
      },
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
      //分类
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
      },
      siteClick(v){//网点选择
        this.siteArr.forEach((item,index)=>{
          if(v == item.name){
            this.siteID = item.id;
          }
        })
      },
      isClosed(v){
        this.isDrawback.isShow=v;
      },
//      styleShowOne(v){
//
//      },
      outHide(v,i){ //鼠标离开
        this.tableList.forEach((item,index)=>{
          if(i == index){
            item.iconShow = false;
          }else{
            item.iconShow = false;
          }
        })
        this.$set(this.tableList,i,this.tableList[i])
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
          orderNumber: "",//工单号
          orderTel: "",//下单手机号
          userPhoneNum:"",
          thirdOrderId:'',  //渠道商订单号
          exceptionRecordRemark:""
        }
        this.isAppointment1 = "";
        this.isAppointment = "";
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
        this.siteName = "";//网点名字 :
        this.siteID = "";//网点ID :
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
          this.nameSize = "收起所有筛选";
          this.jiantou = "./static/images/shang.png";
        }else{
          this.nameSize = "展开所有筛选";
          this.jiantou = "./static/images/xia.png";
        }

      },
      //工单来源下拉
      selectorThree(item){
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
      orderTypeOneClick(item){ //工单类型
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
//新增服务产品 start
      addSaverProduct(item,isAddProduct){
        isAddProduct.id = item.id;
        isAddProduct.data = item;
        isAddProduct.isShow=true;
      },
      //工单详情页面添加服务产品
      addProduct(childData){
        this.isAddProduct.id = childData.id;
        this.isAddProduct.data = childData;
        this.isAddProduct.isShow=true;
      },
      //新增服务产品 end
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
      quiry(){

        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');
        }
        if (this.timeQuantum3.length > 0) {
          this.completedTimeStartStr = this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD HH:mm:ss');
          this.completedTimeEndStr = this.$moment(this.timeQuantum3[1]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.timeQuantum3[1]).format('YYYY-MM-DD HH:mm:ss');
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        if(this.completedTimeStartStr === "Invalid date"){
          this.completedTimeStartStr = "";
        }else {
          this.completedTimeStartStr = this.completedTimeStartStr;
        }
        if(this.completedTimeEndStr === "Invalid date"){
          this.completedTimeEndStr = "";
        }else {
          this.completedTimeEndStr = this.completedTimeEndStr;
        }
        return{params:{
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
          "isAppointment":this.isAppointment,      //预约时间选无
          "id":this.selectorBehindObj.orderNumber, //工单号
          'exceptionRecordRemark':this.selectorBehindObj.exceptionRecordRemark, //求助信息
          "thirdOrderId":this.selectorBehindObj.thirdOrderId, //渠道商订单号
          "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单绑定手机号码
          "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单联系人手机号码
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "appointmentDatetime":this.selectorBehindObj.makeTime,   //预约时间
          "createTime":this.selectorBehindObj.placeTime,     //    下单时间
          "state":this.selectorBehindObj.orderStatus,      //工单状态
          //"officialPartnerId":this.selectorBehindObj.sourceId,  //渠道
          "officialPartnerId":this.channelID,  //主渠道ID
          'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
          "appointmentDatetimeStartStr":this.statisticsDateStartStr,   //预约开始时间
          "appointmentDatetimeEndStr":this.statisticsDateEndStr,       //预约结束时间
          "createTimeStartStr":this.statisticsDateStartStr2,      //下单开始时间
          "createTimeEndStr":this.statisticsDateEndStr2,          //下单结束时间
          //"fLabelBusiness" : this.selone, //分类
          'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
          "type":this.orderName, // 工单类型
          "linkmanName":this.phoneName, // 联系人
          "masterName":this.masterName, // 工程师姓名
          "masterPhoneNum":this.masterPhone, // 工程师手机
          "completedTimeStartStr": this.completedTimeStartStr, // 完成开始时间
          "completedTimeEndStr": this.completedTimeEndStr,// 完成结束时间
          "channelWarranty":this.selectQuality ,                                // 质保
          "source":this.numId1,                                            // 工单来源
          "siteId":this.siteID, // 网点名称
        }
        };
      },
      //显示新建工单；
      addOrderIs(){
        this.isAddorder.isShow=true;
      },
      //显示新建工单；end

      //导出start
      exportOrder(){
        if(this.timeQuantum.length>0){
          if(this.statisticsDateStartStr == "Invalid date"||this.statisticsDateStartStr == ""){
            this.statisticsDateStartStr = "";
            this.statisticsDateEndStr = "";
          }else {
            this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
            this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
          }

        }else{
          this.statisticsDateStartStr = "";
          this.statisticsDateEndStr = "";
        }
        if(this.timeQuantum2.length>0) {
          if(this.statisticsDateStartStr2 == "Invalid date"||this.statisticsDateStartStr2 == ""){
            this.statisticsDateStartStr2 = "";
            this.statisticsDateEndStr2 = "";
          }else {
            this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
            this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');
          }
        }else{
          this.statisticsDateStartStr2 = "";
          this.statisticsDateEndStr2 = "";
        }
        if (this.timeQuantum3.length > 0) {
          if(this.completedTimeStartStr == "Invalid date"||this.completedTimeStartStr == ""){
            this.completedTimeStartStr = "";
            this.completedTimeEndStr = "";
          }else {
            this.completedTimeStartStr = this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD HH:mm:ss');
            this.completedTimeEndStr = this.$moment(this.timeQuantum3[1]).format('YYYY-MM-DD HH:mm:ss');
          }
        }else{
          this.completedTimeStartStr = "";
          this.completedTimeEndStr = "";
        }
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        // post 用
        let  obj={
          "isAppointment" :this.isAppointment,
          "id":this.selectorBehindObj.orderNumber, //工单号
          "thirdOrderId":this.selectorBehindObj.thirdOrderId, //渠道商订单号
          "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单绑定手机号码
          "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单联系人手机号码
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "appointmentDatetime":this.selectorBehindObj.makeTime,   //预约时间
          "createTime":this.selectorBehindObj.placeTime,     //    下单时间
          "state":this.selectorBehindObj.orderStatus,      //工单状态
          "officialPartnerId":this.channelID,  //主渠道ID
          'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
          "appointmentDatetimeStartStr":this.statisticsDateStartStr,   //预约开始时间
          "appointmentDatetimeEndStr":this.statisticsDateEndStr,       //预约结束时间
          "createTimeStartStr":this.statisticsDateStartStr2,      //下单开始时间
          "createTimeEndStr":this.statisticsDateEndStr2,          //下单结束时间
          'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
          //"fLabelBusiness" : this.selone, //分类
          "type":this.orderName, // 工单类型
          "linkmanName":this.phoneName, // 联系人
          "masterName":this.masterName, // 工程师姓名
          "masterPhoneNum":this.masterPhone, // 工程师手机
          "completedTimeStartStr": this.completedTimeStartStr, // 完成开始时间
          "completedTimeEndStr": this.completedTimeEndStr,// 完成结束时间
          "channelWarranty":this.selectQuality ,                                // 质保
          "source":this.numId1,                                            // 工单来源
          "siteId":this.siteID, // 网点名称
        }
        for(let key in obj){
          if(!obj[key]){
            obj[key] = null;
          }
        }
        //QS下载
        let strUrl = `${this.$reportdomain}/order/download?`;
        let data = strUrl+this.$Qs.stringify(obj,{skipNulls:true});
        window.open(data, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')

      },
      //导出end
      //下载工单；
      downloadOrder(){
        this.isDownloadOrder.isShow=true;
      },
      //下载工单；end
      //处理工单
      disposeOrder(item,v){
        this.isDispose.orderId=item;
        this.isDispose.isShow=true;
        this.isDispose.state=v.state;
      },
      //预约时间
      yuYueTimeIsShow(item){
        this.time1.orderId=item;
        this.time1.isShow=true;
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
      //投诉工单 start
      complainFn(id){
        this.complain.isShow=true;
        this.complain.id=id;
      },
      //投诉工单 end
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
        this.isReplaceAlert.isSiteShow=true;
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

        let url=`${this.$apidomain}/order/punishmentmaster`;

        masterOper(item,url)

      },

      masterImposeSelector(item,index,textareaContent){

        this.masterImposeData.alertForbiddenList.forEach((v,i)=>{
          this.masterImposeData.alertForbiddenList[i].selector=false;
        });

        item.selector=!item.selector
      },
      //工程师罚款结束
      //工单报备 start
      unusual(id){
        this.unusualOrder.isShow=true;
        this.unusualOrder.id=id;
      },
      //工单报备 end
      //工单详情操作

      orderDetails(item,id,i){
        this.tableList.forEach((item,index)=>{
          if(i == index){
            item.styleShow = true;
          }
        })
        this.tableList.forEach((item,index)=>{
          if(i == index){
            item.borderShow = !item.borderShow;
          }else{
            item.borderShow = false;
          }
        })
        this.$set(this.tableList,i,this.tableList[i])
        this.orderDetailed.data=item;
        this.orderDetailed.orderId=id;
        this.orderDetailed.isShow=!this.orderDetailed.isShow;
        this.$store.commit("orderDetailsState",item.state);   //通过vux 传递数据
      },
      //工单详情操作end

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
        })

      },

      batchOrder(list){
        let newAr=[];
        list.forEach(v=>{
          if(v.isCheckboxList){
            newAr.push(v)
          }
        });
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
        sizeChange(val)
      },
      handleCurrentChange(val) {
        currentChange(val)    //切换页数
      },
      firstPage(){
        firsPages()           //首页
      },
      lasePage(){
        lastPages()          //尾页
      },
      handleItemChange(val) {
      },
      changeSelector(value){      //区域
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
        let url=common.apidomain+"/manage/order/findUntreatedAsk";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          console.log(data,'问题求助数据')
          if(data.code==='0000'){
            getTableListData(data,this.isCheckboxList,this);
          }else{
            alert(data.error)
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
          enrolleeinfo_json=JSON.parse(sessionStorage.getItem("enrolleeinfo")),
          enrolleeinfo = enrolleeinfo_json[0].userRoleId;
        if(sessionStorage.getItem("enrolleeinfo")){
          _this.isTooltip_show=true;
        }
      },
      l_dial_contact(tel,id){
        /*
         * 拨打联系人和工程师
         * type:post
         * testUrl:http://192.168.20.42:801/udesk/callcenterAgentCallout
         * url:http://admin.test.dingdingkuaixiu.com/udesk/callcenterAgentCallout
         * tel //159 1234 5678 点谁就发送谁的手机号
         * id //201712111706310088213867 工单号
         * res: '0000'//成功
         * */
        var _this=this;

        let reqData='?number='+tel+'&type=1&orderId='+id;
        this.$confirm('此操作将播打电话, 是否继续?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(function(){
          _this.$message({
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
        }).catch(function(){
          _this.$message({
            type: 'info',
            message: '取消拨打'
          });
        });
      },

      l_dial_masterWorker(tel,id){
        var _this=this;
        let reqData='?number='+tel+'&type=0&orderId='+id;
        this.$confirm('此操作将播打电话, 是否继续?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(function(){
          _this.$message({
            type: 'success',
            message: '点击拨打!'
          });
          _this.$http.post(`${_this.$apidomain}/udesk/callcenterAgentCallout${reqData}`).then(function(res){
            if(res.data.code=='0000'){
              _this.$message({
                message: '正在拨打工程师',
                type: 'success'
              });
            }else{
              this.$queryFun.successAlert.call(this,res.data.error)
            }
          }).catch(function(err){
            _this.$message({
              message: '拨打失败,请稍后再试',
              type: 'warning'
            });
          });
        }).catch(function(){
          _this.$message({
            type: 'info',
            message: '取消拨打'
          });
        });
      },

      add_come_back_click_btn_show(){//创建回访按钮
        //点击创建按钮就去遍历添加为true的ID(工单号)
        var _this=this,arrData=[];
        _this.isCheckboxList.forEach((arr,index)=>{
          if(_this.isCheckboxList[index]==true){
            arrData.push(_this.tableList[index].id);
          }
        });

        if(arrData.length==0){
          _this.alertMessage(_this,'请勾选要创建的回访','warning');
          return false;
        }else{
          _this.alertMessage(_this,'您已成功创建'+arrData.length+'条回访','success');
          _this.l_radio_whole=arrData; //如果数组有值就给data里面的数组然后proops传给addComeBack.vue组件
        }
        this.l_addComeBack=true;//给addComeBack组件是否显示
      },
      add_come_back_click_btn_hide(hide){//创建回访按钮
        this.l_addComeBack=hide;
      },
      alertMessage(l_this,msg,type1){
        let _this=l_this;
        _this.$message({
          message: msg,
          type: type1
        });
      },
      callComponent(token1){ //通话组件
        new UdeskCallcenterComponent({
          container: document.body,    //组件的容器
          token: token1,           //通过登录接口获取的客服token
          subDomain: '177dd',          //在udesk注册的二级域名，例如登录地址是demo.udesk.cn，这里填demo
          showManualScreenPop:true,    //是否开启‘手动弹屏’功能
          onScreenPop: function(conversation){
          },  //弹屏事件触发的方法
          onHangup: function(conversation){
          }
        });
      },

    },
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";

  @import "../../../static/udesk/css/callcenter-component.css";

  #app{
    .container{
      overflow: hidden;
      >.selector_list{
        margin-top:0;
        //width:1600px;
        overflow: hidden;
        .selector_listLeft{
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
    table{

    }
    >tbody{
      tr:nth-of-type(1){
        border:1px red solid;
      }
      .trActive{
        border: 1px solid #23A1FE !important;
      }
    }
  }
  .alert_forbidden_area{
    width:100%;
    height:100px;
    border:none;
    margin-bottom:30px;
    border:1px solid #ccc;
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
  #telPhone1:hover,#telPhone:hover,#orderId:hover{
    /*color: #23A1FE;
    cursor: pointer;
    text-decoration: underline;*/
  }
  #orderId{
    word-break: break-all;
    /*color: #393939;*/
  }
  .activeOrder{
    color:#6C6C6C ;

  }
  /*.trActive{*/
  /*border: 1px solid #23A1FE !important;*/
  /*}*/
  #telPhone,#telPhone1{
    font-size:13px;
    font-family:PingFangSC-Regular;
    color:rgba(57,57,57,1);
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
</style>
<style>
  .el-notification{
    z-index: 99999 !important;
    top:20px !important;
  }
  .has-sidebar{
    z-index: 999991 !important;
  }
</style>

