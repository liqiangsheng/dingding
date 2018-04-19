<template>
    <div id="app">
      <el-dialog style="z-index:999999;top:15%"   :visible.sync="isAdd.isShow">
          <ul class="ullist">
            <li>
              <span>工单号: </span>{{list.mainOrderId}}
            </li>
            <li>
              <span>工单类型: </span>{{list.orderType|orderSourceShow}}
            </li>
            <li>
              <span>分类: </span>{{list1.fLabelBusiness|FLabelBusiness}}
            </li>
            <li>
              <span>服务时长: </span>{{list.completeTimeLimit?list.completeTimeLimit+"min":"0min"}}
            </li>
            <li>
              <span>主评分(分): </span>{{list.level}}
            </li>
            <li>
              <span>服务态度(分): </span>{{list.serviceAttitude}}
            </li>
            <li>
              <span>技术能力(分): </span>{{list.technicalCompetence}}
            </li>
            <li>
              <span>准时到达(分): </span>{{list.arriveTime}}
            </li>
            <li>
              <span>准时偏差: </span>{{list.deviation?list.deviation+"min":"0min"}}
            </li>
            <li>
              <span>标签: </span>{{list.evaluateLabels}}
            </li>
            <li>
              <span>评价内容: </span>{{list.content}}
            </li>
            <li>
              <span>用户绑定手机号: </span>{{list1.userPhoneNum}}
            </li>
            <li>
              <span>师傅姓名: </span>{{list.masterName}}
            </li>
            <li>
              <span>师傅手机号: </span>{{list1.masterPhoneNum}}
            </li>
          </ul>

      </el-dialog>
    </div>
</template>

<script>
    export default {
      props:["isAdd","quiry"],
      data(){
        return{
          list:{},
          list1:{},
          list2:{}
        }
      },
      created(){
        console.log(this.isAdd,"123213");
        let url =this.$apidomain+"/orderquery/findEvaluateDetail?id="+this.isAdd.data.id;
        this.$http.get(url).then(r=>{
          let data=r.data;
//          console.log(r,".....");
          if(data.code=="0000"){
              this.list=data.result.coreMainOrderEvaluates;
              this.list1=data.result.coreMainOrders;
              this.list2=data.result.userInfos;
            console.log(this.list,"0");
            console.log(this.list1,"1");
            console.log(this.list2,"2");
          }else{
            alert(data.error)
          }
        })

      }
    }
</script>

<style scope lang="scss">
  .ullist{
    >li{
      width:100%;
      border:1px solid #ccc;
      border-bottom: none;
      >span{
        display: inline-block;
        width: 200px;
        border-right: 1px solid #ccc;
      }
    }
    >li:last-child{
      border-bottom: 1px solid #ccc;
    }
  }

</style>
