<template>
  <div id="app">
    <div class="container">
      <div class="user_sum">
        <product-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></product-sum>
      </div>
      <div class="selector_list">
        <div class="list">
            城市 :
            <el-cascader id="city"
                         @change="changeSelector"
                         :options="options2"
                         change-on-select
                         @active-item-change="handleItemChange"
                         :props="props"
            ></el-cascader>
        </div>
        <div class="list">
          <el-select v-model="productType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="list">
          上门费 :
          <el-input
            placeholder="单行输入"
            v-model="name">
          </el-input>
        </div>
      </div>
      <div class="dable_lsit">
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
              <span v-if="item.status=='已上架'" @click="off(item)"><el-button type="text" ><i></i>下架</el-button></span>
              <span v-if="item.status=='未上架'" @click="publish(item)"><el-button type="text"><i></i>上架</el-button></span>
              <span @click="details(item,index)"> <i></i>编辑</span>
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
  </div>
</template>
<script>
  import productSum from "./components/productSum.vue"
  export default {
    components:{
      productSum
    },
    data() {
      return {
        userSum:[{
          sum:"121212", //总用户量
          color:"blue",
          name:"上架产品数"
        },{
          color:"green",
          sum:"101212", //总用户量
          name:"总产品数"
        }
        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        productType: '',
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
        selectorBehindObj: {},
        options2: [
          {
            label: '武汉',
            id:"0101",
            cities: [
              {label: "洪山区",id:"010101"},
              {label: "武昌区",id:"010102"},
              {label: "汉口区",id:"010103"},
              {label: "江夏区",id:"010104"},
              {label: "汉阳区",id:"010105"},
            ]
          }, {
            label: '深圳',
            id:"0102",
            cities: [
              {label: "南山区",id:"010201"},
              {label: "罗湖区",id:"010202"},
              {label: "宝安区",id:"010203"},
              {label: "龙华区",id:"010204"}
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
        this.$confirm('此操作将下架产品，是否继续？', '下架', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '下架成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架操作'
          });
        });
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
      }
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
                  background:url(../../../static/images/ban.png) center center no-repeat;
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
                  background:url(../../../static/images/detailed.png) center center no-repeat;
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
