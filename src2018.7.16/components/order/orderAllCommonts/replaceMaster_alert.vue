<template>
  <div id="app">
    <div class="container" >
      <p class="header">派单</p>
      <div class="scrollbar">
      <h5>预约时间:{{isReplaceAlert.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</h5>
      <h5>服务地址:{{isReplaceAlert.linkmanDetails||'无'}}</h5>
      <el-tabs type="border-card" @tab-click="changes" style="border: none">
        <el-tab-pane label="网点" >
          <site-alert-table
            :replaceMasterObj="siteMasterObj"
            :isShow = 'siteShow'
            :theadList = 'siteThead'
            :data="data1"
            :type="1"
          ></site-alert-table>
        </el-tab-pane>
        <el-tab-pane label="师傅自营" v-if="isReplaceAlert.isSiteShow">
          <site-alert-table
            :replaceMasterObj="selfMasterObj"
            :theadList = 'masterThead'
            :isShow = 'masterShow'
            :data="data2"
            :type="2"
          ></site-alert-table>
          <!--<alert-table-->
            <!--:replaceMasterObj="selfMasterObj"-->
            <!--:data="data2"-->
            <!--:type="2"-->
          <!--&gt;</alert-table>-->
        </el-tab-pane>
        <el-tab-pane label="兼职师傅" v-if="isReplaceAlert.isSiteShow">
          <site-alert-table
            :replaceMasterObj="partTimeMasterObj"
            :theadList = 'masterThead'
            :isShow = 'masterShow'
            :data="data3"
            :type="2"
          ></site-alert-table>
          <!--<alert-table-->
            <!--:replaceMasterObj="partTimeMasterObj"-->
            <!--:data="data3"-->
            <!--:type="2"-->
          <!--&gt;</alert-table>-->
        </el-tab-pane>
      </el-tabs>
      </div>
    </div>

    <p class="closeX" @click="close" style="transform:translate(2px,10px);"></p>
    <div class="btn">
      <button @click="close()">取消</button>
      <button @click="enter()">确定</button>
    </div>
  </div>
</template>

<script>
import alertTable from "./master_alert/alert_components"
import siteAlertTable from "./master_alert/site_alert_components.vue"
  export default {
  props:["isReplaceAlert","quiry"],
    components:{
      alertTable,
      siteAlertTable
    },
    data(){
      return{
        siteThead:['选择','网点名称','网点人数','服务技能','待服务工单数'],
        masterThead:['选择','网点名称','服务技能','待服务工单数'],
        siteShow:true,
        masterShow:false,
        showSize:0,
        siteMasterObj:[],
        selfMasterObj:[],
        partTimeMasterObj:[],
        data1:{"masterId":""},
        data2:{"masterId":""},
        data3:{"masterId":""},
      }
    },
    created(){
      this.data1.dateStr = this.$moment(this.isReplaceAlert.appointmentDatetime).format('YYYY-MM-DD HH:mm:ss');
      this.data2.dateStr = this.$moment(this.isReplaceAlert.appointmentDatetime).format('YYYY-MM-DD HH:mm:ss');
      this.data3.dateStr = this.$moment(this.isReplaceAlert.appointmentDatetime).format('YYYY-MM-DD HH:mm:ss');
      let url=this.$apidomain+"/orderquery/finddistributable";
      this.$http.get(url,this.paramsData()).then(r=>{
        let data=r.data;
        this.siteMasterObj = data.result.siteInfos;
        this.selfMasterObj = data.result.selfSupportMasterInfos;
        this.partTimeMasterObj = data.result.partTimeJobMasterInfos;
        this.siteMasterObj.forEach((v,i)=>{
          v.radio = false;
        });
        this.selfMasterObj.forEach((v,i)=>{
          v.radio = false;
        });
        this.partTimeMasterObj.forEach((v,i)=>{
          v.radio = false;
        });
      });
    },
    methods: {
      paramsData(){
        return {params: {
          "skills":this.isReplaceAlert.skills,
          "areaId":this.isReplaceAlert.areaId,
          'dateStr':this.data1.dateStr
        }}
      },
      enter(){
        let o = {};
        if("0"==this.showSize){
          o.type = this.data1.type;
          o.masterId = this.data1.masterId;
        }else if("1"==this.showSize){
          o.type = this.data2.type;
          o.masterId = this.data2.masterId;
        }else if("2"==this.showSize){
          o.type = this.data3.type;
          o.masterId = this.data3.masterId;
        }
        o.orderIds = this.isReplaceAlert.orderIds;
        let url=this.$apidomain+"/order/orderallocation";
        this.$http.post(url,o).then(r=>{
          let data=r.data;
          data.result;
          this.quiry();
          this.close();
        })
      },
      close(){
        this.isReplaceAlert.isShow=false
      },
      changes(v){
       this.showSize = v.index;
      }
    },
    mounted() {

    },
    watch:{

    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  #app{
    .btn{
      position: absolute;
      bottom:20%;
      >button{
        width:200px;
        height:40px;
        line-height: 40px;
        border-radius:4px;
        border:1px solid rgba(35,161,254,1);
        margin-right: 9px;
        color:rgba(35,161,254,1);
      }
      >button:nth-of-type(2){
        background:rgba(32,160,255,1);
        color:rgba(255,255,255,1);
      }
    }
  }
  .el-tabs--border-card{
    height:100%;
  }
  .container {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    letter-spacing: 0;
    width: 960px;
    height: 620px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    height: 70%;
    > p {
      height: 48px;
      line-height: 48px;
      width: 100%;
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      color: rgba(57, 57, 57, 1);
      border-bottom: 2px solid rgba(151, 151, 151, 1);
    }
    > div {
      width: 100%;
      height: 480px;
      padding: 0 30px;
      overflow:auto;
      >h5{
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:20px;
        font-weight: 100;
      }
      >h5:nth-of-type(1){
        margin: 23px 0 8px 0;
      }
      >h5:nth-of-type(2){
        margin-bottom: 18px;
      }
      .el-popover, .el-tabs--border-card{
        box-shadow:none;
        .el-tabs__nav{
          background: red;
        }
      }
      .el-tabs--border-card>.el-tabs__header{
        background-color:red !important;
      }

      .content {
      float: left;
      .title {
        line-height: 30px;
        width: 100%;
        background: #ECECEC;
      }
    }
    .content:last-of-type {
      float: right;
      .header_title {
        overflow: hidden;
        padding-bottom: 20px;
        > p {
          margin-right: 20%;
        }
      }
    }
    .consume_info {
      padding-bottom: 200px;
      position: relative;
      > .title {
        padding-left: 10px;
        line-height: 30px;
        width: 100%;
        background: #ECECEC;
      }
    }
   }
  }

</style>


