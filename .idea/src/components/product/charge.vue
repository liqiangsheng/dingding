<template>
  <div id="app">

    <div class="container">
      <div class="selector_list">
        <div class="list">
          城市 :
          <el-select
            v-model="city.SourceTypeValue" placeholder="请选择" @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
            <el-option
              v-for="items in city.SourceType"
              :key="items.name"
              :value="items.name"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit">
        <div class="derive">
          <el-button @click="addcharge(addCategoryIsShow)" size="large" v-show="$isButtonObj('bn-product-high-new')">新增</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.highAltitudeSettings">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.area}}
            </td>
            <td>
              {{item.floorStart}} - {{item.floorEnd}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              <div>
                <span @click="deleteChargeItem(item)" v-show="$isButtonObj('bn-product-high-delete')"> <i class="del_icon"> </i> &nbsp;删除</span>
                <span @click="ChargeItem(item,addCategoryIsShow)" v-show="$isButtonObj('bn-product-high-edit')"> <i class="edit_icon"></i>编辑</span>
              </div>
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
          <p class="home" @click="firstPage">首页</p>d
        </div>
      </div>
    </div>

    <!--新增 start-->
    <div class="alert" v-if="addCategoryIsShow.isShow">
      <chargeAdd :chargeData="addCategoryIsShow" :quiry="quiry"></chargeAdd>
    </div>
    <!--新增 end-->
  </div>
</template>
<script>
  import chargeAdd from './components/chargeAdd.vue'
  export default {
    components:{
      chargeAdd
    },
    data() {
      return {
        addCategoryIsShow:{
          isShow:false,
          floor:[]
        },
        keywords:'',
        checked:false,
        chargeFlag:false,
        chargeData: {},
        city: {
          name: "所属城市",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: this.$store.state.cityData,
          keyName:"city"
        },
        theadsName:[
          '序号',
          '城市',
          '楼层段',
          '价格',
          '操作'
        ],
        sortData: [
          {
            index:3,
            sortAscendingValues:[" price asc "],  //升序
            gradeDownValues:[" price desc "],     //降序
          }
        ],

        selectorBehindObj: {},
        tableListData:{
        },
        showPages: 1,
        currentPageSize: 20,
        total: 0,
        pageTotal: 0,
      }

    },
    created(){
      this.getTableList();
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
          "areaId":this.selectorBehindObj.cityId,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/highAltitudeSetting/findPage";
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
      selectorArea(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.name===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });
      },
      wholeSelector(data,currentState){ //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
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
      deleteChargeItem(item){
        this.$confirm('此操作将删除，是否继续？', '删除高空费条目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=this.$apidomain+"/highAltitudeSetting/deleteHighAltitudeSetting?id="+item.id;
          this.$http.get(url).then(res=>{
            let data = res.data;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.quiry();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          });
        });
      },
      closeReset(){
        this.chargeFlag = false
      },
      addcharge(isShow){
        isShow.isShow=true;
        this.chargeFlag = true;
        this.chargeData={};
        this.addCategoryIsShow.floor=[]
      },
      ChargeItem(item,isShow){
        isShow.isShow=true;
        isShow.id=item.id;
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
    },
    mounted() {

    },

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
              >div > span{
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
                }
              }
              >div{
                display: inline-block;
                overflow: hidden;
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
  .charge-dialog{
    z-index: 301;
    position: relative;
  }
  .dialogContent{
    height:500px;
    overflow: scroll;
  }

</style>
