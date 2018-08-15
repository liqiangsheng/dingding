<template>
  <div id="app">
    <!--导航栏-->
    <!--导航栏结束-->
    <div>
    <!--content内容区域-->
      <!--收起筛选项-->
    <div v-show="orderDetailed.isShow" class="container">
      <!--下拉列表-->
      <div class="selector_list">
        <div class="selector_listLeft">
        <div class="list">
          工单号 :
          <el-input
            placeholder="请填写工单号"
            v-model.trim="inputParams.id">
          </el-input>
        </div>
          <div class="list">
            工程师手机号:
            <el-input
              placeholder="请填写工程师手机号"
              v-model.trim="inputParams.masterPhone">
            </el-input>
          </div>
        <div class="list">
          工程师姓名:
          <el-input
            placeholder="请填写工程师姓名"
            v-model.trim="inputParams.masterName">
          </el-input>
        </div>

        <div class="list">
          分类 :
           <!--
          <el-select v-model.trim="orderLabel" placeholder="请选择分类" @change="selectorOne(orderLabel)">
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
                       placeholder="请选择分类"
                       v-if="!channelShow"
          ></el-cascader>
        </div>
          <!--gongdan-->
          <div  v-for="(item,index) in optionList1" class="list">
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
          <div class="list" >
            工单渠道:
            <el-input placeholder="请选择工单渠道                ▼"
                      @focus="showChannel" v-if="channelShow"></el-input>
            <el-cascader id="labelIds"
                         placeholder="请选择工单渠道"
                         @change="changeSelector2"
                         change-on-select
                         :options="labeloptions"
                         :props="prop"
                         v-show="!channelShow"
            ></el-cascader>
          </div>
        </div>
        <div class="selector_listLeft" v-show="seachShow">
        <!--下拉-->

        <div class="list">
          工单类型 :
          <el-select v-model.trim="orderTypeOne" placeholder="请选择工单类型" @change="orderTypeOneClick(orderTypeOne)">
            <el-option
              v-for="(item,index) in orderType"
              :key="index"
              :label="item.name"
              :value="item.name">
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
          </el-date-picker>
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
          完成时间 :
          <el-date-picker
            v-model.trim="timeQuantum3"
            type="datetimerange"
            :picker-options="pickerOptions2"
            placeholder="选择时间范围"
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

        <div class="list" v-for="(item,index) in city">
          城市 :
          <el-select
            v-model.trim="item.SourceTypeValue" placeholder="请选择城市"
            @change="selectorArea(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value"
            >
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
                       :props="props"
          ></el-cascader>
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
          <p>{{nameShow}}   <img :src="jiantou" @click="jiantouClick"></p>
        </div>
      </div>

      <!--下拉列表结束-->

      <!--查询按钮-->
      <div class="footerBnt">
        <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
        <el-button  style="width: 100px" @click="reset">重置</el-button>
        <!--<el-button style="width:100px;float: right;margin-right: 100px" @click="exportOrder">导出</el-button>-->
      </div>
      <div class="tabList">
         <p v-for="(item,index) in tabList" :key="index" :class="{selected:flag===index}" @click="tabClick(item,index)">
           {{item.name}}
         </p>
      </div>
      <!--table表格-->
      <div class="dable_lsit" >
        <!--导出按钮-->
        <!--导出按钮结束-->
        <!--表格数据-->
        <table cellSpacing="0px" cellpadding="0" id="table">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody id="body">
          <tr v-for="(item,index) in tableListData.list" :class="[{activeOrder:item.styleShow==true},{ trActive:item.borderShow == true}]" >
            <!--序号-->
            <td>
              {{index+1}}
            </td>

            <!--工程师姓名-->
            <td >
              <span><el-button type="text" @click="details(item,index)" class="elBtn">{{item.masterName|placeholder}}
              </el-button></span>
              <a id="telPhone1" @click="l_dial_masterWorker(item.masterPhoneNum,item.id)">{{item.masterPhoneNum}}</a><br>
              <Tooltip content="拨打工程师" placement="top-end" hidden   v-if="telMasterWorker(item.state,item.masterPhoneNum) " >
                <Icon type="ios-telephone"  style="font-size: 20px;" ></Icon>
              </Tooltip>
            </td>

             <!--工单状态-->
            <td :class="{red:item.state=='05'||item.state=='06'}">
              {{item.state|orderStateShow}}
            </td>
            <!--预约时间 -->
            <td>
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}} <span v-show="item.appointmentDatetime">至{{( Date.parse(new Date(item.appointmentDatetime))+3600000)|moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </td>
            <!--异常状态-->
            <td>
              <p :class="{active:true,
              noTime:item.monitorType==='1',
              workTime:item.monitorType==='4',
              overTime:item.monitorType==='2'&&item.monitorReason*1<3*24*60,
              overTimes:item.monitorType==='2'&&3*24*60<item.monitorReason*1<7*24*60&&item.monitorReason>3*24*60,
              overTimess:item.monitorType==='2'&&item.monitorReason*1>7*24*60}" >
                {{item.monitorType|timeout}}
              </p>
              <span :class="{
                colors:true,
                colorOne:item.monitorType==='1',
                colorTwo:item.monitorType==='2'&&item.monitorReason*1<3*24*60,
                colorThree:item.monitorType==='2'&&3*24*60<item.monitorReason*1<7*24*60&&item.monitorReason>3*24*60,
                colorFour:item.monitorType==='2'&&item.monitorReason*1>7*24*60,
                colorFive:item.monitorType==='4'
              }">
                {{item.monitorReason|changeDate}}
              </span>
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
            <!--工单渠道-->
            <td>
              {{changePartner(item.officialPartnerName,item.officialPartnerSubsetName)|placeholder}}
            </td>
            <!--渠道质保-->
            <td>
              {{item.channelWarranty|qudaozhibao}}
            </td>
            <!--派单时间-->
            <td>
              {{item.sendOrderTime||'无'}}
            </td>
            <!--客户姓名-->
            <td>
              <span class="elBtn" style="display: inline-block">{{item.linkmanName|placeholder}}</span>
              <a id="telPhone" @click="l_dial_contact(item,item.linkmanPhoneNum,item.id)">{{item.linkmanPhoneNum | placeholder}}</a><br>
              <Tooltip content="拨打联系人" placement="top-end" v-if="item.linkmanPhoneNum ">
                <Icon type="ios-telephone"  style="font-size: 20px;" ></Icon>
              </Tooltip>
            </td>
            <!--服务区域-->
            <td>
              {{item.linkmanArea|placeholder}}
            </td>
            <!--服务地址-->
            <td style="width:150px;">
              {{item.linkmanDetails|placeholder}}
            </td>
            <!--服务类型-->
            <td>
              {{item.fLabelBusiness|FLabelBusinessShow}}
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
          <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pages}}</p>
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
      <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
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
    masterOper,
    sendOrderFilter,
    ubsualButton
  } from "./js/pagingPages"

  import addAlert from "./orderAllCommonts/alertInfo";
  import orderNav from "./nav/nav"
  import orderDetails from "./orderAllCommonts/orderDetails"
  import replaceMaster from "./orderAllCommonts/replaceMaster_alert"
  import changTime from "./orderAllCommonts/master_alert/changeTime"
  import drawback from "./orderAllCommonts/master_alert/drawback"
  import addRemarks from "./orderAllCommonts/master_alert/addRemarks"
  import addOrder from "./orderAllCommonts/addOrder";
  import monitorDetail from "./monitorDetail.vue";
  import complainOrder from "@/components/order/orderAllCommonts/complain"
  import addseveProduct from "@/components/order/orderAllCommonts/addSaverProduct"
  import downloadOrder from "./orderAllCommonts/downloadOrder"
  import dispose from "./orderAllCommonts/master_alert/dispose.vue"
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
      addOrder,
      monitorDetail,
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
        //处理工单
        isDispose:{
          title:"处理",
          isShow:false,
        },
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
        //下载工单；
        isDownloadOrder:{
          isShow:false,
          title: "下载工单",
        },
        monitorType:"",
        nameShow:"收起所有筛选",
        flag:'0',
        tabList:[
          {name:'全部',id:'0'},
          {name:'未约时间',id:'1'},
          {name:'上工超时',id:'4'},
          {name:'服务超时',id:'2'},
          {name:'迟到',id:'3'},
        ],
        seachShow:true,
        jiantou:"./static/images/shang.png",
        drawbackData:"",
        isDetailed:{
          isShow:false,
        },
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
          id:"",
          masterId:"",
          masterPhone:'', //工程师手机号
          masterName:'',  //工程师姓名
          thirdOrderId:'' //渠道商订单号
        },
        //分类
        orderLabel:"",
        selone:'',
        labeloptions2:[
          {
            "id":"",
            "name":"--请选择--"
          }
        ],
        //工单状态
        optionList1: [       //下拉列表数据
          {
            name: "工单状态",
            key: "orderStatus",
            SourceTypeValue: '', //选中后的
            SourceType:this.$store.state.orderStatusOrderAll,
          }
        ],
        labeloptions:[],  //渠道
        channelID:'',               //主渠道ID
        officialPartnerSubsetId:'', //子渠道ID
        prop: {
          value: 'id',
          label: "name",
          children: 'childChannel'
        },
        orderTypeOne:"", //工单类型
        orderName:"",
        orderType:[
          {
            id:"",
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

        ],
        timeQuantum2:[], //下单时间
        timeQuantum:[],  //预约时间
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
        timeQuantum3: [],//完成时间
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
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
        //渠道质保
        quality:'',
        selectQuality:'',  //选中的质保状态
        channelQuality:[
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
          userName: "某某某",
          city: "深圳",
          masterType: "xxx",
          userTel: "1212123123132",      //手机号码
          netDrop: "网点", //
          serveArea: "区域",
          workStatus: "空闲中",
          remindedSet: "提点设置",
          masterNumber: "fd121212",//工程师编号
          certificate: "4211112212",  //省份证号码
          workerType: "1212", //服务工种
          irrigationDitch: "紧急联系人Name", //紧急联系人姓名
          contactsTel: "121212121",//紧急联系人电话
          licenseImg: "http://pic18.nipic.com/20111204/7190853_165031251364_2.jpg",    //本人执证照
          identityCardImgFront: "http://pic18.nipic.com/20111204/7190853_165031251364_2.jpg", //身份证正面
          identityCardImgReverse: "http://pic18.nipic.com/20111204/7190853_165031251364_2.jpg",//身份证反面
          qualificationImg: "http://pic18.nipic.com/20111204/7190853_165031251364_2.jpg",  //资格执照
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
          }
        ],
        selectorBehindObj: {},
        theadsName: [
          '序号',
          //'工程师编号',
          '工程师信息',
          '工单状态',
          '预约时间',
          '异常状态',
          '工单号',
          '工单类型',
          '工单渠道',
          '渠道质保',
          '派单时间',
//          '上工偏差',
        //  '准时偏差',
          '客户信息',
        //  '手机号',
         // '工程师手机号',
          '服务区域',
          '服务地址',
          '服务类型',
          '操作',
        ],
        sortData: [
          {
            //预约时间
            index: 3,
            sortAscendingValues: [" appointment_datetime asc "],  //升序
            gradeDownValues: [" appointment_datetime desc "],     //降序
          }, {
            //工程师信息   中文需要按照A-Z排序
            index: 1,
            sortAscendingValues: [" convert (master_name using gbk) asc "],  //升序
            gradeDownValues: [" convert (master_name using gbk) desc "],     //降序
          }, {
            //派单时间
            index: 9,
            sortAscendingValues: [" send_order_time asc "],  //升序
            gradeDownValues: [" send_order_time desc "],     //降序
          }
        ],
        tableListData: {},          //表格数据
        showPages: 1,               //当前页
        currentPageSize: 20,       //每页显示条数
        total: 0,                   //总条数
        pageTotal: 0,              //总页数
        addDataObj: {       //添加工程师详情
          title: "工程师提点设置",
          serveId: "",
          options2: [],
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
        this.$set(obj,'childChannel',[])
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

       // console.log(this.selectorBehindObj.labelId,'this.selectorBehindObj.labelId')
      },
      //预约时间
      yuYueTimeIsShow(item){
        this.time1.orderId=item;
        this.time1.isShow=true;
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
        if (this.timeQuantum3.length > 0) {
          this.completedTimeStartStr = this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD');
          this.completedTimeEndStr = this.$moment(this.timeQuantum3[1]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD');
        }
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        let obj = {
          'monitorType':this.monitorType,
          "id":this.inputParams.id,
          "isAppointment" :this.isAppointment,//工单号
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          'masterPhoneNum':this.inputParams.masterPhone,          //工程师手机号
          'masterName':this.inputParams.masterName,               //工程师姓名
          'thirdOrderId':this.inputParams.thirdOrderId,           //渠道商订单号
          //'fLabelBusiness':this.selone                  ,         //工单分类
          'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
          'state':this.selectorBehindObj.orderStatus,              //工单状态
          'officialPartnerId':this.channelID,                     //主渠道
          'officialPartnerSubsetId':this.officialPartnerSubsetId,  //子渠道
          'type':this.orderName,                                     //工单类型
          "appointmentDatetimeStartStr":this.statisticsDateStartStr,   //预约开始时间
          "appointmentDatetimeEndStr":this.statisticsDateEndStr,       //预约结束时间
          "createTimeStartStr":this.statisticsDateStartStr2,       //下单开始时间
          "createTimeEndStr":this.statisticsDateEndStr2,           //下单结束时间
          "completedTimeStartStr": this.completedTimeStartStr,     //完成开始时间
          "completedTimeEndStr": this.completedTimeEndStr,         //完成结束时间
          'channelWarranty':this.selectQuality ,                      //质保
          'source':this.numId1 ,                                 //工单来源
          "siteId":this.siteID, //网点名称
        };
        for(let key in obj){
          if(!obj[key]){
            obj[key] = null;
          }
        }
        //QS下载
        let strUrl = `${this.$reportdomain}/order/downloadMonitor?`;
        let data = strUrl+this.$Qs.stringify(obj,{skipNulls:true});
        window.open(data, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')

      },  //导出end
      changePartner(mainName,childName){
        if(childName&&mainName){
          return mainName+'-'+childName;
        }else if(!childName&&mainName){
          return mainName;
        }else{
          return '';
        }
      },
      siteClick(v){//网点选择
        this.siteArr.forEach((item,index)=>{
          if(v == item.name){
            this.siteID = item.id;
          }
        })
      },
      //处理工单
      disposeOrder(item,v,i){
        this.isDispose.orderId=item;
        this.isDispose.isShow=true;
        this.isDispose.timeOut = i;
      },
      //投诉工单
      complainFn(id){
        this.complain.isShow=true;
        this.complain.id=id;
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
      //投诉工单 start
      complainFn(id){
        this.complain.isShow=true;
        this.complain.id=id;
      },
      //预约时间改变start
      changeTimeIsShow(time,sum,id){
        this.time.time=time;
        this.time.sum=sum;
        this.time.orderId=id;
        this.time.isShow=true;
      },
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
      //工单报备 start
      unusual(id){
        this.unusualOrder.isShow=true;
        this.unusualOrder.id=id;
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
      tabClick(item,index){
        this.flag=index;
        this.monitorType = item.id=='0'?'':item.id;
        this.getTableList(this.paramsData());
      },
      jiantouClick(){ //搜索消失出现
        this.seachShow = !this.seachShow;
        if(this.seachShow == true){
          this.nameShow ="收起所有筛选"
          this.jiantou = "./static/images/shang.png";
        }else{
          this.nameShow ="展开所有筛选"
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
      orderTypeOneClick(item){ //工单类型
        this.orderType.forEach((v,i)=>{
          if(item === v.name){
            this.orderName = v.id;
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
       //渠道下拉
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
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
      selectorOne(item){       //分类选中后的下拉列表
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
        this.getTableList(this.paramsData());
      },
      reset(){
        this.channelShow = true;
        for(let key in this.inputParams){
          this.inputParams[key]='';
        }
        for(let key in this.selectorBehindObj){
          this.selectorBehindObj[key]=''
        }
        this.orderLabel = '';
        this.selone='';
        this.optionList1[0].SourceTypeValue='';
       // this.labeloptions=[];
        this.orderTypeOne='';
        this.timeQuantum2=[];
        this.timeQuantum3=[];
        this.timeQuantum=[];
        this.isAppointment1 = "";
        this.isAppointment = "";
        this.quality='';
        this.selectQuality='';
       // this.areaoptions1=[];
        this.city[0].SourceTypeValue='';
        this.orderLabe3='';
        this.channelID=''
        this.officialPartnerSubsetId='';
        this.orderName='';
        this.numId1=''
        this.siteName = "";//网点名字 :
        this.siteID = "";//网点ID :
        this.statisticsDateStartStr='',   //预约开始时间
        this.statisticsDateEndStr='',       //预约结束时间
        this.statisticsDateStartStr2='',       //下单开始时间
        this.statisticsDateEndStr2='',           //下单结束时间
        this.completedTimeStartStr='',     //完成开始时间
        this.completedTimeEndStr='',         //完成结束时间

        this.quiry();

      },
      paramsData(){
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');
        }
        if (this.timeQuantum3.length > 0) {
          this.completedTimeStartStr = this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD');
          this.completedTimeEndStr = this.$moment(this.timeQuantum3[1]).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.timeQuantum3[0]).format('YYYY-MM-DD');
        }
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
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
        return{
          params:{
          'monitorType':this.monitorType,                                    //异常状态
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
            "isAppointment":this.isAppointment,      //预约时间选无
          "id":this.inputParams.id,                             //工单号
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          'masterPhoneNum':this.inputParams.masterPhone,          //工程师手机号
          'thirdOrderId':this.inputParams.thirdOrderId,           //渠道商订单号
          'masterName':this.inputParams.masterName,               //工程师姓名
           //'fLabelBusiness':this.selone                  ,         //工单分类
          'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
          'state':this.selectorBehindObj.orderStatus,              //工单状态
          'officialPartnerId':this.channelID,                     //主渠道
          'officialPartnerSubsetId':this.officialPartnerSubsetId,  //子渠道
          'type':this.orderName,                                     //工单类型
          "appointmentDatetimeStartStr":this.statisticsDateStartStr,   //预约开始时间
          "appointmentDatetimeEndStr":this.statisticsDateEndStr,       //预约结束时间
          "createTimeStartStr":this.statisticsDateStartStr2,       //下单开始时间
          "createTimeEndStr":this.statisticsDateEndStr2,           //下单结束时间
          "completedTimeStartStr": this.completedTimeStartStr,     //完成开始时间
          "completedTimeEndStr": this.completedTimeEndStr,         //完成结束时间
          'channelWarranty':this.selectQuality ,                      //质保
          'source':this.numId1 ,                                 //工单来源
          "siteId":this.siteID, //网点名称
          }
        };
      },

      //工单详情操作

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
//        this.selectorBehindObj.areaId="";
        })

      },
      add(){      //新增
        this.isAdd=true
      },

      details(item,index){
        this.isDetailed.masterId = item.masterId;
        this.isDetailed.masterName = item.masterName;
        this.isDetailed.title = this.isDetailed.masterName+"-工程师今日工单详情";
        this.isDetailed.isShow=true;
      },

//分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      handleCurrentChange(val) {
        this.showPages=val;
        let params  = this.paramsData();
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
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.showPages=this.pageTotal; //最后一页
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
       // let url=this.$common.apidomain+"/orderquery/findpagedetection";
        let url=this.$common.apidomain+"/manage/order/monitor";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            this.tableListData = data.result;
            this.tableListData.list.forEach((obj,i)=>{
              obj.iconShow = false;
              obj.styleShow = false;
              obj.borderShow = false;
            })
            this.showPages = data.result.pageNum;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;
            return;
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

        if(sessionStorage.getItem("enrolleeinfo") && ( enrolleeinfo=="SupportManager" || enrolleeinfo=="SupportStaff" || enrolleeinfo=="Admin")){
          _this.isTooltip_show=true;
        }
      },
      l_dial_contact(item,tel,id){//拨打联系人
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
      >.selector_list{
        margin-top:0;
        width:1650px;
        overflow: hidden;
        .selector_listLeft{
          margin-left: 54px;
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
          float: right;
          margin-right: 170px;
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
        margin-left: 67px;
        margin-top: 20px;
        width: 100%;
      }
      >.tabList{
        margin-left: 65px;
        margin-top: 20px;
        height:30px;
        width: 100%;
        //border: 1px darkgrey solid;
        >p{
          width:86px;
          height:30px;
          border-radius:4px;
          border:1px solid rgba(164,112,205,1);
          color:rgba(152,103,204,1);
          background:rgba(255,255,255,1);
          display: inline-block;
          font-size:13px;
          line-height: 30px;
          text-align: center;
          margin-right: 8px;
        }
        >.selected{
          background:rgba(152,103,204,1);
          color:rgba(255,255,255,1);
        }

      }
      .elBtn{
        font-size: 12px;
        display: inline-block;
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
    line-height:40px;
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

  @media screen and (max-width: 1921px) {
    #table{
      width:1800px !important;
    }
  }
  #table #body{

  }
  .dable_lsit{
    margin-top: 20px !important;
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
            padding-top:0;
            padding-bottom:0;
            >span{
              height:100%;
              float:left;
              padding-top:4px;

              padding-left:30px;
              i{
                width:16px;
                height:16px;
                background:url(../../../static/images/ban.png) center center no-repeat;
                background-size:100% 100%;
                float:left;
                margin-right:3px;

                vertical-align: middle;
              }
            }
            >span:last-of-type{
              float:right;
              padding-left:0px;
              padding-top:8px;
              padding-right:20px;
              cursor:pointer;
              i{
                width:16px;
                height:16px;
                margin-top:3px;
                background:url(../../../static/images/detailed.png) center center no-repeat;
                background-size:100% 100%;
                float:left;
              }
            }
          }
        }
        >tr:nth-of-type(even){
          background: #F9FAFC;
        }
      }
    }
  }
.active{
  width: 60px;
  background: #7880CE;
  color: #FFFFFF;
  font-size:12px;
  border-radius:2px;
}
.colors{
  color:#7880CE;
}
.noTime{
  background: #30CAA7;
}
.workTime{
  background:rgba(36,136,215,1);
}
.colorOne{
  color: #30CAA7;
}
.overTime{
  background: #F26A28;
}
  .colorTwo{
    color: #F26A28;
  }
.overTimes{
  background: #E7341D;
}
  .colorThree{
    color: #E7341D;
  }
.overTimess{
   background: #A7091C;
 }
  .colorFour{
    color: #A7091C;
  }
  .colorFive{
    color:#2488D7;
  }
  .btn_inquiry{
    display: inline-block;
  }
  #labelIds{

    .el-cascader__label{
      color: red;
      ling-height:38px !important;
    }
  }
  #table{
    th:nth-of-type(1),tr>td:nth-of-type(1){
      width: 31px;
      border-left:1px solid #ccc;
    }
    thead{
      tr{
        height: 60px;
      }
      tr>th:nth-of-type(2),th:nth-of-type(11),th:nth-of-type(10){
        width: 110px;
      }
      th:nth-of-type(3),th:nth-of-type(7),th:nth-of-type(9){width:80px;}
      th:nth-of-type(8){width:170px;}

      th:nth-of-type(4){
        width: 180px;
      }
      th:nth-of-type(5){
        width:220px;
      }
      th:nth-of-type(6){
        width: 160px;
      }
      th:nth-of-type(12),th:nth-of-type(15){
        width: 150px;
      }
      th:nth-of-type(13){
        width: 320px;
      }
      th:nth-of-type(14){
        width: 80px;
      }
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
  #telPhone1:hover,#telPhone:hover,#orderId:hover{
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
    color:#6C6C6C;
  }
</style>
<style lang="scss">

</style>

