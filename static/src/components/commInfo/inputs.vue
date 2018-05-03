<template>
    <div>
        <span class="list_name">{{item.name}}:</span>
        <el-input style="width:200px"
          :type="item.type"
          placeholder="请输入内容"
          v-model="item.value">
        </el-input>
    </div>
</template>
<script>
    export default {
      props:["item"],
        data() {
            return {}
        },
        methods: {},
        created() {
        }
    }
</script>
<style scoped lang="scss">
    .list_name{
      width:93px;
    }
</style>


