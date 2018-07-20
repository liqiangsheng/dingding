<template>
  <div class="customerService">
      im即时聊天
  </div>
</template>
<script>
  export default{
//      name:'IMediate',
      data(){
          return{

          }
      },
      created(){
        this.ajax();
      },
      computed:{},
      watch:{},
      methods:{
        ajax(){
          let _this=this;
          console.log(_this.$getLocalStorage("enrolleeinfo")[0].token);
          _this.$http.get(_this.$apiIM,{"token": _this.$getLocalStorage("enrolleeinfo")[0].token }).then(res =>{
            console.log(res);
            if(res.data.code=='0000'){
              _this.$message({
                message: "请求成功",
                type: "success"
              });
              _this.frameSrc=res.data.result;
            }else if(res.data.code=='1001'){
              _this.$message({
                message: "IM即时聊天请求无效,请重新登录",
                type: "warning"
              });
              console.log(res.data.code);
              _this.hrefLink();
            }
          }).catch(err=>{
            console.log(err);
          });
        },
        hrefLink(){
//          window.open('http://www.baidu.com','_self');
          window.open('http://www.baidu.com','_blank');
        }
      },
  }

</script>
<style scoped lang="scss">
.customerService{
  width: 100px;
  height: 40px;
  background-color:red;
}
</style>
