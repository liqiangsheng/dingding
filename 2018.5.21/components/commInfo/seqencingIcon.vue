<template>
    <div>
      <i class="demotion_icon cursor" :class="{'pull_icon':flag,'up_icon':!flag&&isS}" @click="demotionFun"></i>
    </div>
</template>
<script>
    export default {
      props:["data","getTableList","params"],
        data() {
            return {
                state:true,
                key:"orderByClause",
                flag:false,
                isS:false,
            }
        },
        methods: {
          demotionFun(){
            this.isS=true;
            let params=this.params["params"];
            if(this.state){    //升序
              params[this.key]=this.data["sortAscendingValues"].join(" ");
              this.getTableList({params:params});
              this.state=!this.state;
              console.log("升序");
              this.flag=!this.flag;
            }else{
              params[this.key]=this.data["gradeDownValues"].join(" ");
              this.getTableList({params:params});
              this.state=!this.state;
              this.flag=!this.flag;
              console.log("降序");
            }
          }
        },
        created() {

        }
    }
</script>
<style scoped lang="scss">

  div{
    display: inline-block;
  }
  .demotion_icon{
    display: inline-block;
    width:25px;
    height:20px;
    background:url(../../../static/images/demotion.png) center center no-repeat;
    background-size:100% 100%;
    vertical-align: middle;
  }
  .up_icon{
    background:url(../../../static/images/up.png) center center no-repeat;
  }
  .pull_icon{
    background:url(../../../static/images/open.png) center center no-repeat;
  }
</style>


