<template>
                                    <!--返修工单-->
  <div id="app">
    <!--导航栏-->
    <!--导航栏结束-->
    <!--content内容区域-->
    <div >
    <div v-show="orderDetailed.isShow" class="container">

      <!--创建回访的addComeback.vue组件-->
      <AddComeBack class="add_come_back_component"  v-if="l_addComeBack" :arrdata="l_radio_whole" @addComeBackShow="add_come_back_click_btn_hide"></AddComeBack>

      <!--下拉列表-->
      <div class="selector_list">
        <div class="selector_listLeft">
        <div class="list">
          工单号 :
          <el-input
            placeholder="请填写内容"
            v-model.trim="inputParams.mainOrderId">
          </el-input>
        </div>
        <div class="list">
          返修工单号 :
          <el-input
            placeholder="请填写返修工单号"
            v-model.trim="inputParams.orderNumber">
          </el-input>
        </div>
        <div class="list">
          工程师姓名:
          <el-input
            placeholder="请填写工程师姓名"
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
          联系人:
          <el-input
            placeholder="请填写联系人"
            v-model.trim="phoneName">
          </el-input>
        </div>
        <div class="list">
          绑定手机号 :
          <el-input
            placeholder="请填写绑定手机号"
            v-model.trim="inputParams.orderTel">
          </el-input>
        </div>
          </div>
        <div class="selector_listLeft" v-show="seachShow">
        <div class="list">
          联系人手机号 :
          <el-input
            placeholder="请填写联系人手机号"
            v-model.trim="inputParams.userPhoneNum">
          </el-input>
        </div>
        <div class="list">
          工程师工号 :
          <el-input
            placeholder="请填写工程师工号"
            v-model.trim="inputParams.masterJobNumber">
          </el-input>
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
          </el-date-picker>
        </div>

        <div class="list">
           完成时间 :
          <el-date-picker
            v-model="selectorBehindObj.accomplishDate"
            style="width: 200px !important;"
            type="datetimerange"
            align="right"
            placeholder="请选择完成时间"
            >
          </el-date-picker>
        </div>

        <!--下拉-->
        <div  v-for="(item,index) in optionList" class="list">
          {{item.name}} :
          <el-select
            v-model.trim="item.SourceTypeValue" :placeholder="'请选择'+item.name"
            @change="selector(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
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
        <!--城市-->

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
          <el-cascader
                       placeholder="请选择服务区域"
                       @change="changeSelector"
                       :options="areaoptions1"
                       change-on-select
                       @active-item-change="handleItemChange"
                       :props="props"
          ></el-cascader>
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
        <div class="footerBnt" style="margin-bottom:20px;">
          <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
          <el-button  style="width: 100px" @click="reset">重置</el-button>
        </div>
      <!--查询按钮结束-->
      <div style="padding-left: 67px">
        <span v-for="(item,index) in returnRepairBtn" :key="index" @click="returnRepair(index)" size="large" class="bntOne" :class="{activeBnt:bntIndex==index}" v-show="$isButtonObj('bn-order-all-new')">{{item.name}}</span>

        <el-button  @click="derivation" size="large" class="derive_btn derivation">导出</el-button>
      </div>

      <!--table表格-->
      <div class="dable_lsit" style="margin-top: 10px">
        <!--导出按钮-->
        <!--导出按钮结束-->
        <!--表格数据-->
          <table  id="table" cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <!--<th>-->
            <!--<el-checkbox v-model.trim="checked" @change="wholeSelector(tableList,checked)"></el-checkbox>-->
            <!--</th>-->
            <th v-for="(item,index) in theadsName">{{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableList" :class="[{activeOrder:item.styleShow==true},{ trActive:item.borderShow == true}]" >
            <!--<td>-->
            <!--<el-checkbox v-model.trim="isCheckboxList[index]" @change="isCheckbox(item,index)"></el-checkbox>-->
            <!--</td>-->
            <!--序号-->
            <td>
              {{index+1}}
            </td>
            <!--返修单号-->
            <td >
              <img v-show="item.emergencyDegree == 1" src="/static/images/jiaji.png" style="display: inline-block;width: 22px;height: 22px;transform: translateY(5px)">
              <span @click="orderDetails(item,item.id,index)" id="orderId" style="word-break: break-all;">
                {{item.id|placeholder}}
              </span>
            </td>
            <!--分类-->
            <td>
              {{item.fLabelBusiness | FLabelBusiness}}
            </td>
            <!--预约时间-->
            <td style="width: 160px">
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}} <span v-show="item.appointmentDatetime">至{{( Date.parse(new Date(item.appointmentDatetime))+3600000)|moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </td>
            <!--客户信息-->
            <td @click="l_dial_contact(item.userPhoneNum,item.id)">
              {{item.linkmanName | placeholder}}<br>
              <a id="telPhone">{{item.userPhoneNum | placeholder}}</a><br>
              <Tooltip content="拨打联系人" placement="top-end" v-if="item.userPhoneNum ">
                <Icon type="ios-telephone" style="font-size: 20px;"></Icon>
              </Tooltip>
            </td>
            <!--工程师信息-->
            <td @click="l_dial_masterWorker(item.masterPhoneNum,item.id)">
              {{item.masterName||'无'}}<br>
              <a id="telPhone1">{{item.masterPhoneNum | placeholder}}</a><br>
              <Tooltip content="拨打工程师" placement="top-end" hidden   v-if="telMasterWorker(item.state,item.masterPhoneNum) ">
                <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
              </Tooltip>
            </td>
            <!--区域-->
            <td>
              {{item.linkmanArea}}
            </td>
            <!--创建时间-->
            <td style="width: 110px">
              {{item.createTime  | moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <!--状态-->
            <td>
              {{item.state | BackOrderStatus}}
            </td>
            <!--操作-->
            <td class="icon" id="iconS">

              <!--------------------------------------------------------------------->
              <div v-if="item.state == '05'">
                  <span class="iconStyle" @click="replaceMaster(item,index,item.id,true)">派单</span>
                  <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                  <span  class="iconStyle"  @click="drawbackIsShow(item)">取消工单</span>
                  <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '21'">
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle" @click="yuYueTimeIsShow(item.id)">预约时间</span>
                <span  class="iconStyle"  @click="drawbackIsShow(item)">取消工单</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '21'">

                <li>
                  <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                </li>
                <li>
                  <span @click="reminder(item)"> 催单</span>
                </li>
                <li>
                  <span  @click="unusual(item.id)">工单报备</span>
                </li>

                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                  <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                </li>
              </ul>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '05'">
                <li>
                  <span @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                </li>
                <li>
                  <span @click="reminder(item)">催单</span>
                </li>
                <li>
                  <span  @click="unusual(item.id)">工单报备</span>
                </li>
                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                    <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                </li>
              </ul>
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '06'||item.state == '07'">
                  <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                  <span class="iconStyle"  @click="reminder(item)">催单</span>

                  <span class="iconStyle" @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                  <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '06'||item.state == '07'">
                <li>
                  <span  @click="drawbackIsShow(item)">取消工单</span>
                </li>
                <li>
                    <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                </li>
                <li>
                  <span  @click="unusual(item.id)">工单报备</span>
                </li>
                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                    <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                </li>
              </ul>
              <!--------------------------------------------------------------------->

              <div v-if="item.state == '16'||item.state == '17'||item.state == '18'">
                  <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                  <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '16'||item.state == '17'||item.state == '18'">
                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                  <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                </li>
              </ul>
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '08'">
                 <span class="iconStyle"  @click="disposeOrder(item.id,item,item.appointmentDatetime)">处理</span>
                  <span  class="iconStyle"  @click="drawbackIsShow(item)">取消工单</span>
                  <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                  <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '08'">
                <li>
                  <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                </li>
                <li>
                  <span @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                </li>
                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                    <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                </li>
              </ul>
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '10'">
                  <span  class="iconStyle"  @click="drawbackIsShow(item)">取消工单</span>
                  <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                  <span  class="iconStyle" @click="unusual(item.id)">工单报备</span>
                  <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)" v-if="item.state == '10'">
                <li>
                  <span @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                </li>
                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                    <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                </li>

              </ul>
              <!--------------------------------------------------------------------->
              <div v-if="item.state == '12'">
                  <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                  <span  class="iconStyle" @click="unusual(item.id)">工单报备</span>
                  <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
                <!--详情-->
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)"  v-if="item.state == '12'">
                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                    <span  @click="orderDetails(item,item.id,index)">工单详情</span>
                </li>

              </ul>
              <div v-if="item.state == '20'">
                <!--详情-->
                <span class="iconStyle"  @click="addRemarksIsShow(item)">备注</span>
                <span class="iconStyle" @click="drawbackIsShow(item)">取消工单</span>
                <span class="iconStyle" @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)">改约时间</span>
                <span class="iconStyle"   @click="more(item,index)" style="margin:0 6px;border-radius:2px;display: inline-block;color: #fff;background: #23A1FE;padding: 3px 8px">更多</span>
              </div>
              <ul class="iconShow" v-show="item.iconShow" @mouseleave="outHide(item,index)"  v-if="item.state == '20'">
                <li>
                  <span @click="replaceMaster(item,index,item.id,true)">派单</span>
                </li>
                <li>
                  <span @click="unusual(item.id)">工单报备</span>
                </li>
                <li>
                  <span  @click="complainFn(item.id)">投诉工单</span>
                </li>
                <li>
                  <span  @click="orderDetails(item,item.id,index)">工单详情</span>
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
    <div class="alert" v-if="isReplaceAlert.isShow">
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
    <!--返修工单详情-->
    <!--<repair-details v-if="!orderDetailed.isShow" :replacedata="replacedata" :orderDetailed="orderDetailed" :quiry="quiry"></repair-details>-->
    <!--返修工单详情end-->
      <!--返修工单详情-->
      <repair-details
        :yuYueTimeIsShow="yuYueTimeIsShow"
        :orderDetailed="orderDetailed"
        :replacedata="replacedata"
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
        v-if="!orderDetailed.isShow">
      </repair-details>
      <!--工单详情end-->

    <!--//改约时间-->
      <div class="alert" v-if="time.isShow" >
        <changTime :time="time" :quiry="quiry"  style="z-index: 10000;"></changTime>
      </div>
    <!--//改约时间den-->

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
        <li v-for="(item,index) in masterImposeData.alertForbiddenList" :key="index" @click="masterImposeSelector(item)">
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
      <!--处理工单-->
      <div class="alert" v-if="isDispose.isShow" >
        <dispose :addRemarksObj="isDispose" :quiry="quiry"  style="z-index: 10000;"></dispose>
      </div>
    <!--处理工单-->
      <!--预约时间-->
      <div class="alert" v-if="time1.isShow" >
        <yuyueTime :time1="time1" :quiry="quiry"  style="z-index: 10000;"></yuyueTime>
      </div>
<!--投诉工单 end-->
    <!--工单报备 start-->
    <complain-order :complain="unusualOrder" ></complain-order>
    <!--工单报备 end-->
    <!--新建工单start-->
    <div class="alert" v-if="isAddorder.isShow">
      <add-order :isAddorder="isAddorder" :quiry="quiry">
      </add-order>
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
    currentChange,
    firsPages,
    getTableListData,
    getThis,
    inputData,
    lastPages,
    masterFilter,
    masterOper,
    selectorAll,
    selectorCheck,
    sendOrderFilter,
    sizeChange,
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
  import complainOrder from "@/components/order/orderAllCommonts/complain"
  import addseveProduct from "@/components/order/orderAllCommonts/addSaverProduct"
  import dispose from "./orderAllCommonts/master_alert/dispose.vue"
  //2017-11-29,李玉锋添加，全部工单的穿件回访弹出框组件，adComeBack.vue
  import AddComeBack from './orderAllCommonts/addComeBack.vue'

  import repairDetails from './orderAllCommonts/repairDetails.vue'

  export default {
    components:{
      addRemarks,
      complainOrder,
      addOrder,
      addseveProduct,
      drawback,
      replaceMaster,
      orderNav,
      orderDetails,
      changTime,
      addAlert,
      AddComeBack,
      repairDetails,
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
        bntIndex:0,
        nameSize:"收起所有筛选 ",
        seachShow:true,
        jiantou:"./static/images/shang.png",
        labeloptions:[],
        prop: {
          value: 'id',
          label: "name",
          children: 'childChannel'
        },
        channelID:'',               //主渠道ID
        officialPartnerSubsetId:'', //子渠道ID
        returnRepairBtn:[
          {
            name:"返洗"
          },  {
            name:"返修"
          },  {
            name:"返装"
          },
        ],
        masterPhone:"",//工程师电话
        masterName:"",//工程师名字
        phoneName:"", //联系人
        selone:'',
        labeloptions2:[
          {
            "id":"",
            "name":"--请选择--"
          }
        ],
        orderLabel:"",
        isDispose:{
          title:"处理",
          isShow:false,
        },
        replacedata:{
          title:'返修工单详情',
          isShow:false
        },
        //工单详情Data
        orderDetailed:{
          isShow:true,
          show:true,
          title:"基本信息"
        },
        //工单详情Data   End
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
        //区域id
        areaId:"",
        //新建工单；end

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
          orderNumber: "",//返修工单号
          mainOrderId:'',//以前的工单号
          orderTel: "",//下单手机号
          masterJobNumber: "",//工程师工号
          thirdOrderId:''   //渠道商订单号
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
        city: [{
          name: "所属城市",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        }],
        optionList: [       //下拉列表数据
//          {
//            name: "渠道",
//            key: "sourceId",
//            SourceTypeValue: '', //选中后的
//            SourceType: []
//          },
          {
            name: "工单状态",
            key: "orderStatus",
            SourceTypeValue: '', //选中后的
//            SourceType:this.$store.state.orderStatusOrderAll,
            SourceType:[
              {
                value: '---请选择---',
                id: ""
              },{
                value: '待上工',
                id: "05"
              }, {
                value: '待抵达',
                id: "06"
              }, {
                value: '服务中',
                id: "07"
              }, {
                value: '工单报备',
                id: "08"
              }, {
                value: '待核帐',
                id: "10"
              },{
                value: '已完成',
                id: "12,15,17,18,19"
              },  {
                value: '已取消',
                id: "16"
              }, {
                value: '已清算',
                id: "17"
              }, {
                value: '已结算',
                id: "18"
              }, {
                value: '配件申领',
                id: "20"
              }, {
                value: '待预约',
                id: "21"
              },
              {
                value: '未完成',
                id: "03,04,05,06,07,08,10,11,20,21,09"
              }
            ]
          }
        ],
        selectorBehindObj: {
          accomplishDate:["",""],
        },

        theadsName: [
          '序号',
          '返修单号',
          '分类',
          '预约时间',
          '客户信息',
          '工程师信息',
          '服务区域',
          '创建时间',
          '状态',
          '操作'
        ],
        sortData: [
          { //预约时间
            index:3,
            sortAscendingValues:[" appointment_datetime asc "],  //升序
            gradeDownValues:[" appointment_datetime desc "],     //降序
          },  {
            index: 7,
            sortAscendingValues:[" id asc "],  //升序
            gradeDownValues:[" id desc "],     //降序
          }
        ],
        tableListData: {},          //表格数据
        showPages: 1,
        fLabelBusiness:"",
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
      }
    },
    created(){
//      this.optionList[0].SourceType = [...this.$store.state.orderStatusOrderAll,{value:'已取消',id:'16,14,02'}];
//      this.$set(this.optionList[0],'SourceType',[...this.$store.state.orderStatusOrderAll,{value:'已取消',id:'16,14,02'}]);
//      console.log(this.optionList[0].SourceType,'---------------------')

      this.$store.commit('getSort',"");
      let siteUrl = this.$apidomain+"/common/findsite"; //全部网点
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
    destroyed(){

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
      derivation(){ //导出
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');;
        }
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        let accomplishDate=["",""]
        if(!!this.selectorBehindObj.accomplishDate&&this.selectorBehindObj.accomplishDate.length){
          accomplishDate = this.selectorBehindObj.accomplishDate.map( v =>{
              if(this.$moment(v).format("YYYY-MM-DD HH:mm:ss").includes("Invalid")){
                return ""
              } else {
                return this.$moment(v).format("YYYY-MM-DD HH:mm:ss")
              }
            }
          );
        }
        let obj = {
          "isAppointment" :this.isAppointment,
            "completedTimeEndStr":accomplishDate[1],
            "completedTimeStartStr":accomplishDate[0],
            "id":this.selectorBehindObj.orderNumber, //工单号
            "thirdOrderId":this.selectorBehindObj.thirdOrderId, //渠道商订单号
            "mainOrderId":this.selectorBehindObj.mainOrderId, //返修工单号
            "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
            "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
            "appointmentDatetime":this.selectorBehindObj.makeTime,   //预约时间
            "createTime":this.selectorBehindObj.placeTime,     //    下单时间
            "state":this.selectorBehindObj.orderStatus,      //工单状态
            "officialPartnerId":this.channelID,  //主渠道ID
            'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
            "masterId":this.selectorBehindObj.masterJobNumber, //工程师工号,
            "appointmentDatetimeStartStr":this.statisticsDateStartStr,
            "appointmentDatetimeEndStr":this.statisticsDateEndStr,
            "createTimeStartStr":this.statisticsDateStartStr2, //工程师工号
            "createTimeEndStr":this.statisticsDateEndStr2, //工程师工号
            //"fLabelBusiness" : this.selone, //分类
            'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
            "type":"1",
            "linkmanName":this.phoneName, //联系人
            "masterName":this.masterName, //工程师姓名
            "masterPhoneNum":this.masterPhone, //工程师手机
            "linkmanAreaId": this.areaId,
            "linkmanCityId": this.selectorBehindObj.cityId,
            "siteId":this.siteID, //网点名称
        }
        for(let key in obj){
          if(!obj[key]){
            obj[key] = null;
          }
        }
        //QS下载
        let strUrl = `${this.$reportdomain}/order/downloadRework?`;
        let data = strUrl+this.$Qs.stringify(obj,{skipNulls:true});
        window.open(data, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')

//        let urla = `${this.$apidomain}/orderquery/createOrderExcelByRework`;
//              this.$http.get(urla,this.paramsData()).then(res=>{
//                const data = res.data;
//                if(data.code==="0000"){
//                  window.location.href = data.result;
//                }else{
//                  this.$queryFun.successAlert.call(this,data.error)
//                }
//              })
      },
      //      催单
      reminder(item){
        let url = this.$apidomain+ '/order/reminder';
        let params = {
          mainOrderId:item.id
        };
        this.$http.post(url,params).then(res=>{
          let data =res.data;
          if(data.code==="0000"){
            this.$queryFun.successAlert.call(this,'催单成功',"1");
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
      /*
      * 0 反洗
      * 1 返修
      * 2 返装
      * */
      returnRepair(i){
        this.bntIndex = i;
        let fLabelBusiness='';
        if(i===1){
          fLabelBusiness="002,003,004,006,007,008";
        }else if(i===2){
          fLabelBusiness="009";
        }else{
          fLabelBusiness="001";
        }
        this.selone=fLabelBusiness;

        let params={params:{
                            fLabelBusiness,type:"1",
                            pageNo:JSON.stringify(this.showPages),
                            pageSize:JSON.stringify(this.currentPageSize)
                  }};
        this.getTableList(params);
      },
      selectorOne(item){       //选中后的下拉列表
        this.labeloptions2.forEach(v=>{
          if(v.name==item){
            this.selone=v.id
          }
        })

      },
      //处理工单
      disposeOrder(item,v,i){
        this.isDispose.orderId=item;
        this.isDispose.isShow=true;
        this.isDispose.timeOut = i;
        this.isDispose.state=v.state;
      },
      //预约时间
      yuYueTimeIsShow(item){
        this.time1.orderId=item;
        this.time1.isShow=true;
      },
//新增服务产品 start
      addSaverProduct(item,isAddProduct){
        isAddProduct.id = item.id;
        isAddProduct.data = item;
        isAddProduct.isShow=true;
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
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD').includes("Invalid")?'':this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');;
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        let accomplishDate=["",""]
        if(!!this.selectorBehindObj.accomplishDate&&this.selectorBehindObj.accomplishDate.length){
           accomplishDate = this.selectorBehindObj.accomplishDate.map( v =>{
            if(this.$moment(v).format("YYYY-MM-DD HH:mm:ss").includes("Invalid")){
             return ""
            } else {
              return this.$moment(v).format("YYYY-MM-DD HH:mm:ss")
            }
          }
          );
        }

        return{params:{
            "completedTimeEndStr":accomplishDate[1],
            "completedTimeStartStr":accomplishDate[0],
            "page":JSON.stringify(this.showPages),
            "rows":JSON.stringify(this.currentPageSize),
          "isAppointment":this.isAppointment,      //预约时间选无
            "id":this.selectorBehindObj.orderNumber, //工单号
            "thirdOrderId":this.selectorBehindObj.thirdOrderId, //渠道商订单号
            "mainOrderId":this.selectorBehindObj.mainOrderId, //返修工单号
            "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
            "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
//            "linkmanArea":this.selectorBehindObj.areaId,       //区域
            "appointmentDatetime":this.selectorBehindObj.makeTime,   //预约时间
            "createTime":this.selectorBehindObj.placeTime,     //    下单时间
            "state":this.selectorBehindObj.orderStatus,      //工单状态
            //"officialPartnerId":this.selectorBehindObj.sourceId,  //渠道
          "officialPartnerId":this.channelID,  //主渠道ID
          'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
            "masterId":this.selectorBehindObj.masterJobNumber, //工程师工号,
            "appointmentDatetimeStartStr":this.statisticsDateStartStr,
            "appointmentDatetimeEndStr":this.statisticsDateEndStr,
            "createTimeStartStr":this.statisticsDateStartStr2, //工程师工号
            "createTimeEndStr":this.statisticsDateEndStr2, //工程师工号
            //"fLabelBusiness" : this.selone, //分类
            'fLabelBusiness':this.selectorBehindObj.labelId,         //工单分类
            "type":"1",
            "linkmanName":this.phoneName, //联系人
            "masterName":this.masterName, //工程师姓名
            "masterPhoneNum":this.masterPhone, //工程师手机
          "linkmanAreaId": this.areaId,
          "linkmanCityId": this.selectorBehindObj.cityId,
          "siteId":this.siteID, //网点名称
          }
        };
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
        this.replacedata.data=item;
        this.orderDetailed.data=item;
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
        selectorCheck(data,index);
      },
      wholeSelector(data,currentState){ //全选
        selectorAll(data,currentState)
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
        currentChange(val)
      },
      firstPage(){
        firsPages()
      },
      lasePage(){
        lastPages()
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
        let url=common.apidomain+"/manage/order/findReworkOrderPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
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

        if(sessionStorage.getItem("enrolleeinfo") && ( enrolleeinfo=="SupportManager" || enrolleeinfo=="SupportStaff" || enrolleeinfo=="Admin")){
          _this.isTooltip_show=true;
        }
      },
      l_dial_contact(tel,id){
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
      l_dial_masterWorker(tel,id){
          var _this=this;
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
      /*
       * 全部订单的添加全选和单选 end
       * */
      isCheckbox(data,index){   //列表单选
        let _this=this,isCheck = true,i;
        _this.tableList[index].isCheckboxList = _this.isCheckboxList[index]
        for (i = 0; i < _this.isCheckboxList.length; i++) {
          if (!_this.isCheckboxList[i]) {
            isCheck = false;
            break;
          }
        };
        _this.checked = isCheck;
      },
      wholeSelector(data,currentState){ //全选  是否选择currentState=true/false
        let _this=this;
        _this.isCheckboxList.forEach((v, i) => {
          _this.$set(_this.isCheckboxList, i, currentState);
        });
        _this.tableList.forEach((v, i) => {
          _this.$set(_this.tableList[i], 'isCheckboxList', currentState);
        })
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
  .alert_forbidden_area{
    width:100%;
    height:100px;
    border:none;
    margin-bottom:30px;
    border:1px solid #ccc;
  }
  .derivation{
    float:right;
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
  .bntOne{
    display: inline-block;
    height: 36px;
    border: 1px solid #A470CD;
    width: 80px;
    text-align: center;
    line-height: 36px;
    margin-right: 10px;
    border-radius:4px;
    color: #A470CD ;
  }
  .bntOne.activeBnt{
    background: #A470CD;
    color: #FFFFFF;
  }
  #orderId{
    word-break: break-all;
    /*color: #393939;*/
  }
  .activeOrder{
    color:#6C6C6C ;
  }
</style>
<style>
  .el-notification{
    z-index: 99999 !important;
    top:20px !important;
  }

</style>

