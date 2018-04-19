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
              v-model="userName">
            </el-input>
          </div>
          <div class="list">
            师傅编号 :
            <el-input
              placeholder="请输入内容"
              v-model="unmber">
            </el-input>
          </div>
          <div class="list">
            师傅手机号 :
            <el-input
              placeholder="请输入内容"
              v-model="telBind">
            </el-input>
          </div>

          <div  v-for="(item,index) in optionList" :key="index" class="list">
            {{item.name}} :
            <el-select
              v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
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
              v-model="city.SourceTypeValue" placeholder="请选择" @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
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
            <el-cascader id=""
                         @change="changeSelector1"
                         :options="areaoptions1"
                         change-on-select
                         @active-item-change="handleItemChange"
                         :props="props"
            ></el-cascader>
          </div>
          <div class="list">
            服务工种 :
            <el-cascader id="skill"
                         @change="changeSelector2"
                         :options="labeloptions2"
                         change-on-select
                         @active-item-change="handleItemChange"
                         :props="props"></el-cascader>
          </div>
        </div>
        <!--查询按钮-->
        <div class="btn_inquiry" @click="quiry">
          查询
        </div>
        <div class="dable_lsit">
          <!--导出-->
          <div class="derive">
            <el-button @click="add" size="large" v-show="$isButtonObj('bn-master-account-newaccount')">新增</el-button>
          </div>
          <table cellSpacing="0px" cellpadding="0">
            <thead>
            <tr class="theads">
              <th v-for="(item,index) in theadsName" :key="index">
                {{item}}
                <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableListData.masterInfos">
              <td>
                {{index+1}}
              </td>
              <td>
                {{item.id|placeholder}}
              </td>
              <td>
                {{item.city|placeholder}}
              </td>
              <td>
                {{item.name|placeholder}}
              </td>
              <td>
                {{item.phoneNum|placeholderTel}}
              </td>
              <td>
                {{item.type|mastertype}}
              </td>
              <td>
                {{item.site|placeholder}}
              </td>
              <td>
                {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
              </td>
              <td>
                {{item.state | userState}}
              </td>
              <td>
                <span :class="{'recover':item.state=='2'}" v-show="$isButtonObj('bn-master-account-forbidden')"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.state|enableDisable}}
                </el-button></span>
                <span class="details_icon" v-show="$isButtonObj('bn-master-account-details')"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
                <!--<span class="details_icon Reminded_icon"><el-button type="text" @click="Reminded(item,index)"><i></i>提点</el-button></span>-->
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
        </div>
      </div>
      <!--大弹框 详情-->
      <div class="alert" v-if="isDetailed.isShow">
        <alert-info :isDetailed="isDetailed" :quiry="quiry">
        </alert-info>
      </div>
      <!--大弹框 详情end-->
      <div class="alert" v-if="isAdd.isShow" >
        <add-alert :isAdd="isAdd" :quiry="quiry">
        </add-alert>
      </div>



      <!--弹框-->
      <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
      <el-dialog style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">
            <ul class="alert_forbidden_text">
              <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
               {{item.name}} <span v-show="item.selector!='0'"></span>
              </li>
            </ul>
        <textarea class="alert_forbidden_area" v-model="textareaContent">
        </textarea>
        <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
      </el-dialog>
      <div>
      </div>
    </div>
</template>
<script>
  import tableList from "../user/table_lsit";
  import alertInfo from "./accountList_alert";
  import addAlert from "./add/addAlert";
  import userSum from "../user/userSum.vue"
    export default {
        components:{
          alertInfo,
          userSum,
          addAlert
        },
      data() {
        return {
          //<!--弹窗基础数据start-->
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

          alertForbiddenList:this.$store.state.alertForbiddenList,
          dialogTableVisible: false,
          //<!--禁用启用end-->
          //<!--搜索框筛选数据start-->
          userName:"", //姓名
          unmber:"",//师傅编号
          telBind:'',   //绑定手机
          areaoptions1: [],
          labeloptions2: [],
          city: {
            name: "所属城市",
            key: "cityId",
            SourceTypeValue: '', //选中后的
            SourceType: [],
            keyName:"city"
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
          checked:false,
          theadsName:[
            '序号',
            '师傅编号',
            '城市',
            '姓名',
            '手机号码',
            '师傅类别',
            '所属网点',
            '近期登陆',
            '状态',
            '操作'
          ],
          sortData: [
            {
              index:7,
              sortAscendingValues:[" login_time asc "],  //升序
              gradeDownValues:[" login_time desc "],     //降序
            },{
              index:8,
              sortAscendingValues:[" state asc "],  //升序
              gradeDownValues:[" state desc "],     //降序
            }
          ],
          selectorBehindObj:{},
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
              name:"今日新增数量"
            },{
              color:"green",
              sum:"0", //总用户量
              name:"总师傅数量"
            },{
              color:"green",
              sum:"0", //总用户量
              name:"待审核师傅数量"
            },
          ],
          //<!--顶部数据模板end-->
        }
      },
      created(){
        this.getTableList(this.paramsData());
        let urlCount=this.$apidomain+"/masterinfo/countList";
        this.$http.get(urlCount).then(r=>{
          let data=r.data;
          this.userSum.forEach((v)=>{
            if("今日新增数量"==v.name){
              v.sum = data.result.todayNum;
            }else if("总师傅数量"==v.name){
              v.sum = data.result.totalNum;
            }else if("待审核师傅数量"==v.name){
              v.sum = data.result.examineNum;
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
          this.city.SourceType.push({"id":"","value":"---请选择---"});
          data.result.forEach((v)=>{
            this.city.SourceType.push({"id":v.id,"value":v.name});
          })
        });
      },
      methods: {
//      <!--分页查询数据对象功能组合start-->
        quiry(){
          this.getTableList(this.paramsData());
        },
        paramsData(){
          return {params: {
            "pageNo":JSON.stringify(this.showPages),
            "pageSize":JSON.stringify(this.currentPageSize),
            "id":this.unmber,
            "name":this.userName,
            "phoneNum":this.telBind,
            "state":this.selectorBehindObj.state,
            "type":this.selectorBehindObj.type,
            "level":this.selectorBehindObj.level,
            "siteId":this.selectorBehindObj.siteId,
            "cityId":this.selectorBehindObj.cityId,
            "skillId":this.selectorBehindObj.skillId,
            "areaId":this.selectorBehindObj.areaId,
            "certificateState":2,
          }}
        },
        getTableList(params){
          let url=this.$apidomain+"/masterinfo/findPage";
          this.$http.get(url,params).then(r=>{
            let data=r.data;
            this.tableListData = data.result;
            this.showPages = data.result.pageNo;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;
          })
        },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
        details(item,index){
          this.isDetailed.id = item.id;
          this.isDetailed.isShow=true;
        },
        add(){
          this.isAdd.isShow=true
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
//      <!--恢复 start-->
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
              o.id=item.id;
              o.state = "1";
              o.templateCodeString="huifu";
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
//      <!--恢复 end-->
 //禁用  start
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
          o.templateCodeString="jinyong";
          let url=this.$apidomain+"/masterinfo/updateMasterinfo";
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            if("0000"===data.code){
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
        isCheckbox(data,checkedAll){
          if(!data.checked){
            this.checked=false;
            return;
          }
        checkedAll.forEach((v,i)=>{
          this.checked=v.checked;
        })
        },
        wholeSelector(data,currentState){

          data.forEach((v,i)=>{

            v.checked=currentState
          })
        },
        Reminded(item,index){
          this.$store.commit("displayAlert",true);
          this.isAlert=this.$store.state.isAlert;
        },
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
        handleItemChange(val) {
        },
        selector(item,values,SourceTypeValue){
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
      },
      mounted() {
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

</style>



