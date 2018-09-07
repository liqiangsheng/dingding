<template>
  <div id="app">
    <div class="container" v-if="!isFittings.isShow">
      <!--<div class="user_sum">-->
        <!--<product-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></product-sum>-->
      <!--</div>-->
      <div class="selector_list">
        <div class="selector_listLeft">
            <div class="list">
              　产品名称
              <el-input
                placeholder="请填写产品名称"
                v-model.trim="selectorBehindObj.fullName"
                style="width:200px;"
              >
              </el-input>
            </div>
            <!--<div  v-for="(item,index) in optionList" :key="index" class="list">-->
              <!--{{item.name}}-->
              <!--<el-select-->
                <!--v-model.trim="item.SourceTypeValue" :placeholder="'请选择'+item.name"-->
                <!--@change="selector(item,item.SourceType,item.SourceTypeValue)">-->
                <!--<el-option-->
                  <!--v-for="items in item.SourceType"-->
                  <!--:key="items.value"-->
                  <!--:value="items.value"-->
                <!--&gt;-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</div>-->
            <div class="list" id="cityOO">
                   　分类
              <el-input placeholder="请选择分类                       ▼"
                        @focus="showChannel" v-if="channelShow"></el-input>
                  <el-cascader id="labelId"
                               placeholder="请选择分类"
                               @change="changeSelector2"
                               :options="labeloptions2"
                               change-on-select
                               @active-item-change="handleItemChange"
                               :props="props"
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

      <div class="dable_lsit">

        <!--导出-->
        <!--<div class="derive">-->
          <!--<el-button @click="route()" size="large">新增</el-button>-->
        <!--</div>-->
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.list">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.fullName}}
            </td>
            <td>
              {{item.name}}
            </td>
            <!--<td>-->
              <!--<table-list :item="item.areaInfos" :name="'areaName'"></table-list>-->
            <!--</td>-->
            <!--s上门费-->
            <td>
             {{item.price1}}
            </td>
            <!--上门费是否叠加-->
            <td>
              {{item.isCollectDoorFee|isCollectDoorFeeShow}}
            </td>
            <!--服务费(元)-->
            <td>
              {{item.price2}}
            </td>
            <!--质保时间（天）-->
            <td>
             {{item.warrantyDatetime}}
            </td>

            <!--操作-->
            <td>
              <span class="cursor"  @click="fittings(item)"> 配件管理</span>
              <span  class="cursor"  @click="edit('产品列表编辑',item)"> 编辑</span>
            </td>
          </tr>
          </tbody>
        </table>
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
          <p class="home last_page" @click="lasePage">尾页</p>
          <p class="home" @click="firstPage">首页</p>
        </div>
      </div>
    </div>

    <!--新增产品 start -->
          <!--<div class="container" v-if="isAddOrder.isShow">-->
            <!--<add-product :isAddOrder="isAddOrder" :quiry="quiry">-->
            <!--</add-product>-->
          <!--</div>-->
    <!--新增产品 start -->

    <!--新增配件 start-->
    <div class="container" v-if="isFittings.isShow">
      <add-fittings :isAddOrder="isFittings">
      </add-fittings>
    </div>
    <!--新增配件 end-->
    <!--<edit-alert :data="isEdit" :query="quiry" v-if="isEdit.isShow"></edit-alert>-->
    <EditPage @isClose="isClose" v-if="editIsShow" :editData="editData" :quiry="quiry"></EditPage>
  </div>
</template>
<script>
  import EditPage from "./alter/editPage.vue" //carter
  import productSum from "./components/productSum.vue";
  import tableList from "./components/tableList.vue";
  import tableList1 from "./components/tableList1.vue";
  import tableList2 from "./components/tableList2.vue";
//  import editAlert from "./components/editAlert";
  import addProduct from "./components/addProduct"
  import addFittings from "./components/addFittings"
  import queryFun from "@/components/commonJs/queryFun"
  export default {
    components:{
      EditPage,
      productSum,
      addFittings,
      addProduct,
      tableList,
      tableList1,
      tableList2,
//      editAlert
    },
    data() {
      return {
        channelShow:false, //重置用渠道
        editData:{}, //编辑数据
        editIsShow:false, //编辑显示
        serverType:[{id:"",name:"--请选择--"},{id:"1",name:"小修"},{id:"2",name:"中修"},{id:"3",name:"大修"},{id:"4",name:"检修"},{id:"5",name:"服务费"}], //服务费类型
        serverTypeName:"",//服务费类型
        serverTypeId:"",//服务费类型ID
        selectedOptions2:[],
        isKeXuan:true,   // 分类是否可以选择
        yiji:"",
        yijifenlei:[], //一级分类
        isFittings:{
          isShow:false
        },
        isEdit:{
          isShow:false,
          data:{

          },
        },
        isAddOrder:{
          title:"xx",
          isShow:false,
        },
        userSum:[{
          sum:"0",
          color:"blue",
          name:"上架产品数"
        },{
          color:"green",
          sum:"0",
          name:"总产品数"
        }
        ],
        checked:false,
        theadsName:[
          '序号',
          '商品编号',
          '产品名称',
          '服务费类型',
//          '城市',
          '上门费(元)',
          '收上门费',
          '服务费(元)',
          '质保时间（天）',
//          '状态',
          '操作'
        ],
        labelId: '',
        state:'',
        hildren: 'cities',
        props: {
          value: 'a',
          label: "b",
          children: 'beans'
        },
        selectorBehindObj: {
          fullName:"",
          labelId:"",
          state:"",
        },
        labeloptions2: [],
        optionList:[
          {
            name:"状态",
            key:"state",
            SourceTypeValue: '', //选中后的
            SourceType:this.$store.state.productState
          }
        ],
        tableListData:{
          pageNum:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          serviceInfos:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0

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
      let urlCount=this.$apidomain+"/serviceinfo/countList";
      this.$http.get(urlCount).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("上架产品数"===v.name){
            v.sum = data.result.putawayNum;
          }else if("总产品数"===v.name){
            v.sum = data.result.total;
          }
        });
      });

      let urlOne=this.$common.apidomain+'/common/findflabelbusinessname';
      this.$http.get(urlOne).then(res=>{
        this.yijifenlei =res.data.result;
        this.labeloptions2.push({a:"",b:"--请选择--"})
        this.yijifenlei.forEach((item, index) => {
          let qqqqqq = this.$common.apidomain + '/articleinfo/findlabelbusinessbyflabel?id=' + item.id;
          this.$http.get(qqqqqq).then(res1 => {
            if (res1.data.code === "0000") {
//              this.isKeXuan = false;
//              this.labeloptions2=[]

              this.labeloptions2.push(res1.data.result)
            }
            // console.log(this.labeloptions2)
          })
        })
      })
    },
    methods: {
      showChannel(){  // 渠道分类重置之后
        this.channelShow = false;
      },
      isClose(v){ //弹窗关闭
        this.editIsShow = v;
      },
      edit(v,item){ //编辑
        this.editIsShow = true;
        this.editData.data = item;
        this.editData.title = "编辑";
        this.editData.name = v;
      },
      reset(){ //重置
         this.channelShow = true;
         this.selectorBehindObj.fullName = "";
         this.serverTypeName = "";
        this.selectorBehindObj.labelId = "";
        this.quiry();
      },
      orderTypeOneClick(v){ //服务费类型选择
        console.log(v)
      },
      handleChange(value) {
       console.log(value);
      },

      fittings(item){
          this.isFittings.isShow=true;
          this.isFittings.data=item;
      },
      //      <!--分页查询数据对象功能组合start-->
      quiry(){
        this.paramsData();
        this.getTableList(this.paramsData());
      },
      paramsData(){

        return {params: {
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
          "fullName":this.selectorBehindObj.fullName,
          "labelId":this.selectorBehindObj.labelId,
          "state":this.selectorBehindObj.state,
          "areaName":this.selectorBehindObj.cityId,
          "name":this.serverTypeName,
        }}
      },
      getTableList(params){
        let url=`${this.$apidomain}/serviceinfo/finServicePage`;
        this.$http.get(url,params).then(r=>{
          console.log(r,"hsjdkfk")
          if(r.data.code === "0000"){
            let data=r.data;
            this.tableListData = data.result;
            this.showPages = data.result.pageNum;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pages;
          }else{
            this.$queryFun.successAlert.call(this, r.data.code);
          }

        })
      },
//      <!--分页查询数据对象功能组合end-->
      selector(item,values,SourceTypeValue){
        queryFun.selectorArea.call(this,item,values,SourceTypeValue,"value");
      },
      changeSelector2(value){
            if(value.length === 1){
              this.selectorBehindObj.labelId=value[0];
            }else if(value.length === 2){
              this.selectorBehindObj.labelId=value[1];
            }else if(value.length === 3){
              this.selectorBehindObj.labelId=value[2];
            }else if(value.length === 4){
              this.selectorBehindObj.labelId=value[3];
            }else if(value.length === 5){
              this.selectorBehindObj.labelId=value[4];
            }else if(value.length === 6){
              this.selectorBehindObj.labelId=value[5];
            }else if(value.length === 7){
              this.selectorBehindObj.labelId=value[6];
            }
      },
//新增 start
      route(){
        this.isAddOrder.title="新增产品";
        this.isAddOrder.isShow=true;
      },
//      edit(item){
//        this.isEdit.title="编辑产品";
//        this.isEdit.data=item;
//        this.isEdit.isShow=true;
//      },

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
      off(item){
        this.$confirm('此操作将下架产品，是否继续？', '下架', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=`${this.$apidomain}/serviceinfo/update`, o={"id":item.id,"state":"0"};
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            if(data.code==="0000"){
             this.successAlert("下架成功","1");
            }else{
              this.successAlert(data.error,"0");
            }
          })
        }).catch(() => {
          this.successAlert("已取消下架操作","0");
        });
      },

      publish(item){
        this.$confirm('此操作将上架产品，是否继续？', '上架', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=`${this.$apidomain}/serviceinfo/update`,o={"id":item.id,"state":"1"};
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            if(data.code==="0000"){
              this.successAlert('上架成功!',"1");
            }else{
              this.successAlert(data.error,"0");
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上架操作'
          });
        });
      },
      isCheckbox(data,checkedAll){
        if (!data.checked) {
          this.checked = false;
          return;
        }
        checkedAll.forEach((v, i) => {
          this.checked = v.checked;
        })
      },
      selectorArea(item,values,SourceTypeValue){
        queryFun.selectorArea.call(this,item,values,SourceTypeValue,"name")
      },
      handleItemChange(){

      },
      derive(){

      },

      successAlert(text,state){
        if(state==="1"){
          this.$message({
            type: 'success',
            message: text
          });
          this.quiry();
        }else{
          this.$message({
            type: 'info',
            message: text
          });
        }
      },
    },
    mounted() {

    }
  }
</script>
<style lang="scss">
  #cityOO{
  .el-cascader__label {
    line-height: 36px !important;
  }
  }

</style>

<style scoped lang="scss">
  #app{
    .city{
      padding:0;
    }
    .alert{
      width:100vw;
      height:100vh;
      background:rgba(0,0,0,0.6);
      position:absolute;
      top:0;
      z-index:9999;
      right:0;
      .btn{
        position:absolute;
        bottom:15%;
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        overflow: hidden;
        button{
          width:200px;
          cursor:pointer;
          line-height:44px;
          border:none;
          padding:0;
          margin:0;
          transform: rotate(-360deg);
          border: 1px solid #979797;
          border-radius: 4px;
          float:left;
          background:#fff;
          outline:none;
        }
        .selector{
          color:#fff;
          background: #279447;
        }
      }
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
    >.container{
      font-size:14px;
      width:100%;
      overflow:hidden;
      >.user_sum{
        width:100%;
        height:20px;
        float:left;
        >span{
          margin-right:35px;
          color:blue;
          font-size:14px;
          >b{
            font-weight:normal;
            color:#000;

          }
        }
        >span:last-of-type{
          color:green;
          font-size:14px;
        }

      }
      >.selector_list{
        width:1400px;
        overflow: hidden;
        margin-top: 0;
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

        >.list:nth-of-type(3n){
          /*margin-right:0;*/
        }
      }
      .btn_inquiry{
        width:200px;
        height:44px;
        margin:0 auto;
        cursor:pointer;
        margin-top:30px;
        text-align:center;
        line-height:44px;
        background: #A470CD;
        border-radius: 4px;
        color:#fff;
      }
    }
    .dable_lsit{
      margin-top:50px;
      >.paging{
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
      margin-bottom:200px;
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
          >.multiple{
            width:30px;
            cursor:pointer;
            box-size:border-box;
          }
        }
        >tbody{
          >tr:hover{
            background: #C6E7FF !important;
          }
          >tr{
            width: 100%;
            height:46px;
            text-align: center;
            >td{
              border:1px solid rgba(224,230,237,1);
              border-right: 0;
              border-top: 0;
            }
            td:last-child{
              border-right:1px solid rgba(224,230,237,1);
              span{
                display: inline-block;
                height:17px;
                font-size:13px;
                font-family:PingFangSC-Regular;
                color:rgba(32,160,255,1);
                line-height:18px;
                margin:10px;
              }
            }
          }
          tr:nth-child(2n+2){
            background:rgba(248,248,248,1);
          }
        }
      }
      >.derive{
        float:right;
      }
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
  .footerBnt{
    margin-left: 67px;
    margin-top: 20px;
    width: 100% !important;
  }
</style>

