<template>
    <div>
      <el-dialog style="z-index:999999;"   :visible.sync="isAdd.isShow">
          <ul class="ullist scrollbar">
            <li>
              <span>工单号: </span>{{list.mainOrderId}}
            </li>
            <li>
              <span>工单类型: </span>{{list1.type|orderType}}
            </li>
            <li>
              <span>分类: </span>{{list1.fLabelBusiness|FLabelBusiness}}
            </li>
            <li>
              <span>预约时间: </span>{{list1.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
            </li>
            <li>
              <span>主评分(分): </span>{{list.level}}
            </li>
            <li>
              <span>师傅姓名: </span>{{list.masterName}}
            </li>
            <li>
              <span>师傅手机号: </span>{{list1.masterPhoneNum}}
            </li>
            <li>
              <span>联系人手机号: </span>{{list1.linkmanPhoneNum||"未绑定"}}
            </li>
            <li>
              <span>工单耗时: </span>{{list1.completeTimeLimit}}
            </li>
            <li>
              <span>工单类型: </span>{{list.orderType|orderSourceShow}}
            </li>
            <!--<li>-->
              <!--<span>服务时长: </span>{{list1.workTimeLimit}}-->
            <!--</li>-->
            <li>
              <span>服务时长: </span>{{list.completeTimeLimit?list.completeTimeLimit+"min":"0min"}}
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
              <span>异常挂起次数: </span>{{list1.abnormalHangSize}}
            </li><li>
            <span>评价时间: </span>{{list.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
          </li><li>
            <span>返修次数: </span>{{list1.reworkSize}}
          </li>
            <li>
              <span>标签: </span>{{list.evaluateLabels}}
            </li>
            <li>
              <span>评价内容: </span>{{list.content}}
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
        let url =this.$apidomain+"/orderquery/findEvaluateDetail?id="+this.isAdd.data.id;
        this.$http.get(url).then(r=>{
          let data=r.data;
          if(data.code=="0000"){
              this.list=data.result.coreMainOrderEvaluates;
              this.list1=data.result.coreMainOrders;
              this.list2=data.result.userInfos;
          }else{
            alert(data.error)
          }
        })

      }
    }
</script>

<style scope lang="scss">
  .ullist{
    max-height:500px;
    overflow: auto;
    >li{
      width:100%;
      border:1px solid #ccc;
      border-bottom: none;
      line-height: 2.5em;
      text-indent:.5em;
      >span{
        display: inline-block;
        width: 200px;
        border-right: 1px solid #ccc;
        margin-right:1em;
      }
    }
    >li:last-child{
      border-bottom: 1px solid #ccc;
    }
  }

</style>
