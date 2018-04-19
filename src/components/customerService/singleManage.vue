<template>
  <!--工单管理-->
  <div class="customerService">
      <div style="width: 100%;height:100%;background-color:red;" @click="button_open">123
        <!--<iframe rameborder="0"  width="600" height="600" src="http://www.baidu.com" scrolling="auto"></iframe>-->
        <!--<iframe rameborder="0"  style="width:600px;height:600px;" src="http://177dd.udesk.cn" scrolling="auto"></iframe>-->
        <!--<iframe rameborder="0"  style="width:600px;height:600px;" src="http://177dd.udesk.cn/entry/call" scrolling="auto"></iframe>-->
        <!--<iframe rameborder="0"  style="width:600px;height:600px;" src="http://177dd.udesk.cn/entry/ticket/list/430121?column=&order=" scrolling="auto"></iframe>-->
        <!--<script>-->
          <!--document.domain = "http://177dd.udesk.cn";-->
          <!--document.domain = "http://177dd.udesk.cn";-->
        <!--</script>-->

        <!--<object   style="width: 100%;height:100%;background-color:red;" type="text/html" data="http://177dd.udesk.cn"></object ><br/>-->
      </div>
  </div>
</template>
<script>
  export default{
//    name:'singleManage',
      data(){
          return{
            frameSrc:'',
          }
      },
      computed:{

      },
      beforeCreate(){
        console.log(2222);
        window.open('http://www.baidu.com')
      },
      created(){
//        this.ajax();
      },
      watch:{},
      methods:{
          ajax(){
              let _this=this;
            console.log(_this.$getLocalStorage("enrolleeinfo")[0].token);
//              _this.$http.get('http://admin.test.dingdingkuaixiu.com/udesk/usersAuthJwtCallback').then(res =>{
              _this.$http.get(`${_this.$apidomain}/udesk/usersAuthJwtCallback`,{"token": _this.$getLocalStorage("enrolleeinfo")[0].token }).then(function(res){
                console.log(res);
                if(res.data.code=='0000'){
                  _this.$message({
                    message: "请求成功",
                    type: "success"
                  });
                  _this.frameSrc=res.data.result;
                }else if(res.data.code=='1001'){
                  _this.$message({
                    message: "工单管理请求无效,请重新登录",
                    type: "warning"
                  });
                  console.log('window',window);
//                  window.open('http://www.baidu.com','_blank');
//                  window.location.href='http://www.baidu.com';
//                    window.open('http://www.baidu.com')
                }
              }).catch(function(err){
                console.log(err);
              });
          },
          button_open(){
            console.log(111);
            window.open('http://www.baidu.com')
          }
      },
  }

</script>
<style scoped lang="scss">
.customerService{
  width: 100%;
  height:100%;
}
</style>
