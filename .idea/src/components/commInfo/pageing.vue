<template>
    <div>
      <div class="paging">
        <p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes='[20,50,100,200]'
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="data.showPages"
          :total="data.total"
          :page-size="data.currentPageSize"
          :page-count="data.pageTotal"
        >
        </el-pagination>
        <p class="home last_page" @click="lasePage">尾页</p>
        <p class="home" @click="firstPage">首页</p>
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
          handleSizeChange(val) {
            this.data.currentPageSize=val;
            this.getTableList(this.paramsData());
          },
          handleCurrentChange(val) {
            this.data.showPages=val;
            this.getTableList(this.paramsData());
          },
          firstPage(){
            if(this.data.showPages===1 ){
              return alert("已经是第一页")
            }
            this.data.showPages=1;
            this.getTableList(this.paramsData());
          },
          lasePage(){
            if(this.data.showPages===this.data.pageTotal){
              return alert("已经是最后一页")
            }
            this.data.showPages=this.data.pageTotal;
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


