<template>
    <div>
      <div class="paging">
        <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pages}}</p>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes='[20,50,100,200]'
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="data.startRow"
          :total="data.total"
          :page-size="data.size"
          :page-count="data.pageTotal"
        >
        </el-pagination>
        <p class="home last_page cursor" @click="lasePage">尾页</p>
        <p class="home cursor" @click="firstPage">首页</p>
      </div>
    </div>
</template>
<script>
    export default {
      props:["data","getTableList","paramsData","tableListData"],
        data() {
            return {

            }
        },
        methods: {
          //每页显示多少条
          handleSizeChange(val) {
            this.data.size=val;
            this.getTableList(this.paramsData());
          },
          handleCurrentChange(val) {
            this.data.startRow=val;
            this.getTableList(this.paramsData());
          },
          firstPage(){
            //第一页
            if(this.data.startRow===1 ){
              return this.$queryFun.successAlert.call(this,'已经是第一页')
            }
            this.data.startRow=1;
            this.getTableList(this.paramsData());
          },
          lasePage(){
            //最后一页
            if(this.data.startRow===this.data.pageTotal){
              return this.$queryFun.successAlert.call(this,'已经是最后一页')
            }
            this.data.startRow=this.data.pageTotal;
            this.getTableList(this.paramsData());
          },
        },
        created() {
        }
    }
</script>
<style scoped lang="scss">
  .paging{
    text-align:right;
    width:100%;
    line-height:50px;
    >input,select{
      width:42px;
      height:20px;
      padding:0;
    }
    >.link_page{
      background: #1C5B94;
      color:#fff;
    }
    .home{
      float:right;
    }
    .last_page{
      color:blue;
      margin-left:10px;
    }
    .el-pagination{
      float:right;
      padding-top:12px;
    }
  }
</style>


