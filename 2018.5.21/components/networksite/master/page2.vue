<template>
  <div id="app">
    <div class="container">
      <div class="dable_lsit">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in masterInfos">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.allOrderCount}}
            </td>
            <td>
              {{item.punctualityRate}}
            </td>
            <td>
              {{item.completeRate}}
            </td>
            <td>
              {{item.applauseRate}}
            </td>
            <td>
              {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.state | userState}}
            </td>
            <td>
                <span :class="{'recover':item.state=='2'}"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.state|enableDisable}}
                </el-button></span>
              <span class="details_icon"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--大弹框 详情-->
    <div class="alert" v-if="isDetailed.isShow">
      <detail :detailedIsShow="isDetailed" :quiry="quiry">
      </detail>
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
  import detail from "./alert/bdetail.vue";
  import add from "./alert/add.vue";
  export default {
    components:{
      add,
      detail,
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
        //<!--搜索框与table与分页start-->
        checked:false,
        theadsName:[
          '序号',
          '师傅编号',
          '姓名',
          '总单量',
          '准时率',
          '完成率',
          '平均分',
          '近期登陆',
          '状态',
          '操作'
        ],
        selectorBehindObj:{},
        masterInfos:[],
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
        let url=this.$apidomain+"/siteInfo/findmaster";
        this.$http.get(url,this.paramsData()).then(r=>{
          let data=r.data;
          this.masterInfos = data.result;
        })
      },
      paramsData(){
        return {params: {
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id
        }}
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
            o.id=item.id;
            o.state = "1";
            let url=this.$apidomain+"/masterinfo/updateMasterinfo";
            this.$http.post(url,o).then(res=>{
              let data = res.data;
              this.$message({
                type: 'success',
                message: '恢复成功!'
              });
              this.quiry()
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
            this.quiry()
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
        console.log(currentState);
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
  @import "../../../assets/styles/comminStyle2";
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


