<template>
  <!--消息中心-->
    <div id="messageCenter" ref="box">
         <div class="messageCenterBox" v-for="(item,index) in messageCenterList"  :key="index">
             <p><span>{{item.createTime|moment}}</span></p>
             <p>{{item.content}}</p>
         </div>
      <div>
      </div>
      <scroll-top></scroll-top>
    </div>
</template>
<script>
  import scrollTop from "@/components/publicComponents/scrollTop"
    export default {
      components:{scrollTop},
        data() {
            return {
              messageCenterList:[],
              showPages:1,
              currentPageSize:10,
              total:0,
              pageTotal:0,
              loading:false
            }
        },
        methods: {
          getTableList(){
            const url = `${this.$common.apidomain}/sysMessage/findPageByUserId?page=${JSON.stringify(this.showPages)}&rows=${JSON.stringify(this.currentPageSize)}`
            this.$http.get(url).then(res => this.$httpFilter(res).then(data => {
              const result = data.result;
              this.messageCenterList=this.messageCenterList.concat(result.list);
              this.pageTotal=result.pages;
              this.loading=true;
            },error=>{}))
          }
        },
        created() {
          this.getTableList();
          setTimeout(()=>{ this.$commonJs.upwardLoading.call(this,() => this.getTableList() ) },1000);
        }
//      /sysMessage/findPageByUserId ?pageNo=1&pageSize=10
    }

</script>
<style scoped lang="less">
#messageCenter{
  background:rgba(241,241,241,1);
}
  .messageCenterBox{
    width: 100%;
    padding: 0.42rem;
    background: #ffffff;
    margin-top: 0.16rem;
    p:nth-child(1){
      width: 100%;
      height: 0.4rem;
      margin-bottom: 0.2rem;
      span{
        float: right;
        text-align: right;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        color:rgba(83,107,210,1);
        line-height:0.4rem;
      }
    }
    p:nth-child(2){
      width: 100%;
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:0.48rem;
    }
  }
</style>


