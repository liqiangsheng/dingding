<template>

  <div class="OrderDaoru" ref="OrderDaoru">
    <DaoRuGongDan v-if="daoruShow" @isClose="isClose"></DaoRuGongDan>
    <DaoRuChanPin v-if="daoruShow1" @isClose="isClose" @centerShow="centerShow" :stateIf="stateIf"></DaoRuChanPin>
    <DaoDetail v-if="daoruShow2" @isClose="isClose" :dexIndex="dexIndex" @isNum="isNum"></DaoDetail>
    <DaoruBianji v-if="daoruShow3" @isClose="isClose" :everyContent="everyContent"></DaoruBianji>
     <ul class="OrderDaoruList">
       <li id="prodress">
         <!--<el-button type="primary" @click="chanpinClick">导入工单</el-button>-->
         <!--<Upload :action="file" :headers="header">-->
           <!--<Button style="color: #FFFFFF;background: #20a0ff;height: 36px;" type="ghost" icon="ios-cloud-upload-outline" v-model="file"  @click="chanpinClick">导入工单</Button>-->
         <!--</Upload>-->
         <el-button style="position: relative" type="primary">导入工单
           <a ref="fileBackground" href="javascript:;" class="file" style="position: absolute;left: 0;top: 0;opacity:0;">
           <input type="file" @change="onchangeFile($event)" style="width: 100%;height: 36px">
         </a>
         </el-button>

       </li>
       <li><el-button @click="downModel">下载模版</el-button></li>
        <li>上传格式建议xlsx、xls、csv、xml等，文件大小限制10M以内</li>
     </ul>
    <div class="OrderDaoru"  v-show="OrderDaoruShow">
           <p class="xinxi"><span></span>产品信息</p>
           <p class="xinxiOne">导入后，请点击底部提交工单</p>
      <table>
        <thead>
        <tr class="theads">
          <th v-for="(item,index) in theadsName">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableListData">
          <!--序号-->
          <td>
            {{index+1}}
          </td>
          <!--产品名称-->
          <td style="flex-grow:2">
            {{item.fLabelBusiness}}
          </td>
          <!--品牌-->
          <td>
            {{item.serviceBrand}}
          </td>
          <!--型号-->
          <td>
            {{item.serviceModel}}
          </td>
          <!--数量-->
          <td>
            {{item.serviceModel}}
          </td>
          <!--检测费-->
          <td>
            {{item.channelWarranty}}
          </td>
          <!--服务费-->
          <td>
            {{item.channelWarranty}}
          </td>
          <!--联系人-->
          <td>
            {{item.linkmanName}}
          </td>
          <!--手机-->
          <td>
            {{item.linkmanPhoneNum}}
          </td>
          <!--地址-->
          <td>
            {{item.linkmanDetails}}
          </td>
          <!--渠道质保-->
          <td>
            {{item.channelWarranty}}
          </td>
          <!--操作-->
          <td>
            <span class="track" @click="bianjiClick(item,index)">编辑</span>
            <span class="detail" @click="detailClick(item,index)">删除</span>
          </td>
        </tr>
        </tbody>
      </table>
        <ul class="price">
          <li>检测费小计:{{}}</li>
          <li>服务费小计:{{}}</li>
          <li>应付款:{{}}</li>
        </ul>
    </div>
    <!--分页组件-->
    <!--<div class="paging"   v-show="OrderDaoruShow">-->
      <!--<p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:page-sizes='[20,50,100,200]'-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:current-page="showPages"-->
        <!--:total="total"-->
        <!--:page-size="currentPageSize"-->
        <!--:page-count="pageTotal"-->
      <!--&gt;-->
      <!--</el-pagination>-->
      <!--<p class="home last_page cursor" @click="lasePage">尾页</p>-->
      <!--<p class="home cursor" @click="firstPage">首页</p>-->

    <!--</div>-->
    <!--分页组件结束-->
    <div class="tijiao"  v-show="OrderDaoruShow"><el-button type="primary"  @click="daoClick">提交工单</el-button></div>
  </div>

</template>
<script>
import DaoRuGongDan from "./alertInfos/daorugongdan.vue"  //导入工单
import DaoRuChanPin from "./alertInfos/daoruchanpin.vue"//导入产品
import DaoDetail from "./alertInfos/daoDetail.vue"//导入删除
import DaoruBianji from "./alertInfos/daoruBianji.vue" //导入编辑
  export default {
    components:{
      DaoRuGongDan,DaoRuChanPin,DaoDetail,DaoruBianji
    },
    data() {
      return {
        header:{'Content-Type': 'multipart/form-data'},
        url1:"",
        file:this.$apidomain+"/orderquery/upload", // 文件
        theadsName:["序号","产品名称","品牌","型号","数量","检测费","服务费","联系人","手机","地址","渠道质保","操作"],
//        tableListData:["1"],
        OrderDaoruShow:false,//导入显示
        tableListData: [],          //表格数据
        showPages: 1,  //分页
        currentPageSize: 20,//分页
        total: 0,//分页
        pageTotal: 0,//分页
        daoruShow:false,//导入
        daoruShow1:false,// 导入产品
        daoruShow2:false, //删除
        daoruShow3:false,// 导入编辑
        dexIndex:"", //删除的下标
        everyContent:"", //点击的编辑
        stateIf:"1",

      }
    },
    created(){
    },
    methods: {
      centerShow(v){
              this.OrderDaoruShow =v;
      },
      isNum(v){//删除
           this.tableListData.splice(v,1);
         this.isClose();
      },
      downModel(){//下载模板
            window.location = this.$apiModel;
      },
      onchangeFile(event,keyImg){
        console.log(event)
        let filesObj=event.target.files[0],
          filesName=event.target.value,
//          URLobj=event.target.parentElement,
          url=this.$apidomain+"/orderquery/upload",
        nameSize = filesName.substring(filesName.lastIndexOf("."),filesName.length).toLowerCase();
//        xlsx、xls、csv、xml
        if(nameSize === ".xlsx" ||nameSize === ".xls"||nameSize === ".csv"||nameSize === ".xml"){
         let param = new FormData(); // 创建form对象
          //        param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
          param.append('file',filesObj);  // 通过append向form对象添加数据
          this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              this.stateIf = "1";
               this.daoruShow1 = true;
              this.tableListData = res.data.result;
              this.tableListData = JSON.parse(this.tableListData);
             console.log(this.tableListData);
            }else{
              this.stateIf = "2";
//              alert(res.data.error)
            }
          })
        }else{
          return alert("请上传 .xlsx、.xls、.csv、.xml文件")
        }
      ;
      },
      bianjiClick(v,i){//编辑
        this.everyContent = v;
        this.daoruShow3 = true;
      },
      detailClick(item,index){//删除
        this.daoruShow2 = true;
        this.dexIndex = index;
      },
      daoClick(){ // 提交工单
         this.daoruShow = true;
      },
      chanpinClick(){ //导入产品

//        let url = this.$apidomain+"/orderquery/upload";
//        this.$http.post(url).then(res=>{
//          console.log(res)
//          if(res.data.code === "0000"){
//            //        this.daoruShow1 = true;
//          }
//        })

      },
      isClose(v){ //接收子组件值关闭提交窗口
        this.daoruShow = v;
        this.daoruShow1 = v;
        this.daoruShow2 = v;
        this.daoruShow3 = v;
      },
      //分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.$queryFun.handleSizeChange.call(this,val)
      },
      handleCurrentChange(val) {
        this.$queryFun.handleCurrentChange.call(this,val)
      },
      firstPage(){
        this.$queryFun.firstPage.call(this)
      },
      lasePage(){
        this.$queryFun.lasePage.call(this)
      },
    },
    mounted() {
//      this.$refs.OrderDaoru.style.height=(document.documentElement.clientHeight-170)+"px";
    },
  }
</script>

<style lang="scss">
  #shijian .ivu-input{
    height: 36px !important;
    border: 1px solid #bfcbd9
  }
  #citycity {
    .el-cascader__label {
      line-height: 36px !important;
    }
  }
  #prodress .ivu-upload-list-file{
    display:none ;
  }
</style>
<style scoped lang="scss">
  .OrderDaoru{
    width:100%;
    background: #FFFFFF;
    overflow: hidden;
    .xinxiOne{
      width: 100%;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(230,88,49,1);
      line-height:20px;
      margin-bottom: 15px;
    }
    .xinxi{
      width: 100%;
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:22px;
      margin-bottom: 15px;
      span{
        display:inline-block;
        width:4px;
        height:18px;
        background:rgba(230,88,49,1);
        margin: 0 5px;
        transform: translateY(2px);
      }
    }
    .OrderDaoruList{
       width: 100%;
      padding: 20px;
      margin-bottom: 50px;
      li{
        float: left;
        margin-right: 20px;
      }
      li:nth-child(3){
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:36px;
      }
    }
  }
  .OrderDaoru{
    width: 100%;
  }
  .OrderDaoru table{
    width: 100%;
  }
  .OrderDaoru table thead{
    width: 100%;
    background:rgba(229,233,242,1);
    tr{
      width: 100%;
      display: flex;
      th{
        flex: 1;
        height:52px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:52px;
        text-align: center;
      };
      th:nth-child(1){
        flex-grow:2;
      }
    };
  }
  .OrderDaoru table tbody{
    width: 100%;
    tr{
      width: 100%;
      display: flex;
      border-left: 1px solid #bfcbd9;
      background:rgba(255,255,255,1);
      td{
        height:46px;
        flex: 1;
        line-height:46px;
        text-align: center;
        border: 1px solid #bfcbd9;
        border-bottom: 0;
        border-left: 0;
      }
    }
    tr:last-child{
      border-bottom: 1px solid #bfcbd9;
    }
  }
  .OrderDaoru table tbody tr:hover{
    background: #DBF0FF;
  }
  .price{
    width: 100%;
    overflow: hidden;
    background:rgba(255,247,204,1);
    li{
      float: left;
      height:52px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:52px;
      margin-right: 5%;
    }
    li:nth-child(1){
      margin-left: 54%;
    }
  }
  .el-pagination{
    float: right;
    margin:12px 0;
    cursor: pointer;
  }
  .home{
    float: right;
    margin: 18px 5px;
  }
  .cursor,.track,.detail{
    cursor: pointer;
    color:rgba(32,160,255,1);
  }
  .cursor:hover,.track:hover,.detail:hover{
    color:purple;
  }
  .tijiao{
    width: 100%;
    overflow: hidden;
    text-align: center;
    margin: 20px 0;
    .el-button{
      width: 20%;
    }

  }
</style>


