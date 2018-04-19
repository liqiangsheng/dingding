<template>
  <div id="app">
    <div class="container" v-if="!isDatail.isShow">
      <div class="selector_list">
        <div class="list">
          <div class="list_name">
            对象编号 :
          </div>
          <el-input
            placeholder="请输入关键字查询"
            v-model="selectorBehindObj.id">
          </el-input>
        </div>
        <div  v-for="(item,index) in optionList" :key="index" class="list">

          <div class="list_name">
            {{item.name}} :
          </div>
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
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(item,index) in tableListData.fawallets">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.userRole|userRoleShow}}
            </td>
            <td>
              {{item.userName}}
            </td>
            <td>
              {{item.guaranteeAmount}}
            </td>
            <td>
              {{item.withdrawDepositAmount}}
            </td>
            <td>
              {{item.canWithdrawDepositAmount}}
            </td>
            <td>
              {{item.accountAmount}}
            </td>
            <td>
              {{item.accountAmount}}
            </td>
            <td>
              <span @click="off(item)" v-show="$isButtonObj('bn-finance-account-edit')"><el-button type="text" ><i class="edit_icon"></i>编辑资金</el-button></span>
              <span @click="details(item,index,isDatail)" v-show="$isButtonObj('bn-finance-account-details')"> <i class="detil_icon"></i>查看明细</span>
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
    <div class="container" v-if="isDatail.isShow">
      <detail :isDatail="isDatail" ></detail>
    </div>
    <drawback v-if="isDrawback.isShow" :isDrawback="isDrawback" :quiry="quiry"></drawback>
  </div>
</template>
<script>
  import drawback from "./drawback"
  import detail from "./detail"
  export default {
    components:{
      drawback,
      detail,
    },
    data() {
      return {
        isDatail:{
          isShow:false
        },
        isDrawback:{
          isShow:false,
          title:"编辑资金"
        },
        checked:false,
        theadsName:[
          '序号',
          '对象编号',
          '对象类型',
          '对象名称',
          '保证金余额',
          '已提现',
          '可提现',
          '账户余额',
          '冻结资金',
          "操作"
        ],
        sortData: [
          {
            index:3,
            sortAscendingValues:[" guarantee_amount asc "],  //升序
            gradeDownValues:[" guarantee_amount desc "],     //降序
          },  {
            index:4,
            sortAscendingValues:[" withdraw_deposit_amount asc "],  //升序
            gradeDownValues:[" withdraw_deposit_amount desc "],     //降序
          },  {
            index:5,
            sortAscendingValues:[" can_withdraw_deposit_amount asc "],  //升序
            gradeDownValues:[" can_withdraw_deposit_amount desc "],     //降序
          },  {
            index:6,
            sortAscendingValues:[" account_amount asc "],  //升序
            gradeDownValues:[" account_amount desc "],     //降序
          },
        ],
        name: '',
        cityId: '', //城市id
        props: {
          value: 'label',
          children: 'cities',
        },
        selectorBehindObj: {
          id:"",
        },
        optionList:[
          {
            name:"对象类型",
            key:"userRole",
            SourceTypeValue: '',
            SourceType:[
              {
                value: '---请选择---',
                id:""
              }, {
                id:"Site",
                value: '网点'
              },{
                id:"Channel",
                value: '渠道'
              },{
                id:"Autotrophy",
                value: '自营师傅'
              },{
                id:"PartTimeJob",
                value: '兼职师傅'
              }
            ]
          }
        ],
        tableListData:{
          pageNum:1,
          pageSize:20,
          total:0,
          pageTotal: 0,
          fawallets:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
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
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "id":this.selectorBehindObj.id,
          "userRole":this.selectorBehindObj.userRole,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/faWallet/findPage";
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
      details(item,index,isShow){
        isShow.walletId = item.id;
        isShow.userRole = item.userRole;
        isShow.isShow=true
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
      off(item){
        this.isDrawback.objectId = item.id;
        this.isDrawback.objectName = item.userName;
        this.isDrawback.objectRole = item.userRole;
        this.isDrawback.objectccountAmount=item.accountAmount;
        this.isDrawback.isShow=true;
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
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
            this.cityId=v.id;             //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.cityId=e.id          //选择区
              }
            })
          }
        });
      },
      handleItemChange(){

      },
      derive(){

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

</style>
