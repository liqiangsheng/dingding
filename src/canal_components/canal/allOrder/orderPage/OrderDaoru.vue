<template>

  <div class="OrderDaoru" ref="OrderDaoru">
    <DaoRuGongDan v-if="daoruShow" @isClose="isClose"></DaoRuGongDan>
    <DaoRuChanPin v-if="daoruShow1" @isClose="isClose"></DaoRuChanPin>
    <DaoDetail v-if="daoruShow2" @isClose="isClose"></DaoDetail>
    <DaoruBianji v-if="daoruShow3" @isClose="isClose"></DaoruBianji>
     <ul class="OrderDaoruList">
       <li><el-button type="primary" @click="chanpinClick">导入工单</el-button></li>
       <li><el-button>下载模版</el-button></li>
        <li>上传格式建议xlsx、xls、csv、xml等，文件大小限制10M以内</li>
     </ul>
    <div class="OrderDaoru" >
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
          <!--产品名称-->
          <td style="flex-grow:2">
            {{}}
          </td>
          <!--品牌-->
          <td>
            {{}}
          </td>
          <!--型号-->
          <td>
            {{}}
          </td>
          <!--数量-->
          <td>
            {{}}
          </td>
          <!--检测费-->
          <td>
            {{}}
          </td>
          <!--服务费-->
          <td>
            {{}}
          </td>
          <!--联系人-->
          <td>
            {{}}
          </td>
          <!--手机-->
          <td>
            {{}}
          </td>
          <!--地址-->
          <td>
           {{}}
          </td>
          <!--渠道质保-->
          <td>
            {{}}
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
    <div class="paging">
      <p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes='[20,50,100,200]'
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="showPages"
        :total="total"
        :page-size="currentPageSize"
        :page-count="pageTotal"
      >
      </el-pagination>
      <p class="home last_page cursor" @click="lasePage">尾页</p>
      <p class="home cursor" @click="firstPage">首页</p>

    </div>
    <!--分页组件结束-->
    <div class="tijiao"><el-button type="primary"  @click="daoClick">提交工单</el-button></div>
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
        theadsName:["产品名称","品牌","型号","数量","检测费","服务费","联系人","手机","地址","渠道质保","操作"],
        tableListData:["1","2","3","4","5","6","7","8","9","0","8"],
//        tableListData: {},          //表格数据
        showPages: 1,  //分页
        currentPageSize: 20,//分页
        total: 0,//分页
        pageTotal: 0,//分页
        daoruShow:false,//导入
        daoruShow1:false,// 导入产品
        daoruShow2:false, //删除
        daoruShow3:false,// 导入编辑

      }
    },
    created(){
    },
    methods: {
      bianjiClick(){//编辑
        this.daoruShow3 = true;
      },
      detailClick(){//删除
        this.daoruShow2 = true;
      },
      daoClick(){ // 导入
         this.daoruShow = true;
      },
      chanpinClick(){ //导入产品
        this.daoruShow1 = true;
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


