<template>
  <div id="app" >
      <div class="container">
        <div class="selector_list">
          <div class="selector_listLeft">
            <div class="list">
              工单号 :
              <el-input
                placeholder="请填写工单号"
                v-model.trim="inputParams.orderNumber">
              </el-input>
            </div>
            <div v-for="(item,index) in auditedList" :key="index" class="list">
              {{item.name}} :
              <el-select v-model.trim="item.SourceTypeValue" placeholder="请选择审核状态"
                         @change="selector(item,item.SourceType,item.SourceTypeValue)">
                <el-option
                  v-for="(items,index) in item.SourceType"
                  :key="index"
                  :label="items.value"
                  :value="items.value">
                </el-option>
              </el-select>
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
            <th class="multiple">
              <el-checkbox v-model.trim="checked" @change="wholeSelector(tableList,checked)"></el-checkbox>
            </th>
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
            </th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableList" :key="index">
              <td>
                <el-checkbox v-model.trim="isCheckboxList[index]" @change="isCheckbox(item,index)"></el-checkbox>
              </td>
              <td>{{index+1}}</td>
              <td>{{item.id|placeholder}}</td>
              <td> {{item.fLabelBusiness|FLabelBusinessShow}}</td>
              <td>{{item.examineState|examineState}}</td>
              <td>
                <span :class="{noMaster:!item.masterName}">{{item.masterName|placeholder}}</span>
                <span @click="l_dial_masterWorker(item.masterPhoneNum,item.id)" v-if="telMasterWorker(item.state,item.masterPhoneNum) ">
                  <Tooltip content="拨打工程师" placement="top-end" hidden >
                    <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
                  </Tooltip>
                </span>
                <br>
                <a id="telPhone1">{{item.masterPhoneNum}}</a><br>
              </td>
              <td>{{item.linkmanArea | placeholder}}</td>
              <td>
                {{item.linkmanName | placeholder}}
                <span @click="l_dial_contact(item.userPhoneNum,item.id)" v-if="item.userPhoneNum ">
              <Tooltip content="拨打联系人" placement="top-end">
                <Icon type="ios-telephone" style="font-size: 20px;"></Icon>
              </Tooltip>
                </span>
                <br>
                <a id="telPhone">{{item.userPhoneNum}}</a><br>
              </td>
              <td> {{item.officialPartner|placeholder}}</td>
              <td>{{item.state|orderStateShow}}</td>
              <td>{{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>
                <span @click="passClick('通过',item.id)" v-if="item.examineState===0">通过</span>
                <span @click="passClick('不通过',item.id)" v-if="item.examineState===0">不通过</span>
                <span @click="passClick('通过',item.id)"
                      style="color:#23A1FE;margin: 0;"
                      v-if="item.examineState===2 ">
                  通过
                </span>
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
    <pass-alert v-if="isShow" @isClose="isClose" :childrenInfo="childrenInfo" :query="quiry"></pass-alert>
    <un-pass-alert v-if="passShow" @isClose="isClose" :childrenInfo="childrenInfo" :query="quiry"></un-pass-alert>
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
    selectorAll,
    masterFilter,
    masterOper,
    sendOrderFilter,
    ubsualButton
  } from "./js/pagingPages"
  import passAlert from './orderAllCommonts/master_alert/passAlert.vue';
  import unPassAlert from './orderAllCommonts/master_alert/unPassAlert.vue';
  export default {
    components:{
     passAlert,unPassAlert
    },
    data() {
      return {
        checked: false,
        isShow:false,     //通过弹窗
        passShow:false,  //不通过弹窗
        childrenInfo:{},
        audited:"",    //选中的审核状态
        auditedList: [
          {
          name: "审核状态",
          key: "examineState",
          SourceTypeValue: '', //选中后的
          SourceType: [
            {value:'--请选择--',id:""},
            {value:'待审核',id:'0'},
            {value:'审核通过',id:'1'},
            {value:'审核不通过',id:'2'},
          ],
         }
        ], //审核状态
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
        tableList:[],
        areaId:"",
        //退款end
        isAdd: false,
        makeTime: "",   //预约时间
        placeTime: "",   //下单时间
        textareaContent: "",
        inputParams: {
          orderNumber: "",//工单号
          orderTel: "",//下单手机号
          userPhoneNum:"",
          thirdOrderId:'' //渠道商订单号
        },
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
        text: {
          forbidden: "禁用",
          recover: "恢复"
        },
        unmber: "",//工程师编号
        currentPage4: 1,
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
          '审核状态',
          '工程师信息',
          '服务区域',
          '客户信息',
          '渠道信息',
          '状态',
          "创建时间",
          '操作'
        ],
        tableListData:{},
        tableLists: [
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
          {a:'1',b:'2',c:"3",d:"4",e:"5",f:'6',g:'7',h:'8',i:'9'},
        ],          //表格数据
        showPages: 1,
        pic:"",
        currentPageSize: 20,
        total: 0,
        pageTotal: 0,
        isCheckboxList:[], //存储多选的false
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
    },
    created(){
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

    },
    destroyed(){

    },
    methods: {
      auditedClick(){

      },
      wholeSelector(data,currentState){ //全选
        selectorAll(data,currentState)
      },
      isCheckbox(data,index){   //列表单选

      },
      passClick(name,id){
        if(name==='通过'){
          this.isShow = true;
        }else{
          this.passShow = true;
        }
        this.childrenInfo = {
          name:name,
          orderId:id
        }
      },
      isClose(v){
        this.isShow = v;
        this.passShow = v;
      },
      showChannel(){
        this.channelShow = false;
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
      reset(){//重置
        this.auditedList[0].SourceTypeValue = ''; //选中的审核状态
        this.examineState = '';                   //传给后台的审核状态
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
          thirdOrderId:''  //渠道商订单号
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
          'examineState':this.selectorBehindObj.examineState,
          "thirdOrderId":this.selectorBehindObj.thirdOrderId, //渠道商订单号
          "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单绑定手机号码
          "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单联系人手机号码
          "linkmanCityId":this.selectorBehindObj.cityId,       //城市
          "linkmanAreaId":this.selectorBehindObj.areaId,       //区域
          "appointmentDatetime":this.selectorBehindObj.makeTime,   //预约时间
          "createTime":this.selectorBehindObj.placeTime,     //    下单时间
          "state":this.selectorBehindObj.orderStatus,      //工单状态
          // "officialPartnerId":this.selectorBehindObj.sourceId,  //渠道
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
        if(this.showPages ===1){
          return alert("已经是第一页");
        }
        this.showPages = 1;
        let params = this.paramsData();
        this.getTableList(params);
       // firsPages()           //首页
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        let params  = this.paramsData();
        this.showPages=4; //最后一页
        this.getTableList(params);
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
      //拨打客户电话 start
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

//            _this.$http.get(`http://192.168.20.42:801/udesk/getUdeskLogin?token=`+_this.$getLocalStorage("enrolleeinfo")[0].token).then(function(res){
//            _this.callComponent(res.data.result);  //调用拨打组件
//            });
//          debugger;
//          return false;

          _this.$http.post(`${_this.$apidomain}/udesk/callcenterAgentCallout${reqData}`).then(function(res){
            if(res.data.code=='0000'){
              _this.$message({
                message: '正在拨打联系人',
                type: 'success'
              });
              //请求客服登录接口token
//            _this.$http.post(`${_this.$apidomain}/udesk/getUdeskLogin?token=`+_this.$getLocalStorage("enrolleeinfo")[0].token).then(function(res){
//            _this.$http.get(`http://192.168.20.42:801/udesk/getUdeskLogin?token=`+_this.$getLocalStorage("enrolleeinfo")[0].token).then(function(res){
//
//            _this.callComponent(res.data.result);  //调用拨打组件
//            });
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
      //拨打客户电话 end
      //拨打工程师电话 start
      l_dial_masterWorker(tel,id){
        var _this=this;
        console.log(tel,"fdjsbfksakl")
        console.log(id,"idsdasd")
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
            console.log(res)
            if(res.data.code=='0000'){
              _this.$message({
                message: '正在拨打工程师',
                type: 'success'
              });
            }else{
              this.$queryFun.successAlert.call(this,res.data.error)
            }
          }).catch(function(err){
            console.log(err)
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
      //拨打工程师电话 end

      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
        console.log( this.selectorBehindObj,'审核状态')
      },
      isSelector(index){
        this.isActive=index;
      },

//table 数据 start;
      getTableList(params){
        //let url=common.apidomain+"/orderquery/findpage";
        let url=common.apidomain+"/manage/order/findExamineOrder";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          console.log(data,'待审核数据')
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
    }
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
    tbody{
      tr{
        border:1px red solid;
        td:last-child{
          text-align: center;
          span{
            font-size:13px;
            font-family:PingFangSC-Regular;
          }
          span:hover{
            cursor:pointer;
          }
          span:first-child{
            color:rgba(35,161,254,1);
            //margin-right: 45px;
          }
          span:last-child{
            margin-left: 45px;
            color:rgba(230,88,49,1);
          }
        }
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

