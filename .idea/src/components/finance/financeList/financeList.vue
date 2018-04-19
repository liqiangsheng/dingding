<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          对账时间：
          <!--<DatePicker type="date" placeholder="选择日期" style="width: 200px" @on-change="selector"></DatePicker>-->
          <el-date-picker
            id="date"
            style="width:500px;"
            v-model="value4"
            type="daterange"
            :picker-options="pickerOptions2"
            placeholder="选择时间范围"
            align="right">
          </el-date-picker>
        </div>

      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry" v-show="$isButtonObj('bn-finance-reconciliation-down')">
        下载
      </div>
    </div>

  </div>
</template>
<script>

  export default {
    data() {
      return {
        Date:"",
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: ''
      }
    },
    mounted(){

    },
    methods: {
      quiry(){
        let arr = this.getDateArray();
        arr.forEach((v,i)=>{
          let url=`${this.$apiCSV}/OrderAccountsExcel/${v}.csv`;
          try{
            var elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
          }catch(e){
            console.log(e);
          }
        });
      },
      getDateArray(){
        let arr = [];
        if(this.value4&&this.value4.length>0){
          let startTime = new Date(this.value4[0]);
          let endTime = new Date(this.value4[1]);
          while((endTime.getTime()-startTime.getTime())>=0){
            arr.push(this.$moment(startTime).format("YYYYMMDD"));
            startTime.setDate(startTime.getDate()+1);
          }
        }
        return arr;
      },
    },
    created(){
    }
  }
</script>
<style>
  #date{

  }
  .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-message-box__wrapper{
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">
@import "../../../assets/styles/comminStyle2";
.el-date-range-picker__time-header{

}
.el-input--small{
  width:30px !important;
}
  .container{
    font-size:14px;
    width:100%;
    overflow:hidden;
    >.user_sum{
      width:100%;
      height:20px;
      float:left;
      >span{
        margin-right:35px;
        color:blue;
        font-size:14px;
        >b{
          font-weight:normal;
          color:#000;

        }
      }
      >span:last-of-type{
        color:green;
        font-size:14px;
      }

    }
    >.selector_list{
      width:100%;
      overflow: hidden;
      margin-top:40px;
      min-width:1351px;
      >.list{
        float:left;
        line-height:60px;
        list-style:none;
        font-size:14px;
        margin-right:5%;

      }
      .el-input{
        width:auto;
      }

      >.list:nth-of-type(3n){
        /*margin-right:0;*/
      }
    }
    .btn_inquiry{
      width:200px;
      height:44px;
      margin:0 auto;
      cursor:pointer;
      margin-top:30px;
      text-align:center;
      line-height:44px;
      background: #A470CD;
      border-radius: 4px;
      color:#fff;
    }
  }
</style>





