<template>
  <div id="box">
        <mt-navbar v-model="selected" style="background:#536BD2;padding-bottom:.1rem;position:fixed;top:.96rem;z-index:999;width:100%;" id="order_tabs" >
           <mt-tab-item v-for="(item,index) in tabItems" :key="index" :id="item.id">{{item.name}}</mt-tab-item>
      </mt-navbar>

    <!--:swipeable="true"-->

      <mt-tab-container v-model="selected" id="order_list_content" >
        <mt-tab-container-item v-for="(item,index) in tabItems" :key="index" :id="item.id">

          <!--<keep-alive>-->
            <order-list :id="item.id" v-if="item.id===selected"></order-list>
          <!--</keep-alive>-->

        </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import orderList from "./components/orderList"
import storage from "@/assets/js/storage"
  export default {
    components:{
       orderList
    },
    data () {
      return {
        scroll:0,
        selected:storage.getSession("orderIndex")||"1",
        tabItems:[
          {
          name:"监控",
          id:"1"
        },
        {
          name:"待分配",
          id:"2"
        },
        {
          name:"进行中",
          id:"3"
        },
        {
          name:"遗留",
          id:"4"
        },
        {
          name:"完成",
          id:"5"
        },
        ],
      }
    },
    methods:{

    },
    watch:{
      "selected":function(e,l){
          storage.setSession("orderIndex",e)
      },
      immediate:true,
    },
    created() {

    },
   mounted(){
     history.pushState(null, null, location.href)
   },
  }
</script>
<style scoped lang="less">
  h1{
    font-size:1rem;
    color:red;
  }
#box{
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom:.08rem solid #fff;
  }
}
#order_list_content{
  padding:1rem .15rem;
    background:#F1F1F1;
  min-height:95vh;
}
</style>
<style lang="less">
#order_tabs{
  .mint-tab-item-label{
      color:#C5CFF7 !important;
      font-family:PingFangSC-Semibold !important;
      font-size:0.3rem !important;
  }
  .mint-tab-item.is-selected{
    .mint-tab-item-label{
      color:rgba(255,255,255,1) !important;
      font-family:PingFangSC-Semibold !important;
  }
  }
}


#order_tabs .mint-tab-item.is-selected .int-tab-item-label{
  // color:rgba(255,255,255,1) !important;
}
</style>

