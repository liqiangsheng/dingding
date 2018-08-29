<template>
  <div id="app">
    <div>                                 <!--配件列表-->
      <!--content内容区域-->
      <div class="container">
        <div class="selector_list">
          <div class="selector_listLeft">
            <div class="list">
              　配件名称
              <el-input  placeholder="请填写配件名称" v-model="partsName"></el-input>
            </div>
            <div class="list">
              　产品名称
              <el-input  placeholder="请填写产品名称" v-model="productName"></el-input>
            </div>
            <div class="list">
              　分类
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
            <div class="list">
              　服务费类型
              <el-select v-model.trim="serverTypeName" placeholder="请选择服务费类型" @change="orderTypeOneClick(serverTypeName)">
                <el-option
                  v-for="(item,index) in serverType"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>

          </div>

        </div>

        <!--查询按钮-->
        <div class="footerBnt">
          <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
          <el-button  style="width: 100px" @click="reset">重置</el-button>
          <!--<el-button style="width:100px;float: right;margin-right: 100px" @click="exportOrder">导出</el-button>-->
        </div>

        <!--table表格-->
        <div class="dable_lsit">
          <!--表格数据-->
          <table id="table" cellSpacing="0px" cellpadding="0">
            <thead>
            <tr class="theads">
              <th v-for="(ietm,index) in tabListName">{{ietm}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableListData.list">
              <!--序号-->
              <td>
                {{index+1}}
              </td>

              <!--配件名称-->
              <td>
                {{item.name}}
              </td>
              <!--配件费-->
              <td>
                {{item.price}}
              </td>
              <!--商品编号-->
              <td>
                {{item.serviceId}}
              </td>
              <!--产品名称-->
              <td>
                {{item.fullName}}
              </td>
              <!--服务费类型-->
              <td>
                {{item.serviceName}}
              </td>

              <!--操作-->
              <td>
                <span class="cursor" style="color: #20A0FF" @click="edit('配件',item)">编辑</span>
                <span class="cursor" style="color:#E65831 " @click="del('配件',item)">删除</span>
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
            <p class="home last_page cursor" @click="lasePage">尾页</p>
            <p class="home cursor" @click="firstPage">首页</p>
          </div>
          <!--分页组件结束-->
        </div>
        <!--table表格结束-->
        <EditPage @isClose="isClose" v-if="editIsShow" :editData="editData" :quiry="quiry"></EditPage>
        <DelPage @isClose="isClose"  v-if="delIsShow" :delData="delData" :quiry="quiry"></DelPage>
      </div>
    </div>
  </div>
</template>
<script>
  import EditPage from "./alter/editPage.vue"
  import DelPage from "./alter/delPage.vue"
  export default {
    components:{
      EditPage,DelPage
    },
    mounted() {

    },
    data() {
      return {
        tableListData: {},          //表格数据
        showPages: 1,               //当前页
        currentPageSize: 20,       //每页显示条数
        total: 0,                   //总条数
        pageTotal: 0,              //总页数
        editIsShow:false, //编辑显示
        delIsShow:false, //删除显示
        editData:{}, //编辑数据
        delData:{}, //删除数据
        productName:"", //产品名臣
        channelShow:false, //重置用渠道
        partsName:"", //瞥见名称
        labeloptions3:[],       //分类
        props1: {//分类
          value: 'a',
          label: "b",
          children: 'beans'
        },
        serverType:[{id:"",name:"--请选择--"},{id:"1",name:"小修"},{id:"2",name:"中修"},{id:"3",name:"大修"},{id:"4",name:"检修"},{id:"5",name:"服务费"}], //服务费类型
        serverTypeName:"",//服务费类型
        serverTypeId:"",//服务费类型ID
        selectorBehindObj:{},
        tabListName:["序号","配件名称","配件费","商品编号","产品名称","服务费类型","操作"]
      }
    },

    watch:{

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
      this. quiry();
    },

    methods: {
      isClose(v){
         this.editIsShow = v;
         this.delIsShow = v;
      },
      edit(v,item){ //编辑
        this.editIsShow = true;
        this.editData.data = item;
        this.editData.title = "编辑配件";
        this.editData.name = v;
      },
      del(v,item){ //删除
        this.delIsShow = true;
        this.delData.data = item;
        this.delData.title = "删除产品";
        this.delData.name = v;
      },
      showChannel(){  // 渠道分类重置之后
        this.channelShow = false;
      },
      reset(){ //重置
        this.partsName = ""; //配件名臣
        this.channelShow = true; //渠道分类
        this.serverTypeName="";//服务费类型
        this.serverTypeId="";//服务费类型ID
        this.stateName="";//状态
        this.stateId="";//状态ID
        this.productName = "";//产品名称
        this.selectorBehindObj.labelId = "";
        this.quiry();
      },
      quiry(){//列表查询
        this.getTableList(this.paramsData());
      },
      paramsData(){//列表參數

        return {params: {
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
          "state":"0,1",
          "name":this.partsName, //配件名称
          "fullName":this.productName, //产品名称
          "labelId":this.selectorBehindObj.labelId?this.selectorBehindObj.labelId:"", //分类
          "serviceName":this.serverTypeName,// 服务费类型
        }}
      },
      getTableList(params){ ////列表數據接口
        let url= this.$apidomain+"/servicemountings/finMountingPage";
        this.$http.get(url,params).then(res=>{
          if(res.data.code === "0000"){
            this.tableListData = res.data.result;
            this.showPages =res.data.result.pageNum;
            this.currentPageSize = res.data.result.pageSize;
            this.total = res.data.result.total;
            this.pageTotal = res.data.result.pages;
          }else{
            this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
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
      },

      handleItemChange(val) {
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

//分页查询 事件 end

    },
  }
</script>
<style scoped lang="scss">
  /*@import "../../assets/styles/comminStyle";*/
  #app {
    .container {
      overflow: hidden;
      width: 100%;
      >.selector_list {
        margin-top: 0;
        width: 1400px;
        overflow: hidden;
        .selector_listLeft {
          margin-left: 54px;
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
      }
      >.footerBnt{
        margin-left: 67px;
        margin-top: 20px;
        width: 100% !important;
      }
    }
  }
  .dable_lsit{
    margin-top: 20px !important;
    table{
      width:100%;
      .theads{
        border:1px solid rgba(224,230,237,1);
        >th{
          height: 60px;
          text-align:center;
          background:rgba(240,240,240,1);
          border-right: 1px solid rgba(224,230,237,1);
          color:rgba(94,109,130,1);
          font-size:14px;
        }
      }
      >tbody{
        >tr:hover{
          background: #C6E7FF !important;
        }
        tr{
          width: 100%;
          height:46px;
          text-align: center;
          td{
            border:1px solid rgba(224,230,237,1);
            border-right: 0;
            border-top: 0;
          }
          td:last-child{
            border-right:1px solid rgba(224,230,237,1);
            span{
              margin:0 10px;
            }
          }
        }
        tr:nth-child(2n+2){
          background:rgba(248,248,248,1);
        }

      }
    }
  }
  .paging{
    text-align:right;
    width:100%;
    line-height:50px;
    >input,select{
      width:42px;
      height:20px;
      padding:0;
    }
    >.link_page{
      background: #1C5B94;
      color:#fff;
    }
    .home{
      float:right;
    }
    .last_page{
      color:blue;
      margin-left:10px;
    }
    .el-pagination{
      float:right;
      padding-top:12px;
    }
  }
</style>
