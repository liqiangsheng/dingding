<template>
  <div id="app">
    <div class="container" v-if="!isDetailed.isShow">

      <br/>
      <br/>
      <br/>
      <div >
        <div  style="width:50%;float:left">
          子渠道单量：
          <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
        </div>
        <div style="width:50%;float:left">
          子渠道营收：
          <ve-ring :data="chartData2" :settings="chartSettings"></ve-ring>
        </div>
        <el-button @click="details" size="large">更多详情</el-button>
      </div>
    </div>
    <!--大弹框 详情-->

    <div class="container" v-if="isDetailed.isShow">
      <detail :isDetailed="isDetailed">
      </detail>
    </div>
  </div>


</template>
<script>
  import detail from "./orderDetail"
  export default {
    components:{
      detail
    },
    data() {
      return {
        //<!--弹窗基础数据start-->
        isDetailed:{
          title:"工单统计详情",
          isShow:false
        },
        //<!--弹窗基础数据end-->
        chartData:{
          columns: ['子渠道', '单量'],
          rows: [],
        },
        chartSettings:{
          area: true
        },
        chartData2:{
          columns: ['子渠道', '营收'],
          rows: [],
        },
        //画图数据end
      }
    },
    created(){
      this.quiry();
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(){
        let url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo";
        this.$http.get(url,this.paramsData()).then(r=>{
          let data=r.data;
          this.chartData.rows=[];
          this.chartData2.rows=[];
          data.result.forEach((v)=>{
            this.chartData.rows.push({'子渠道':v.name,'单量':v.totalOutput});
            this.chartData2.rows.push({'子渠道':v.name,'营收':v.totalWater});
          });
        });
      },
      paramsData(){
        return {params: {
          "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
        }}
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      details(){
        this.isDetailed.isShow=true;
      },
//      <!--弹窗功能end-->
    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
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


