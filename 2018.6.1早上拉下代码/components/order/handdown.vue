<template>
  <div id="app">
    <!--导航栏-->
    <!--导航栏结束-->
    <div style="overflow-x: auto">                                 <!--待处理工单-->
    <!--content内容区域-->
    <div v-show="orderDetailed.isShow"  class="container">
      <!--下拉列表-->
      <div class="selector_list">
        <div class="list">
          工单号 :
          <el-input
            placeholder="请输入内容"
            v-model="inputParams.orderNumber">
          </el-input>
        </div>
        <div class="list">
          师傅姓名:
          <el-input
            placeholder="请输入内容"
            v-model="masterName">
          </el-input>
        </div>
        <div class="list">
          师傅手机号:
          <el-input
            placeholder="请输入内容"
            v-model="masterPhone">
          </el-input>
        </div>
        <div class="list">
          绑定手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="inputParams.orderTel">
          </el-input>
        </div>
        <div class="list">
          联系手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="inputParams.userPhoneNum">
          </el-input>
        </div>

        <div class="list">
          预约时间 :
          <el-date-picker
            v-model="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div class="list">
          下单时间 :
          <el-date-picker
            v-model="timeQuantum2"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker
           >
        </div>
        <!--下拉-->
        <!--<div  v-for="(item,index) in optionList" class="list">-->
          <!--{{item.name}} :-->
          <!--<el-select-->
            <!--v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">-->
            <!--<el-option-->
              <!--v-for="items in item.SourceType"-->
              <!--:key="items.value"-->
              <!--:value="items.value"-->
            <!--&gt;-->
            <!--</el-option>-->
          <!--</el-select>-->
          <!--&lt;!&ndash;下拉end&ndash;&gt;-->
        <!--</div>-->
        <div class="list">
          渠道:
          <el-cascader id="labelId"
                       @change="changeSelector2"
                       :options="labeloptions"
                       change-on-select
                       :props="prop"
          ></el-cascader>
        </div>
        <!--工单类型-->
        <div class="list">
          工单类型 :
          <el-select v-model="orderTypeOne" placeholder="请选择" @change="orderTypeOneClick(orderTypeOne)">
            <el-option
              v-for="item in orderType"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <!--城市-->

        <div class="list" v-for="(item,index) in city">
          城市 :
          <el-select
            v-model="item.SourceTypeValue" placeholder="请选择" @change="selectorArea(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="list">
          区域 :
          <el-cascader id="city"
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
          <el-select v-model="orderLabel" placeholder="请选择" @change="selectorOne(orderLabel)">
            <el-option
              v-for="item in labeloptions2"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--下拉列表结束-->

      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">查询</div>
      <!--查询按钮结束-->

      <!--table表格-->
      <div class="dable_lsit">
        <!--表格数据-->
        <table id="table" cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.orders">
            <!--序号-->
            <td>
              {{index+1}}
            </td>
            <!--工单号-->
            <td>
              {{item.id|placeholder}}
            </td>
            <!--工单类型-->
             <td>
               {{item.type|orderType}}
             </td>
            <!--分类-->
            <td>
              {{item.fLabelBusiness|FLabelBusinessShow}}
            </td>
            <!--创建时间-->
            <td>
              {{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <!--预约时间-->
            <td>
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <!--联系人-->
            <td>
              {{item.linkmanName| placeholder}}
            </td>
            <!--<td>-->
              <!--{{item.linkmanPhoneNum | placeholder}}-->
            <!--</td>-->
            <!--联系人手机号-->
            <td>
              {{item.userPhoneNum | placeholder}}

              <Tooltip content="拨打联系人" placement="top-end" v-if="item.userPhoneNum && isTooltip_show">
                <span   @click="l_dial_contact(item.userPhoneNum,item.id)">
                  <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
                </span>
              </Tooltip>
            </td>
           <!--服务区域-->
            <td>
              {{item.linkmanArea| placeholder}}
            </td>
            <!--师傅姓名-->
            <td>
              {{item.masterName|placeholder}}
            </td>
            <!--师傅手机号-->
            <td>
              {{item.masterPhoneNum| placeholder}}
            </td>
            <!--工单说明-->
            <td style="width:160px;">
              {{item.abnormalHangUpRemark| placeholder}}
            </td>
            <!--状态-->
            <td >
              {{item.state| BackOrderStatus}}
            </td>
            <td>
              {{item.officialPartnerSubsetName?item.officialPartnerSubsetName+'-'+item.officialPartnerName:"无"}}
            </td>
            <!--渠道质保-->
            <td>
              {{item.channelWarranty|qudaozhibao}}
            </td>
            <!--紧急度-->
            <td>
              {{item.emergencyDegree|jinjidu}}
            </td>
            <!--操作-->
            <td class="icon">
              <!--详情-->
              <Tooltip content="工单详情" placement="top-end" v-show="$isButtonObj('bn-order-all-details')">
                <i class="icon-详情" @click="orderDetails(item.id)"></i>
              </Tooltip>
              <Tooltip content="投诉工单"
                       placement="top-end"
                       v-if="comlainbuttonStatus(item.state)"
                       v-show="$isButtonObj('bn-order-all-complaints')"
              >
                <i class="icon-投诉2" @click="complainFn(item.id)"></i>
              </Tooltip>
              <Tooltip content="异常挂起"
                       placement="top-end"
                       v-if="unusualStatusButton(item.state)"
                       v-show="$isButtonObj('bn-order-all-abnormal')"
              >
                <i class="icon-异常" @click="unusual(item.id)"></i>
              </Tooltip>
              <Tooltip content="派单"
                       placement="top-end"
                       v-if="sendOrder(item.state)"
                       v-show="$isButtonObj('bn-order-all-send')"
              >
                <i class="el-icon-document"
                   @click="replaceMaster(item,index,item.id,true)"></i>
              </Tooltip>
              <Tooltip content="罚款师傅" placement="top-end"
                       v-if="masterStatus(item.state)"
                       v-show="$isButtonObj('bn-order-all-fine')"
              >
                <i class="icon-罚款" @click="masterImposeIsShow(item)"></i>
              </Tooltip>

              <Tooltip content="改约时间"
                       v-if="changeTime(item.state)"
                       placement="top-end"
                       v-show="$isButtonObj('bn-order-all-changetime')">
                <i class="el-icon-date " @click="changeTimeIsShow(item.appointmentDatetime,item.total,item.id)"></i>
              </Tooltip>
              <Tooltip content="取消工单"
                       v-if="cancelOrder(item.state)"
                       placement="top-end"
                       v-show="$isButtonObj('bn-order-all-refund')">
                <i class="icon-取消" @click="drawbackIsShow(item)"></i>
              </Tooltip>
              <Tooltip content="添加备注" placement="top-end" hidden v-show="$isButtonObj('bn-order-all-remark')">
                <i class="icon-备注" @click="addRemarksIsShow(item)"></i>
              </Tooltip>
              <Tooltip content="新增服务产品" placement="top-end" hidden v-if="addSaverProduvtFilter(item.state)" v-show="$isButtonObj('bn-order-all-newproduct')">
                <i class="icon-新增订单" @click="addSaverProduct(item,isAddProduct)"></i>
              </Tooltip>
              <Tooltip content="处理" placement="top-end" hidden v-show="$isButtonObj('bn-order-all-dispose')">
                <i class="icon-备注" @click="handleOrder(item.id,isDispose)"></i>
              </Tooltip>
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

    <!--替换师傅弹框-->
    <div class="alert" v-if="isReplaceAlert.isShow">
      <replace-master :isReplaceAlert="isReplaceAlert" :quiry="quiry"></replace-master>
    </div>
    <!--替换师傅弹框end-->
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
      <textarea class="alert_forbidden_area" v-model="textareaContent">
        </textarea>
      <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
    <!--新增服务产品 start-->
  	<addseve-product :isAddProduct="isAddProduct" v-if="isAddProduct.isShow"></addseve-product>
    <!--新增服务产品 end-->
    <!--工单详情-->
    <order-details
      :orderDetailed="orderDetailed"
      :quiry="quiry"
      v-if="!orderDetailed.isShow">
    </order-details>
    <!--工单详情end-->

    <!--//改约时间-->
    <changTime :time="time"></changTime>
    <!--//改约时间den-->
    <!--处理工单-->
    <dispose :addRemarksObj="isDispose" :quiry="quiry"></dispose>
    <!--处理工单-->

    <!--添加备注-->
    <add-remarks :addRemarksObj="addRemarksObj"></add-remarks>
    <!--添加备注-->
    <!--投诉工单 start-->
    <complain-order :complain="complain" ></complain-order>
    <!--投诉工单 end-->

    <!--异常挂起 start-->
    <complain-order :complain="unusualOrder" ></complain-order>
    <!--异常挂起 end-->

    <!--退款-->
    <drawback :isDrawback="isDrawback" :data="drawbackData"></drawback>
    <!--退款end-->

    <!--师傅罚款 开始-->
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
                    placeholder="请输入内容"
                    v-model="masterImposeData.amount">
          </el-input>
        </li>
        <li v-for="(item,index) in masterImposeData.alertForbiddenList" @click="masterImposeSelector(item)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model="masterImposeData.textareaContent">

        </textarea>
      <el-button style="position:relative; left:50%; transform:translateX(-50%)"  @click="masterImposeOperate(masterImposeData)" type="primary">确定</el-button>
      <Tooltip content="催单" placement="top-end" hidden v-if="item.state=='05'||item.state=='06'">
                <span @click="reminder(item)">
                  <img src="../../assets/images/cuidan.png" alt="">
                </span>
      </Tooltip>
    </el-dialog>
    <!--师傅罚款 end-->

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
    sendOrderFilter,
    cancelOrderFilter,
    changeTimeFilter,
    masterFilter,
    ubsualButton,
    addProductFilter,
    buttonStatus,
    addDialingMaster,//新增客服系统
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
        labeloptions:[],
        prop: {
          value: 'id',
          label: "name",
          children: 'childChannel'
        },
        channelID:'',               //主渠道ID
        officialPartnerSubsetId:'', //子渠道ID
        masterPhone:"",//师傅电话
        masterName:"",//师傅名字
        orderName:"",
        orderTypeOne:"", //工单类型
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
        //画图数据start
        drawbackData:[],
        timeQuantum:[],
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
          status:"0",
          url:"/order/addcomplain",
          title:"投诉工单",
        },
        unusualOrder:{
          isShow:false,
          id:"",
          status:"0",
          url:"/order/changeabnormalhangup",
          title:"异常挂起",
        },
        //
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
        isDispose:{
          title:"处理工单",
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
        //师傅罚款数据 start
        masterImposeData:{
          masterImpose:false,
          total:"",   //工单总金额
          title:"师傅罚款",
          amount:"",
          textareaContent:"",
          params:[],       //参数
          alertForbiddenList:this.$store.state.masterAmerceList
        },
        //师傅罚款数据 end
        isAdd: false,
        //替换师傅
        isReplaceAlert:{
          isShow:false
        },
        //替换师傅end
        makeTime: "",   //预约时间
        placeTime: "",   //下单时间
        textareaContent: "",
        inputParams: {
          orderNumber: "",//工单号
          orderTel: "",//下单手机号
        },
        isEdit: true,
        alertForbiddenList: [
          {
            name: "师傅违规操作",
            selector: "0",
          }, {
            name: " 师傅认证资料不全",
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
        unmber: "",//师傅编号
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
          "工单类型",
          '分类',
          '创建时间',
          '预约时间',
          '联系人',
          '联系人手机号',
          '服务区域',
          '师傅姓名',
          '师傅手机号',
          '工单说明',
          '状态',
          '工单渠道',
          "渠道质保",
          "紧急度",
          '操作'
        ],
        tableListData: {},          //表格数据
        showPages: 1,
        currentPageSize: 20,
        total: 0,
        pageTotal: 0,
        addDataObj: {       //添加师傅详情
          title: "师傅提点设置",
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
//            添加师傅详情结束
        },
        isTooltip_show:false, //用于判断是否显示非客服的电话图标显示
      }
    },
    created(){

      let urls = this.$apidomain +'/officialPartnerSubsetAccountInfo/findlistOfficialPartnerSubsetAccountInfo?officialPartnerId =';
      this.labeloptions=this.$store.state.findchannel
      this.labeloptions.forEach((obj,i)=>{
        obj.childChannel=[]
        this.$http.get(urls+obj.id).then(res =>{
          let data = res.data;

          // console.log(data.result,'22222222');
          if(data.code==='0000'){
            // console.log(data.result,'123123')
            data.result.forEach((j,k)=>{
              j.name = j.officialPartnerName;
            })
            obj.childChannel=data.result;
          }
        })
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

        console.log(this.labeloptions2);
      });
    },
    methods: {
      //      催单
      reminder(item){
        let url = this.$apidomain+ '/order/reminder';
        let params = {
          mainOrderId:item.id
        }
        this.$http.post(url,params).then(res=>{
          let data =res.data;
          console.log(data,'111111')
          if(data.code==="0000"){
            this.$queryFun.successAlert.call(this,'催单成功');
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        })

      },
      changeSelector2(value){

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
        //console.log(this.channelID,'qudao')
      },
      orderTypeOneClick(item){ //工单类型
        this.orderType.forEach((v,i)=>{
          if(item === v.name){
            this.orderName = v.id;
          }
        })
      },

      selectorOne(item){       //选中后的下拉列表
//        console.log(item);
        this.labeloptions2.forEach(v=>{
          if(v.name==item){
            this.selone=v.id
//            console.log(this.selone)
          }
        })

      },
      //处理工单 start
      handleOrder(id,isShow){
        isShow.isShow=true;
        isShow.id=id;
      },
      //异常挂起 start
      unusual(id){
        this.unusualOrder.isShow=true;
        this.unusualOrder.id=id;
      },
      //异常挂起 end
      //处理工单 end
      //投诉工单 start
      complainFn(id){
        this.complain.isShow=true;
        this.complain.id=id;
      },
      //投诉工单 end
      //  /新增服务产品 start
      addSaverProduct(item,isAddProduct){
        isAddProduct.data = item;
        isAddProduct.isShow=true;
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
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        return{params:{
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "state":"08,09",
          "isComplaint":"1",
          "id":this.selectorBehindObj.orderNumber, //工单号
          "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
          "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          //"officialPartnerId":this.selectorBehindObj.sourceId,  //渠道
          "officialPartnerId":this.channelID,  //主渠道ID
          'officialPartnerSubsetId':this.officialPartnerSubsetId, //子渠道ID
          "appointmentDatetimeStartStr":this.statisticsDateStartStr, //师傅工号
          "appointmentDatetimeEndStr":this.statisticsDateEndStr, //师傅工号
          "createTimeStartStr":this.statisticsDateStartStr2, //师傅工号
          "createTimeEndStr":this.statisticsDateEndStr2, //师傅工号
          "fLabelBusiness" : this.selone, //分类
          "type":this.orderName, //工单类型
          "masterName":this.masterName, //师傅姓名
          "masterPhoneNum":this.masterPhone, //师傅手机
          "state":this.selectorBehindObj.orderStatus,      //工单状态
        }};
      },
      //显示新建工单；
      addOrderIs(){
        this.isAddorder.isShow=true;
      },
      //显示新建工单；end

      //添加备注
      dispose(item){
        this.isDispose.orderId=item.id;
        this.isDispose.isShow=true;
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
      //替换师傅弹框开始


      replaceMaster(item,index,orderIds,type){
        this.isReplaceAlert.appointmentDatetime=item.appointmentDatetime;
        this.isReplaceAlert.skills=item.skills;
        this.isReplaceAlert.areaId=item.linkmanAreaId;
        this.isReplaceAlert.orderIds=orderIds;
        this.isReplaceAlert.isShow=true;
        this.isReplaceAlert.isSiteShow=type;
      },
      //替换师傅弹框时间end

      //师傅罚款开始
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

      //师傅罚款结束
      //工单详情操作

      orderDetails(id){
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
      isCheckbox(data,checkedAll){
        if(!data.checked){
          this.checked=false;
          return;
        }
        checkedAll.forEach((v,i)=>{
          this.checked=v.checked;
        })
      },
      wholeSelector(data,currentState){ //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      add(){      //新增
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
        this.currentPageSize=val;
        this.getTableList(this.paramsData());
      },
      handleCurrentChange(val) {
        this.showPages=val;
        this.getTableList(this.paramsData());
      },
      firstPage(){
        if(  this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;     //第一页
        this.getTableList(this.paramsData());
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal; //最后一页
        this.getTableList(this.paramsData());
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
        let url=common.apidomain+"/orderquery/findpage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            this.tableListData = data.result;
            this.showPages = data.result.pageNo;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;
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
          enrolleeinfo_json=JSON.parse(sessionStorage.getItem("enrolleeinfo")),
          enrolleeinfo = enrolleeinfo_json[0].userRoleId;

        if(sessionStorage.getItem("enrolleeinfo") && ( enrolleeinfo=="SupportManager" || enrolleeinfo=="SupportStaff" || enrolleeinfo=="Admin")){
          _this.isTooltip_show=true;
        }
      },
      l_dial_contact(tel,id){//拨打联系人和师傅开始
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
                  message: '正在拨打师傅',
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
      //拨打联系人和师傅结束
    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  #app{
    .container{
      >.selector_list{
        margin-top:0;
        width:1700px;
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
</style>

