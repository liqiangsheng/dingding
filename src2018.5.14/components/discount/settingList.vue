<template>
    <div id="app">
      <div class="container">
        <div class="selector_list">
          <div class="list">
            面值 :
            <el-input
              placeholder="请输入内容"
              v-model="discountFacevalue">
            </el-input>
          </div>
          <div class="list">
            优惠券名称 :
            <el-input
              placeholder="请输入内容"
              v-model="discountName">
            </el-input>
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
                {{item.discountName|placeholder}}
              </td>
              <td>
                {{item.discountFacevalue|placeholder}}
              </td>
              <td>
                {{item.startTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}~{{item.endTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
              </td>
              <td>
                {{item.stock|placeholderTel}}
              </td>
              <td>
                {{item.haveBeenClaimed|mastertype}}
              </td>
              <td>
                {{item.alreadyUsed|placeholder}}
              </td>
              <td>
                {{item.discountMode|discountModeShow}}
              </td>
              <td>
                {{item.discountState | discountStateShow}}
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
      <!--大弹框 详情end-->
      <div class="alert" v-if="isAdd.isShow" >
        <add-alert :isAdd="isAdd" :quiry="quiry">
        </add-alert>
      </div>

      <div>
      </div>
    </div>
</template>
<script>
  import addAlert from "./addSetting.vue";
    export default {
        components:{
          addAlert
        },
      data() {
        return {
          //<!--弹窗基础数据start-->
          isAdd:{
            title:"新增师傅",
            isShow:false
          },
          //<!--弹窗基础数据end-->
          //<!--搜索框筛选数据start-->
          discountFacevalue:"",
          discountName:"",
          //<!--搜索框筛选数据end-->
          //<!--搜索框与table与分页start-->
          theadsName:[
            '序号',
            '优惠券名称',
            '面值',
            '有效期',
            '库存',
            '已认领',
            '已使用',
            '用途',
            '状态',
            '操作'
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
        }
      },
      created(){
        this.quiry();
      },
      methods: {
//      <!--分页查询数据对象功能组合start-->
        quiry(){
          this.getTableList(this.paramsData());
        },
        paramsData(){
          return {
            params: {
              "pageNo":JSON.stringify(this.showPages),
              "pageSize":JSON.stringify(this.currentPageSize),
              "discountFacevalue":this.discountFacevalue,
              "discountName":this.discountName,
            }
          }
        },
        getTableList(params){
          let url=this.$apidomain+"/discount/findPage";
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
        add(){
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



