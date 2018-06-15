<template>
    <div class="order_info_item">
        <div class="list_name">
             {{item.name}}
        </div>
        <div class="list_value" :style="item.color" v-if="!item.url" :class="{'urgent':urgent==='1'&&item.urgent==='emergencyDegree'}">
            {{item.value ||"无"}}
        </div>
      <div v-else :style="item.url" class="order_name"></div>
    </div>
</template>
<script>

  export default {
    props:["item","urgent"],
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
      .urgent::after{
        content:"加急";
        display: inline-block;
        color:#fff;
        background:#E65831;
        width:.7rem;
        text-align: center;
        line-height:0.4rem;
        border-radius: 0.08rem;
        font-size:0.24rem;
      }
    }
    .order_name{
      width:.94rem;
      height:.42rem;

    }

</style>

