<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list" style="width:320px;">
          <span style="width:110px;" class="list_name"> 选择日期区间 :</span>
          <DatePicker  v-model="date"  type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="请选择时间" style="width: 200px"></DatePicker>
        </div>
        <div class="list">
          <span class="list_name">
            用户名 :
          </span>
          <el-input
            placeholder="请输入关键字查询"
            v-model="userName">
          </el-input>
        </div>
        <!--城市-->
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="query(true)">
        查询
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.logs">
            <td>
              {{index+1}}
            </td>
            <td>
                <span v-for="(items,index) in item.mLogItem.mContents" v-if="items.mKey=='username'">{{items.mValue}}</span>
            </td>

            <td>
                <span v-for="(items,index) in item.mLogItem.mContents" v-if="items.mKey=='SysUserRole'">{{items.mValue}}</span>
            </td>
             <td>
                <span v-for="(items,index) in item.mLogItem.mContents" v-if="items.mKey=='operationBehavior'">{{items.mValue}}</span>
            </td>
            <td>
                <span v-for="(items,index) in item.mLogItem.mContents" v-if="items.mKey=='content'">{{items.mValue}}</span>
            </td><td>
                <span v-for="(items,index) in item.mLogItem.mContents" v-if="items.mKey=='createTime'">{{items.mValue}}</span>
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

  </div>
</template>
<script>
  export default {
    props:["isDetaileds"],
    data() {
      return {
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
        date:"",
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
        checked:false,
        userName:"",
        theadsName:[
          '序号',
          '用户名',
          '角色名称',
//          '对象位置',
          '操作行为',
          '操作内容',
          '操作时间',
        ],
        selectorBehindObj: {},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          productInfos:[]
        },
      }
    },
    created(){
//      this.query(false);
      this.query(false)
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      query(isTime){
        if(isTime){
          this.statisticsDateStartStr = this.$moment(this.date[0]).format('YYYY-MM-DD HH:mm');
          this.statisticsDateEndStr = this.$moment(this.date[1]).format('YYYY-MM-DD HH:mm');
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "username":this.userName,
          "statisticsDateStartStr":this.statisticsDateStartStr==="Invalid date"?"":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr==="Invalid date"?"":this.statisticsDateEndStr,
        }
        }
      },
      getTableList(params){
        let url=`${this.$apidomain}/sysOperationLog/findPage`;
        this.$http.get(url,params).then( r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;

        })
      },

//      <!--分页查询数据对象功能组合end-->
      handleSizeChange(val) {
        this.currentPageSize=val;
        this.getTableList(this.paramsData());
      },
      handleCurrentChange(val) {
        this.showPages=val;
        this.getTableList(this.paramsData());
      },
      firstPage(){
        if(this.showPages===1 ){
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
  .closeX{
    background:url(../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
    right:10px;
    transform:translateY(50%);
  }

</style>



