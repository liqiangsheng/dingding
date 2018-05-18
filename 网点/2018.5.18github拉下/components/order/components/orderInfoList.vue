<template>
    <div class="order_info_item">
        <div class="list_name">
             {{item.name}}
        </div>
        <div class="list_value" :style="item.color">
            {{item.value }}
        </div>
    </div>
</template>
<script>

  export default {
    props:["item"],
    components:{
    },
    data () {
      return {

      }
    },
    methods:{

    },
    created() {

    },
   mounted(){

   },
  }
</script>
<style scoped lang="less">
    .order_info_item{
      display: flex;
      /*min-height:.66rem;*/
      /*align-items:center;*/
      margin-bottom:.1rem;
      .list_name{
        width:1.6rem;
        text-align: right;
        /*min-height:.66rem;*/
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        margin-right:1em;
        color:rgba(136,136,136,1);
      }
      .list_value{
        flex:1;
        max-width:18em;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        /*text-indent: 1em;*/

      }
    }
</style>

