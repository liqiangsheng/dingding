<template>
    <div class="order_info_item">
        <div class="list_name">
             {{item.name}}
        </div>
      <div class="list_value" :style="item.color">
        {{item.value}}
        </div>
    </div>
</template>
<script>

  export default {
    props:["item"],
    components:{
    },
    data () {
      return {}
    },
    methods:{},
    created() {

    },
   mounted(){

   },
  }
</script>
<style scoped lang="less">
    .order_info_item{
      display: flex;
      height: .66rem;
      align-items: center;
      .list_name{
        width:1.6rem;
        text-align: right;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
      }
      .list_value{
        flex:1;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        text-indent: 1em;

      }
    }
</style>

