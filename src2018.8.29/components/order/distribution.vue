<template>
                                                                      <!--待分配工单page-->
  <div id="app">
    <!--导航栏-->
    <!--导航栏结束-->
    <div>
    <!--content内容区域-->
    <div v-show="orderDetailed.isShow" class="container">
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
            联系人手机号 :
            <el-input
              placeholder="请填写联系人手机号"
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
                         placeholder = "请选择分类"
                         :options="labeloptions3"
                         change-on-select
                         @active-item-change="handleItemChange"
                         :props="props1"
                         v-if="!channelShow"
            ></el-cascader>
          </div>
          <!-- 工单渠道-->
          <div class="list">
            工单渠道:
            <!--expand-trigger="hover"-->
            <el-input placeholder="请选择工单渠道                ▼"
                      @focus="showChannel" v-if="channelShow"></el-input>
            <el-cascader id="labelId"
                         placeholder="请选择工单渠道"
                         @change="changeSelector2"
                         change-on-select
                         :options="labeloptions"
                         v-if="!channelShow"
                         :props="prop"></el-cascader>
          </div>
          <!--工单类型-->
          <div class="list">
            工单类型 :
            <el-select v-model.trim="orderLabe2" placeholder="请选择工单类型" @change="selectorTwo(orderLabe2)">
              <el-option
                v-for="item in orderTypeOne"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
        </div>

          <div class="selector_listLeft" v-show="seachShow">
            <div class="list">
              下单时间 :
              <el-date-picker
                v-model.trim="timeQuantum2"
                type="daterange"
                align="right"
                placeholder="请选择下单时间"
                :picker-options="pickerOptions2">
              </el-date-picker>
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
            <div class="list" v-for="(item,index) in city" >
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
            <div class="list" style="padding-top:4px">
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
            <!--工单来源-->
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
          <p @click="jiantouClick">{{nameSize}}  <img :src="jiantou"></p>
        </div>
      </div>
      <!--下拉列表结束-->

      <!--查询按钮-->
      <div class="footerBnt">
        <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
        <el-button  style="width: 100px" @click="reset">重置</el-button>
        <el-button style="width:100px;float: right;margin-right: 150px;height: 36px" @click="batchOrder(tableList)" size="large" v-show="$isButtonObj('bn-order-all-batch')">批量派单</el-button>
        <el-button style="width:100px;float: right;margin-right: 10px" @click="exportOrder">导出</el-button>
      </div>
      <!--查询按钮结束-->

      <!--table表格-->
      <div class="dable_lsit" >
        <!--表格数据-->
        <!--<div style="overflow-x: auto;width:100%">-->
        <table cellSpacing="0px" id="table" cellpadding="0">
          <thead>
          <tr class="theads">
            <th class="multiple">
              <el-checkbox v-model.trim="checked" @change="wholeSelector(tableList,checked)"></el-checkbox>
            </th>
            <th v-for="(item,index) in theadsName">{{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableList" :class="[{activeOrder:item.styleShow==true},{ trActive:item.borderShow == true}]" >
            <td>
              <el-checkbox v-model.trim="isCheckboxList[index]" @change="isCheckbox(item,index)"></el-checkbox>
            </td>
            <!--序号-->
            <td>
              {{index+1}}
            </td>
            <!--工单号-->
            <td >
              <img v-show="item.emergencyDegree == 1" src="/static/images/jiaji.png" style="display: inline-block;width: 22px;height: 22px;transform: translateY(5px)">
              <span @click="orderDetails(item,item.id,index)" id="orderId" style="word-break: break-all;">{{item.id|placeholder}}</span>
            </td>
            <!--工单类型-->
            <td>
              <img style="display: inline-block;width: 55px;height: 26px" :src="item.type|orderType1">
            </td>
            <!--分类-->
            <td>
              {{item.fLabelBusiness|FLabelBusinessShow}}
            </td>
            <!--预约时间-->
            <td style="width: 160px">
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}} <span v-show="item.appointmentDatetime">至{{( Date.parse(new Date(item.appointmentDatetime))+3600000)|moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </td>
            <!--客户信息-->
            <td >
              {{item.linkmanName | placeholder}}
              <span  @click="l_dial_contact(item.linkmanPhoneNum,item.id)" v-if="item.linkmanPhoneNum ">
                <Tooltip content="拨打联系人" placement="top-end">
                  <Icon type="ios-telephone" style="font-size: 20px;"></Icon>
                </Tooltip>
              </span>
              <br>
              <a id="telPhone">{{item.linkmanPhoneNum}}</a><br>

            </td>
<!--服务区域-->
            <td>
              {{item.linkmanArea | placeholder}}
            </td>

            <!--下单时间-->
            <td style="width: 110px">
              {{item.createTime|moment('YYYY-MM-DD HH:mm:ss') | placeholder}}
            </td>
            <!--工单来源-->

            <td>
              {{item.source|orderSourceShow}}
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
              <div v-if="item.state == '03'||item.state == '04'">
                <span class="iconStyle"  @click="replaceMaster(item,index,item.id,true)">派单</span>
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span  class="iconStyle"  @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
              </div>
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
              <div v-if="item.state == '02'">
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle" @click="orderDetails(item,item.id,index)">工单详情</span>
              </div>
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '01'">
                <span class="iconStyle" @click="replaceMaster(item,index,item.id,true)">派单</span>
                <span  class="iconStyle"  @click="drawbackIsShow(item)">取消工单</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
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
              <div v-if="item.state == '05'||item.state == '21'">
                <span class="iconStyle" @click="replaceMaster(item,index,item.id,true)">派单</span>
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span  class="iconStyle"  @click="drawbackIsShow(item)">取消工单</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
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
              <div v-if="item.state == '06'||item.state == '07'">
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span  class="iconStyle"  @click="drawbackIsShow(item)">取消</span>
                <span class="iconStyle" @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
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
              <div v-if="item.state == '09'">
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle"  @click="disposeOrder(item.id,item)">处理</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <div v-if="item.state == '13'||item.state == '14'||item.state == '15'||item.state == '16'||item.state == '17'||item.state == '18'">
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
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
              <div v-if="item.state == '08'">
                <span class="iconStyle" @click="disposeOrder(item.id,item)">处理</span>
                <span  class="iconStyle"  @click="drawbackIsShow(item)">取消</span>
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
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
              <div v-if="item.state == '10'||item.state == '11'">
                <span  class="iconStyle"  @click="drawbackIsShow(item)">取消</span>
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span  class="iconStyle" @click="unusual(item.id)">工单报备</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
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
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '12'||item.state == '19'">
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span  class="iconStyle" @click="unusual(item.id)">工单报备</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>

              <div v-if="item.state == '20'">
                <!--详情-->
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle" @click="drawbackIsShow(item)">取消工单</span>
                <span class="iconStyle" @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
              </div>

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
      <!--预约时间-->
      <div class="alert" v-if="time1.isShow" >
        <yuyueTime :time1="time1" :quiry="quiry"  style="z-index: 10000;"></yuyueTime>
      </div>
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
        <li v-for="(item,index) in alertForbiddenList"  @click="selectorForbidden(item,index)">
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

    <!--添加备注-->
    <add-remarks :addRemarksObj="addRemarksObj"></add-remarks>
    <!--添加备注-->
    <!--投诉工单 start-->

    <complain-order :complain="complain" ></complain-order>

    <!--投诉工单 end-->
    <!--工单报备 start-->
      <complain-order :complain="unusualOrder" ></complain-order>
    <!--工单报备 end-->

    <!--退款-->
      <drawback :isDrawback="isDrawback" :data="drawbackData" :quiry="quiry" v-if="isDrawback.isShow" @isClosed="isClosed">

      </drawback>
    <!--退款end-->

    <!--工程师罚款 开始-->
    <el-dialog style="z-index:999999"  :visible.sync="masterImposeData.masterImpose" size="tiny">
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
        <li v-for="(item,index) in masterImposeData.alertForbiddenList" @click="masterImposeSelector(item)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model.trim="masterImposeData.textareaContent">
        </textarea>
      <el-button style="position:relative; left:50%; transform:translateX(-50%)"  @click="masterImposeOperate(masterImposeData)" type="primary">确定</el-button>
    </el-dialog>
    <!--工程师罚款 end-->
    <!--新增服务产品 start-->
  	<addseve-product :isAddProduct="isAddProduct" v-if="isAddProduct.isShow"></addseve-product>
    <!--新增服务产品 end-->
    <!--新建工单start-->
    <div class="alert" v-if="isAddorder.isShow">
      <add-order :isAddorder="isAddorder"  :quiry="quiry">
      </add-order>
    </div>
    <!--新建工单end-->
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
    currentChange,
    firsPages,
    getTableListData,
    getThis,
    inputData,
    lastPages,
    masterFilter,
    masterOper,
    selectorAll,
    sendOrderFilter,
    sizeChange,
    ubsualButton,
  } from "./js/pagingPages"
  import addAlert from "./orderAllCommonts/alertInfo";
  import orderNav from "./nav/nav"
  import orderDetails from "./orderAllCommonts/orderDetails"
  import replaceMaster from "./orderAllCommonts/replaceMaster_alert"
  import changTime from "./orderAllCommonts/master_alert/changeTime"
  import drawback from "./orderAllCommonts/master_alert/drawback"
  import addRemarks from "./orderAllCommonts/master_alert/addRemarks"
  import addOrder from "./orderAllCommonts/addOrder";
  import complainOrder from "@/components/order/orderAllCommonts/complain"
  import addseveProduct from "@/components/order/orderAllCommonts/addSaverProduct"

  export default {
    components:{
      addRemarks,
      complainOrder,
      addseveProduct,
      addOrder,
      drawback,
      replaceMaster,
      orderNav,
      orderDetails,
      changTime,
      addAlert
    },
    data() {
      return {
        channelShow:false,   //重置时分类和渠道的清空
        props1: {
          value: 'a',
          label: "b",
          children: 'beans'
        },
        labeloptions3:[],     //分类
        siteName:"",//网点名字 :
        siteID:"",//网点ID :
        siteArr:[], //网点名称 :
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
        phoneName:"", //联系人
        nameSize:"收起所有筛选",
        seachShow:true,
        jiantou:"./static/images/shang.png",
        officialPartner:'',//工单渠道
        labeloptions:[],
        prop: {
          value: 'id',
          label: "name",
          children: 'childChannel'
        },
        channelID:'',               //主渠道ID
        officialPartnerSubsetId:'', //子渠道ID
        numId:"",
        numId1:"",
        orderLabe2:"",
        orderLabe3:"",
        orderTypeOne:[
          {
            id:"",
            name:"--请选择--"
          },
          {
            id:"0",
            name:"正常工单"
          },
          {
            id:"1",
            name:"返修工单"
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

        ],
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
        //画图数据start
        timeQuantum:[],
        drawbackData:"",
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
        timeQuantum2:[],
        statisticsDateStartStr2:"",
        statisticsDateEndStr2:"",
        pickerOptions2: {
          shortcuts: [{
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
        //
        isCheckboxList:[],
        placeholder:"无",
        //新建工单；
        isAddorder:{
          isShow:false,
          title: "新建工单",
        },
        //区域id
        areaId:"",
        //新建工单；end
        //工单详情Data
        orderDetailed:{
          isShow:true,
          title:"基本信息"
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
          title:"退款"
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
          orderNumber: "",//工单号
          orderTel: "",//下单手机号
          masterJobNumber: "",//工程师工号
          thirdOrderId:''     //渠道商订单号
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
        city: [
          {
          name: "所属",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        }
        ],
//        optionListOne: [       //下拉列表数据
//          {
//            name: "工单状态",
//            key: "orderStatus",
//            SourceTypeValue: '', //选中后的
//            SourceType:[{value:"待分配",id:"03"}]
//          }
//        ],
        optionList: [       //下拉列表数据
          {
            name: "渠道",
            key: "sourceId",
            SourceTypeValue: '', //选中后的
            SourceType: []
          }
        ],
        selectorBehindObj: {},
        theadsName: [
          '序号',
          '工单号',
          "工单类型",
          '分类',
          '预约时间',
          '客户信息',
          '服务区域',
          '下单时间',
          "工单来源",
          '工单渠道',
          "渠道质保",
          '操作',
        ],
        sortData: [
          { //预约时间
            index:4,
            sortAscendingValues:[" appointment_datetime asc "],  //升序
            gradeDownValues:[" appointment_datetime desc "],     //降序
          },
          { //下单时间
            index: 7,
            sortAscendingValues: [" id asc "],  //升序
            gradeDownValues: [" id desc "],     //降序
          }
        ],
        tableList:[],
        tableListData: {
        },          //表格数据
        showPages: 1,
        currentPageSize: 20,
        total: 0,
        pageTotal: 0,
        addDataObj: {       //添加工程师详情
          title: "工程师提点设置",
          serveId: "",
          options2:[],
          props: {
            value: 'label',
            children: 'cities',
          },
          inputs:inputData,
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
        this.$set(obj,'childChannel',[])
      })
      getThis(this)
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
    watch:{
      checked:function(){
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.isTooltip();
      });
    },
    methods: {
      showChannel(){
        this.channelShow = false;
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

        //console.log(this.selectorBehindObj.labelId,'this.selectorBehindObj.labelId')
      },
      //预约时间
      yuYueTimeIsShow(item){
        this.time1.orderId=item;
        this.time1.isShow=true;
      },
      exportOrder(){ //导出
          if(this.timeQuantum.length>0){
            this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD 00:00:00').includes("Invalid")?"":this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD 00:00:00');
            this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD 23:59:59').includes("Invalid")?"":this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD 23:59:59');
          }
          if(this.timeQuantum2.length>0) {
            this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD 00:00:00').includes("Invalid")?"":this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD 00:00:00');
            this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD 23:59:59').includes("Invalid")?"":this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD 23:59:59');
          }

          for(let key in this.inputParams){
            this.selectorBehindObj[key]=this.inputParams[key];
          }
            let obj = {
              "state":"03",
              "id":this.selectorBehindObj.orderNumber, //工单号
              "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
              "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
              'thirdOrderId':this.inputParams.thirdOrderId,           //渠道商订单号
              "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
              "linkmanCityId":this.selectorBehindObj.cityId,       //城市
              "appointmentDatetime":this.selectorBehindObj.makeTime,   //预约时间
              "createTime":this.selectorBehindObj.placeTime,     //    下单时间
              //"officialPartnerId":this.selectorBehindObj.sourceId,  //渠道
              "officialPartnerId":this.channelID,  //主渠道ID
              'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
              "masterId":this.selectorBehindObj.masterJobNumber, //工程师工号
              "appointmentDatetimeStartStr":this.statisticsDateStartStr, //工程师工号
              "appointmentDatetimeEndStr":this.statisticsDateEndStr, //工程师工号
              "createTimeStartStr":this.statisticsDateStartStr2, //工程师工号
              "createTimeEndStr":this.statisticsDateEndStr2, //工程师工号
              //"fLabelBusiness" : this.selone, //分类
              'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
              "type":this.numId, //工单类型
              "source":this.numId1, //工单来源
              "linkmanName":this.phoneName, //联系人
              "channelWarranty":this.selectQuality ,  //质保
              "siteId":this.siteID, //网点名称
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
      //工单报备 start
      unusual(id){
        this.unusualOrder.isShow=true;
        this.unusualOrder.id=id;
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
        this.tableList.forEach((item,index)=>{
          if(i == index){
            item.iconShow = false;
          }else{
            item.iconShow = false;
          }
        })
        this.$set(this.tableList,i,this.tableList[i])
      },
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
          thirdOrderId:''
        }
        this.orderLabe2 = "";
        this.numId = "";
        this.siteName = "";//网点名字 :
        this.siteID = "";//网点ID :
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
      selectorTwo(item){
        this.orderTypeOne.forEach((v,index)=>{
          if(item == v.name){
            this.numId = v.id;
          }
        })
      },
      selectorThree(item){
        this.orderSourceShowOne.forEach((v,index)=>{
          if(item == v.name){
            this.numId1 = v.id;
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
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD 00:00:00').includes("Invalid")?"":this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD 00:00:00');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD 23:59:59').includes("Invalid")?"":this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD 23:59:59');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD 00:00:00').includes("Invalid")?"":this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD 00:00:00');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD 23:59:59').includes("Invalid")?"":this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD 23:59:59');
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key];
        }
        return{
          params:{
            "page":JSON.stringify(this.showPages),
            "rows":JSON.stringify(this.currentPageSize),
            "state":"03",
            'thirdOrderId':this.selectorBehindObj.thirdOrderId,           //渠道商订单号
            "id":this.selectorBehindObj.orderNumber, //工单号
            "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
            "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
            "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
            "linkmanCityId":this.selectorBehindObj.cityId,       //城市
            "appointmentDatetime":this.selectorBehindObj.makeTime,   //预约时间
            "createTime":this.selectorBehindObj.placeTime,     //    下单时间
            //"officialPartnerId":this.selectorBehindObj.sourceId,  //渠道
            "officialPartnerId":this.channelID,  //主渠道ID
            'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
            "masterId":this.selectorBehindObj.masterJobNumber, //工程师工号
            "appointmentDatetimeStartStr":this.statisticsDateStartStr, //工程师工号
            "appointmentDatetimeEndStr":this.statisticsDateEndStr, //工程师工号
            "createTimeStartStr":this.statisticsDateStartStr2, //工程师工号
            "createTimeEndStr":this.statisticsDateEndStr2, //工程师工号
            //"fLabelBusiness" : this.selone, //分类
            'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
            "type":this.numId, //工单类型
            "source":this.numId1, //工单来源
            "linkmanName":this.phoneName, //联系人
            "channelWarranty":this.selectQuality ,  //质保
            "siteId":this.siteID, //网点名称
          }};
      },
      //显示新建工单；
      addOrderIs(){
        this.isAddorder.isShow=true;
      },
      //显示新建工单；end

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
      //投诉工单 start
      complainFn(id){
        this.complain.isShow=true;
        this.complain.id=id;
      },
      //投诉工单 end
      //替换工程师弹框开始


      replaceMaster(item,index,orderIds,type){
        console.log(item,'11111')
        this.isReplaceAlert.appointmentDatetime=item.appointmentDatetime;  //预约时间
        this.isReplaceAlert.skills=item.skills;
        this.isReplaceAlert.areaId=item.linkmanAreaId;
        this.isReplaceAlert.linkmanDetails = item.linkmanDetails;         //服务地址
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
    //确定禁用操作 start
      masterImposeOperate(item){
        let url=this.$apidomain+"/order/punishmentmaster";
          masterOper(item,url)
      },
      //确定禁用操作 end
      masterImposeSelector(item,index,textareaContent){
        this.masterImposeData.alertForbiddenList.forEach(v=>{
          v.selector=false;
        });
        item.selector=!item.selector
      },
      //工程师罚款结束
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
        this.orderDetailed.orderId=id;
        this.orderDetailed.isShow=!this.orderDetailed.isShow;
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
//          this.selectorBehindObj.areaId="";
        })
      },

      isCheckbox(data,index){   //列表单选

      },
      wholeSelector(data,currentState){ //全选
        selectorAll(data,currentState)
      },
      batchOrder(list){
        let newAr=[];
        list.forEach((v,i)=>{
         if(this.isCheckboxList[i]){
           newAr.push(v)
         }
        });

        if(newAr.length==0){
          alert("请选择需要分配的工单");
          return;
        }
        //一级分类 服务地址到区级别 时间不限制
        let isList = true;
        let flabel = "";
        let areaId = "";
        let str = "";
        newAr.forEach(v=>{
          if(""==flabel){
            flabel = v.fLabelBusiness;
          }
          if(""==areaId){
            areaId = v.linkmanAreaId.substring(0,4);
          }
          if(flabel != v.fLabelBusiness){
            isList = false;
          }
          if(areaId != v.linkmanAreaId.substring(0,4)){
            isList = false;
          }
          str += v.id+","
        });
        if(!isList){
          alert("所选择的分配的工单一级分类或服务区域不统一....");
          return ;
        }
        str = str.substring(0,str.length-1);
        this.replaceMaster(newAr[0],null,str,false);
      },
      add(){
        this.isAdd=true

      },
      details(item,index){
        this.$store.commit("displayAlert",true); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;          //弹出对话框
//        let url = common.apidomain+" "
//        this.$http.get(url,params).then(res=>{
//          let data = res.data;
//
//        })
      },

//分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        sizeChange(val);
      },
      handleCurrentChange(val) {
        currentChange(val)
      },
      firstPage(){
        firsPages()
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
          if(data.code==='0000') {
            this.showPages = data.result.pageNum;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pages;
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
          enrolleeinfo_json=JSON.parse(localStorage.getItem("enrolleeinfo")),
          enrolleeinfo = enrolleeinfo_json.userRoleId;

        if(localStorage.getItem("enrolleeinfo") && ( enrolleeinfo=="SupportManager" || enrolleeinfo=="SupportStaff" || enrolleeinfo=="Admin")){
          _this.isTooltip_show=true;
        }
      },
      l_dial_contact(tel,id){//拨打联系人
        var _this=this;
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
      l_dial_masterWorker(tel,id){//拨打工程师
        var _this=this;
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
        //width:1550px;
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
          margin-top: 32px;
          float: left;
          margin-left: 5px;
          //width: 1330px;
          //text-align: right;
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
        //margin-left: 67px;
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

  #city{
    line-height:36px;
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

