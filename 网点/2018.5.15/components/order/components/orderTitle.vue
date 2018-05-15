<template>
          <div class="title_data">
            <p>工单号：{{orderNumber}}  &nbsp;&nbsp;<span class="clamant" v-if="index%2==0">加急</span></p>
            <span class="order_state">{{orderState}}</span>
          </div>
</template>

<script>

  export default {
   props:["index","orderNumber","state","isClamant","orderState"],
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
   .title_data{
     padding:0 .27rem;
     display: flex;
     justify-content: space-between;
     line-height: .74rem ;
     border-bottom:1px solid #C3C3C3;
     p{
       color:#888888;
     }
     .order_state{
       color:#E65831;
     }
.clamant{
        display: inline-block;
        color:#fff;
        background:#E65831;
        width:.7rem;
        text-align: center;
        line-height:0.36rem;
        border-radius: 0.08rem ;
        font-size:0.24rem;
    }
   }

</style>

