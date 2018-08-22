<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          <div class="list_name">
            创建时间 :
          </div>

          <DatePicker v-model.trim="date" type="datetimerange" format="yyyy-MM-dd" placeholder="请选择时间"
                      style="width: 200px"></DatePicker>
        </div>
        <div  v-for="(item,index) in optionList" :key="index" class="list">

          <div class="list_name">
            {{item.name}} :
          </div>
          <el-select
            v-model.trim="item.SourceTypeValue" placeholder="请选择"
            @change="selector(item,item.SourceType,item.SourceTypeValue)">
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
            placeholder="请填写内容"
            v-model.trim="selectorBehindObj.accountId">
          </el-input>
        </div>
        <div class="list">

          <div class="list_name">
            对象编号 :
          </div>
          <el-input
            style="width:200px;"
            placeholder="请填写内容"
            v-model.trim="selectorBehindObj.userId">
          </el-input>
        </div>

        <div class="list business">
          <div class="list_name">
            提现金额 :
          </div>
          <el-input
            style="width:200px;"
            type="number"
            v-model.trim="selectorBehindObj.opAmount"
            placeholder="最低"
          >
          </el-input>
        </div>
      </div>

      <!--查询按钮-->
      <section class="query_button_box">
        <el-button @click="queryData('')"  class="query_button"> 查询 </el-button>
        <el-button @click="resetting(selectorBehindObj)"  class="resetting_button"> 重置</el-button>
      </section>
      <section class="button_derive_box">
        <el-button @click="derive" size="large" class="derive_btn">导出</el-button>
      </section>


      <div class="dable_lsit table">

        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th>
              <el-checkbox v-model.trim="checked" @change="wholeSelector(tableListData.list,checked)"></el-checkbox>
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
              <el-checkbox v-model.trim="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox>
              <!--{{tableListData}}-->
            </td>
            <td style="width:50px;">
              {{index+1}}
            </td>
            <td>
              {{item.accountId}}
            </td>
            <td>
              {{item.userId}}
            </td>
            <td style="min-width:7em;">
              {{item.userRole|userRoleName}}
            </td>
            <td style="min-width:5em;">
              {{item.userName}}
            </td>
            <td>
              {{item.bankCardBranch}}
            </td>
            <td>
              {{item.bankCard}}
            </td>
            <td>
              {{item.opAmount}}
            </td>
            <td>
              {{item.accountAmount}}
            </td>
            <td>
              {{item.canWithdrawDepositAmount}}
            </td>
            <td>
              {{item.createTime}}
            </td>
            <td class="table_operate cursor">
              <span v-if="item.state==='0'" v-for="(ite,index) in ['通过','驳回']"  @click="operate(index,item)">{{ite}}</span>
              <p v-if="item.state!=='0'">{{item.state|rechargeState}}</p>
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
    <common-alert :data="data" v-if="data.isShow" :sendData="confirmSubmit"></common-alert>
  </div>
</template>
<script>
  const httpFilterData = res => new Promise( (resolve, reject)=>{
    const data= res.data;
    if(data.code==="0000"){
      resolve(data)
    }else{
      reject(data)
    }
  });
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

        date:["",""],
        optionList: [
          {
            name: "对象类型",
            key: "userRole",
            SourceTypeValue: '',
            SourceType: this.$store.state.userRole
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
        selectorBehindObj:{},
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
 //   重置
      resetting(params){
        this.date = this.date.map( v => '');
        for(let k in params) {
          params[k] = params[k] instanceof Array? params[k].map(v => "") : ""
        }
        for(let k in this.optionList){
          this.optionList[k].SourceTypeValue=""
        }
        this.getTableList(this.paramsData());
      },
      confirmSubmit(e){
        const value = this.$queryFun.Trim(e);
        if(value.length){
          this.$http.post(this.data.url,{id:this.data.accountId,state:"2",remark:value}).then(res=>{
            httpFilterData(res).then( res => {
              this.data.isShow=false;
              this.$queryFun.successAlert.call(this,"驳回成功","1");
              this.getTableList(this.paramsData());
            }, res => this.$queryFun.successAlert.call(this,res.error));
          })
        }else{
          this.$queryFun.successAlert.call(this,"请填写驳回原因")
        }
      },
      operate(i,v){
        /*
        0 通过
        1 驳回
        * */

        let url = `${this.$apidomain}/putForward/updateFaWalletJournalAccount`;

        if(!i){
          this.$queryFun.confirm.call(this,{
            text:"通过前，请确认已将该提现金额打款至该渠道",
            title:"确认通过",
            success(){
              this.$http.post(url,{id:v.accountId,state:"1"}).then(res=>{
                httpFilterData(res).then(res=>{
                  this.$queryFun.successAlert.call(this,"通过成功","1");
                  this.getTableList(this.paramsData());
                },res => this.$queryFun.successAlert.call(this,res.error));
              })
            }
          })
        }else{
          this.data.isShow=true;
          this.data.accountId=v.accountId;
          this.data.url=url;
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
      derive(){               //导出事件
        let data=[];
        this.tableListData.list.forEach(v => {
          if (v.isCheckboxList) data.push(v.accountId);
        });
        if(data.length){
          const url=`${this.$common.apidomain}/putForward/createPutForwardExcel`;
          this.$http.get(url,{params:{accountId:data.join(",")}}).then(res=>{
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
      queryData(){

        this.getTableList(this.paramsData());

      },
      paramsData(){
        const filterDate = e => this.$moment( this.date[e] ).format("YYYY-MM-DD")==="Invalid date"?'':this.$moment( this.date[e] ).format("YYYY-MM-DD");

        let params={
          statisticsDateStartStr : filterDate(0),
          statisticsDateEndStr : filterDate(1),
          page: JSON.stringify(this.pageData.startRow),
          rows: JSON.stringify(this.pageData.size)
        };
        return Object.assign(params,this.selectorBehindObj);
      },

      getTableList(params){
        let url=`${this.$apidomain}/putForward/all`;
        this.$http.post(url,params).then( r => {
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
        color:#fff;
        background: #A470CD;
        padding-left:4em;
        padding-right:4em;
      }
      .resetting_button{
        padding-left:2em;
        padding-right:2em;
      }
      .resetting_button:hover{
        border: 1px solid #A470CD;
        color: #A470CD;
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
    .button_derive_box{
      text-align: right;
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



</style>



