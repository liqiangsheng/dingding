<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          <div class="list_name">
            创建时间 :
          </div>

          <DatePicker   v-model="selectorBehindObj.date"  type="datetimerange" format="yyyy-MM-dd" placeholder="请选择时间" style="width: 200px"></DatePicker>
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
        <div class="list">

          <div class="list_name">
            提现流水号 :
          </div>
          <el-input
            style="width:200px;"
            placeholder="请输入内容"
            v-model="selectorBehindObj.streamNumber">
          </el-input>
        </div>
        <div class="list">

          <div class="list_name">
            对象编号 :
          </div>
          <el-input
            style="width:200px;"
            placeholder="请输入内容"
            v-model="selectorBehindObj.streamNumber">
          </el-input>
        </div>

        <div class="list business">
          <div class="list_name">
            提现金额 :
          </div>
          <el-input
            style="width:200px;"
            type="number"
            v-model="selectorBehindObj.min"
            placeholder="最低"
          >
          </el-input>
        </div>
      </div>

      <!--查询按钮-->
      <section class="query_button_box">
        <el-button @click="quiry('')" type="primary" class="query_button"> 查询</el-button>
      </section>

      <div @click="derive" class="derive_button cursor">导出表格</div>
      <div class="dable_lsit table">

        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th>
              <el-checkbox v-model="checked" @change="wholeSelector(tableListData.list,checked)"> </el-checkbox>
            </th>
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}

            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.list">
            <!--序号-->
            <td style="border-right:none;width:50px;">
              <el-checkbox v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox>
              <!--{{tableListData}}-->
            </td>
            <td style="width:50px;">
              {{index+1}}
            </td>
            <td>
              {{item.runningWater}}
            </td>
            <td>
              {{item.objIdentifier }}
            </td>
            <td>
              {{item.objType}}
            </td>
            <td>
              {{item.objName}}
            </td>
            <td>
              {{item.rechargeSum}}
            </td>
            <td>
              {{item.cardNumber}}
            </td>
            <td>
              {{item.accountSum}}
            </td>

            <td>
              {{item.bankName}}
            </td>

            <td>
              {{item.availableSum}}
            </td>
            <td>
              {{item.createdTime}}
            </td>
            <td class="table_operate cursor">

              <span v-if="item.state" v-for="(ite,index) in ['通过','驳回']"  @click="operate(index)">{{ite}}</span>
              <p v-if="!item.state">已驳回</p>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paging">
          <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pageSize}}</p>
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
    <div>
    </div>
    <common-alert :data="data" v-if="data.isShow" :sendData="confirmSubmit"></common-alert>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data:{
          isShow:false,
          title:"确认驳回"
        },
        /*
          全选反选模块start
        */
        checked:false,
        isCheckboxList:[],
        /*
         全选反选模块end
        */
        //<!--弹窗基础数据start-->
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",

        optionList: [
          {
            name: "对象类型",
            key: "payType",
            SourceTypeValue: '',
            SourceType: [
              {
                id:"1",
                value: "充值",
              },
              {
                id:"2",
                value:"提现"
              },
              {
                id: "3",
                value: "支付"
              },{
                value:"结款",
                id:"4"
              }
            ]
          }
        ],
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        theadsName:[
          '序号',
          '提现流水号',
          '对象编号',
          '对象类型',
          '对象名称',
          '开户行',
          '卡号',
          '提现金额（元）',
          '账户余额（元）',
          '可用余额（元）',
          '创建时间',
          '交易状态',
        ],

        selectorBehindObj:{
          date:["",""],
          streamNumber:'',
          min:"",
          max:""
        },
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          list:[
            {
              runningWater:201521224522,
              objIdentifier:'q121212',
              objType:"渠道",
              objName:"华侨城",
              rechargeSum:10,
              accountSum:55,
              bankName:"中国银行",
              cardNumber:12121212555555551,
              availableSum:20,
              state:0,
              createdTime:1515151515,
            },  {
              runningWater:201521224522,
              objIdentifier:'q121212',
              objType:"渠道",
              objName:"华侨城",
              rechargeSum:10,
              accountSum:55,
              bankName:"中国银行",
              cardNumber:12121212555555551,
              availableSum:20,
              state:1,
              createdTime:1515151515,
            },  {
              runningWater:201521224522,
              objIdentifier:'q121212',
              objType:"渠道",
              objName:"华侨城",
              rechargeSum:10,
              accountSum:55,
              bankName:"中国银行",
              cardNumber:12121212555555551,
              availableSum:20,
              state:0,
              createdTime:1515151515,
            } , {
              runningWater:201521224522,
              objIdentifier:'q121212',
              objType:"渠道",
              objName:"华侨城",
              rechargeSum:10,
              accountSum:55,
              bankName:"中国银行",
              cardNumber:12121212555555551,
              availableSum:20,
              state:1,
              createdTime:1515151515,
            }
          ]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    created(){
//      this.getTableList(this.paramsData());
    },
    methods: {
      confirmSubmit(e){
        console.log(e);
        this.data.isShow=false;
      },
      operate(i){
        /*
        0 通过
        1 驳回
        * */
        if(!i){
          this.$queryFun.confirm.call(this,{
            text:"通过前，请确认已将该提现金额打款至该渠道",
            title:"确认通过",
            success(){

            }
          })
        }else{
          this.data.isShow=true;
        }
      },
      /*
        全选反选模块start
      */
      checkbox(index){
        this.$queryFun.isCheckbox.call(this,this.tableListData.list,index);
      },
      wholeSelector(item,currentState){
        this.$queryFun.wholeSelector.call(this,item,currentState);
      },
      derive(){        //导出事件
        let data=[];
        this.tableListData.list.forEach(v => {
          if (v.isCheckboxList) data.push(v.id);
        });
        if(data.length){
          const ids=data.join(",");
          const url=`${this.$common.apidomain}/officialpartnercostflowController/exportFile`;
          this.$http.post(url,{ids}).then(res=>{
            const data=res.data;
            if(data.code==="0000"){
              window.location=data.result;
              this.$queryFun.successAlert.call(this,"导出成功","1");
            }else{
              this.$queryFun.successAlert.call(this,data.error);
            }
          })
        }else{
          this.$queryFun.successAlert.call(this,"请选择需要导出的选项");
        }
      },

      /*
        全选反选模块end
      */
      //      <!--分页查询数据对象功能组合start-->
      quiry(){

//        this.getTableList(this.paramsData());

      },
      paramsData(){
        const filterDate = e => this.$moment( this.selectorBehindObj.date[e] ).format("YYYY-MM-DD")==="Invalid date"?'':this.$moment( this.selectorBehindObj.date[e] ).format("YYYY-MM-DD");

        this.statisticsDateStartStr = filterDate(0);

        this.statisticsDateEndStr = filterDate(1);

        return {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "startDate":filterDate(0),
          "endDate":filterDate(1),
          "minFee":this.selectorBehindObj.min,
          "maxFee":this.selectorBehindObj.max,
          "payType":this.selectorBehindObj.payType,
          "payState":this.selectorBehindObj.payState,
          "journalAccountNum":this.selectorBehindObj.streamNumber,
          "paySource":this.selectorBehindObj.paySource,
//          "statisticsDateStartStr":
//          "statisticsDateEndStr":filterDate(1),
        }
      },

      getTableList(params){
        let url=`${this.$apidomain}/officialpartnercostflowController/all`;
        this.$http.post(url,params).then(r=>{
          let data=r.data;
          if(data.code==="0000"){
            this.tableListData = data.result;
            this.showPages = data.result.pageNo;
            this.currentPageSize = data.result.pageSize;
            this.total = data.result.total;
            this.pageTotal = data.result.pageTotal;
            this.isCheckboxList=[];
            data.result.list.forEach((v,i)=>{
              this.isCheckboxList.push(false);
              this.tableListData.list[i].isCheckboxList=false;
            })

          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
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

      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/comminStyle2";
  /*@import "../../../assets/styles/Ch_comminStyle";*/
  #app{
    .dable_lsit{
      position:relative;
      margin-top:20px;
    }
    .query_button_box{
      margin-left:8.5em;
      margin-bottom:3em;
      margin-top:1em;
      .query_button{
        padding-left:3em;
        padding-right:3em;
      }
    }
    .container{
      >.selector_list{
        > .list{
          width:320px;

          >.list_name{
            width:7em;
          }
        }
        >.business{
          width:auto;
          >.list_name{
            width:8em;
          }
        }
      }

    }

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

  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }

  .el-dialog__wrapper{
    z-index: 999999;
  }
#app{
  .table.dable_lsit {
    margin-top:2em;
    >table{
      tr{
        >td{
          border-left:1px solid #ccc;
        }
        >td:first-of-type{
          border-left:none;
        }
        >.table_operate{
          min-width: 155px;
         > span{
            font-size: 1em;
            display: inline-block;
            padding-top:0;
            width:46%;
           color:#20A0FF;
          }
          >p{
            margin: 0 auto;
            float:none;
          }
          >span:last-of-type{
            color:#E65831;
          }
        }
      }
    }
  }
}
  .derive_button{
    display: inline-block;
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(32,160,255,1);
    position: relative;
    text-indent: 2em;
    margin-left:1.2em;
    &::after{
      background:url(../../../assets/images/derive-icon-active.png) center center no-repeat;
      background-size:100% 100%;
      content: "";
      position:absolute;
      top:0;
      width:20px;
      height: 20px;
      left:0;
    }
  }


</style>



