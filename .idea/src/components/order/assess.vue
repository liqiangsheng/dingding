<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          工单号 :
          <el-input
            placeholder="请输入内容"
            v-model="mainOrderId">
          </el-input>
        </div>
        <div class="list">
          师傅手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="masterPhoneNum">
          </el-input>
        </div>
        <div class="list">
          用户绑定手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="userPhoneNum">
          </el-input>
        </div>
        <div class="list">
          工单类型 :
          <el-select v-model="orderLabel1" placeholder="请选择" @change="selector1(orderLabel1)">
            <el-option
              v-for="item in labeloptions1"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="list">
          师傅姓名 :
          <el-input
            placeholder="请输入内容"
            v-model="masterName">
          </el-input>
        </div>
        <div class="list">
          分类 :
          <el-select v-model="orderLabel" placeholder="请选择" @change="selector(orderLabel)">
            <el-option
              v-for="item in labeloptions2"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <div class="derive">
          <el-button @click="add" size="large">导出</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th>
              <el-checkbox v-model="checked" @change="wholeSelector(tableList.evaluates,checked)"></el-checkbox>
            </th>
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <!--<seqencing-icon v-if="$queryFun.sortFun(index)" :data="$queryFun.sortFun(index)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>-->
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableList.evaluates">
            <td>
              <el-checkbox v-model="isCheckboxList[index]"   @change="isCheckbox(item,index)"></el-checkbox>
            </td>
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.mainOrderId|placeholder}}
            </td>
            <td>
              {{item.masterName|placeholder}}
            </td>
            <td>
              {{item.masterPhoneNum|placeholder}}
              <Tooltip content="拨打师傅" placement="top-end" hidden >
                <span @click="l_dial_masterWorker(item.masterPhoneNum,item.mainOrderId)">
                  <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
                </span>
              </Tooltip>
            </td>
            <td>
              {{item.orderType|orderSourceShow1}}
            </td>
            <td>
              {{item.orderLabel|FLabelBusiness}}
            </td>
            <td>
              {{item.userPhoneNum|placeholder}}
              <Tooltip content="拨打联系人" placement="top-end" v-if="item.userPhoneNum && isTooltip_show">
                <span  @click="l_dial_contact(item.userPhoneNum,item.mainOrderId)">
                  <Icon type="ios-telephone"  style="font-size: 20px;"></Icon>
                  <!--<Icon type="social-whatsapp"></Icon>-->
                </span>
              </Tooltip>
            </td>
            <td>
              {{item.level}}
            </td>
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
</template>
<script>
//  import addAlert from "./addSetting.vue";
import evaluationdetail from "./orderAllCommonts/evaluationdetail.vue"
import { addDialingMaster } from "./js/pagingPages"
  export default {
    components:{
//      addAlert
      evaluationdetail
    },
    data() {
      return {
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
          '师傅姓名',
          '师傅手机号',
          '工单类型',
          '分类',
          '用户绑定手机号',
          '主评分',
//          '状态',
          '操作'
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
    created(){
      this.quiry();
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2=this.labeloptions2.concat(data.result);

        console.log(this.labeloptions2);
      });
    },
    methods: {
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
        console.log("拨打联系人");
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
            console.log(res);
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
            console.log(err);
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
        console.log(state)
        if(!isYes)return false;
        return addDialingMaster(state);
      },
      l_dial_masterWorker(tel,id){
        console.log("拨打师傅联系人")
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
//        console.log(item);
        this.labeloptions1.forEach(v=>{
          if(v.name==item){
            this.selone1=v.id
//            console.log(this.selone)
          }
        })

      },
      selector(item){       //选中后的下拉列表
//        console.log(item);
        this.labeloptions2.forEach(v=>{
          if(v.name==item){
            this.selone=v.id
//            console.log(this.selone)
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
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {
          params: {
            "pageNo":JSON.stringify(this.showPages),
            "pageSize":JSON.stringify(this.currentPageSize),
            "mainOrderId":this.mainOrderId,
            "masterPhoneNum":this.masterPhoneNum,
            "userPhoneNum":this.userPhoneNum,
            "masterName":this.masterName,
            "orderLabel":this.selone,
            "orderType":this.selone1,
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
      add(){
        let newArr=[];
        this.isCheckboxList.forEach((v,i)=>{
          if(v===true){
            newArr.push( this.tableList.evaluates[i].id)
          }
        });

//        console.log(newArr,"12132");
        if(newArr.length>=1){
          let str=newArr.join(",");
          let url = this.$apidomain+"/orderquery/orderEvaluateExcel?evaluateId="+str;
//          console.log(url)
          this.$http.get(url).then(r=>{
            let data=r.data;

            if(data.code=="0000"){
                var url1=data.result;
              try{
                var elemIF = document.createElement("iframe");
                elemIF.src = url1;
                elemIF.style.display = "none";
                document.body.appendChild(elemIF);
              }catch(e){
                console.log(e);
              }
            }else{
              alert(data.error)
            }
          })
        }else{
          alert("请勾选")
        }

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
          console.log(addDataAlert.selectorBehindObj);  //参数
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
        console.log("isTooltip", this.isTooltip_show);
      });
    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";

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
</style>



