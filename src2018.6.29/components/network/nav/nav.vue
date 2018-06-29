<template>
    <div id="app">
      <el-breadcrumb-item v-for="(item,index ) in navData" :key="index" :to="{path:item.path}" >
        <div
          class="user_type" :class="{selector:item.active}">
          {{item.name}}
        </div>
      </el-breadcrumb-item>
    </div>
</template>
<script>
    export default {
      props:["navData"],
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>
<style scoped lang="scss">
    .user_type{
      padding:10px 60px;
      background: #EBDDF6;
      color:#000;
      cursor:pointer;
    }
    .selector{
      background: #A470CD;
      color:#fff;
      font-size:14px;
    }
</style>


