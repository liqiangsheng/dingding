<template>
  <div class="OrderDaoru" ref="OrderDaoru">
    <DaoruSueess v-if="daoruShow" @isClose="isClose"></DaoruSueess>
    <!--<el-button type="primary" @click="chanpinClick">导入工单</el-button>-->
    <!--<Upload :action="file" :headers="header">-->
    <!--<Button style="color: #FFFFFF;background: #20a0ff;height: 36px;" type="ghost" icon="ios-cloud-upload-outline" v-model="file"  @click="chanpinClick">导入工单</Button>-->
    <!--</Upload>-->
    <div class="prodressTop" style="position: relative">
      <input type="file" v-on:change="onchangeFile($event)"
             style="width:88px;height: 36px;position: absolute;opacity: 0"
             accept=".xlsx,.xls,.csv,.xml">
      <el-button type="primary">导入工单
      </el-button>
      <span class="updata">上传格式建议xlsx、xls、csv、xml等，文件大小限制10M以内</span>
    </div>

    <div class="prodressbot">
      <span>选择下载模版</span>
      <ul style="display: block">
        <li v-for="(item,index) in labeloptions2" @click="downModel(item,index)">{{item.name}}</li>
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
        header:{'Content-Type': 'multipart/form-data'},
        url1:"",
        file:this.$apidomain+"/orderquery/upload", // 文件
        labeloptions2: [],//分类
        daoruShow: false, //导入
      }
    },
    created(){
      let url = this.$apidomain + "/common/findflabelbusinessname";
      this.$http.get(url).then(res => {
        if (res.data.code === "0000") {
          this.labeloptions2 = res.data.result;
        } else {
          alert(res.data.error)
        }
      });
    },
    methods: {
      downModel(item, index) {//下载模板
        window.location = this.$apiModel;
      },
      onchangeFile(event) {
        console.log(event.target.files)
        let filesObj = event.target.files[0];
        let param = new FormData(); // 创建form对象
        param.append('file', filesObj);  // 通过append向form对象添加数据
        let dataReq = param;
        let url = "http://192.168.20.178:8088/order/import";
          this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
            if (res.data.code === "0000") {
              console.log(res)
              console.log(JSON.parse(res.data.result))
            }else{
              alert(res.data.error)
            }
          })
      },
      isClose(v){ //接收子组件值关闭提交窗口
        this.daoruShow = v;
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

