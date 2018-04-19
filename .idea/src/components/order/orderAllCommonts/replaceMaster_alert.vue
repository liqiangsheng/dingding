<template>
  <div id="app">
    <div class="container" >
      <h3>位置：         预约时间:{{isReplaceAlert.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</h3>
      <el-tabs type="border-card" @tab-click="changes">
        <el-tab-pane label="网点" >
          <site-alert-table
            :replaceMasterObj="siteMasterObj"
            :data="data1"
            :type="1"
          ></site-alert-table>
        </el-tab-pane>
        <el-tab-pane label="师傅自营" v-if="isReplaceAlert.isSiteShow">
          <alert-table
            :replaceMasterObj="selfMasterObj"
            :data="data2"
            :type="2"
          ></alert-table>
        </el-tab-pane>
        <el-tab-pane label="兼职师傅" v-if="isReplaceAlert.isSiteShow">
          <alert-table
            :replaceMasterObj="partTimeMasterObj"
            :data="data3"
            :type="2"
          ></alert-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <p class="closeX" @click="close"></p>
    <div class="btn">
      <button @click="close()">关闭</button>
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
      console.log(this.isReplaceAlert);
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

    #btn{
      position: relative;
      bottom:30%;
    }
  }
  .el-tabs--border-card{
    height:100%;
  }
  h3{
    text-align: center;
    line-height: 5em;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    .content{
      float:left;
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .content:last-of-type{
      float:right;
      .header_title{
        overflow: hidden;
        padding-bottom:20px;
        > p{
          margin-right:20%;
        }
      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
  }

</style>


