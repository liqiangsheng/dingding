<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          <span class="list_name">  用户手机号 :</span>
          <el-input
            placeholder="请输入内容"
            v-model="selectorBehindObj.phoneNum">
          </el-input>

        </div>
        <div class="list">
          <span class="list_name">选择日期范围 :</span>
          <el-date-picker
            v-model="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit table">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">

            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.userCumulativeFractionRecords">

            <td>
              {{index+1}}
            </td>
            <td>
              {{item.userPhoneNum}}
            </td>
            <td>
              {{item.recommendUserPhoneNum}}
            </td>
            <td>
              {{item.type|fractionRecordTypeShow}}
            </td>
            <td>
              {{item.gainCount}}
            </td>
            <td>
              {{item.surplusCount}}
            </td>
            <td>
              {{item.createTime  | moment('YYYY-MM-DD HH:mm:ss')}}
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
    components:{

    },
    data() {
      return {
        //画图数据start
        timeQuantum:[],
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 8);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        //
        checked:false,
        //查询的date    数据  start
        selectorBehindObj:{
        },
        //查询的date    数据  end
        theadsName:[
          '序号',
          '绑定手机号',
          '被推荐人手机号',
          '积分类型',
          '当前操作积分',
          '剩余积分',
          '提交时间',
        ],
        tableListData:{

        },          //表格数据
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

      quiry(){
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD 00:00:00');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD 23:59:59');
        }
        this.getTableList(this.paramsData());
      },
      //查询数据 end

      //table 数据  start;
      isCheckbox(data,checkedAll){
        if(!data.checked){
          this.checked=false;
          return;
        }
        checkedAll.forEach((v,i)=>{
          this.checked=v.checked;
        })
      },
      wholeSelector(data,currentState){               //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      derive(){        //导出事件

      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "userPhoneNum":this.selectorBehindObj.phoneNum,
          "statisticsDateStartStr":this.statisticsDateStartStr, //师傅工号
          "statisticsDateEndStr":this.statisticsDateEndStr, //师傅工号
          "userId":this.$route.query.id
        }}
      },
      getTableList(params){
        let url=`${this.$apidomain}/userCumulativeFractionRecord/findPage`;
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNum;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal

        })
      },
      //table 数据  end;

      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }

        })
      },
      //分页
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
    },

    mounted() {


    },

  }
</script>
<style>
  .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-message-box__wrapper{
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">

  @import "../../../assets/styles/comminStyle2";
  #app{
    .container{
      >.selector_list{
        margin-top:0;
        .list_name{
          width:110px;
        }
        .list{
          width:auto;
        }
      }


    }
    .table {
      #Reminded_icon {
        i {
          background: url(../../../../static/images/del.png) center center no-repeat;
          background-size: 100% 100%;
          width: 14px;
          height: 14px;
        }
      }
      #edit {
        i {
          background: url(../../../../static/images/en.png) center center no-repeat;
          background-size: 100% 100%;
        }
      }
      .child_table{
        tr{
          border:none;
          >.child_table_td{
            border:none;
            padding:10px ;
          }



        }
      }
    }

  }

  .alert{
    >p{
      position:absolute;
      top:16%;
      padding:10px 15px;
      cursor: pointer;
      right:22%;
      font-size: 35px;
    }
  }
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






