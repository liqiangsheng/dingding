<template>
  <div id="app">
    <div class="container">
      <div class="user_sum">
        <product-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></product-sum>
      </div>
      <div class="selector_list">
        <div class="list">
          对象编号 :
          <el-input
            placeholder="请输入关键字查询"
            v-model="selectorBehindObj.objNumber">
          </el-input>
        </div>
        <div class="list">
          账户编号 :
          <el-input
            placeholder="请输入关键字查询"
            v-model="selectorBehindObj.accountNumber">
          </el-input>
        </div>
        <div class="list">
          金额大于 :
          <el-input
            placeholder="请输入关键字查询"
            type="number"
            v-model="selectorBehindObj.number">
          </el-input>
        </div>
        <div class="list">
          记账时间 :
          <DatePicker v-model="selectorBehindObj.time" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></DatePicker>
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
        <!--城市-->
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="query">
        查询
      </div>
      <div class="dable_lsit">

        <!--导出-->
        <div class="derive">
          <el-button @click="derive" size="large">导入</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.productInfos">
            <td>
              {{item.sequenceNumber}}
            </td>
            <td>
              {{item.productID}}
            </td>
            <td>
              {{item.city}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              {{item.time}}
            </td>
            <td>
              {{item.status}}
            </td>
            <td>
                备注
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
    <p class="closeX"  @click="isDatail.isShow=false"></p>
    <el-button @click="isDatail.isShow=false">取消</el-button>
  </div>
</template>
<script>
  import productSum from "./productSum"
  export default {
    props:["isDatail"],
    components:{
      productSum,
    },
    data() {
      return {
        isDrawback:{
          isShow:false,
        },
        userSum:[{
          sum:"121212", //总用户量
          color:"blue",
          name:"账户编号"
        },{
          color:"green",
          sum:"101212", //总用户量
          name:"对象编号"
        },{
          color:"green",
          sum:"101212", //总用户量
          name:"对象类型"
        },{
          color:"green",
          sum:"101212", //总用户量
          name:"罚款次数"
        },{
          color:"green",
          sum:"101212", //总用户量
          name:"罚款金额"
        },
        ],
        checked:false,
        theadsName:[
          '序号',
          '商品编号',
          '城市',
          '名称',
          '价格',
          '创建时间',
          '状态',
          '操作'
        ],
        name: '',
        cityId: '', //城市id
        props: {
          value: 'label',
          children: 'cities',
        },
        selectorBehindObj: {
          objNumber:"",
          accountNumber:"",
          number:"",
          time:""
        },
        optionList:[       //下拉列表数据
          {
            name:"流水类型",
            key:"01",
            SourceTypeValue: '', //选中后的
            SourceType:[
              {
                value: '已上架',
                id:"004"
              }, {
                id:"005",
                value: '未上架'
              }
            ]
          }
        ],
        tableListData:{
          pageNum:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          productInfos:[
            {
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"未上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },{
              checked:false,
              sequenceNumber:"B454545",
              productID: 'dadadasdas',
              city:"深圳",
              name: '清洗',
              price: '30',
              time:"2017-5-12",
              status:"已上架"
            },
          ]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0
      }
    },
    methods: {
      query(){

        let params={params:{
          "pageNum":this.currentPageSize,
          "pageSize":this.showPages,
          "status":this.selectorBehindObj.status,
          "cityId":this.cityId,
          "tel":this.telBind
        }};
        this.getTableList(params);

      },
      wholeSelector(data,currentState){ //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },

      paramsData(){
        return {params: {"pageNum":JSON.stringify(this.showPages),"pageSize":JSON.stringify(this.currentPageSize)}}
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
        this.isDrawback.isShow=true;
      },
      publish(item){
        this.$confirm('此操作将下架产品，是否继续？', '下架', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '上架成功!'
          });
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
      getTableList(params){
        let url=common.apidomain+"/userInfo/findPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.tableListData.userInfos.forEach((v,i)=>{
//            v.checked=true
          });
          this.showPages = data.result.pageNum;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal
        })
      },
      handleItemChange(){

      },
      derive(){

      },
    },
    mounted() {

    },
    created(){

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
              >span{
                height:100%;
                float:left;
                padding-top:4px;

                padding-left:30px;
                i{
                  width:16px;
                  height:16px;
                  background:url(../../../../static/images/ban.png) center center no-repeat;
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
                  margin-top:3px;
                  background:url(../../../../static/images/detailed.png) center center no-repeat;
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
  .closeX{
    right:0;
    margin-top:5px;

  }
</style>
