<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          <div class="list_name">
            日期范围 :
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
            流水号 :
          </div>
          <el-input
            style="width:200px;"
            placeholder="请输入内容"
            v-model="selectorBehindObj.streamNumber">
          </el-input>
        </div>
        <div class="list business">
          <div class="list_name">
            交易金额 :
          </div>
          <el-input
            class=""
            type="number"
            v-model="selectorBehindObj.min"
            placeholder="最低"
          >
          </el-input> -
          <el-input
          type="number"
          placeholder="最高"
          v-model="selectorBehindObj.max"
          >
          </el-input>
        </div>
      </div>
      <!--查询按钮-->
      <section class="query_button_box">
        <el-button @click="quiry('')" type="primary" class="query_button"> 查询</el-button>
        <el-button @click="resetting(selectorBehindObj)"  class="query_button"> 重置</el-button>
      </section>
      <div @click="derive" class="derive_button cursor">导出表格</div>
      <div class="dable_lsit table">

        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th>
              <el-checkbox v-model="checked" @change="wholeSelector(tableListData.list,checked)"></el-checkbox>
            </th>
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}

            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.list">
            <!--序号-->
            <td>
              <el-checkbox v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox>
              <!--{{tableListData}}-->
            </td>
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.journalAccountNum}}
            </td>
            <td>
              {{item.payType |payType}}
            </td>
            <td>
              {{item.operationFee}}
            </td>
            <td>
              {{item.remark||'无'}}
            </td>
            <td>
              {{item.paySource | channelPaySourceShow}}
            </td>
            <td>
              {{item.createTime}}
            </td>
            <td>
              {{item.payState|payState}}
            </td>

          </tr>
          </tbody>
        </table>

        <Pagination
          :data="pageData"
          :getTableList="getTableList"
          :paramsData="paramsData"
          :tableListData="tableListData"
        ></Pagination>

      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<script>

  export default {

    data() {
      return {
        /*
          全选反选模块start
        */
        checked:false,
        isCheckboxList:[],
        /*
         全选反选模块end
        */
        //<!--弹窗基础数据start-->
        optionList: [
          {
            name: "交易类型",
            key: "payType",
            SourceTypeValue: '',
            SourceType: [
              {
                id:"",
                value:"--请选择--"
              },
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
          },{
            name: "支付方式",
            key: "paySource",
            SourceTypeValue: '',
//            微信 支付宝 账户余额 线下
            SourceType: [
              {
                id:"",
                value:"--请选择--"
              },
              {
                  id:"2",
                  value:"支付宝"
                },{
                  id:"1",
                  value: "微信支付"
                },{
                  id:"3",
                  value: "账户余额"
                },{
                  id:"4",
                  value: "线下"
                }
            ]
          },{
            name: "交易状态",
            key: "payState",
            SourceTypeValue: '',
            SourceType: [
              {
                id:"",
                value:"--请选择--"
              },
              {
                value:"进行中",
                id:"1"
              },{
                value:"已完成",
                id:"2"
              }
            ]
          },
        ],
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        theadsName:[
          '序号',
          '流水号',
          '交易类型',
          '交易金额(元)',
          '费用说明',
          '支付方式',
          '交易时间',
          '交易状态',
        ],

        selectorBehindObj:{
          date:["",""],
          streamNumber:'',
          min:"",
          max:"",
          statisticsDateStartStr:"",
          statisticsDateEndStr:"",
        },
        tableListData:{
          page:1,
          rows:20,
          startRow:0,
          pageTotal: 1,
          list:[]
        },
        pageData:{
          size:20,
          startRow:0,
          total:0,
          pageTotal:0,
        }

      }
    },
    created(){
      this.getTableList(this.paramsData());
    },
    methods: {
//      重置
      resetting(params){
          for(let k in params) {
            if (params[k] instanceof Array) {
              params[k] = params[k].map(v => "")
            } else {
              params[k] = ""
            }
          }
          for(let k in this.optionList){
            this.optionList[k].SourceTypeValue=""
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
        this.getTableList(this.paramsData());

      },
      paramsData(){
        const filterDate = e => this.$moment( this.selectorBehindObj.date[e] ).format("YYYY-MM-DD")==="Invalid date"?'':this.$moment( this.selectorBehindObj.date[e] ).format("YYYY-MM-DD");

        this.selectorBehindObj.statisticsDateStartStr = filterDate(0);
        this.selectorBehindObj.statisticsDateEndStr = filterDate(1);
        return {
          "page":JSON.stringify(this.pageData.startRow),
          "rows":JSON.stringify(this.pageData.size),
          "startDate":filterDate(0),
          "endDate":filterDate(1),
          "minFee":this.selectorBehindObj.min,
          "maxFee":this.selectorBehindObj.max,
          "payType":this.selectorBehindObj.payType,
          "payState":this.selectorBehindObj.payState,
          "journalAccountNum":this.selectorBehindObj.streamNumber,
          "paySource":this.selectorBehindObj.paySource,
          "statisticsDateStartStr":this.selectorBehindObj.statisticsDateStartStr,
          "statisticsDateEndStr":this.selectorBehindObj.statisticsDateEndStr,
        }
      },

      getTableList(params){
        let url=`${this.$apidomain}/officialpartnercostflowController/all`;
        this.$http.post(url,params).then(r=>{
          let data=r.data;
          if(data.code==="0000"){
            this.tableListData = data.result;
            this.pageData.total = data.result.total;
            this.pageData.pageTotal = data.result.pages;
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
  @import "../../assets/styles/comminStyle";
  @import "../../assets/styles/Ch_comminStyle";

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
      background:url(../../assets/images/derive-icon-active.png) center center no-repeat;
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



