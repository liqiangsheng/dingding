<template>
  <div>
  <div class="newOrder">
    <div class="tab">
      <el-menu theme="dark" class="el-menu-demo" mode="horizontal" >
        <el-menu-item  v-for="(item,index) in tabList"  :key="index" index="index" @click="tabClick(item,index)" >
          {{item}}
        </el-menu-item>
      </el-menu>
    </div>

    <NewOrderOne v-if="IndexOne == 0"></NewOrderOne>
    <OrderDaoru v-if="IndexOne == 1"></OrderDaoru>

  </div>
  </div>
</template>
<script>
  import NewOrderOne from "./orderPage/newOrderOne.vue" //增加
  import OrderDaoru from "./orderPage/OrderDaoru.vue"
  export default {
    components:{
      NewOrderOne,OrderDaoru
    },
    data() {
      return {
            IndexOne:0,
            tabList:["填写工单","批量导入"], //头部数据
      }
    },
    created(){

    },
    methods: {
      tabClick(v,i){
        this.IndexOne = i;
      }

    },
    mounted() {
    },
  }
</script>
<style lang="scss">
  #shijian .ivu-input{
    height: 36px !important;
    border: 1px solid #bfcbd9
  }
  #citycity {
    .el-cascader__label {
      line-height: 36px !important;
    }
  }

</style>
<style scoped lang="scss">
  .newOrder{
    width: 100%;
      .el-menu-demo {
        background: #FFFFFF;
        margin-bottom: 2px;
        .el-menu-item {
          background: #FFFFFF;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(136, 136, 136, 1);
          border-bottom: 5px solid transparent;
        }
        .el-menu-item:hover {
          background: #FFFFFF;
          font-size: 14px;
          font-family: PingFangSC-Medium;
          color: rgba(230, 88, 49, 1);
          border-bottom: 5px solid rgba(230, 88, 49, 1);
        }
      }

  }

</style>


