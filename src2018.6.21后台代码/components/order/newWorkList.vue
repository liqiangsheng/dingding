<template>
  <div id="app">
    <ul id="newWorkListlist">
      <li v-for="(item,index) in list" :class="{active:headerIndex==index}" @click="listClick(index)">{{item.name}}</li>
    </ul>
    <newWorkList v-if="headerIndex==0"></newWorkList>
    <workOderDaoru v-if="headerIndex==1"></workOderDaoru>
  </div>
</template>
<script>
  import newWorkList from "./newWorkListHeader.vue"
  import workOderDaoru from "./WorkOrderDaoru.vue"

  export default {
    components:{
      newWorkList, workOderDaoru
    },
    data() {
      return {
        headerIndex: 0,
        list: [
          {id: "1", name: "填写工单"}
//          , {id: "2", name: "批量导入"}
        ]
      }
    },
    computed:{

    },
    methods: {
      listClick(i) {
        this.headerIndex = i;
      }
    }


  }
</script>

<style scoped lang="scss">
  #newWorkListlist {
    width: 100%;
    height: 82px;
    border-bottom: 1px solid rgba(192, 204, 218, 1);
    margin-bottom: 44px;
    overflow: hidden;
    li {
      float: left;
      text-align: center;
      width: 130px;
      height: 81px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(151, 163, 170, 1);
      line-height: 81px;
    }
    li.active {
      border-bottom: 4px solid rgba(149, 93, 198, 1);
      color: #955DC6;
    }
  }
</style>



