<template>
  <div id="app">
    <div class="container" >
      <h3>位置：                      预约时间:{{isSendOrders.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</h3>
      <el-tabs type="border-card" @tab-click="changes">
        <el-tab-pane label="师傅" >
          <alert-table
            :replaceMasterObj="siteMasterObj"
            :data="data"
            :type="2"
          ></alert-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <p class="closeX" @click="closeReplaceAlert"></p>
    <div class="btn">
      <button @click="closeReplaceAlert(isSendOrders)">关闭</button>
      <button @click="enter(data)">确定</button>
    </div>
  </div>
</template>

<script>
import alertTable from "./alert_components"
  export default {
  props:["isSendOrders","quiry"],
    components:{
      alertTable
    },
    data(){
      return{
        siteMasterObj:[],
        data:{"masterId":""}
      }
    },
    created(){
      this.changes({index:'0'});
      let url=this.$apidomain+"/siteInfo/findmaster";
      this.$http.get(url,this.paramsData()).then(r=>{
        let data=r.data;
        this.siteMasterObj = data.result;
        this.siteMasterObj.forEach((v,i)=>{
          v.radio = false;
        });
      })
    },
    methods: {
      enter(data){
        let o = {};
        o.type = "3";
        o.masterId = data.masterId;
        o.orderIds = this.isSendOrders.orderIds;
        let url=this.$apidomain+"/order/orderallocation";
        this.$http.post(url,o).then(r=>{
          let data=r.data;
          data.result;
          this.quiry()
          this.closeReplaceAlert();
        })
      },
      paramsData(){
        return {params: {
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id
        }}
      },
      changes(){

      },
      closeReplaceAlert(isSendOrders){
        this.isSendOrders.isShow=false
      },
    },
    mounted() {

    },
    watch:{

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
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


