<template>
  <!--师傅工单-->
  <div id="masterOrder">
        <div>
          <ul id="header">
            <li v-for="(item,index) in headerData"><span :class="{active:selected==index}" @click="tabClick(index)">{{item.name}}</span></li>
          </ul>
          <waitForService v-if="selected==0"></waitForService>
          <complete v-if="selected==1"></complete>
        </div>
  </div>
</template>
<script>
  import waitForService from "./components/waitForService.vue";
  import complete from "./components/complete.vue";
    export default {
      components:{
        waitForService,complete
      },
      data() {
        return {
          selected:0, //选中Id
          headerData:[  //头部数据
            {
              id:"1",
              name:"待服务"
            },{
              id:"2",
              name:"已完成"
            }
          ]
        }
      },
      methods: {
        tabClick(i){ //头部切换
          this.selected =i;
        }

      }

    }

</script>
<style scoped lang="less">
  #masterOrder{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:0;
    background:rgba(241,241,241,1);
    #header{
      width:100%;
      background: #ffffff;
      height:1rem;
      display: flex;
      li{
        flex: 1;
        height: 1rem;
        text-align: center;
        span{
          display: inline-block;
          height:0.8rem;
          margin-top: 0.2rem;
          line-height: 0.42rem;
          font-size: 0.3rem;
          font-family:PingFangSC-Regular;
          color:rgba(83,107,210,1);
        }
        span.active{
          font-size: 0.3rem;
          font-family:PingFangSC-Semibold;
          height:0.72rem;
          border-bottom: 0.08rem solid rgba(83,107,210,1);
        }
      }
    }
  }

</style>


