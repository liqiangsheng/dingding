<template>
  <!--师傅管理-->
  <div id="master_box">
    <ul id="header">
      <li v-for="(item,index) in headerData"><span :class="{active:selected==index}" @click="tabClick(index)">{{item.name}}</span></li>
    </ul>
    <masterList v-if="selected==0"></masterList>
    <leave v-if="selected==1"></leave>
  </div>
</template>
<script>
  import masterList from "./components/masterList.vue" //师傅列表
  import  leave from "./components/leave.vue" //师傅请假
    export default {
      components:{
        masterList,leave
      },
      data() {
        return {
          selected:0, //选中Id
          headerData:[  //头部数据
            {
            id:"1",
            name:"师傅列表"
          },{
              id:"2",
              name:"请假申请"
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
  #master_box{
       position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:0;
    background:rgba(241,241,241,1);
    #header{
      width:100%;
      height:1rem;
      display: flex;
      background:rgba(83,107,210,1);
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
          color:rgba(197,207,247,1)
        }
        span.active{
          font-size: 0.3rem;
          font-family:PingFangSC-Semibold;
          color:rgba(255,255,255,1);
          height:0.72rem;
          border-bottom: 0.08rem solid #ffffff;
        }
      }
    }
  }

</style>


