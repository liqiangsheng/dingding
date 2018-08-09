<template>
    <div>
      <i class="demotion_icon cursor" :class="{'pull_icon':flag&&this.num==1,'up_icon':!flag&&isS&&this.num==2,'origal_icon':!this.num}" @click="demotionFun"></i>
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
                num:''
            }
        },
        methods: {
          demotionFun(){
            //this.$emit('transfer',this.data)
            this.isS=true;
            let params=this.params["params"];
            if(this.state && this.num !==1 && this.num !==2){    //升序
              params[this.key]=this.data["sortAscendingValues"].join(" ");
              //console.log(params.orderByClause,'升序')
              this.getTableList({params:params});
              this.state=!this.state;
              //console.log("升序");
              this.flag=!this.flag;
              this.num = 1;
              this.$store.commit('getSort',this.data["sortAscendingValues"].join(" "));
            }else if(this.num !==2){
              params[this.key]=this.data["gradeDownValues"].join(" ");
              this.getTableList({params:params});
              this.state=!this.state;
              this.flag=!this.flag;
              this.num = 2;
              //console.log("降序");
              this.$store.commit('getSort',this.data["gradeDownValues"].join(" "));
             // console.log(this.$store.state.sort_data,'降序')
            }else{
              console.log('还原')
              params[this.key] = '';
              this.num = '';
              this.$store.commit('getSort',"");
              this.getTableList({params:params})
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


