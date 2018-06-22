<template>
  <div id="app">
    <div class="container">
      <div class="user_sum">
        <user-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></user-sum>
      </div>
      <div class="selector_list">
        <div class="list">
          师傅姓名 :
          <el-input
            placeholder="请输入内容"
            v-model.trim="userName">
          </el-input>
        </div>

        <div class="list">
          师傅手机号 :
          <el-input
            placeholder="请输入内容"
            v-model.trim="telBind">
          </el-input>
        </div>

        <div  v-for="(item,index) in optionList" :key="index" class="list">
          {{item.name}} :
          <el-select
            v-model.trim="item.SourceTypeValue" placeholder="请选择"
            @change="selector(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="list">
          城市 :
          <el-select
            v-model.trim="city.SourceTypeValue" placeholder="请选择"
            @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
            <el-option
              v-for="items in city.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="list">
          服务区域 :
          <el-cascader
            :disabled="isCityShow"
            @change="changeSelector1"
            :options="areaoptions1"
            change-on-select
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
        </div>
        <div class="list">
          数据周期 :

          <DatePicker v-model.trim="selectorBehindObj.date" type="datetimerange" format="yyyy-MM-dd" placeholder="请选择时间"
                      style="width: 200px"></DatePicker>
        </div>
        <div class="list">
          服务工种 :
          <el-cascader id="skill"
                       @change="changeSelector2"
                       :options="labeloptions2"
                       change-on-select
                       @active-item-change="handleItemChange"
                       :props="props"
          ></el-cascader>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry('')">
        查询
      </div>

      <div class="dable_lsit">
        <el-button @click="monthQuery('0')" style="width:150px;line-height: 25px;">上月</el-button>
        <el-button @click="monthQuery('1')" style="width:150px;line-height: 25px;margin-bottom:10px;">本月</el-button>
        <el-button @click="derive" class="derive_button" >导出</el-button>
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th>
              <el-checkbox v-model.trim="checked" @change="wholeSelector(tableListData,checked)"></el-checkbox>
            </th>
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData">
            <!--序号-->
            <td>
              <el-checkbox v-model.trim="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox>
            </td>
            <td>
              {{index+1}}
            </td>
            <!--师傅姓名-->
            <td>{{item.masterName|placeholder}}</td>
            <!--师傅手机号-->
            <td>{{item.masterPhoneNum|placeholderTel}}</td>
            <!--服务城市 -->
            <td>
              {{item.city|placeholder}}
            </td>
            <!--师傅类别-->
            <td>
              {{item.masterType|masterType}}
            </td>
            <!--总接单量-->
            <td>
              {{item.allOrderCount||0}}
            </td>
            <!--已完成 -->
            <td>{{item.completeCount||0}}</td>
            <!--待服务-->
            <td>{{item.waitService||0}}</td>
            <!--准时率-->
            <td>
              {{item.punctualityRate}}%
            </td>
            <!--完工率-->
            <td>
              {{item.completeRate}}%
            </td>
            <!--平均分 -->
            <td>
              {{item.average||0}}
            </td>
            <!--近期登陆-->
            <td>
              {{item.masterLoginTime|moment('YYYY-MM-DD HH:mm:ss')||'未登陆'}}
            </td>
            <!--状态-->
            <td>
              {{item.masterState | userState}}
            </td>
            <!--操作-->
            <td>
                <span :class="{'recover':item.masterState=='2'}" v-show="$isButtonObj('bn-master-account-forbidden')"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.masterState|enableDisable}}
                </el-button></span>
                <span class="details_icon" v-show="$isButtonObj('bn-master-business-details')"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
                <!--<span class="details_icon Reminded_icon"><el-button type="text" @click="Reminded(item,index)"><i></i>提点</el-button></span>-->
            </td>
          </tr>
          </tbody>
        </table>
        <!--<div class="paging">-->
          <!--<p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:page-sizes='[20,50,100,200]'-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:current-page="showPages"-->
            <!--:total="total"-->
            <!--:page-size="currentPageSize"-->
            <!--:page-count="pageTotal"-->
          <!--&gt;-->
          <!--</el-pagination>-->
          <!--<p class="home last_page" @click="lasePage">尾页</p>-->
          <!--<p class="home" @click="firstPage">首页</p>-->
        <!--</div>-->
      </div>
    </div>
    <div class="alert" v-if="isDetailed.isShow">
      <alert-info :detailedIsShow="isDetailed">
      </alert-info>
    </div>
    <!--弹框-->
    <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
    <el-dialog style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">
      <ul class="alert_forbidden_text">
        <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model.trim="textareaContent">
        </textarea>
      <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
    <div>
    </div>
  </div>
</template>
<script>
  import tableList from "../user/table_lsit";
  import alertInfo from "./master_work_alert_info";
  import userSum from "../user/userSum.vue"
  export default {
    components:{
      alertInfo,
      userSum
    },
    data() {
      return {
        isCityShow: true,
 /*
   全选反选模块start
 */
        checked:false,
        isCheckboxList:[],
 /*
  全选反选模块end
 */
        //<!--弹窗基础数据start-->
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
        time:"",
        isDetailed:{
          title:"师傅详情",
          isShow:false
        },
        isAdd:{
          title:"新增师傅",
          isShow:false
        },
        //<!--弹窗基础数据end-->
        //<!--禁用启用start-->
        textareaContent:"",
        alertForbiddenList:[
          {
            name:"多次恶意违规收费",
            selector:"0",
          }, {
            name:"多次被投诉",
            selector:"0",
          }, {
            name:"关键资料不全",
            selector:"0",
          }, {
            name:"引导用户线下付款",
            selector:"0",
          }, {
            name:"师傅离职",
            selector:"0",
          }, {
            name:"其他",
            selector:"0",
          }
        ],
        dialogTableVisible: false,
        //<!--禁用启用end-->
        //<!--搜索框筛选数据start-->
        userName:"", //姓名
        telBind:'',   //绑定手机
        areaoptions1: [],
        labeloptions2: [],
        city: {
          name: "服务城市",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        optionList: [
          {
            name: "师傅类型",
            key: "type",
            SourceTypeValue: '',
            SourceType: [
              {
                value: '---请选择---',
                id: ""
              }, {
                value: '自营师傅',
                id: "1"
              }, {
                value: '兼职师傅',
                id: "2"
              }, {
                value: '网点师傅',
                id: "3"
              }
            ]
          },{
            name: "师傅等级",
            key: "level",
            SourceTypeValue: '',
            SourceType: [
              {
                value: '---请选择---',
                id: ""
              }, {
                value: '初级师傅',
                id: "Primary"
              }, {
                value: '中级师傅',
                id: "MiddleRank"
              }, {
                value: '高级师傅',
                id: "Advanced"
              }
            ]
          },{
            name: "所属网点",
            key: "siteId",
            SourceTypeValue: '',
            SourceType: []
          },
        ],
        props: {
          value: 'label',
          children: 'cities',
        },
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->

        theadsName:[
          '序号',
          '师傅姓名',
          '师傅手机号',
          '服务城市',
          '师傅类型',
          '总接单量',
          '已完成',
          '待服务',
          '准时率',
          '完工率',
          '平均分',
          '近期登陆',
          '状态',
          '操作'
        ],
        sortData: [
          {
            index:3,
            sortAscendingValues:[" city asc "],  //升序
            gradeDownValues:[" city desc "],     //降序
          }, {
            index:5,
            sortAscendingValues:[" all_order_count asc "],  //升序
            gradeDownValues:[" all_order_count desc "],     //降序
          },  {
            index:8,
            sortAscendingValues:[" punctuality_rate asc "],  //升序
            gradeDownValues:[" punctuality_rate desc "],     //降序
          },  {
            index:9,
            sortAscendingValues:[" complete_rate asc "],  //升序
            gradeDownValues:[" complete_rate desc "],     //降序
          }, {
            index:11,
            sortAscendingValues:[" master_login_time asc "],  //升序
            gradeDownValues:[" master_login_time desc "],     //降序
          }, {
            index:12,
            sortAscendingValues:[" master_state asc "],  //升序
            gradeDownValues:[" master_state desc "],     //降序
          }
        ],
        selectorBehindObj:{date:["",""]},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          masterInfos:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
        //<!--搜索框与table与分页end-->
        isClose:false,
        isForbidden:false,
        isAlert:this.$store.state.isAlert,
        isActive:"0",
        //<!--顶部数据模板start-->
        userSum:[
          {
            sum:"0", //总用户量
            color:"blue",
            name:"昨日完成工单量",
            order:"0"
          },{
            color:"green",
            sum:"0", //总用户量
            name:"总师傅活跃"
          }
        ],
        //<!--顶部数据模板end-->
      }
    },
    created(){
      this.getTableList(this.paramsData());
      let urlCount=this.$apidomain+"/masterinfo/countlistgeneralsurvey";
      this.$http.get(urlCount).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("昨日完成工单量"==v.name){
            v.sum = data.result.todayCompleteNum;
          }else if("总师傅活跃"==v.name){
            v.sum = data.result.activeMasterNum;
          }
        });
      });
      let url=this.$apidomain+"/common/findsite";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("siteId"==v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      })
      url=this.$apidomain+"/common/findlabelbusinessoptions";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2 = data.result;
      })
      url=this.$apidomain+"/common/findcitylistareainfo";
      this.$http.get(url).then(r=>{
        let data=r.data;
//        this.city.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v)=>{
          this.city.SourceType.push({"id":v.id,"value":v.name});
        })
      });
    },
    methods: {
/*
  全选反选模块start
*/
      checkbox(index){
        this.$queryFun.isCheckbox.call(this,this.tableListData,index);
      },
      wholeSelector(item,currentState){
        this.$queryFun.wholeSelector.call(this,item,currentState);
      },
      derive(){        //导出事件
       let data=[];
       this.tableListData.forEach((v, i) => {
          if (v.isCheckboxList) data.push(v.masterId);
        });
        if(data.length){
          const dataStr=data.join(",");
         const url=`${this.$common.apidomain}/statisticsMasterOneDay/createMasterExcel`,
                param={
                  params:{
                    statisticsDateStartStr:this.statisticsDateStartStr,
                    statisticsDateEndStr:this.statisticsDateEndStr,
                    masterId:dataStr,
                    time:this.time
                  }
                }
                this.$http.get(url,param).then(res=>{
                  const data=res.data;
                  if(data.code==="0000"){
                      window.location=data.result;
                      this.$queryFun.successAlert.call(this,"导出成功","1");
                  }else{
                    this.$queryFun.successAlert.call(this,data.error);
                  }
                })
        }else{
           this.$queryFun.successAlert.call(this,"请选择需要导出的选项");
        }
      },

/*
  全选反选模块end
*/
      //      <!--分页查询数据对象功能组合start-->
      quiry(){

        this.getTableList(this.paramsData());

      },
      paramsData(){
//        数据周期
//        console.log(this.$moment(this.selectorBehindObj.date[0]).format("YYYY-MM-DD"));
//        return console.log();
          const filterDate=e=>{
           return this.$moment(this.selectorBehindObj.date[e]).format("YYYY-MM-DD")==="Invalid date"?'':this.$moment(this.selectorBehindObj.date[e]).format("YYYY-MM-DD")
          }
        this.statisticsDateStartStr = filterDate(0)
        this.statisticsDateEndStr = filterDate(1)
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "name":this.userName,
          "time":this.time,
          "phoneNum":this.telBind,
          "statisticsDateStartStr":filterDate(0),
          "statisticsDateEndStr":filterDate(1),
          "state":this.selectorBehindObj.state,
          "type":this.selectorBehindObj.type,
          "level":this.selectorBehindObj.level,
          "siteId":this.selectorBehindObj.siteId,
          "cityId":this.selectorBehindObj.cityId,
          "skillId":this.selectorBehindObj.skillId,
          "areaId": this.selectorBehindObj.areaId ? this.selectorBehindObj.areaId : this.selectorBehindObj.cityId,
        }}
      },
      monthQuery(nu){
        this.time=nu;
        this.quiry();
      },
      getTableList(params){

        let url=this.$apidomain+"/statisticsMasterOneDay/findlistStatisticsMasterOneDay";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          if(data.code==="0000"){
            this.tableListData = data.result;
            this.showPages = data.result.pageNo;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;
            this.isCheckboxList=[];
            data.result.forEach((v,i)=>{
              this.isCheckboxList.push(false);
              this.tableListData[i].isCheckboxList=false;
            })
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }


        })
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      details(item,index){
        this.isDetailed.statisticsDateStartStr=this.statisticsDateStartStr;
        this.isDetailed.statisticsDateEndStr=this.statisticsDateEndStr;
        this.isDetailed.time=this.time
        this.isDetailed.masterId = item.masterId;
        this.isDetailed.isShow=true;
      },
//      <!--弹窗功能end-->
//      <!--获取城市下的区域信息与服务工种 start-->

      changeSelector1(value){
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            this.selectorBehindObj.areaId=v.id;
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.areaId=e.id
              }
            })
          }
        });
      },

      changeSelector2(value){
        this.labeloptions2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.selectorBehindObj.skillId=v.id;
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.skillId=e.id
              }
            })
          }
        });
      },
      selectorArea(item,values,SourceTypeValue){
        this.isCityShow = false;
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
          this.selectorBehindObj.areaId="";
        })
      },
//      <!--获取城市下的区域信息与服务工种 end-->
//      <!--禁用启用操作 start-->
      open2(item) {
        if("1"==item.state){
          this.dialogTableVisible = true;
          this.objItem = item;
        }else{
          this.$confirm('此操作将恢复该数据，是否继续？', '恢复', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var o={};
            o.id=item.masterId;
            o.state = "1";
            let url=this.$apidomain+"/masterinfo/updateMasterinfo";
            this.$http.post(url,o).then(res=>{
              let data = res.data;
              this.$message({
                type: 'success',
                message: '恢复成功!'
              });
              this.getTableList(this.paramsData())
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消恢复'
            });
          });
        }
      },
      confirmForbidden(item,textContent){
        var o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.forbiddenCause=v.name
          }
        });
        if(textContent){
          o.forbiddenRemark=textContent; //内容
        }else{
          o.forbiddenRemark=" ";
        }
        o.id=this.objItem.id;
        o.state = "2";
        let url=this.$apidomain+"/masterinfo/updateMasterinfo";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          if("0000"==data.code){
            this.dialogTableVisible=false;
            this.$message({
              type: 'success',
              message: '禁用成功!'
            });
            this.getTableList(this.paramsData())
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;
      },
//      <!--禁用启用操作 end-->
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


      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
        this.getTableList(this.paramsData());
      },
      handleCurrentChange(val) {
        this.showPages=val;
        this.getTableList(this.paramsData());
      },
      firstPage(){
        if( this.showPages===1 ){
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
      changeSelector(value){
        this.options2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.cityId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.cityId=e.id    //选择区
              }
            })
          }
        });
      },

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
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
      },
      close(){
        this.isClose=true;
        this.isForbidden=false;
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
    },
    mounted() {
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  /*<!--.confirm_btn{-->*/
    /*<!--margin-left:50%;-->*/
    /*<!--transform:translateX(-50%);-->*/
  /*<!--}-->*/
  .dable_lsit{
    position:relative;
  }
  .derive_button{
    width:150px;
    line-height: 25px;
    margin-bottom:10px;
    position:absolute;
    right:0;
    top:0;
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

  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
  }
  .top_nav{
    font-size:14px;
    width:100%;
    .user_type{
      padding:10px 60px;
      background: #EBDDF6;
      color:#000;
      cursor:pointer;
    }
    .selector{
      background: #A470CD;
      color:#fff;
      font-size:14px;
    }
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
</style>



