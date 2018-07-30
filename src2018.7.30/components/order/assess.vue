<template>
  <div id="app">
    <div >
    <div class="container">                       <!--工单评价-->
      <div class="selector_list">
        <div class="selector_listLeft">
        <div class="list">
          工单号 :
          <el-input
            placeholder="请填写内容"
            v-model.trim="mainOrderId">
          </el-input>
        </div>
        <div class="list">
          主评分 :
          <el-input
            style="width: 195px"
            type="number"
            placeholder="请填写内容"
            v-model.trim="leaveID">
          </el-input>
        </div>
        <div class="list">
          师傅手机号 :
          <el-input
            placeholder="请填写内容"
            v-model.trim="masterPhoneNum">
          </el-input>
        </div>
        <div class="list">
          联系人手机号 :
          <el-input
            placeholder="请填写内容"
            v-model.trim="userPhoneNum">
          </el-input>
        </div>
        <div class="list">
          完成时间 :
          <el-date-picker
            v-model.trim="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div class="list">
          工单类型 :
          <el-select v-model.trim="orderLabel1" placeholder="请选择" @change="selector1(orderLabel1)">
            <el-option
              v-for="item in labeloptions1"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
          </div>
          <div class="selector_listLeft" v-show="seachShow">
        <div class="list">
          师傅姓名 :
          <el-input
            placeholder="请填写内容"
            v-model.trim="masterName">
          </el-input>
        </div>
        <div class="list">
          分类 :
          <!--
          <el-select v-model.trim="orderLabel" placeholder="请选择" @change="selector(orderLabel)">
            <el-option
              v-for="item in labeloptions2"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
            -->
          <el-cascader ref="fuwugongzhong" id="labelId"
                       @change="changeSelectorTwo"
                       :options="labeloptions3"
                       change-on-select
                       @active-item-change="handleItemChange"
                       :props="props1"
          ></el-cascader>
        </div>
        </div>
        <div class="selector_listRight">
          <p @click="jiantouClick">{{nameSize}}   <img :src="jiantou"></p>
        </div>
      </div>
      <!--查询按钮-->
      <div class="footerBnt">
        <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
        <el-button  style="width: 100px" @click="reset">重置</el-button>
      </div>

      <div class="dable_lsit">
        <!--导出-->
        <div class="derive" style="margin-right: 30px">
          <el-button @click="add" size="large">导出</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <!--复选-->
            <!--<th>-->
              <!--<el-checkbox v-model.trim="checked" @change="wholeSelector(tableList.evaluates,checked)"></el-checkbox>-->
            <!--</th>-->
            <th v-for="(item,index) in theadsName">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableList.evaluates">
            <!--复选-->
            <!--<td>-->
              <!--<el-checkbox v-model.trim="isCheckboxList[index]"-->
                           <!--@change="isCheckbox(tableList.evaluates,index)"></el-checkbox>-->
            <!--</td>-->
            <td>
              {{index+1}}
            </td>
            <!--工单号-->
            <td>
              <span @click="edit(item,index)">{{item.mainOrderId|placeholder}}</span>
            </td>
            <!--&lt;!&ndash;工单类型&ndash;&gt;-->
            <td>
            {{item.orderType|orderSourceShow1}}
            </td>
            <!--分类-->
            <td>
              {{item.orderLabel|FLabelBusiness}}
            </td>
            <!--	主评分-->
            <td>
              {{item.level}}
            </td>
            <!--服务时长-->
             <td>
               {{item.completeTimeLimit|placeholder}}
             </td>
            <td @click="l_dial_masterWorker(item.masterPhoneNum,item.mainOrderId)">
              {{item.masterName|placeholder}}<br>
              <a id="telPhone1">{{item.masterPhoneNum|placeholder}}</a><br>
              <Tooltip content="拨打师傅" placement="top-end" hidden >
                  <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
              </Tooltip>
            </td>
            <!--客户信息-->
            <td @click="l_dial_contact(item.userPhoneNum,item.id)">
              {{item.linkmanName | placeholder}}<br>
              <a id="telPhone">{{item.userPhoneNum | placeholder}}</a><br>
              <Tooltip content="拨打联系人" placement="top-end" v-if="item.userPhoneNum ">
                <Icon type="ios-telephone" style="font-size: 20px;"></Icon>
              </Tooltip>
            </td>
            <!--准时偏差值-->
             <td>
             {{item.deviation||'无'}}
               <!-- 准时偏差 -->
             </td>
            <!--完成时间-->
             <td style="width: 110px">
               {{item.serviceTimeComplete | moment('YYYY-MM-DD HH:mm:ss')}}
             </td>
            <!--评价时间-->
             <td style="width: 110px">

               {{item.createTime  | moment('YYYY-MM-DD HH:mm:ss')}}
             </td>
            <!--操作-->
            <td>
              <span class="details_icon"><el-button type="text" @click="edit(item,index)"><i></i>详情</el-button></span>
              <!--<span class="details_icon Reminded_icon"><el-button type="text" @click="Reminded(item,index)"><i></i>提点</el-button></span>-->
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paging">
          <p class="home">总页数{{tableList.pageNo}}/{{tableList.pageTotal}}</p>
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
      </div>
    </div>
    <!--大弹框 详情end-->
    <div class="alert" v-if="isAdd.isShow" >
      <evaluationdetail :isAdd="isAdd"  :quiry="quiry">
      </evaluationdetail>
    </div>

    <div>
    </div>
    </div>
  </div>
</template>
<script>
  import evaluationdetail from "./orderAllCommonts/evaluationdetail.vue"
  import {addDialingMaster} from "./js/pagingPages"

  export default {
    components:{
      evaluationdetail
    },
    data() {
      return {
        props1: {
          value: 'a',
          label: "b",
          children: 'beans'
        },                       //服务工种分类排序
        labeloptions3:[],       //分类
        nameSize : "收起所有筛选 ",
        seachShow:true,
        jiantou:"./static/images/shang.png",
        leaveID:"", //主评分
        timeQuantum:[],
        statisticsDateStartStr:"", //开始时间
        statisticsDateEndStr:"", //结束时间
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
        isTooltip_show:false, //用于判断是否显示非客服的电话图标显示
        checked:false,
        isCheckboxList:[],
        selectorBehindObj:{},
        selone:"",
        selone1:"",
        //<!--弹窗基础数据start-->
        isAdd:{
          title:"评价详情",
          isShow:false,
          data:false,
        },
        //<!--弹窗基础数据end-->
        //<!--搜索框筛选数据start-->
        mainOrderId:"",
        masterPhoneNum:"",
        userPhoneNum:"",
        masterName:"",
        orderType:"",
        orderLabel:"",
        orderLabel1:"",
        labeloptions2:[
          {
            "id":"",
            "name":"--请选择--"
          }
        ],
        labeloptions1:[
          {
            id:"",
            name:"--请选择--"
          },
          {
            id:"0",
            name:"定价工单"
          },
          {
            id:"1",
            name:"一口价工单"
          },
          {
            id:"2",
            name:"企业工单"
          },
          {
            id:"3",
            name:"预约工单"
          },
          {
            id:"4",
            name:"返修工单"
          },
        ],
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        theadsName:[
          '序号',
          '工单号',
          "工单类型",
          '分类',
          '主评分',
          "服务时长",
          '师傅信息',
          '客户信息',
          "准时偏差值（min）",
          "完成时间",
          "评价时间",
//          '状态',
          '操作'
        ],
        sortData: [
          { //评价时间
            index: 10,
            sortAscendingValues:[" create_time asc "],  //升序
            gradeDownValues:[" create_time desc "],     //降序
          },
          { //完成时间
            index: 9,
            sortAscendingValues:[" service_time_complete asc "],  //升序
            gradeDownValues:[" service_time_complete desc "],     //降序
          },
          { //主评分
            index:4,
            sortAscendingValues:[" level asc "],  //升序
            gradeDownValues:[" level desc "],     //降序
          },
        ],
        selectorBehindObj:{},
        tableList:{
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
      this.quiry();
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
      handleItemChange(val) {
      },
      reset(){//重置
        this.userPhoneNum = ""
        this.mainOrderId ="";
        this.leaveID = "";
        this.orderLabel1 = "";
        this.masterName = "";
        this.orderLabel = "";
       this.statisticsDateStartStr= ""; //完成开始时间
        this.statisticsDateEndStr= ""; //完成结束时间
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
      l_dial_contact(tel,id){
        /*
         * 拨打联系人和师傅
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
//              console.log("token",res);
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
//              console.log("token",res);
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
      isTooltip(){//如果是客服经理或者客服专员或者管理员就显示
        let _this=this,
          enrolleeinfo_json=JSON.parse(sessionStorage.getItem("enrolleeinfo")),
          enrolleeinfo = enrolleeinfo_json[0].userRoleId;

        if(sessionStorage.getItem("enrolleeinfo") && ( enrolleeinfo=="SupportManager" || enrolleeinfo=="SupportStaff" || enrolleeinfo=="Admin")){
          _this.isTooltip_show=true;
        }
      },
      telMasterWorker(state,isYes){//线判断有没有号码参数，没有就不显示
        if(!isYes)return false;
        return addDialingMaster(state);
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
        }).catch(function(){
          _this.$message({
            type: 'info',
            message: '取消拨打'
          });
        });
      },
      selector1(item){       //选中后的下拉列表
        this.labeloptions1.forEach(v=>{
          if(v.name==item){
            this.selone1=v.id
          }
        })

      },
      selector(item){       //选中后的下拉列表
//        console.log(item);
        this.labeloptions2.forEach(v=>{
          if(v.name==item){
            this.selone=v.id
          }
        })

      },
      isCheckbox(data,index){   //列表单选
        this.$queryFun.isCheckbox.call(this,data,index);
      },
//      <!--分页查询数据对象功能组合start-->
      wholeSelector(data,currentState){ //全选
        this.$queryFun.wholeSelector.call(this,data,currentState)
      },
      quiry(){
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {
          params: {
            "pageNo":JSON.stringify(this.showPages),
            "pageSize":JSON.stringify(this.currentPageSize),
            "mainOrderId":this.mainOrderId,
            "masterPhoneNum":this.masterPhoneNum,
            "linkmanPhoneNum":this.userPhoneNum,
            "masterName":this.masterName,
            //"orderLabel":this.selone,
            'orderLabel':this.selectorBehindObj.labelId,         //工单分类
            "orderType":this.selone1,
            "completedTimeStartStr":this.statisticsDateStartStr, //完成开始时间
            "completedTimeEndStr":this.statisticsDateEndStr, //完成结束时间
            "level":this.leaveID,// 主评分
          }
        }
      },
      getTableList(params){
        let url=this.$apidomain+"/orderquery/findEvaluatePage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableList = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
          this.tableList.evaluates.forEach(v=>{
            this.isCheckboxList.push(false);
          });
        })

      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      add(){ //导出
//
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        let  obj = {
          "mainOrderId":this.mainOrderId,
          "masterPhoneNum":this.masterPhoneNum,
          "linkmanPhoneNum":this.userPhoneNum,
          "masterName":this.masterName,
         // "orderLabel":this.selone,
          'orderLabel':this.selectorBehindObj.labelId,         //工单分类
          "orderType":this.selone1,
          "completedTimeStartStr":this.statisticsDateStartStr, //完成开始时间
          "completedTimeEndStr":this.statisticsDateEndStr, //完成结束时间
          "level":this.leaveID,// 主评分
        }
        for(let key in obj){
          if(!obj[key]){
            obj[key] = null;
          }
        }
        let strUrl = `${this.$reportdomain}/order/downloadEvaluate?`;
        let data = strUrl+this.$Qs.stringify(obj,{skipNulls:true});
         window.open(data, 'newwindow', 'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes')

      },
      edit(item,index){

        this.isAdd.data=item;
        this.isAdd.title="评价详情";
        this.isAdd.isShow=true
      },
//      <!--弹窗功能end-->
      derive(){

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
        if(  this.showPages===1 ){
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
      isSelector(index){
        this.isActive=index;
      },
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
      },
      close(pre,addDataAlert){
        if(pre==="preserve"){    //判断是否是保存
          addDataAlert.inputs.forEach(v=>{
            addDataAlert.selectorBehindObj[v.key]=v.value
          });
//          console.log(addDataAlert.selectorBehindObj);  //参数
        }
        this.isClose=true;
        this.isForbidden=false;
        this.isAdd=false;
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
    },
    mounted() {
      this.$nextTick(function () {
        this.isTooltip();
//        console.log("isTooltip", this.isTooltip_show);
      });
    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  .container{
    >.selector_list{
      margin-top:0;
      width:1500px;
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
        margin-right: 20px;
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
  .link{
    position:absolute;
    transform:translateX(-999999px);
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
</style>



