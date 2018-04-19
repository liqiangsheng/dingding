<template>
  <div id="app">
    <div class="container">

      <div class="selector_list">
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
        <div class="list">
          计算日期 (起):
          <DatePicker type="date" placeholder="选择日期" v-model="selectorBehindObj.originTime" style="width: 200px"></DatePicker>
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
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.feedBacks">

            <td>
              {{index+1}}
            </td>
            <td>
              {{item.city|placeholder}}
            </td>
            <td>
              {{item.phoneNum|placeholder}}
            </td>
            <td>
              {{item.userType|userTypeShow}}
            </td>
            <td>
              {{item.content |placeholder}}
            </td>
            <td>
              {{item.createTime  | moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
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
        checked:false,
        //查询的date    数据  start
        selectorBehindObj:{
          originTime:""
        },
        //查询的date    数据  end
        theadsName:[
          '序号',
          '城市',
          '用户编号',
          '用户类型',
          '内容',
          '提交时间',
        ],
        sortData: [
          {
            index:6,
            sortAscendingValues:[" create_time asc "],  //升序
            gradeDownValues:[" create_time desc "],     //降序
          }
        ],
        optionList:[ {
            name: "服务工种",
            key: "skillId",
            SourceTypeValue: '',
            SourceType: []
          },
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
      this.getTableList();
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("skillId"==v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      });
    },
    methods: {

      quiry(){
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
          "status":this.selectorBehindObj.status,
          "cityId":this.cityId,
          "tel":this.telBind}}
      },
      getTableList(params){
        let url=`${this.$apidomain}/feedback/findPage`;
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






