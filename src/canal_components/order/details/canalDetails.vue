<template>
  <div id="app" class="channel-app-box">
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
          日期 (起):
          <DatePicker type="date" placeholder="选择日期" style="width: 200px" @on-change="selectorDateStart"></DatePicker>
        </div>
        <!--<div class="list">-->
        <!--计算日期 (止):-->
        <!--<DatePicker type="date" placeholder="选择日期" style="width: 200px" @on-change="selectorDateEnd"></DatePicker>-->
      <!--</div>-->
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
          <tr v-for="(item,index) in tableListData.userInfos">
            <td>
              {{item.sequenceNumber}}
            </td>
            <td>
              {{item.rank}}
            </td>
            <td>
              {{item.city}}
            </td>
            <td>
              {{item.classify}}
            </td>
            <td>
              {{item.cost}}
            </td>
            <td>
              {{item.sum}}
            </td>
            <td>
              {{item.masterType}}
            </td>
            <td>
              {{item.updateTime}}
            </td>  <td>
            {{item.updateTime}}
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
    <p class="el-icon-close close" @click="close(isCanalDetails)"></p>
  </div>
</template>
<script>
  export default {
    props:["isCanalDetails"],
    data() {
      return {
        edit:{
          isShow:false,
          isDisabled:false
        },
        checked:false,

        //查询的date    数据  start
        date:{
          startDate:"",
          startEnd:"",
        },
        selectorBehindObj:{},
        //查询的date    数据  end
        theadsName:[
          '序号',
          '级别',
          '城市',
          '分类',
          '费用类别（多个）',
          '提点价格',
          '师傅类别',
          '近期更新',
          '操作'
        ],
        isActive:"0",   //选中的
        optionList:[       //下拉列表数据
          {
            name:"渠道",
            key:"masterType",
            SourceTypeValue: '', //选中后的
            SourceType:[
              {     //来源类型
                value: '---请选择---',
                id:""
              }, {
                value: '师傅类别2',
                id:"1"
              }, {
                value: '师傅类别1',
                id:"0"
              }, {
                value: '师傅类别3',
                id:"2"
              }
            ]
          },
        ],


        tableListData:{
          pageNo:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          userInfos:[
            {
              checked:false,
              cost:"dfdfd",
              sum:"10%",
              btnType:"0",
              updateTime:"2017-2-1",
              sequenceNumber:"B454545",
              rank:"B12132123121",
              city:"深圳",
              masterType:"个人",
              followStatus:"已关注",
              classify:"家电维修",
            }
          ]
        },          //表格数据
        showPages:1,
        currentPageSize:20,
        total:0,
        currentPage4: 1,
        pageTotal:0,
      }
    },
    methods: {
      //关闭start
      close(isUserDetails){
        isUserDetails.isShow=false;
        this.$store.commit("sendRefuseData",false)
      },
      //关闭 end
      //查询数据 start
      selectorDateStart(date){    //起始时间
        if(date){
          this.date.startDate=date;
        }
      },
      selectorDateEnd(date){   //结束时间
        if(date){
          this.date.startEnd=date;
        }
      },
      selectorDate(val){      //j记账时间
        if(val){
          this.Date=val
        }
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }

        })
      },

      quiry(){

        //参数  start
        console.log(this.date);    //时间参数  Obj；
        console.log(this.selectorBehindObj);  //下拉参数
        //参数  end：
//        this.getTableList(this.paramsData());
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
        console.log(currentState);
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      derive(){        //导出事件
      },

      paramsData(){
        return {params: {"pageNo":JSON.stringify(this.showPages),"pageSize":JSON.stringify(this.currentPageSize),"status":this.selectorBehindObj.status,
          "cityId":this.cityId,
          "tel":this.telBind}}
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


      getTableList(params){
        let url=common.apidomain+"/userInfo/findPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          console.log(data.result);
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal
        })
      }
      //table 数据  end;

    },
    mounted() {
    },
    created(){
      this.$store.commit("sendRefuseData",true)
    }
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






