<template>
  <div id="app">
    <div class="container" v-if="!isFittings.isShow">
      <div class="user_sum">
        <product-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></product-sum>
      </div>
      <div class="selector_list">
        <div class="list">
          名称 :
          <el-input
            placeholder="请输入关键字查询"
            v-model="selectorBehindObj.fullName"
            style="width:200px;"
          >
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
          分类 :
          <el-cascader id="labelId"
                       @change="changeSelector2"
                       :options="labeloptions2"
                       change-on-select
                       @active-item-change="handleItemChange"
                       :props="props"
          ></el-cascader>
        </div>
        <!--<div class="list">-->
        <!--城市 :-->
        <!--<el-select-->
          <!--v-model="city.SourceTypeValue" placeholder="请选择" @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">-->
          <!--<el-option-->
            <!--v-for="items in city.SourceType"-->
            <!--:key="items.value"-->
            <!--:value="items.name"-->
          <!--&gt;-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--</div>-->
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
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
          <tr v-for="(item,index) in tableListData.serviceInfos">
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
            <td>
              <table-list :item="item.areaInfos" :name="'areaName'"></table-list>
            </td>
            <!--s上门费-->
            <td>
              <table-list :item="item.areaInfos" :name="'price1'"></table-list>
            </td>
            <!--上门费是否叠加-->
            <td>
              <table-list :item="item.areaInfos" :name="'isCollectDoorFee'"></table-list>
            </td>
            <!--服务费(元)-->
            <td>
              <table-list :item="item.areaInfos" :name="'price2'"></table-list>
            </td>
            <!--质保时间（天）-->
            <td>
              <table-list :item="item.areaInfos" :name="'warrantyDatetime'" ></table-list>
            </td>
            <!--状态-->
            <td>
              <table-list :item="item.areaInfos" :name="'state'"></table-list>
            </td>
            <!--操作-->
            <td>
              <span  @click="fittings(item)" v-show="$isButtonObj('bn-product-list-soldout')">
                <el-button type="text" ><i class="peijian_icon"></i>配件管理</el-button>
              </span>
              <span  @click="edit(item)" v-show="$isButtonObj('bn-product-list-soldout')">
                <el-button type="text" ><i class="edit_icon"></i>编辑</el-button>
              </span>
              <span v-if="item.state=='1'" @click="off(item)" v-show="$isButtonObj('bn-product-list-soldout')">
                <el-button type="text" ><i class="undercarriage_icon"></i>下架</el-button>
              </span>
              <span v-if="item.state=='0'" @click="publish(item)" v-show="$isButtonObj('bn-product-list-soldout')">
                <el-button type="text"><i class="top_icon"></i>上架</el-button>
              </span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paging">
          <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pageTotal}}</p>
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
    <edit-alert :data="isEdit" :query="quiry" v-if="isEdit.isShow"></edit-alert>
  </div>
</template>
<script>
  import productSum from "./components/productSum.vue";
  import tableList from "./components/tableList.vue";
  import editAlert from "./components/editAlert";
  import addProduct from "./components/addProduct"
  import addFittings from "./components/addFittings"
  import queryFun from "@/components/commonJs/queryFun"
  export default {
    components:{
      productSum,
      addFittings,
      addProduct,
      tableList,
      editAlert
    },
    data() {
      return {
        isFittings:{
          isShow:false
        },
        isEdit:{
          isShow:false,
          data:{

          },
        },
//        city: {
//          name: "所属城市",
//          key: "cityId",
//          SourceTypeValue: '', //选中后的
//          SourceType: this.$store.state.cityData,
//          keyName:"city"
//        },
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
          '城市',
          '上门费(元)',
          '上门费是否叠加',
          '服务费(元)',
          '质保时间（天）',
          '状态',
          '操作'
        ],
        labelId: '',
        state:'',
        props: {
          value: 'label',
          children: 'cities',
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
    created(){

      this.quiry();
      let url=this.$apidomain+"/common/findlabelbusinessoptions";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2 = data.result;
      })
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
    },
    methods: {
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
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "fullName":this.selectorBehindObj.fullName,
          "labelId":this.selectorBehindObj.labelId,
          "state":this.selectorBehindObj.state,
          "areaName":this.selectorBehindObj.cityId,
        }}
      },
      getTableList(params){
        let url=`${this.$apidomain}/serviceinfo/findpage`;
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
      selector(item,values,SourceTypeValue){
        queryFun.selectorArea.call(this,item,values,SourceTypeValue,"value");
      },
      changeSelector2(value){
        this.labeloptions2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.labelId=v.id;
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.labelId=e.id
              }
            })
          }
        });
      },
//新增 start
      route(){
        this.isAddOrder.title="新增产品";
        this.isAddOrder.isShow=true;
      },
      edit(item){
        this.isEdit.title="编辑产品";
        this.isEdit.data=item;
        this.isEdit.isShow=true;
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
        bottom:17%;
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
        width:100%;
        overflow: hidden;
        margin-top:40px;
        >.list{
          float:left;
          line-height:60px;
          list-style:none;
          font-size:14px;
          margin-right:5%;

        }
        .el-input{
          width:auto;
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

          >th{
            padding:10px 10px;
            text-align:center;
            background: #E5E9F2;
            box-shadow: inset 0 1px 0 0 #E0E6ED,
            inset 0 -1px 0 0 #E0E6ED;
          }
          >.multiple{
            width:30px;
            cursor:pointer;
            box-size:border-box;
          }
        }
        >tbody{
          >tr{
            border-top:1px solid #ccc;
            >td{
              border-bottom:1px solid #ccc;
              padding:10px 10px;
              text-align:center;
            }
            >td:first-of-type{
              border-right:1px solid #ccc;
            }
            >td:last-of-type{
              padding-top:0;
              padding-bottom:0;
              display: flex;
              >span{
                height:100%;
                float:left;
                flex:1;
                padding-top:4px;
                padding-left:30px;
                i{
                  width:16px;
                  height:16px;
                  background:url(../../../static/images/xiajia.png) center center no-repeat;
                  background-size:100% 100%;
                  float:left;
                  margin-right:3px;
                  vertical-align: middle;
                }

              }
              >span:last-of-type{
                float:right;
                padding-left:0px;
                padding-top:8px;
                padding-right:20px;
                cursor:pointer;
                i{
                  width:16px;
                  height:16px;
                  margin-top:0;
                  background:url(../../../static/images/xiajia.png) center center no-repeat;
                  background-size:100% 100%;
                  float:left;
                }
              }
            }
          }
          >tr:nth-of-type(even){
            background: #F9FAFC;
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

</style>

