<template>
  <div class="OrderDaoru" ref="OrderDaoru">
    <DaoruSueess v-if="daoruShow" @isClose="isClose"></DaoruSueess>

    <div class="prodressTop" style="position: relative">
      <input id="fileId" type="file" @change="onchangeFile($event)"
             style="width:88px;height: 36px;position: absolute;opacity: 0"
             accept=".xlsx,.xls,.csv,.xml">
      <el-button type="primary">导入工单
      </el-button>
      <span class="updata">上传格式建议xlsx、xls、csv、xml等，文件大小限制10M以内</span>
    </div>

    <div class="prodressbot">
      <span>选择下载模版</span>
      <ul style="display: block">
        <li v-for="(item,index) in listName" @click="downModel(item,index)">{{item}}</li>
      </ul>
    </div>

  </div>

</template>
<script>
  import DaoruSueess from "./alertInfos/daorugongdan.vue"
  export default {
    components:{
      DaoruSueess
    },
    data() {
      return {
        listName:["家电保养","家电维修","家居维修","管道疏通","灯具线路","卫浴洁具","安装服务"],
        upload:this.$reportdomain + "/order/import",
        headers1: {'Content-Type': 'multipart/form-data',"token":this.$getLocalStorage("enrolleeinfo")[0].token},
        url1:"",
        daoruShow: false, //导入
      }
    },
    created(){
    },
    methods: {
      downModel(item, index) {//下载模板
        if(index == 0){
          window.location =this.$apiModel + "/channelOrderImport/家电保养.xlsx";
        }else if(index == 1){
          window.location =this.$apiModel + "/channelOrderImport/家电维修.xlsx";
        }else if(index == 2){
          window.location =this.$apiModel + "/channelOrderImport/家居维修.xlsx";
        }else if(index == 3){
          window.location =this.$apiModel + "/channelOrderImport/管道疏通.xlsx";
        }else if(index == 4){
          window.location =this.$apiModel + "/channelOrderImport/灯具线路.xlsx";
        }else if(index == 5){
          window.location =this.$apiModel + "/channelOrderImport/卫浴洁具.xlsx";
        }else if(index == 6){
          window.location =this.$apiModel + "/channelOrderImport/安装服务.xlsx";
        }
      },
      onchangeFile(event) {
        let filesObj = event.target.files[0];
        let param = new FormData(); // 创建form对象
        param.append('file', filesObj);  // 通过append向form对象添加数据
        let dataReq = param;
        let url =this.$reportdomain + "/order/import";
          this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data',"token":this.$getLocalStorage("enrolleeinfo")[0].token}}).then(res=>{
            if (res.data.code === "0000") {
              this.daoruShow = true;
            }else{
              var input = document.getElementById("fileId");
              input.value = "";
              this.$message({
                message: res.data.error?res.data.error:"导入失败请查看模板",
                type: 'warning'
              });

            }
          })
      },

      isClose(v){ //接收子组件值关闭提交窗口
        this.daoruShow = v.isBool;
        let input1 = document.getElementById("fileId");
        input1.value = v.value;
      },

    },
    mounted() {
    },
  }
</script>

<style scoped lang="scss">
  .OrderDaoru{
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    padding: 30px 26px;
    .prodressTop {
      width: 100%;
      .updata {
        display: block;
        height: 40px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(230, 88, 49, 1);
        line-height: 40px;
      }
    }
    .prodressbot {
      width: 100%;
      margin-top: 33px;
      ul {
        width: 408px;
        span {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(57, 57, 57, 1);
          line-height: 20px;
        }
        li {
          width: 86px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          border: 1px solid rgba(32, 160, 255, 1);
          text-align: center;
          line-height: 36px;
          float: left;
          margin-right: 10px;
          margin-top: 10px;
          color: #20A0FF;
        }
        li:hover {
          color: black;
          border: 1px solid black;
        }
      }
    }
  }

</style>

